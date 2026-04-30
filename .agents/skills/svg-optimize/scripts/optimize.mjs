#!/usr/bin/env node

/**
 * SVG Optimizer — runs SVGO with project-preferred settings.
 *
 * Usage:
 *   node optimize.mjs <path...>
 *
 * Each <path> can be a .svg file or a directory (searched recursively).
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import { resolve, relative, extname } from "node:path";
import { glob } from "node:fs/promises";
import { optimize } from "svgo";

// ── SVGO configuration ─────────────────────────────────────────────
// Mirrors the user's preferred svgomg.net settings:
//   - Number precision: 1
//   - Transform precision: 1
//   - Prettify markup: on
//   - Prefer viewBox over width/height: on
//   - Figma artifact cleanup: on

const svgoConfig = {
  multipass: true,
  js2svg: {
    pretty: true,
    indent: 2,
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Set number precision to 1 across all relevant plugins
          cleanupNumericValues: { floatPrecision: 1 },
          convertPathData: { floatPrecision: 1 },
          convertTransform: { floatPrecision: 1 },
        },
      },
    },
    // Remove explicit width/height in favor of viewBox
    "removeDimensions",
    // Clean up Figma-generated IDs like clip0_123_456
    {
      name: "cleanupIds",
      params: {
        minify: true,
      },
    },
    // Sort attributes for consistent diffs
    "sortAttrs",
  ],
};

// ── Helpers ─────────────────────────────────────────────────────────

async function collectSvgFiles(paths) {
  const files = [];

  for (const p of paths) {
    const resolved = resolve(p);
    const info = await stat(resolved);

    if (info.isDirectory()) {
      // Recursively find .svg files
      for await (const entry of glob("**/*.svg", { cwd: resolved })) {
        files.push(resolve(resolved, entry));
      }
    } else if (info.isFile() && extname(resolved).toLowerCase() === ".svg") {
      files.push(resolved);
    } else {
      console.warn(`⚠  Skipping (not an SVG): ${relative(process.cwd(), resolved)}`);
    }
  }

  return [...new Set(files)].sort();
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function pct(before, after) {
  if (before === 0) return "0%";
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

// ── Main ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node optimize.mjs <file-or-directory...>");
  process.exit(1);
}

const files = await collectSvgFiles(args);

if (files.length === 0) {
  console.log("No SVG files found.");
  process.exit(0);
}

console.log(`\nOptimizing ${files.length} SVG file(s)...\n`);

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;
const results = [];

for (const file of files) {
  const rel = relative(process.cwd(), file);

  try {
    const original = await readFile(file, "utf-8");
    const originalSize = Buffer.byteLength(original, "utf-8");

    const result = optimize(original, {
      ...svgoConfig,
      path: file,
    });

    const optimizedSize = Buffer.byteLength(result.data, "utf-8");

    await writeFile(file, result.data, "utf-8");

    totalBefore += originalSize;
    totalAfter += optimizedSize;
    processed++;

    const saved = pct(originalSize, optimizedSize);
    const tag = originalSize - optimizedSize < originalSize * 0.05 ? " (minimal)" : "";
    results.push({ rel, originalSize, optimizedSize, saved, tag });

    console.log(
      `  ${rel}  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}  (−${saved})${tag}`
    );
  } catch (err) {
    skipped++;
    console.error(`  ${rel}  ERROR: ${err.message}`);
  }
}

// ── Summary ─────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(60)}`);
console.log(`  Processed: ${processed} file(s)`);
if (skipped > 0) console.log(`  Skipped:   ${skipped} file(s)`);
console.log(
  `  Total:     ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}  (−${pct(totalBefore, totalAfter)})`
);
console.log(`${"─".repeat(60)}\n`);
