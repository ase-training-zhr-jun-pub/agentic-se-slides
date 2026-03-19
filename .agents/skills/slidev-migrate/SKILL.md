---
name: slidev-migrate
description: >
  Use this skill whenever existing slide content (images, text, PDFs, or any reference material)
  needs to be converted into Slidev markdown for this project. This includes: migrating slides from
  other presentation tools, converting reference images into Slidev slides, recreating slides from
  screenshots or photos, translating a corpus of text+images into slide content, or rebuilding
  slides to match a visual reference. Trigger whenever the user mentions "migrate", "migriere",
  "convert slides", "Folien übernehmen", "recreate these slides", "make slides from these images",
  "corpus", or references any folder/file containing source material that should become Slidev
  slides. Also trigger when the user points at reference images and says something like "make it
  look like this" or "rebuild this slide". Even if the user just drops a folder path and says
  "migrate this", use this skill.
---

# Slidev Migration Skill

This skill converts reference material (images, text, or both) into Slidev markdown that matches
the visual and structural conventions of this project. It works with whatever input it gets --
images, extracted text, mixed folders -- and produces slides that look as close to the reference
as possible.

The companion skill `slidev-slide` documents all available layouts, styling rules, and project
conventions. Read it before generating any slides:

```
.agents/skills/slidev-slide/SKILL.md
```

## Workflow

### 0. Recognize patterns and propose components (interactive)

Before generating slide content, scan the reference material for recurring visual patterns
that would genuinely benefit from a reusable component. This step is **interactive** -- you
analyze and propose, the user decides what gets built.

**This step runs once at the start of a migration session**, not for every individual topic.
If you're migrating multiple topics or a full chapter, do this before the first topic.
Skip this step entirely for small migrations (single topic, 2-3 slides).

#### What to scan for

1. **Check what already exists.** Read `docs/custom-components.md` and `docs/custom-layouts.md`
   to know which reusable components and layouts are already available.

2. **Scan all reference images.** Go through every PNG in the reference material. For each
   slide, note its visual pattern type.

3. **Identify genuinely recurring patterns.** Cluster the notes. Look for patterns that appear
   3+ times AND involve non-trivial HTML that would be duplicated across slides.

#### When to propose a component vs. when NOT to

Be conservative. Most visual patterns in presentations can be handled perfectly well with
existing Slidev layouts + standard markdown + a few UnoCSS classes. Only propose a component
when it genuinely reduces duplication of non-trivial markup.

**Good candidates for a component:**
- A logo/icon + label block that appears in rows/grids across multiple slides (each instance
  has the same HTML structure with different data). A component like `<LogoCard>` eliminates
  5-8 lines of repeated HTML per item.

**Good candidates for a layout:**
- A slide type that appears many times with the same visual structure but different data.
  Think of it like a form: the structure is fixed, the values change. If the slide has 3-4
  distinct data fields (e.g., chapter number, exercise number, title, command) that are always
  arranged the same way, a layout with props makes the slide author's life easier and ensures
  every instance looks identical. The existing `demo` layout is a good example: it's just a
  centered slide with an emoji and a link — but because it appears repeatedly, having
  `layout: demo` with `link:` as a prop is cleaner than writing the same markdown each time.

**NOT candidates for a component or layout:**
- A centered statement with emphasis -- that's just `layout: center` + markdown `*italic*`.
  No component needed.
- A sidebar slide with a background image -- the theme's `sidebar` layout already supports
  the `image` prop. No custom layout needed.
- Any pattern that can be achieved with an existing layout + standard markdown formatting
  AND that doesn't have a data-driven structure (no recurring "fill in the blanks" fields).

The two bars to check:
1. **Repeated HTML**: Would a developer say "this repeated HTML block should be a component"?
2. **Repeated structure with different data**: Would a developer say "these 8 slides all have
   the same shape — chapter N, exercise M, title, command — that should be a layout with props"?
If either answer is yes, propose it.

#### Propose, don't build

4. **Present your findings to the user.** Show a table of recurring patterns with:
   - Pattern name and description
   - How many times it appears and on which pages
   - Whether you'd propose a **Component** (reusable element within a slide) or skip it
   - What the component's props would look like
   - An example of how it would simplify the slide markdown

   Let the user decide: "Yes, build this component", "No, just use inline HTML", or
   "I'd change the props like this".

5. **Build only what the user approved.** Create Vue files in `components/` (rarely `layouts/`).
   Follow the conventions in `docs/custom-components.md` and `docs/custom-layouts.md`.

6. **Document.** Add every new component to `docs/custom-components.md` with props and usage
   example. Only add a layout to `docs/custom-layouts.md` if the user explicitly asked for one.

7. **Proceed to Step 1** with the approved component palette.

### 1. Assess the reference material

Start by understanding what you're working with. Look at what was provided:

- **A folder?** List its contents. Look for images (PNG, JPG), text files (MD, TXT), or both.
- **Individual files?** Determine their type and what they contain.
- **Just a verbal description?** Work from that, but ask for more detail if needed.

Categorize what you have:

| What you found | How to use it |
|---|---|
| Page images (full slide screenshots) | Primary visual reference -- your slides should look like these |
| Extracted text with page references | Content source -- use this for slide text, headings, bullet points |
| Embedded/extracted images (logos, diagrams, photos) | Assets to place by scope in chapter/topic `assets/` folders or global `public/` directories |
| Text only, no images | Content source -- generate slides from text, but you can't visually verify |
| Images only, no text | Use vision to read the slide content from the images |

If you have both text and images, the text is your primary content source (faster to work with,
more accurate than OCR), and the images serve as visual reference for layout decisions and
verification.

### 2. Understand the slide structure

Before writing any markdown, study the reference material to understand:

- **How many slides** are in the material?
- **What type** is each slide? (title/intro, content with bullets, image-heavy, exercise, demo, etc.)
- **What's the hierarchy?** Are there topic boundaries, sub-topic sections, exercises?
- **Which slides have images** that need to be carried over as assets?

If the reference material includes a `content.md` or similar index file, read it -- it often
contains per-page text with references to image files, saving you from having to OCR everything.

### 3. Plan the output structure

Based on the project's three-level hierarchy (`slides.md` → `slides/<chapter>/slides.md` → `slides/<chapter>/<topic>/slides.md`),
decide where the migrated content goes:

**For a single topic:**
- Create one folder: `slides/<chapter>/<topic-slug>/`
- Create one file: `slides/<chapter>/<topic-slug>/slides.md`
- Add its `src:` include to the parent chapter file

**For a full chapter:**
- Create the chapter folder: `slides/XX-<chapter-name>/`
- Create the chapter file: `slides/XX-<chapter-name>/slides.md`
- Create topic files for each topic within the chapter
- The chapter file contains: chapter opener + topic `src:` includes + exercise slides (inline) + key takeaways (inline)
- Add the chapter's `src:` include to `slides.md`

**Important structural rule:** Exercise slides and Key Takeaway slides go directly in the
chapter file, not in topic files. Topic files contain only the topic's content slides and
sub-topic intros.

### 4. Generate the Slidev markdown

Before writing raw HTML for visual elements, check if a project component or custom layout
already covers the pattern. Read `docs/custom-components.md` and `docs/custom-layouts.md`.
Prefer using existing components over generating inline HTML -- it ensures visual consistency
across slides and makes future design changes easier (one component to update vs. many slides).

Read the `slidev-slide` skill for the full layout reference. Here's a summary of the patterns
used in this project -- follow these closely for consistency with already-migrated content.

Every migrated slide gets a source reference comment as its last line before the next `---`
separator. This traces the slide back to its origin. Format:

```markdown
<!-- Master reference: Chapter N / Slide NNN -->
```

The "Slide NNN" corresponds to the page number in the source material (e.g., `page-042.png`
means Slide 42).

For the detailed pattern catalog with full examples, read:

```
.agents/skills/slidev-migrate/references/migration-patterns.md
```

**Layout selection guide** -- pick the layout based on what the reference slide looks like:

| Reference slide looks like... | Use layout | Frontmatter needed? |
|---|---|---|
| Big centered title, colored background, section opener | `intro` (petrol for topic, apricot for sub-topic) | Yes |
| Heading + bullet points (standard content) | `default` | No -- this is the implicit default, just omit frontmatter |
| Text on left, image/logo on right | `content-with-image` | Yes |
| Two columns comparing things side by side | `comparison` | Yes |
| Centered short text, statement, or image | `center` | Yes |
| Big chapter number + title | `chapter` | Yes |
| Demo reference with a link | `demo` | Yes |
| Quote with attribution | `quote` | Yes |
| Heading + main content + accent phrase on side | `sidebar` | Yes |
| Two columns but not a comparison | `two-cols` | Yes |

For standard content slides (heading + bullets), don't add any frontmatter -- just the `---`
separator followed by the content. The `default` layout is Slidev's implicit choice when no
layout is specified.

**Handling visually complex slides:**

When reference images show slides that go beyond simple bullets, study the image carefully:

- **Slides with logos/icons in a row**: Use flex containers with `<img>` tags and UnoCSS classes
- **Slides with diagrams**: If the diagram image is available, copy it. If not, approximate with
  text and UnoCSS layout utilities. A readable approximation beats a broken complex layout.
- **Slides with emojis as visual elements**: Keep the emojis, they're intentional content.
- **Slides with comparison layouts** (vs. or side-by-side): Use `comparison` or `two-cols` layout.
- **Slides with sidebar accent text**: Use `sidebar` layout with `::sidebar::` slot.

The migration-patterns reference has templates for all these cases.

### 5. Handle images and assets

When the reference material includes images that should appear in the migrated slides:

1. **Identify relevant images** -- not every extracted image is useful. Skip backgrounds,
   decorative elements, and tiny icons. Focus on diagrams, screenshots, logos, and photos
   that carry meaning.
2. **Place the image by scope**:
   - topic-specific images in `slides/<chapter>/<topic>/assets/`
   - chapter-specific images in `slides/<chapter>/assets/`
   - shared logos/icons in `public/logos/`
   - deck-wide reusable images in `public/images/`
3. **Reference in slides** using relative paths for local assets and absolute paths for global assets.

If you encounter an image that's clearly a logo for a well-known tool, check `public/logos/`
first -- it might already exist in the project.

### 6. Integrate into the project

After generating the slide files:

**For topics:**
1. Verify the chapter file exists. If not, create it.
2. Add `src: ./<topic-name>/slides.md` at the correct position in the chapter file.

**For chapters:**
1. Create the chapter file with:
   - Chapter opener slide (layout: chapter)
   - Topic includes via `src:`
   - Exercise slides inline (layout: center)
   - Key Takeaways slide inline (layout: center, background: petrol)
2. Add `src: ./slides/XX-<name>/slides.md` to `slides.md` in the correct order.

### 7. Review and verify

After migration, **always run the `slidev-review` skill** to verify the result. The review
skill performs a comprehensive check including PNG export, visual verification against reference
images (if available), styling compliance, asset validation, content integrity checks, and more.

The review is especially important after migration because:
- Layout choices may not render as expected
- Text from reference material may have been inadvertently altered
- Asset paths may be incorrect
- The migrated slides need to match the project's styling conventions

Do not consider the migration complete until the review passes. If the review finds FAIL items,
fix them and re-run the review before reporting completion.

## Key principles

- **Fidelity over creativity**: The goal is to reproduce the reference material faithfully, not
  to improve or redesign it. If the original has a bullet list, make a bullet list. If it has a
  diagram, carry the diagram over. Content changes should only happen if the user explicitly asks.

- **Work with what you have**: Don't complain about missing inputs. If you only have images, use
  vision to extract content. If you only have text, make layout decisions based on content
  structure. If you have both, use text for content and images for layout guidance.

- **Consistency with existing slides**: The migrated slides should be indistinguishable in style
  from the already-migrated content. Follow the same patterns, the same layout choices for similar
  content types, the same comment format.

- **Progressive migration**: It's fine to migrate one topic at a time, one chapter at a time, or
  everything at once. The skill works at any granularity. When migrating a full chapter, consider
  using subagents to process multiple topics in parallel.
