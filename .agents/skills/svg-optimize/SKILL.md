---
name: svg-optimize
description: >
  Optimizes SVG files using SVGO with project-specific settings (Figma-friendly defaults,
  precision 1, prettified, viewBox preferred). Use this skill whenever the user asks to
  optimize, clean up, or compress SVGs — whether it's a single file, a list of paths, or
  an entire folder. Trigger on phrases like "optimize SVGs", "SVG aufräumen", "SVGs
  optimieren", "clean up SVGs", "SVGO", "SVG komprimieren", "Figma SVGs bereinigen", or
  when the user mentions SVG files that look bloated, come from Figma, or need shrinking.
  Also trigger when the user pastes raw SVG markup and wants it optimized.
---

# SVG Optimize

Optimizes SVG files in-place using SVGO with curated settings that match the project's
preferred SVGOMG configuration. Particularly useful for SVGs exported from Figma, which
tend to contain a lot of redundant metadata, generic IDs, and unnecessary precision.

## When to use

- User asks to optimize, compress, or clean up one or more SVG files
- User points at a folder and wants all SVGs inside optimized
- User pastes SVG markup that should be cleaned up and saved
- SVGs were just exported from Figma and need post-processing

## Settings rationale

These settings mirror the user's preferred SVGOMG (svgomg.net) configuration:

| Setting | Value | Why |
|---|---|---|
| Number precision | 1 | Aggressively rounds numeric values — sufficient for most icon/illustration SVGs and dramatically reduces file size |
| Transform precision | 1 | Same rationale for transform matrices |
| Prettify markup | on | Keeps SVGs human-readable in the codebase and makes diffs reviewable |
| Prefer viewBox | on | Removes explicit width/height in favor of viewBox, which scales better in responsive layouts |
| Figma cleanup | on | Strips Figma-specific clip-path IDs (like `clip0_123_456`), editor metadata, and redundant group wrappers |

Everything else uses SVGO's `preset-default` — the same defaults you see on svgomg.net.

## How to run

The skill bundles a Node.js script at `scripts/optimize.mjs` (relative to this skill
directory). It requires `svgo` as a dependency.

### Step 1: Ensure SVGO is available

Check if `svgo` is installed in the project:

```bash
node -e "require('svgo')" 2>/dev/null && echo "OK" || echo "MISSING"
```

If MISSING, install it as a dev dependency:

```bash
npm install --save-dev svgo
```

### Step 2: Determine input paths

The user will specify either:
- **Specific file paths**: `path/to/icon.svg`, `slides/chapter-1/assets/diagram.svg`
- **A directory**: `slides/` or `public/icons/` — find all `*.svg` files recursively
- **A glob pattern**: `slides/**/*.svg`

If the user gives a directory, use `find` or glob to collect all `.svg` files first and
confirm the list with the user before optimizing (unless they explicitly say to just do it).

### Step 3: Run the optimization script

```bash
node <path-to-this-skill>/scripts/optimize.mjs <file-or-directory-paths...>
```

The script accepts one or more file paths or directory paths. For directories it
recursively finds all `.svg` files.

### Step 4: Report results

After running, report:
- How many files were processed
- Per-file size reduction (original vs. optimized)
- Any files that were skipped or failed
- Total size saved

If a file barely changes (<5% reduction), mention it — it might already be optimized.

## Handling pasted SVG markup

If the user pastes raw SVG content instead of pointing at files:
1. Save the SVG to a temporary file
2. Run the optimization script on it
3. Show the optimized result to the user
4. If the user specifies a target path, write the optimized SVG there

## Edge cases

- **Already optimized SVGs**: The script is idempotent — running it twice won't break
  anything, but the second run will show minimal or no savings.
- **SVGs with embedded raster images**: SVGO won't remove embedded bitmaps by default.
  Warn the user if an SVG contains `<image>` elements with base64 data.
- **Animated SVGs**: SVGO's default plugins are safe for SMIL animations and CSS
  animations. No special handling needed.
