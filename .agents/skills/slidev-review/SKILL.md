---
name: slidev-review
description: >
  Use this skill to verify and review Slidev slides after they have been created, edited, or
  restructured. This skill MUST be triggered automatically after any slide creation or modification
  performed via the slidev-slide or slidev-migrate skills. It can also be triggered explicitly
  when the user asks to "review", "verify", "check", "pruefen", or "kontrollieren" slides.
  Trigger whenever the user mentions "review slides", "check my slides", "verify rendering",
  "Folien pruefen", "Slide QA", or after any conversation turn where slide markdown files were
  modified. Even if the user doesn't ask for a review -- if slides were just created or changed,
  run this review automatically before considering the task complete.
---

# Slidev Slide Review

This skill verifies that slides render correctly, follow project conventions, and maintain
content integrity. It produces a structured checklist with pass/warn/fail ratings per criterion.

The review serves two purposes: catching rendering problems early (before the user sees a broken
slide in a presentation), and enforcing the project's code quality standards so the slide codebase
stays maintainable as it grows.

## When to run

- **Automatically** after creating or modifying any slide content (topic files, chapter files,
  layouts, or components). The review is the final step before reporting completion to the user.
- **Explicitly** when the user asks you to review, verify, or check slides.
- **On migration** after converting reference material into Slidev markdown.

## Review workflow

### 1. Identify what changed

Determine which files were created or modified in this session. This scopes the review to only
the relevant slides, components, and layouts -- you don't need to review the entire deck every
time.

Categorize the changes:

| Change type | What to review |
|---|---|
| Slide markdown (topics, chapters) | Steps 2-7 |
| New or modified component | Steps 2-4, 6, 8 |
| New or modified layout | Steps 2-4, 6, 9 |
| Asset changes (images, logos) | Steps 2, 5 |

### 2. Visual verification via PNG export

Export changed slides as PNG to verify they render correctly. This step is required when
**layout, images, styling, or component usage** changed. For pure text-only edits (fixing a
typo in a bullet point), you can skip the export and note it in the checklist.

#### Determine slide numbers

Use the slidev-slide helper script to find global slide numbers. It uses Slidev's own parser and
resolves `src:` includes, so prefer it over manual counting:

```bash
node .agents/skills/slidev-slide/scripts/find-slide-numbers.mjs --file slides/03-designing-efficient-architecture/decision-making/slides.md
node .agents/skills/slidev-slide/scripts/find-slide-numbers.mjs --range --match "Explore Options"
```

Script reference:
[`../../../.agents/skills/slidev-slide/scripts/find-slide-numbers.mjs`](../../../.agents/skills/slidev-slide/scripts/find-slide-numbers.mjs)

Use the printed numbers or compact range for PNG export.

#### Export as PNG

```bash
npx slidev export --format png --range <start>,<end> --output tmp/review-<descriptive-name>
```

This creates numbered PNG files in `tmp/review-<descriptive-name>/`. The export uses
`playwright-chromium` (installed as devDependency) for headless rendering.

If the export fails, that itself is a review finding (fail: "Slide does not render").

#### Visual inspection

Open and inspect each exported PNG. Check:

- Layout renders as expected (no overlapping elements, correct column splits)
- Text is readable and not cut off or overflowing
- Images appear and are properly sized (no broken image placeholders)
- Colors match the theme (petrol, apricot, teal, lightGray)
- Fonts render correctly (Mark Pro for sans, Freight Text for serif headings)
- Spacing looks balanced (not too cramped, not too empty)

#### Reference image comparison

If a reference image exists for the slide (e.g., from a migration source in
`verification-screenshots/` or provided by the user):

1. Export the slide as PNG (see above)
2. Compare the exported PNG against the reference image
3. Note significant differences: missing content, wrong layout, shifted elements, color mismatches
4. Minor rendering differences (anti-aliasing, sub-pixel shifts) are acceptable

### 3. Content integrity check

Verify that slide content matches its source material and hasn't been inadvertently altered.

- **Text fidelity**: If the slide was created from existing content (docs/, reference material,
  user-provided text), compare the slide text against the source. Flag any unintended changes --
  missing bullet points, altered wording, dropped content.
- **Heading hierarchy**: Slides should use h1 (`#`) for the main title and h2-h3 for structure.
  Multiple h1 headings on a single slide are usually wrong.
- **Slide separator**: Every slide must start with `---`. Missing separators merge slides.
- **Frontmatter validity**: Check that YAML frontmatter is well-formed. Layout names must match
  existing layouts (theme or project). Props must be valid for the chosen layout -- read
  `docs/custom-layouts.md` and `node_modules/slidev-theme-innoq/README.md` if unsure.

### 4. Styling compliance

The project enforces strict styling rules to keep slides maintainable and visually consistent.

#### No custom CSS (FAIL)

Slides must not contain `<style>` blocks or inline `style=""` attributes. All styling must use
UnoCSS utility classes (Tailwind-compatible syntax). This rule is strict because:

- UnoCSS classes are scannable and consistent across the project
- `<style>` blocks can leak across slides and cause hard-to-debug issues
- The theme already provides comprehensive styling for all standard elements

If you find a `<style>` block, determine whether the styling can be achieved with UnoCSS classes
and flag it as a FAIL with a suggested replacement. The only acceptable exception is keyframe
animations that UnoCSS genuinely cannot express -- and even then, it should be in a component,
not in a slide markdown file.

#### Theme colors only (FAIL)

Only these color names are allowed: `petrol`, `apricot`, `teal`, `lightGray`, `white`, `black`.
For text: `text-primary`, `text-accent` (adaptive to background).

Flag any:
- Arbitrary hex values (`#004153`, `#ff9c66`, `#ffffff`)
- Tailwind default colors (`text-blue-500`, `bg-gray-200`)
- CSS color names (`color: red`)
- RGB/HSL values

Even if the hex value matches a theme color, use the name instead. This ensures the theme can
evolve without breaking slides.

#### Theme fonts only (WARN)

Only `font-sans` (Mark Pro), `font-serif` (Freight Text), `font-mono` (Hack) are allowed.
Flag any explicit `font-family` declarations or non-theme font references.

### 5. Asset validation

- **Path format**: Global assets from `public/` use absolute paths (`/logos/foo.svg`), while
  chapter-local and topic-local assets use relative paths (`./assets/foo.png`, `./data/foo.ts`)
- **File exists**: Verify that every referenced image/logo/background/data file actually exists in
  its referenced location
- **Correct directory**: Assets should be in the right subdirectory:
  - `public/backgrounds/` for slide backgrounds
  - `public/logos/` for logos and icons
  - `public/videos/` for videos
  - `slides/<chapter>/assets/` for chapter-local images
  - `slides/<chapter>/<topic>/assets/` for topic-local images
  - `slides/<chapter>/<topic>/data/` for topic-local data
- **Image format**: Prefer `.webp` for backgrounds, `.svg` for logos, `.png` for screenshots

### 6. Component and pattern reuse

Scan the changed slides for repeated visual patterns that should be extracted into reusable
components.

- **Repeated markup**: If the same HTML/markdown structure appears 3+ times across slides
  (e.g., a card pattern, a feature list with icons), it should be a Vue component in
  `components/`.
- **Existing components**: Check `docs/custom-components.md` for components that already solve
  the pattern. Using raw HTML when a component exists is a WARN.
- **Component conventions**: If a new component was created, verify it follows the project
  conventions from `docs/custom-components.md`:
  - File name matches component name (PascalCase)
  - Props for simple data, slots for rich content
  - UnoCSS classes only (no `<style>` blocks unless keyframe animations)
  - Theme colors and fonts only

### 7. Project structure compliance

- **File location**: Chapter files go in `slides/<chapter>/slides.md`, topic files go in
  `slides/<chapter>/<topic>/slides.md`. No chapter slide content directly in `slides/` root.
- **Include chain**: New files must be included via `src:` frontmatter in the appropriate parent
  file. An orphaned topic file that isn't included anywhere is a FAIL.
- **Include path format**: `src:` paths use relative references (`./topic-name/slides.md` from a
  chapter file, `./slides/chapter-name/slides.md` from `slides.md`).
- **Topic structure**: Topic files should represent self-contained topic blocks inside a chapter.
- **Chapter structure**: Chapter files should start with `layout: chapter` and end with a
  Key Takeaways slide (`layout: center`, `background: petrol`).

### 8. Component documentation check

If a **new component** was created in `components/`:

1. Read `docs/custom-components.md`
2. Verify the new component is documented there with:
   - Component name and description
   - Props table (name, type, required, description)
   - Slots table (if applicable)
   - Usage example in markdown
3. If documentation is missing, flag as FAIL with the instruction to add it

### 9. Layout documentation check

If a **new layout** was created in `layouts/`:

1. Read `docs/custom-layouts.md`
2. Verify the new layout is documented there with:
   - Layout name and description
   - Props table (name, type, default, description)
   - Slots table
   - Usage example in markdown
3. If documentation is missing, flag as FAIL with the instruction to add it

## Output format

Present the review as a structured checklist. Group findings by the slide/file they apply to.
Use these severity levels:

| Level | Meaning | Action required |
|---|---|---|
| PASS | Criterion met | None |
| WARN | Minor issue or suggestion | Recommended fix, not blocking |
| FAIL | Rule violation or rendering problem | Must be fixed before task is complete |

### Checklist template

```
## Slide Review: [descriptive name or file path]

### Visual Rendering
- [PASS/WARN/FAIL] Layout renders correctly
- [PASS/WARN/FAIL] Text readable, not cut off
- [PASS/WARN/FAIL] Images render correctly
- [PASS/WARN/FAIL] Colors match theme
- [PASS/SKIP] Reference image comparison (if applicable)

### Content Integrity
- [PASS/WARN/FAIL] Text matches source material
- [PASS/WARN/FAIL] Heading hierarchy correct
- [PASS/WARN/FAIL] Slide separators present
- [PASS/WARN/FAIL] Frontmatter valid

### Styling Compliance
- [PASS/FAIL] No custom CSS / <style> blocks
- [PASS/FAIL] Theme colors only (no hex/arbitrary values)
- [PASS/WARN] Theme fonts only

### Assets
- [PASS/FAIL] All referenced files exist
- [PASS/WARN] Correct directory structure
- [PASS/WARN] Absolute paths from public root

### Code Quality
- [PASS/WARN] No repeated patterns (should be components)
- [PASS/WARN] Existing components used where applicable
- [PASS/FAIL] New components documented (if applicable)
- [PASS/FAIL] New layouts documented (if applicable)

### Project Structure
- [PASS/FAIL] Files in correct directories
- [PASS/FAIL] Include chain intact
- [PASS/WARN] Follows topic/chapter conventions

### Summary
- Total: X checks
- Passed: X | Warnings: X | Failed: X
- Overall: PASS / NEEDS FIXES
```

Adapt the checklist to the actual changes -- skip sections that don't apply (e.g., skip
"Component documentation" if no new components were created). But always include Visual
Rendering and Styling Compliance for any slide change.

## Handling failures

If the review finds FAIL items:

1. Fix all FAIL items immediately (you have the context and the tools)
2. Re-export and re-verify the fixed slides
3. Update the checklist to reflect the fixes
4. Only report the task as complete when all FAIL items are resolved

WARN items should be mentioned to the user with a recommended fix, but they don't block
task completion. The user decides whether to address them.

## Reference files

For detailed information about project conventions, read these files as needed during review:

- `docs/custom-components.md` -- Component documentation and conventions
- `docs/custom-layouts.md` -- Layout documentation and conventions
- `node_modules/slidev-theme-innoq/README.md` -- Theme layout reference (props, slots, examples)
- `node_modules/slidev-theme-innoq/uno.config.ts` -- Theme color definitions and UnoCSS config
