# Custom Layouts

This project extends the InnoQ Slidev theme with project-specific layouts. Place `.vue` files
in the `layouts/` directory and reference them via `layout:` in slide frontmatter.

For the full list of **theme layouts** (cover, default, center, two-cols, content-with-image,
sidebar, image-caption, comparison, quote, multi-col), read:

```
node_modules/slidev-theme-innoq/README.md
```

## Conventions for new layouts

- **File name = layout name**: `tool-showcase.vue` becomes `layout: tool-showcase`
- Extend theme layouts when possible. Import the base layout from the theme:
  ```js
  import Center from 'slidev-theme-innoq/layouts/center.vue'
  ```
- Use the theme's `handleBackground` utility for background handling:
  ```js
  import { handleBackground } from 'slidev-theme-innoq'
  const style = computed(() => handleBackground(props.background))
  ```
- **Props** for configuration that goes in frontmatter (background, numbers, URLs).
- **Slots** for content areas that the slide author fills with markdown.
  - Use the default slot for the main content area.
  - Use named slots (`::slotname::` in markdown) for secondary content areas.
- **UnoCSS utility classes** for styling. Theme colors only.
- Add the `slidev-layout` class to the root element for consistent padding/sizing.

## Existing layouts

### `chapter`

Chapter opener slide. Displays a centered card with the chapter number and title on a petrol
background with shadow.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `string` | `'petrol'` | Background color or image path |
| `no` | `number` | -- | Chapter number (displayed as "Chapter N") |

**Slots:**

| Slot | Description |
|------|-------------|
| default | Chapter title (rendered inside the centered card) |

**Usage:**

```markdown
---
layout: chapter
no: 2
background: /backgrounds/4.webp
---

# Requirements with Generative AI
```

### `intro`

Topic or sub-topic title card. Extends the theme's `center` layout. Shows an optional kicker
line above the main content, rendered in serif italic with accent color.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `string` | `'apricot'` | Background color or image path |
| `kicker` | `string` | -- | Optional kicker text (alternative to the kicker slot) |

**Slots:**

| Slot | Description |
|------|-------------|
| default | Main content (title, subtitle) |
| kicker | Override kicker area with custom content |

**Usage (petrol = topic intro):**

```markdown
---
layout: intro
background: petrol
---

### *Let's talk about*
# Topic Title
```

**Usage (apricot = sub-topic intro):**

```markdown
---
layout: intro
background: apricot
---

### *Use Agents to generate*
# Sub-Topic Title
```

The `### *italic text*` pattern inside the default slot is a project convention. The theme
renders `<em>` inside headings in serif italic with accent color, which achieves the same
visual effect as the `kicker` prop.

### `demo`

Demo reference slide. Extends the theme's `center` layout. Shows a kicker line, a laptop
emoji, and an optional link.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `string` | `'apricot'` | Background color or image path |
| `kicker` | `string` | `'Demo'` | Kicker text above the emoji |
| `link` | `string` | -- | Optional URL displayed below the emoji |

**Slots:**

| Slot | Description |
|------|-------------|
| default | Additional content below the link |

**Usage:**

```markdown
---
layout: demo
link: https://play.grafana.org/dashboards
---

# Grafana MCP

https://github.com/grafana/mcp-grafana
```
