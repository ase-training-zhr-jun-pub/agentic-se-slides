# Migration Patterns

This reference documents every recurring slide pattern in the project, with full markdown examples
extracted from already-migrated slides. Use these as templates when generating migrated content.

## Topic intro (opens a new topic)

Used as the first slide in every topic file. Petrol background signals "new topic".

```markdown
---
layout: intro
background: petrol
---

### *Let's talk about*
# Topic Title

<!-- Master reference: Chapter N / Slide NNN -->
```

The kicker line (`### *...*`) uses italic inside an h3. It's rendered in serif font with accent
color by the theme. Choose a kicker phrase that introduces the topic naturally:
- `### *Let's talk about*`
- `### *Use Cases for*`
- `### *Let's understand*`

## Sub-topic intro (opens a section within a topic)

Apricot background signals "sub-section". Used when a topic has distinct parts.

```markdown
---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Sub-Topic Title

<!-- Master reference: Chapter N / Slide NNN -->
```

Kicker phrases for sub-topics often start with an action verb:
- `### *Use Agents to generate*`
- `### *Use Agents to evaluate*`
- `### *Use Agents to help with*`
- `### *Use Agents to create*`
- `### *Use Agents to identify*`

## Content slide (standard bullets)

The most common slide type. Since `default` is Slidev's implicit layout, no frontmatter is needed
-- just start with the slide separator and content. Only add frontmatter when you need a specific
layout or props.

```markdown
---

# Slide Title

- First bullet point
- Second bullet point
- Third bullet point

**Example:** An inline example or highlight at the end.

<!-- Master reference: Chapter N / Slide NNN -->
```

## Content with image

Text on the left, image on the right. Good for slides that feature a logo, screenshot, or diagram.

```markdown
---
layout: content-with-image
image: /logos/some-tool.svg
imageFit: contain
---

# Title

- Point one
- Point two
- Point three

<!-- Master reference: Chapter N / Slide NNN -->
```

`imageFit` options: `contain` (full image visible), `cover` (fills the space, may crop).

## Demo slide

References an external demo with a link. Shows a laptop emoji.

```markdown
---
layout: demo
link: https://example.com/demo
---

# Demo Title

https://github.com/some/repo

<!-- Master reference: Chapter N / Slide NNN -->
```

## Exercise slide (in chapter file, not in topic files)

Simple centered exercise prompt. These go directly in the chapter file, not in topic files.

```markdown
---
layout: center
---

## Chapter N -- Exercise M

<!-- Master reference: Chapter N / Slide NNN -->
```

## Key Takeaways (in chapter file, last slide of chapter)

Summarizes the chapter. Goes at the end of the chapter file, after all topic includes.

```markdown
---
layout: center
background: petrol
---

## Chapter N -- Key Takeaways

- First takeaway
- Second takeaway
- Third takeaway

<!-- Master reference: Chapter N / Slide NNN -->
```

## Chapter opener (first slide in chapter file)

```markdown
---
layout: chapter
no: N
background: /backgrounds/4.webp
---

# Chapter Title

<!-- Master reference: Chapter N / Slide NNN -->
```

## Chapter file structure

A complete chapter file follows this pattern:

```markdown
---
layout: chapter
no: 2
background: /backgrounds/4.webp
---

# Requirements with Generative AI

<!-- Master reference: Chapter 2 / Slide 60 -->

---
src: ./agent-assisted-requirements/slides.md
---

---
layout: center
---

## Chapter 2 -- Exercise 1

<!-- Master reference: Chapter 2 / Slide 74 -->

---
src: ./prompting-techniques/slides.md
---

---
src: ./user-journeys/slides.md
---

---
layout: center
background: petrol
---

## Chapter 2 -- Key Takeaways

- First takeaway
- Second takeaway

<!-- Master reference: Chapter 2 / Slide 106 -->
```

Key points:
- Chapter opener comes first
- Topic includes via `src:` are interspersed with exercise slides
- Exercises sit between the topics they follow
- Key Takeaways is always the last slide
- Each `src:` include needs its own `---` fenced block

## Sidebar slide

Main content with an accent phrase on the side.

```markdown
---
layout: sidebar
alignContent: center
---

### Question one?
### Question two?
### Question three?

::sidebar::

### Short *accent phrase*

<!-- Master reference: Chapter N / Slide NNN -->
```

## Comparison slide

Two-column comparison with optional badge. The layout auto-detects the first heading in each
column as the header (shown on the colored background). Set `leftBodyBackground` and
`rightBodyBackground` to `white` so the content area below the headers is readable.

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

<!-- Master reference: Chapter N / Slide NNN -->
```

## Center slide (generic)

For any centered content that isn't an exercise or key takeaway.

```markdown
---
layout: center
---

# Centered Statement

Or an image:

<img src="/images/some-image.png" />

<!-- Master reference: Chapter N / Slide NNN -->
```

## Slides with click animations

For progressive reveal, use `clicks` in frontmatter and `v-click` directives:

```markdown
---
clicks: 3
---

# Progressive Reveal

<div v-click="1">First item appears on click 1</div>
<div v-click="2">Second item appears on click 2</div>
<div v-click="3">Third item appears on click 3</div>

<!-- Master reference: Chapter N / Slide NNN -->
```

Use sparingly -- only when the reference material clearly shows a step-by-step reveal.

## Slide with inline image

When a slide shows an image that isn't suited for `content-with-image` layout (e.g., a full-width
diagram, a meme, or a centered screenshot), use the default layout with an `<img>` tag:

```markdown
---

# Slide Title

<img src="/images/some-diagram.png" class="mx-auto max-h-80" />

<!-- Master reference: Chapter N / Slide NNN -->
```

Use UnoCSS classes to control size and alignment: `mx-auto` centers, `max-h-80` limits height.

## Slide with multiple logos/icons in a row

When the reference shows several logos or icons side by side (e.g., tool comparison, vendor
overview), arrange them in a flex container:

```markdown
---

# Foundation Models

<div class="flex justify-around items-center mt-8 gap-4">
  <div class="text-center">
    <img src="/logos/openai.svg" class="h-16 mx-auto mb-2" />
    <div class="text-sm">GPT</div>
    <div class="text-xs opacity-60">OpenAI</div>
  </div>
  <div class="text-center">
    <img src="/logos/claude.svg" class="h-16 mx-auto mb-2" />
    <div class="text-sm">Claude</div>
    <div class="text-xs opacity-60">Anthropic</div>
  </div>
</div>

<!-- Master reference: Chapter N / Slide NNN -->
```

If logos aren't available as separate files, check `public/logos/` first. If not found, use text
placeholders rather than broken image references.

## Slide with emoji-based layout

Some reference slides use emojis as visual anchors (e.g., a centered emoji with text around it).
Keep the emojis -- they're part of the content:

```markdown
---
layout: center
---

# 👑 Context is King

<!-- Master reference: Chapter N / Slide NNN -->
```

## Slide with two-column content (not comparison)

When a slide has two columns but isn't a formal comparison (no "vs." badge), use `two-cols`:

```markdown
---
layout: two-cols
---

# Left Column Title

- Point one
- Point two

::right::

# Right Column Title

- Point one
- Point two

<!-- Master reference: Chapter N / Slide NNN -->
```

## Slide with sidebar content (labeled sections)

When the reference shows a main content area with a labeled accent section on the side (e.g.,
"What the agent operates on" with a sidebar saying "Environment"):

```markdown
---
layout: sidebar
---

# Environment

- Filesystem (code, configs, docs)
- Version Control (git)
- APIs and Services
- Databases
- Terminal / Shell

::sidebar::

### What the agent *operates on*

<!-- Master reference: Chapter N / Slide NNN -->
```

## Handling complex diagrams

When the reference contains a diagram that can't be easily reproduced in markdown (e.g., a
circular flow diagram, architecture diagram), you have two options:

1. **If the diagram image is available as an embedded image**: Copy it into the nearest sensible
   `assets/` folder (or `public/` if shared deck-wide) and reference it with `<img>`.
2. **If the diagram can be approximated with text**: Use a combination of UnoCSS flex/grid
   layouts and text. Keep it simple -- a readable text approximation is better than a broken
   complex HTML structure.

For circular flow diagrams (like "Reason → Act → Observe"):

```markdown
---
layout: center
---

# The Control Loop

<div class="flex justify-center items-center gap-12 mt-8">
  <div class="text-center">
    <div class="text-4xl">🧠</div>
    <div class="font-bold mt-2">Reason</div>
    <div class="text-sm opacity-70">Analyze situation, plan next step</div>
  </div>
  <div class="text-center">
    <div class="text-4xl">⚡</div>
    <div class="font-bold mt-2">Act</div>
    <div class="text-sm opacity-70">Execute tool, modify environment</div>
  </div>
  <div class="text-center">
    <div class="text-4xl">👁️</div>
    <div class="font-bold mt-2">Observe</div>
    <div class="text-sm opacity-70">Read results, evaluate progress</div>
  </div>
</div>

<!-- Master reference: Chapter N / Slide NNN -->
```

## Using project components and custom layouts

Before writing raw HTML for repeated visual elements, check what's already available:

- `docs/custom-components.md` -- reusable Vue components
- `docs/custom-layouts.md` -- project-specific slide layouts

**Prefer components over inline HTML.** For example, if a `LogoCard` component exists:

Instead of repeating this in every slide:
```html
<div class="text-center">
  <img src="/logos/openai.svg" class="h-20 mx-auto mb-2" />
  <div class="font-bold">GPT</div>
  <div class="text-sm opacity-60">OpenAI</div>
</div>
```

Use the component:
```html
<LogoCard name="GPT" subtitle="OpenAI">
  <img src="/logos/openai.svg" class="h-32 w-auto object-contain" />
</LogoCard>
```

**Prefer custom layouts over complex HTML structures.** If a layout exists that handles a
recurring page structure, use it via frontmatter instead of building it from scratch:

```markdown
---
layout: definition-slide
emoji: "\U0001F44C"
---

# What are prototypes good for?

- **Making Ideas Visible** -- Get early feedback
- **Communication** -- Create shared understanding
```

Components and layouts created during Step 0 (pattern recognition) are documented in the
respective docs files. Always check them before generating slides -- they might already cover
the visual pattern you need.
