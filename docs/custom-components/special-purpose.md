# Special Purpose Components

Components in this file encapsulate specific slide logic or explanation sequences. Use them when
their exact scenario matches the slide. Do not treat them as generic layout or diagram primitives.

## `TokenPrediction`

Interactive next-token prediction visualization. Shows a growing token sequence on the left and a
candidate probability table on the right. Uses Slidev's `$clicks` for step-by-step reveal and the
View Transitions API for smooth animations between steps.

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

## `ContextWindowAnimation`

Animated token flow visualization for the context window concept. Tokens flow upward continuously.
A grayscale zone at the top fades out older tokens, while a teal border marks the active context
window below.

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

## `Timetable`

Renders a two-column workshop timetable from a single start time plus an ordered list of blocks.
Each block computes its own end time from the previous one, so the slide only needs labels,
durations, and optional UnoCSS classes for coloring.

This component is meant for workshop schedule slides, not as a general table component.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `startTime` | `string` | yes | Start time in `HH:mm` format, e.g. `"09:00"` |
| `blocks` | `TimetableSlot[]` | yes | Ordered list of timetable blocks |

Each `TimetableSlot` has:

- `label: string` -- visible block label (e.g. `"Coffee Break"`)
- `duration: number` -- block duration in minutes
- `rowClass?: string` -- optional UnoCSS classes applied to the full row, typically for text color

**Usage:**

```markdown
<Timetable
  startTime="09:00"
  :blocks="[
    { label: 'Block 1', duration: 90, rowClass: 'text-petrol' },
    { label: 'Coffee Break', duration: 15, rowClass: 'opacity-60' },
    { label: 'Lunch', duration: 90, rowClass: 'text-apricot' },
  ]"
/>
```

## `Counter`

Simple +/- counter widget. This is a Slidev starter template example and not used in the workshop
content. Prefer not to use it for new workshop slides.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Initial counter value |

**Usage:**

```markdown
<Counter :count="10" />
```
