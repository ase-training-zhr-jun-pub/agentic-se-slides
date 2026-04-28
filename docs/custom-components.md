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

### `EmojiStack`

Small vertical wrapper for an emoji plus arbitrary centered content underneath. Useful for icon-like
labels such as requirement categories or control-loop steps.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Canonical `node-emoji` name used to resolve the emoji (for example `"brain"` or `"page_facing_up"`) |
| `emoji` | `string` | - | Direct emoji override, useful when passing the character explicitly |
| `size` | `'md' \| 'lg'` | `'md'` | Emoji size preset |

If `name` is invalid and `emoji` is not provided, the component renders `?` so lookup mistakes are
visible in the slide.

**Slots:**

| Slot | Description |
|------|-------------|
| default | Arbitrary centered content below the emoji, such as a heading, paragraph, or both |

**Usage:**

```markdown
<EmojiStack name="eye">
  <p class="my-0 text-xl">Product Vision</p>
</EmojiStack>

<EmojiStack name="brain" size="lg">
  <h3 class="mt-1">Reason</h3>
  <p class="text-sm leading-snug">Analyze situation,<br/>plan next step</p>
</EmojiStack>
```

### `PromptExample`

Renders a short example label followed by a prompt-like mono card. Useful for CLI or comment
prompts shown inside slides.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | yes | Short label shown above the prompt card |
| `prompt` | `string` | yes | Prompt text rendered inside the mono card |

**Usage:**

```markdown
<PromptExample
  label="Example: Merge Request Review"
  prompt="@claude review this merge request"
/>
```

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

### `LogoRow`

Container for `LogoCard` components that arranges logos in a single horizontal row. Uses
CSS Grid with `grid-flow-col` and `auto-cols-fr` (the same approach as the `multi-col`
layout from the InnoQ theme) to create equally-sized columns automatically.

**Props:** None

For multiple rows, use multiple `<LogoRow>` instances. Add `class="h-full"` if the row
should fill the available vertical space.

**Usage:**

```markdown
# Foundation Models

<LogoRow>
  <LogoCard name="GPT" subtitle="OpenAI">
    <img src="/logos/openai.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Claude" subtitle="Anthropic">
    <img src="/logos/claude.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Gemini" subtitle="Google">
    <img src="/logos/gemini.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
</LogoRow>
```

For multiple rows (e.g., 2x3), use two `<LogoRow>` instances:

```markdown
<LogoRow>
  <LogoCard name="Claude Code" subtitle="Anthropic">
    <img src="/logos/claude-code.png" class="h-20 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Gemini CLI" subtitle="Google">
    <img src="/logos/gemini-cli.png" class="h-20 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Amp Code CLI">
    <img src="/logos/amp-code-cli.png" class="h-20 w-auto object-contain" />
  </LogoCard>
</LogoRow>
<LogoRow class="mt-8">
  <LogoCard name="OpenAI Codex CLI">
    <img src="/logos/openai.svg" class="h-20 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="OpenCode" subtitle="SST">
    <img src="/logos/opencode.svg" class="h-20 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="GitHub Copilot CLI">
    <img src="/logos/github-copilot-cli.png" class="h-20 w-auto object-contain" />
  </LogoCard>
</LogoRow>
```

### `LogoCard`

A single logo card for use inside `<LogoRow>`. Displays a logo (via slot), a bold name, and an
optional muted subtitle. The logo is visually centered using the `VisualCenter` component from
the InnoQ theme -- the logo sits at the optical center with equal space above and below, and
the name/subtitle appear underneath.

Each `LogoCard` is independent; names and subtitles are **not** aligned across cards (avoiding
awkward whitespace when only some cards have subtitles).

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | Bold primary label (e.g., `"GPT"`) |
| `subtitle` | `string` | no | Muted secondary label (e.g., `"OpenAI"`) |

**Slots:**

| Slot | Description |
|------|-------------|
| default | The logo image. Typically an `<img>` with `h-32 w-auto object-contain` classes. Full control over sizing via UnoCSS. |

Text lines use `whitespace-nowrap` so they can extend beyond the logo width -- this keeps
logo-center-to-logo-center spacing equal regardless of text length.

**Usage:** See `LogoRow` above. `LogoCard` should always be used inside a `LogoRow`.

### Line Components

The `Line`, `ArcLine`, and `CurveLine` components render SVG lines, arcs, and curves as
absolutely positioned overlays. They are useful for connecting visual elements on a slide
with arrows or decorative paths. All three share a common set of styling props and delegate
rendering to the internal `BaseLine` component.

Coordinates are specified as percentage strings relative to the **parent container**
(e.g., `"50% 30%"`). The parent must have `position: relative` (or `absolute`/`fixed`) so
the SVG overlay positions correctly. The components track the parent's size via
`ResizeObserver` and recompute pixel positions on resize.

**Shared styling props** (available on all three components):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `head` | `Marker` | `'none'` | Marker shape at the end of the line |
| `tail` | `Marker` | `'none'` | Marker shape at the start of the line |
| `color` | `StrokeColor` | `'currentColor'` | Stroke and marker color |
| `strokeWidth` | `number` | `1` | Relative stroke width (scaled ×4 internally) |
| `dashed` | `boolean` | `false` | Render as a dashed line |
| `lineCap` | `LineCap` | `'round'` | SVG `stroke-linecap` value |
| `lineJoin` | `LineJoin` | *(auto)* | SVG `stroke-linejoin`; defaults to `'round'` when `lineCap` is `'round'`, otherwise `'miter'` |

**Marker types** (`Marker`): `'none'`, `'arrow'` (open chevron), `'triangle'` (filled),
`'dot'` (filled circle), `'diamond'` (filled rhombus).

**Color values** (`StrokeColor`): `'currentColor'`, `'petrol'`, `'apricot'`, `'teal'`,
`'lightGray'`, `'white'`, `'black'`.

### `Line`

Straight line between two points.

**Props** (in addition to shared styling props above):

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `start` | `PointValue` | yes | Start point as `"x% y%"` |
| `end` | `PointValue` | yes | End point as `"x% y%"` |

**Usage:**

```markdown
<div class="relative w-full h-full">
  <Line start="20% 30%" end="80% 70%" color="apricot" head="triangle" :stroke-width="1.5" />
</div>
```

### `ArcLine`

Circular arc between two angles around a center point.

**Props** (in addition to shared styling props above):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `PointValue` | *(required)* | Center of the arc as `"x% y%"` |
| `radius` | `RadiusValue` | *(required)* | Radius as `"n%"` relative to the smaller parent dimension |
| `startAngle` | `number` | *(required)* | Start angle in degrees (0° = right, 90° = down) |
| `endAngle` | `number` | *(required)* | End angle in degrees |
| `clockwise` | `boolean` | `false` | Draw the arc clockwise instead of counter-clockwise |

**Usage:**

```markdown
<div class="relative w-full h-full">
  <ArcLine
    center="50% 50%" radius="20%"
    :start-angle="0" :end-angle="270"
    :clockwise="true"
    head="arrow" color="teal"
  />
</div>
```

### `CurveLine`

Smooth curve that passes through an intermediate point. The curve is constructed as two cubic
Bézier segments that meet at `via`, producing a smooth S-shaped or C-shaped path depending on
the relative positions of the three points.

**Props** (in addition to shared styling props above):

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `start` | `PointValue` | yes | Start point as `"x% y%"` |
| `end` | `PointValue` | yes | End point as `"x% y%"` |
| `via` | `PointValue` | yes | Intermediate through-point as `"x% y%"` |

**Usage:**

```markdown
<div class="relative w-full h-full">
  <CurveLine
    start="10% 50%" via="50% 20%" end="90% 50%"
    head="triangle" tail="dot" color="petrol" :stroke-width="1.5"
  />
</div>
```

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
