# Common Components

General-purpose visual components that can be reused across different workshop topics. Use these
components when a recurring visual vocabulary should stay consistent across slides.

## `Token`

Renders a single token as a colored inline span. Color is deterministically assigned based on a
hash of the token string. Whitespace characters are visualized (dots for spaces, arrows for tabs).
Special tokens like `<|endoftext|>` are rendered dimmed.

Use this component whenever a slide talks about a concrete token so token examples have consistent
visual recognition across the deck.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | yes | The token string to display |

**Usage:**

```markdown
The token <Token value="Hello" /> is followed by <Token value=" world" />.
```

## `EmojiStack`

Small vertical wrapper for an emoji plus arbitrary centered content underneath. Useful for
icon-like labels such as requirement categories or control-loop steps.

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
