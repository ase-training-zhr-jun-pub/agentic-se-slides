---
name: slidev-slide
description: >
  Use this skill whenever slides, presentations, or slide content needs to be created, edited, or
  restructured in this Slidev project. This includes: creating new slides or topic files, adding
  chapters, choosing layouts, writing slide markdown, placing images, adjusting slide structure,
  composing content-with-image or comparison slides, adding intro or sidebar slides, editing
  existing slide content, reordering topics within chapters, or exporting slides for review.
  Trigger whenever the user mentions "slide", "Folie", "topic", "chapter", "Kapitel", "layout",
  "presentation", "Praesentation", or wants to add/change visual content in the deck -- even if
  they don't explicitly say "Slidev".
---

# Slidev Slide Creator

This skill helps create and manage slides in an InnoQ Slidev presentation project. The project
uses a modular structure where content is split into **chapters** and **topics**, styled
exclusively with the InnoQ theme and UnoCSS utility classes.

## Workflow

Follow these steps when creating or editing slides:

### 1. Understand the content

Before picking a layout, get clear on what the slide needs to communicate:

- What is the key message?
- Is it a title/intro slide, a content slide with bullet points, a comparison, a demo reference,
  an image showcase, or an exercise prompt?
- How much text is needed? Does it pair with an image or logo?
- **What language should the slide content be in?** If the user hasn't specified, ask them.
  Look at the existing slides in the project for orientation -- if they are consistently in one
  language, suggest that language, but let the user decide.

### Project-specific update patterns

- If the user asks to update the trainer slide, read `references/trainer-slide-update.md`
  before editing.
- Follow that reference for the data source, matching rules, and the target fields to update.

### 2. Choose the right layout

Read the theme documentation to understand all available layouts:

```
node_modules/slidev-theme-innoq/README.md
```

This file documents every layout with props, slots, and examples. Read it before choosing a
layout -- don't guess from the layout name alone.

This project also has custom layouts and components beyond what the theme provides. Read them
before building slides from scratch:

- `docs/custom-layouts.md` -- Project-specific layouts (`chapter`, `intro`, `demo`, and any
  added during migration). Documents props, slots, and usage examples.
- `docs/custom-components.md` -- Reusable Vue components available in all slides (e.g., `Token`,
  `TokenPrediction`). Documents props and usage examples.

The key insight when choosing layouts: look at what **content structure** a layout enables, not
just its label. For example, `sidebar` is not only for "sidebars" -- it works great when you have
a heading + main content and want to show a short tag-phrase or accent text on the side.

Here is a quick reference of all available layouts:

#### Theme Layouts (from `slidev-theme-innoq`)

| Layout | Best for | Key props |
|---|---|---|
| `cover` | Title/cover slide with background image | `background` / slots: `header`, `author` |
| `default` | Standard content with headings + bullets | `background`, `alignContent` |
| `center` | Centered statements, images, quotes | `background` |
| `two-cols` | Side-by-side content (50/50) | `leftBackground`, `rightBackground`, `alignContent` |
| `content-with-image` | Text left (8/12) + image right (4/12) | `image`, `imageFit`, `alignContent` |
| `sidebar` | Main content + accent phrase on the side | `sidebarBackground`, `sidebarSide`, `image`, `alignContent` |
| `image-caption` | Full background image + caption box | `background` (required), `captionBackground`, `position` |
| `comparison` | Structured comparison with header auto-detection | `leftBackground`, `rightBackground`, `leftBodyBackground`, `rightBodyBackground`, `badge` / slots: `left`, `right`, `footer` |
| `quote` | Quote with author and optional image | `image` / slots: `quote`, `author` |
| `multi-col` | Flexible multi-column grid | slots: `header`, `default` |

#### Project-specific Layouts (from `layouts/`)

| Layout | Best for | Key props |
|---|---|---|
| `chapter` | Chapter opener slide (centered card with chapter number) | `background` (default: `petrol`), `no` (chapter number) |
| `intro` | Topic or sub-topic title card | `background` (default: `apricot`), `kicker` |
| `demo` | Demo reference slide with laptop emoji | `background` (default: `apricot`), `kicker` (default: `Demo`), `link` |

### 3. Write the slide markdown

Slides are plain markdown with YAML frontmatter. Each slide is separated by `---`.

#### Frontmatter

Slides that use anything other than the `default` layout need a frontmatter block specifying the
layout. For `default` layout slides, the frontmatter is optional -- Slidev uses `default`
implicitly when no layout is specified. A simple content slide can look like this:

```markdown
---

# Slide Title

- Bullet one
- Bullet two
```

For any other layout, specify it explicitly in the frontmatter:

```yaml
---
layout: center
background: petrol
---
```

Additional frontmatter props depend on the layout (see the table above and theme README).

#### Styling rules

- **Use only UnoCSS utility classes** (same syntax as Tailwind CSS) for any custom styling.
  Never write custom `<style>` blocks or inline CSS.
- **Use only theme colors**: `petrol`, `apricot`, `teal`, `lightGray`, `white`, `black`.
  For text: `text-primary` (adapts to background), `text-accent` (contrast highlight).
- **Use only theme fonts**: The theme provides `font-sans` (Mark Pro), `font-serif`
  (Freight Text), and `font-mono` (Hack). Heading emphasis uses `font-serif italic`.
- The theme's global styles already handle headings (h1=5xl, h2=4xl, etc.), list bullets
  (apricot dots), tables, and links. Rely on these defaults.

#### Content patterns from existing slides

**Topic intro slide** (petrol background, used to open a new topic):
```markdown
---
layout: intro
background: petrol
---

### *Let's talk about*
# Topic Name
```

**Sub-topic intro** (apricot background, used for sections within a topic):
```markdown
---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Sub-Topic Name
```

The `### *italic kicker*` + `# Title` pattern is a convention in this project. The kicker uses
an italic `<em>` inside an h3, which the theme renders in serif font with accent color.

**Standard content slide** (no frontmatter needed -- `default` layout is implicit):
```markdown
---

# Slide Title

- Bullet point one
- Bullet point two
- Bullet point three
```

**Content with image**:
```markdown
---
layout: content-with-image
image: /logos/some-logo.svg
imageFit: contain
---

# Title

- Point one
- Point two
```

**Sidebar with accent text**:
```markdown
---
layout: sidebar
alignContent: center
---

### Question one?
### Question two?

::sidebar::

### Short *accent phrase*
```

**Comparison slide**:
```markdown
---
layout: comparison
leftBackground: petrol
rightBackground: apricot
leftBodyBackground: white
rightBodyBackground: white
badge: vs.
---

::left::
# Option A
- Point one
- Point two

::right::
# Option B
- Point one
- Point two
```

The comparison layout auto-detects the first heading in each column and uses it as the header
(shown on the colored background). The body area below contains the rest of the content.
By default, the body inherits the header's background color -- set `leftBodyBackground` and
`rightBodyBackground` to `white` for readable content areas with colored headers.

**Exercise slide** (simple centered prompt):
```markdown
---
layout: center
---

## Chapter X -- Exercise N
```

**Chapter opener**:
```markdown
---
layout: chapter
no: 2
background: /backgrounds/4.webp
---

# Chapter Title
```

**Key Takeaways** (closing a chapter):
```markdown
---
layout: center
background: petrol
---

## Chapter X -- Key Takeaways

- Takeaway one
- Takeaway two
```

### 4. Place assets correctly

Use the smallest sensible scope for assets:

| Asset type | Directory | Example reference in markdown |
|---|---|---|
| Slide backgrounds | `public/backgrounds/` | `/backgrounds/4.webp` |
| Logos & icons | `public/logos/` | `/logos/some-tool.svg` |
| Videos | `public/videos/` | `/videos/demo.mp4` |
| Chapter-local images | `slides/<chapter>/assets/` | `./assets/chapter-diagram.png` |
| Topic-local images | `slides/<chapter>/<topic>/assets/` | `./assets/topic-diagram.png` |
| Topic-local data | `slides/<chapter>/<topic>/data/` | `./data/example.ts` |

- Use absolute paths for deck-wide reusable assets in `public/`
- Use relative paths for chapter-local and topic-local assets/data that belong to a single content block

### 5. Integrate into the project structure

The project organizes content in three levels:

```
slides.md                                # Main entry -- includes chapters via src:
  slides/01-basics/slides.md             # Chapter files -- include topics when needed
    slides/01-basics/foundation-models/slides.md
```

#### Creating a new topic file

1. Create the file in `slides/<chapter>/<topic-name>/slides.md`
2. Start with a `layout: intro` slide (petrol background) as the topic title card
3. Add content slides after the intro
4. Include the topic in its chapter file via `src:` frontmatter:

```markdown
---
src: ./<topic-name>/slides.md
---
```

#### Creating a new chapter

1. Create the folder `slides/XX-<chapter-name>/`
2. Create the chapter file `slides/XX-<chapter-name>/slides.md`
3. Start with a `layout: chapter` slide (use `no:` for chapter number, `background: /backgrounds/4.webp`)
4. Include topic files via `src:` references relative to the chapter file (`./<topic>/slides.md`) when the chapter has multiple self-contained topics
5. End with a Key Takeaways slide (`layout: center`, `background: petrol`)
6. Keep small chapters with only one topic flat and place the content directly in `slides/XX-<chapter-name>/slides.md`
7. Include the chapter in `slides.md` via:

```markdown
---
src: ./slides/XX-<chapter-name>/slides.md
---
```

Place the `src:` include in the correct order among existing chapter includes.

#### Adding slides to an existing topic or chapter

When adding individual slides to an existing file, just insert the new `---` separated slide
block at the appropriate position within that file. Respect the existing flow: intros come
first, content slides follow, exercises at the end.

#### Finding global slide numbers

Use [`scripts/find-slide-numbers.mjs`](scripts/find-slide-numbers.mjs) when you need global
Slidev numbers for export or review. The script uses Slidev's own parser and resolves `src:`
includes, so prefer it over manual counting.

```bash
node .agents/skills/slidev-slide/scripts/find-slide-numbers.mjs decision-making
node .agents/skills/slidev-slide/scripts/find-slide-numbers.mjs --file slides/03-designing-efficient-architecture/decision-making/slides.md
node .agents/skills/slidev-slide/scripts/find-slide-numbers.mjs --range --match "Explore Options"
```

### 6. Review and verify

After creating or modifying slides, **always run the `slidev-review` skill** to verify the
result. The review skill performs a comprehensive check including PNG export, visual verification,
styling compliance, asset validation, documentation checks, and more. Do not consider the task
complete until the review passes.

The review skill will:
- Export changed slides as PNG and visually inspect them
- Verify no custom CSS or non-theme colors were introduced
- Check that all referenced assets exist
- Ensure new components/layouts are documented
- Validate project structure and include chains
- Produce a structured pass/warn/fail checklist

If the review finds FAIL items, fix them and re-run the review before reporting completion.

## Important conventions

- **Language**: Ask the user which language the slide content should be in. If not specified,
  check the existing slides in the project for the predominant language and suggest it.
- **Frontmatter**: Only required when using a layout other than `default`. Simple content slides
  with just headings and bullets don't need a frontmatter block -- Slidev defaults to `default`.
- **No custom CSS**: All styling through UnoCSS utility classes only. Never add `<style>` blocks.
- **Theme colors only**: Use named colors `petrol`, `apricot`, `teal`, `lightGray`, `white`,
  `black`. Never use arbitrary hex values like `#ffffff` or `#004153` -- always use the theme
  color names instead. This applies to backgrounds, text colors, and any other color property.
- **Theme fonts only**: `font-sans` (Mark Pro), `font-serif` (Freight Text), `font-mono` (Hack)
- **`text-primary` / `text-accent`**: Use these semantic classes -- they auto-adapt to the
  slide's background color. Prefer them over explicit color classes.
- **Heading emphasis**: Use `*italic*` in headings (the theme renders `<em>` in headings as
  serif italic with accent color)
- **Backgrounds**: Use `/backgrounds/4.webp` as default chapter/cover background. Other numbered
  backgrounds (1-7) are available in `public/backgrounds/`.
- **Separator**: Every slide starts with a `---` separator followed by frontmatter
