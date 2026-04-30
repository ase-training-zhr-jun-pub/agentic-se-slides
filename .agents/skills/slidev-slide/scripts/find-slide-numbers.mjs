#!/usr/bin/env node

/**
 * Find global Slidev slide numbers using Slidev's own parser.
 *
 * Usage:
 *   node find-slide-numbers.mjs [query]
 *   node find-slide-numbers.mjs --file slides/03-topic/slides.md
 *   node find-slide-numbers.mjs --match "Explore Options"
 *   node find-slide-numbers.mjs --range --file slides/03-topic/slides.md
 *   node find-slide-numbers.mjs --frontmatter footerLink
 *   node find-slide-numbers.mjs --frontmatter slideNumber=false
 *   node find-slide-numbers.mjs --frontmatter footerLink --frontmatter footerDir=reverse
 */

import { existsSync } from "node:fs";
import { relative, resolve } from "node:path";
import { load } from "@slidev/parser/fs";

function usage() {
  console.log(`Usage: node find-slide-numbers.mjs [options] [query]

Options:
  --entry <path>              Slidev entry file (default: slides.md)
  --file <path>               Filter by source file path fragment
  --match <text>              Filter by slide title or content
  --frontmatter <key>[=<val>] Filter by frontmatter property (repeatable)
  --range                     Print compact slide range only
  --help                      Show this help

Examples:
  node .opencode/skills/slidev-slide/scripts/find-slide-numbers.mjs decision-making
  node .opencode/skills/slidev-slide/scripts/find-slide-numbers.mjs --file slides/03-designing-efficient-architecture/decision-making/slides.md
  node .opencode/skills/slidev-slide/scripts/find-slide-numbers.mjs --range --match "Explore Options"
  node .opencode/skills/slidev-slide/scripts/find-slide-numbers.mjs --frontmatter footerLink
  node .opencode/skills/slidev-slide/scripts/find-slide-numbers.mjs --frontmatter slideNumber=false
  node .opencode/skills/slidev-slide/scripts/find-slide-numbers.mjs --frontmatter footerLink --frontmatter footerDir=reverse
`);
}

function coerceValue(str) {
  if (str === "true") return true;
  if (str === "false") return false;
  const n = Number(str);
  return Number.isNaN(n) ? str : n;
}

function parseArgs(argv) {
  const options = {
    entry: "slides.md",
    file: undefined,
    match: undefined,
    frontmatter: [],
    range: false,
    query: undefined,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--range") {
      options.range = true;
    } else if (arg === "--entry") {
      options.entry = requireValue(argv, ++i, "--entry");
    } else if (arg === "--file") {
      options.file = normalizeSearch(requireValue(argv, ++i, "--file"));
    } else if (arg === "--match") {
      options.match = normalizeSearch(requireValue(argv, ++i, "--match"));
    } else if (arg === "--frontmatter") {
      const raw = requireValue(argv, ++i, "--frontmatter");
      const eq = raw.indexOf("=");
      options.frontmatter.push(
        eq === -1
          ? { key: raw, value: undefined }
          : { key: raw.slice(0, eq), value: coerceValue(raw.slice(eq + 1)) }
      );
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      options.query = normalizeSearch([options.query, arg].filter(Boolean).join(" "));
    }
  }

  return options;
}

function requireValue(argv, index, option) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${option} requires a value`);
  }
  return value;
}

function normalizeSearch(value) {
  return value?.toLowerCase();
}

function firstHeading(content) {
  return content
    .split("\n")
    .find((line) => /^#{1,6}\s+/.test(line))
    ?.replace(/^#{1,6}\s+/, "")
    .trim();
}

function slideSummary(slide, number, root) {
  const filepath = slide.source?.filepath ?? "";
  const relativePath = filepath ? relative(root, filepath) : "<unknown>";
  const title = slide.title || firstHeading(slide.content || "") || "<untitled>";

  return {
    number,
    file: relativePath,
    title,
    content: slide.content || "",
    frontmatter: slide.frontmatter ?? {},
  };
}

function matches(slide, options) {
  const file = normalizeSearch(slide.file) || "";
  const title = normalizeSearch(slide.title) || "";
  const content = normalizeSearch(slide.content) || "";
  const haystack = `${file}\n${title}\n${content}`;

  if (options.file && !file.includes(options.file)) return false;
  if (options.match && !`${title}\n${content}`.includes(options.match)) return false;
  if (options.query && !haystack.includes(options.query)) return false;

  for (const { key, value } of options.frontmatter) {
    if (!(key in slide.frontmatter)) return false;
    if (value !== undefined && slide.frontmatter[key] !== value) return false;
  }

  return true;
}

function compactRange(numbers) {
  if (numbers.length === 0) return "";

  const sorted = [...new Set(numbers)].sort((a, b) => a - b);
  const chunks = [];
  let start = sorted[0];
  let previous = sorted[0];

  for (const number of sorted.slice(1)) {
    if (number === previous + 1) {
      previous = number;
      continue;
    }

    chunks.push(start === previous ? `${start}` : `${start}-${previous}`);
    start = number;
    previous = number;
  }

  chunks.push(start === previous ? `${start}` : `${start}-${previous}`);
  return chunks.join(",");
}

function printTable(slides) {
  const numberWidth = String(Math.max(...slides.map((slide) => slide.number), 1)).length;
  const fileWidth = Math.max(...slides.map((slide) => slide.file.length), 4);

  for (const slide of slides) {
    console.log(
      `${String(slide.number).padStart(numberWidth)}  ${slide.file.padEnd(fileWidth)}  ${slide.title}`
    );
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    usage();
    return;
  }

  const root = process.cwd();
  const entry = resolve(root, options.entry);

  if (!existsSync(entry)) {
    throw new Error(`Entry file not found: ${relative(root, entry)}`);
  }

  const deck = await load(root, entry);
  const slides = deck.slides.map((slide, index) => slideSummary(slide, index + 1, root));
  const filtered = slides.filter((slide) => matches(slide, options));

  if (options.range) {
    console.log(compactRange(filtered.map((slide) => slide.number)));
    return;
  }

  if (filtered.length === 0) {
    console.log("No matching slides found.");
    return;
  }

  printTable(filtered);
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
