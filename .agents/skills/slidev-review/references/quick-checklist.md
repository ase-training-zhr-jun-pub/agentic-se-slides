# Quick Review Checklist

Use this as a rapid-fire checklist when reviewing slides. Each item maps to a section in the
main SKILL.md with more detail.

## Per-Slide Checks

### Rendering (export required for layout/styling/image changes)
- [ ] `npx slidev export --format png --range N,M --output tmp/review-<name>` succeeds
- [ ] Layout looks correct (columns split, spacing balanced, no overlap)
- [ ] Text not cut off or overflowing
- [ ] Images visible, properly sized
- [ ] Reference image matches (if available)

### Frontmatter
- [ ] Layout name exists (theme layout or `layouts/*.vue`)
- [ ] Props valid for the chosen layout
- [ ] YAML is well-formed (no tabs, proper quoting)
- [ ] `---` separator before every slide

### Styling (strict)
- [ ] Zero `<style>` blocks in slide markdown
- [ ] Zero `style=""` inline attributes in slide markdown
- [ ] Zero hex colors (`#004153`, `#ff9c66`, etc.)
- [ ] Zero Tailwind default colors (`text-blue-500`, `bg-gray-200`)
- [ ] Only theme colors: `petrol`, `apricot`, `teal`, `lightGray`, `white`, `black`
- [ ] Only `text-primary` / `text-accent` for text colors (where possible)
- [ ] Only `font-sans`, `font-serif`, `font-mono`

### Assets
- [ ] Global assets in `public/` use `/...` paths
- [ ] Local topic/chapter assets use `./assets/...` or `./data/...`
- [ ] All referenced files exist at the referenced path
- [ ] Backgrounds in `public/backgrounds/`
- [ ] Logos in `public/logos/`

### Content
- [ ] Text matches source material (no unintended changes)
- [ ] Single `#` heading per slide (h1 for title)
- [ ] Heading hierarchy makes sense (h1 > h2 > h3)

## Per-File Checks

### Topic files (`slides/<chapter>/<topic>/slides.md`)
- [ ] Topic block is stored in its own chapter-local folder
- [ ] Included via `src:` in a chapter file
- [ ] File is in `slides/<chapter>/<topic>/slides.md`

### Chapter files (`slides/<chapter>/slides.md`)
- [ ] Starts with `layout: chapter` opener
- [ ] Ends with Key Takeaways (`layout: center`, `background: petrol`)
- [ ] Included via `src:` in `slides.md`
- [ ] File is in a chapter folder directly under `slides/`

## New Artifact Checks

### New component (`components/*.vue`)
- [ ] Documented in `docs/custom-components.md`
- [ ] Props table with name, type, required, description
- [ ] Usage example included
- [ ] UnoCSS only (no `<style>` unless keyframe animations)
- [ ] Theme colors and fonts only

### New layout (`layouts/*.vue`)
- [ ] Documented in `docs/custom-layouts.md`
- [ ] Props table with name, type, default, description
- [ ] Slots table included
- [ ] Usage example included
- [ ] Extends theme layout where possible
- [ ] Uses `handleBackground` from theme
- [ ] Has `slidev-layout` class on root element

## Pattern Detection

- [ ] No HTML structure repeated 3+ times (should be a component)
- [ ] Existing components used where they fit (check `docs/custom-components.md`)
- [ ] `LogoRow`/`LogoCard` used for logo grids (not raw `<img>` grids)
- [ ] `Token` used for token displays (not raw `<span>` with colors)

## Severity Guide

| Finding | Level |
|---|---|
| `<style>` block in slide markdown | FAIL |
| Hex color value | FAIL |
| Missing asset file | FAIL |
| Missing component/layout docs | FAIL |
| Orphaned file (not included) | FAIL |
| Export/render failure | FAIL |
| Non-theme Tailwind color | FAIL |
| Relative asset path (`./images/`) | FAIL |
| Repeated pattern not componentized | WARN |
| Existing component not used | WARN |
| Non-theme font reference | WARN |
| Minor layout imbalance | WARN |
| Missing topic intro slide | WARN |
| Image format suboptimal | WARN |
