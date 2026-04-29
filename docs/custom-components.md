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

## Component Index

| Component | Category | Details |
|-----------|----------|---------|
| `AgentChat` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#agentchat) |
| `ChatUser` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#chatuser) |
| `ChatAgent` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#chatagent) |
| `ChatTool` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#chattool) |
| `ChatSkill` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#chatskill) |
| `ChatTask` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#chattask) |
| `ChatInput` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#chatinput) |
| `Typewriter` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#typewriter) |
| `AsciiSpinner` | Agent Chat | [Agent Chat](./custom-components/agent-chat.md#asciispinner) |
| `Token` | Common | [Common](./custom-components/common.md#token) |
| `EmojiStack` | Common | [Common](./custom-components/common.md#emojistack) |
| `Line` | Drawings | [Drawings](./custom-components/drawings.md#line) |
| `ArcLine` | Drawings | [Drawings](./custom-components/drawings.md#arcline) |
| `CurveLine` | Drawings | [Drawings](./custom-components/drawings.md#curveline) |
| `LogoRow` | Logos | [Logos](./custom-components/logos.md#logorow) |
| `LogoCard` | Logos | [Logos](./custom-components/logos.md#logocard) |
| `TokenPrediction` | Special Purpose | [Special Purpose](./custom-components/special-purpose.md#tokenprediction) |
| `ContextWindowAnimation` | Special Purpose | [Special Purpose](./custom-components/special-purpose.md#contextwindowanimation) |
| `Timetable` | Special Purpose | [Special Purpose](./custom-components/special-purpose.md#timetable) |
| `Counter` | Special Purpose | [Special Purpose](./custom-components/special-purpose.md#counter) |
