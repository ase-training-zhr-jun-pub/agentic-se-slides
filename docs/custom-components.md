# Custom Components

This project provides reusable Vue components that are automatically available in all slides.
Place `.vue` files in the `components/` directory and use them directly in slide markdown
without importing.

## Conventions for new components

- **File name = component name**: `LogoCard.vue` becomes `<LogoCard />`
- **Props over slots** for simple data (text, URLs). Use slots for rich/nested content.
- **UnoCSS utility classes** for all styling. No `<style>` blocks unless absolutely necessary
  (e.g., keyframe animations that UnoCSS can't express).
- **Theme colors only**: `petrol`, `apricot`, `teal`, `lightGray`, `white`, `black`.
  Use `text-primary` / `text-accent` for adaptive colors.
- **Theme fonts**: `font-sans` (Mark Pro), `font-serif` (Freight Text), `font-mono` (Hack).
- Keep components focused on a single visual pattern. If a component gets complex, consider
  whether it should be a layout instead.

## Existing components

### `Token`

Renders a single token as a colored inline span. Color is deterministically assigned based on
a hash of the token string. Whitespace characters are visualized (dots for spaces, arrows for
tabs). Special tokens like `<|endoftext|>` are rendered dimmed.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | yes | The token string to display |

**Usage:**

```markdown
The token <Token value="Hello" /> is followed by <Token value=" world" />.
```

### `TokenPrediction`

Interactive next-token prediction visualization. Shows a growing token sequence on the left
and a candidate probability table on the right. Uses Slidev's `$clicks` for step-by-step
reveal and the View Transitions API for smooth animations between steps.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `steps` | `Step[]` | yes | Array of prediction steps |

Each `Step` has:
- `token: string` -- the token added to the sequence at this step
- `candidates: [string, number][]` -- array of `[token, probability]` tuples for the prediction table

The first candidate at step N must match the token at step N+1 (it's the one that gets "selected").

**Usage:**

```markdown
---
clicks: 6
---

<TokenPrediction :steps="[
  { token: 'The', candidates: [[' sky', 0.35], [' cat', 0.28], [' end', 0.15]] },
  { token: ' sky', candidates: [[' is', 0.55], [' was', 0.18], [' line', 0.10]] },
  { token: ' is', candidates: [['clear', 0.65], [' blue', 0.19], [' dark', 0.06]] },
]" />
```

### `ContextWindowAnimation`

Animated token flow visualization for the context window concept. Tokens flow upward
continuously. A grayscale zone at the top fades out older tokens, while a teal border marks
the active context window below.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tokens` | `string[]` | (required) | Array of token strings to cycle through |
| `speed` | `number` | `10` | Tokens added per second |
| `prefill` | `number` | `500` | Number of tokens to pre-fill the container with |
| `keepMinimum` | `number` | `400` | Minimum tokens to keep before pruning from the front |

**Usage:**

```markdown
<ContextWindowAnimation :tokens="tokenData" :speed="12" />
```

Where `tokenData` is imported from a data file (e.g., `slides/data/context-window-tokens.ts`).

### `Counter`

Simple +/- counter widget. This is a Slidev starter template example and not used in the
workshop content.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Initial counter value |

**Usage:**

```markdown
<Counter :count="10" />
```
