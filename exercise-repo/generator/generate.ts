import { simpleGit, SimpleGit } from "simple-git";
import { parse as parseYaml } from "yaml";
import {
  readFile,
  readdir,
  cp,
  rm,
  mkdir,
  unlink,
  stat,
} from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StepConfig {
  id: string;
  message: string;
  tags?: string[];
}

interface StepsConfig {
  commitAuthor: {
    name: string;
    email: string;
  };
  branches?: Record<string, string>;
  steps: StepConfig[];
}

// ─── CLI Arguments ───────────────────────────────────────────────────────────

const { values } = parseArgs({
  options: {
    source: { type: "string", short: "s" },
    out: { type: "string", short: "o" },
    "commit-date": { type: "string" },
    "commit-interval": { type: "string" },
  },
});

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../..");

const sourceDir = values.source ? resolve(values.source) : resolve(scriptDir, "..");
const outDir = values.out
  ? resolve(values.out)
  : resolve(repoRoot, "tmp/workshop-repo");

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_DIR = join(sourceDir, "base");
const STEPS_DIR = join(sourceDir, "steps");
const META_FILE = join(sourceDir, "meta", "steps.yaml");
const DELETE_MARKER = ".delete";

const DEFAULT_COMMIT_INTERVAL = "1m";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayAtMidnightUtc(): Date {
  const today = new Date().toISOString().slice(0, 10);
  return new Date(`${today}T00:00:00Z`);
}

function parseCommitDate(value: string | undefined): Date {
  if (!value) return todayAtMidnightUtc();

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
    if (parsed.toISOString().slice(0, 10) === value) return parsed;

    throw new Error(
      `Invalid --commit-date "${value}". Use a valid YYYY-MM-DD date.`
    );
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  throw new Error(
    `Invalid --commit-date "${value}". Use YYYY-MM-DD or an ISO timestamp.`
  );
}

function parseCommitInterval(value: string | undefined): number {
  const interval = value ?? DEFAULT_COMMIT_INTERVAL;
  const match = /^(\d+)(ms|s|m|h|d)$/.exec(interval);

  if (!match) {
    throw new Error(
      `Invalid --commit-interval "${interval}". Use a positive duration like 30s, 1m, 5m, 1h, or 1d.`
    );
  }

  const amount = Number(match[1]);
  if (amount <= 0) {
    throw new Error(
      `Invalid --commit-interval "${interval}". Must be greater than 0.`
    );
  }

  const unitToMs: Record<string, number> = {
    ms: 1,
    s: 1_000,
    m: 60_000,
    h: 60 * 60_000,
    d: 24 * 60 * 60_000,
  };

  return amount * unitToMs[match[2]];
}

// Deterministic timestamps: start at commitDate, increment by commitInterval.
const commitDate = parseCommitDate(values["commit-date"]);
const commitIntervalMs = parseCommitInterval(values["commit-interval"]);

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Recursively copy a directory, skipping .git and .delete files.
 * Overwrites existing files.
 */
async function copyOverlay(src: string, dest: string): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    // Never copy .git directories
    if (entry.name === ".git") continue;

    // Never copy .delete marker files
    if (entry.name === DELETE_MARKER) continue;

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      await copyOverlay(srcPath, destPath);
    } else {
      await mkdir(dirname(destPath), { recursive: true });
      await cp(srcPath, destPath, { force: true });
    }
  }
}

/**
 * Process .delete file: remove all listed files from the target directory.
 */
async function processDeletes(
  stepDir: string,
  targetDir: string
): Promise<void> {
  const deleteFile = join(stepDir, DELETE_MARKER);

  if (!(await exists(deleteFile))) return;

  const content = await readFile(deleteFile, "utf-8");
  const filesToDelete = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  for (const file of filesToDelete) {
    const targetPath = join(targetDir, file);
    if (await exists(targetPath)) {
      await unlink(targetPath);
      console.log(`  Deleted: ${file}`);
    } else {
      console.warn(`  Warning: File to delete not found: ${file}`);
    }
  }
}

/**
 * Get a deterministic ISO timestamp for a given step index.
 */
function getTimestamp(stepIndex: number): string {
  return new Date(
    commitDate.getTime() + stepIndex * commitIntervalMs
  ).toISOString();
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("Workshop Repository Generator");
  console.log("═".repeat(50));
  console.log(`Source:  ${sourceDir}`);
  console.log(`Output:  ${outDir}`);
  console.log(`Commit date:     ${commitDate.toISOString()}`);
  console.log(
    `Commit interval: ${values["commit-interval"] ?? DEFAULT_COMMIT_INTERVAL}`
  );
  console.log();

  // 1. Load configuration
  const configRaw = await readFile(META_FILE, "utf-8");
  const config: StepsConfig = parseYaml(configRaw);

  console.log(
    `Author:  ${config.commitAuthor.name} <${config.commitAuthor.email}>`
  );
  console.log(`Steps:   ${config.steps.length}`);

  // Validate branches config
  const stepIds = new Set(config.steps.map((s) => s.id));
  if (config.branches) {
    for (const [branch, stepId] of Object.entries(config.branches)) {
      if (!stepIds.has(stepId)) {
        throw new Error(
          `Branch "${branch}" references unknown step "${stepId}"`
        );
      }
    }
    console.log(
      `Branches: ${Object.entries(config.branches)
        .map(([name, id]) => `${name} -> ${id}`)
        .join(", ")}`
    );
  }

  console.log();

  // 2. Prepare output directory
  if (await exists(outDir)) {
    console.log("Removing existing output directory...");
    await rm(outDir, { recursive: true, force: true });
  }
  await mkdir(outDir, { recursive: true });

  // 3. Initialize git repository
  const TEMP_BRANCH = "__generator_tmp";
  const git: SimpleGit = simpleGit(outDir);
  await git.init();
  await git.raw(["checkout", "-b", TEMP_BRANCH]);
  await git.addConfig("user.name", config.commitAuthor.name);
  await git.addConfig("user.email", config.commitAuthor.email);
  await git.addConfig("commit.gpgsign", "false");
  await git.addConfig("tag.gpgsign", "false");

  console.log("Initialized git repository.");
  console.log();

  // 4. Process each step
  const commitHashes = new Map<string, string>();

  for (let i = 0; i < config.steps.length; i++) {
    const step = config.steps[i];
    const timestamp = getTimestamp(i);

    console.log(
      `─── Step ${step.id}: ${step.message} ─────────────────────────────`
    );

    if (step.id === "00") {
      // Base commit: copy entire base/ directory
      if (!(await exists(BASE_DIR))) {
        throw new Error(`Base directory not found: ${BASE_DIR}`);
      }
      await copyOverlay(BASE_DIR, outDir);
      console.log("  Copied base/ directory");
    } else {
      // Overlay step
      const stepDir = join(STEPS_DIR, step.id);

      if (!(await exists(stepDir))) {
        throw new Error(
          `Step directory not found: ${stepDir} (id: ${step.id})`
        );
      }

      // Process deletions first
      await processDeletes(stepDir, outDir);

      // Copy overlay files
      await copyOverlay(stepDir, outDir);
      console.log(`  Applied overlay: steps/${step.id}/`);
    }

    // Stage all changes
    await git.add("-A");

    // Commit with deterministic timestamp
    // Set env vars for deterministic committer date
    process.env.GIT_AUTHOR_DATE = timestamp;
    process.env.GIT_COMMITTER_DATE = timestamp;

    await git.commit(step.message, { "--date": timestamp });

    // Record commit hash for branch assignment
    const logEntry = await git.log({ maxCount: 1 });
    commitHashes.set(step.id, logEntry.latest!.hash);

    console.log(`  Committed: "${step.message}" (${timestamp})`);

    // Set tags
    if (step.tags && step.tags.length > 0) {
      for (const tag of step.tags) {
        await git.tag(["-a", tag, "-m", `Checkpoint: ${tag}`]);
        console.log(`  Tagged: ${tag}`);
      }
    }

    console.log();
  }

  // 5. Set up branches
  if (config.branches) {
    const branchEntries = Object.entries(config.branches);
    const defaultBranch = branchEntries[0][0];

    for (const [branch, stepId] of branchEntries) {
      const hash = commitHashes.get(stepId);
      if (!hash) {
        throw new Error(
          `No commit hash found for step "${stepId}" (branch "${branch}")`
        );
      }
      await git.branch([branch, hash]);
      console.log(`Branch "${branch}" -> step ${stepId} (${hash.slice(0, 7)})`);
    }

    // Check out the default branch (first entry) and remove the temporary build branch
    await git.checkout(defaultBranch);
    console.log(`Checked out "${defaultBranch}" as default branch.`);

    await git.branch(["-D", TEMP_BRANCH]);
    console.log(`Removed temporary branch "${TEMP_BRANCH}".`);

    console.log();
  }

  // 6. Summary
  console.log("═".repeat(50));
  console.log("Done! Repository generated successfully.");
  console.log();

  const log = await git.log();
  console.log(`Total commits: ${log.total}`);

  const tags = await git.tags();
  if (tags.all.length > 0) {
    console.log(`Tags: ${tags.all.join(", ")}`);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
