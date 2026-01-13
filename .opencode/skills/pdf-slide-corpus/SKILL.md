---
name: pdf-slide-corpus
description: Convert a slide-deck PDF into an agent-friendly corpus (PNG per slide + searchable text + 7 main chapter folders).
compatibility: opencode
metadata:
  domain: slides
  input: pdf
  output: markdown+png+text
---

## What this skill does

- Renders one PNG per PDF page (one slide per page)
- Extracts searchable text per page (pdftotext)
- Detects the 7 main chapters via "Chapter 1" .. "Chapter 7" markers
- Writes a folder per main chapter with:
  - `index.md`
  - `slide-XXXX.png`
  - `slide-XXXX.txt`
- Writes corpus indexes:
  - `index.md`
  - `manifest.json`
  - `slides.jsonl`

## When to use

Use this when you have an existing slide deck PDF and want a deterministic, searchable, chapter-structured corpus that an agent can browse (images) and search (text).

## How to run

```bash
node .opencode/skills/pdf-slide-corpus/pdf-slide-corpus.mjs --in "<path/to/deck.pdf>"
```

Common options:

```bash
node .opencode/skills/pdf-slide-corpus/pdf-slide-corpus.mjs \
  --in "<path/to/deck.pdf>" \
  --width 1920 \
  --thumbWidth 480 \
  --ocr auto \
  --lang deu+eng
```

## Output

Writes to `tmp/slide-corpus/` (gitignored).

Entry points:
- `tmp/slide-corpus/<pdf-stem>__<sha256short>/index.md`
- `tmp/slide-corpus/<pdf-stem>__<sha256short>/chapters/0X-.../index.md`

Notes:
- Pages before the first "Chapter 1" marker are assigned to Chapter 1 and marked as `prelude: true` in `slides.jsonl`.
- "Key Takeaways" slides remain inside their chapter (no separate folder).
