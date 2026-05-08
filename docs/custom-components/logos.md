# Logo Components

Use `LogoRow` and `LogoCard` together to show model, vendor, or tool logos in balanced rows. Prefer
these components over hand-built grids when a slide presents multiple logos.

## `LogoRow`

Container for `LogoCard` components that arranges logos in a single horizontal row. Uses CSS Grid
with `grid-flow-col` and `auto-cols-fr` (the same approach as the `multi-col` layout from the
InnoQ theme) to create equally-sized columns automatically.

**Props:** None

For multiple rows, use multiple `<LogoRow>` instances. Add `class="h-full"` if the row should fill
the available vertical space.

## `LogoCard`

A single logo card for use inside `<LogoRow>`. Displays a logo (via slot), a bold name, and an
optional muted subtitle. The logo is visually centered using the `VisualCenter` component from the
InnoQ theme: the logo sits at the optical center with equal space above and below, and the
name/subtitle appear underneath.

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

Text lines use `whitespace-nowrap` so they can extend beyond the logo width. This keeps
logo-center-to-logo-center spacing equal regardless of text length.

## Examples

### Single row

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

### Multiple rows

Use multiple `<LogoRow>` instances instead of a custom grid when the slide needs a 2xN logo layout.

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
