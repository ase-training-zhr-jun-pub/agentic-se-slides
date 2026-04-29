# Agent Chat Components

Components for visualizing conversations between a user and an AI agent in a terminal-style
dark theme. They are designed to be composed declaratively and support Slidev's `v-click`
directive for step-by-step reveal during presentations.

All inner components must be placed inside an `<AgentChat>` container, which provides the
dark terminal theme and CSS custom properties for colors.

## Component Roles

| Component | Use when |
|-----------|----------|
| `AgentChat` | Wrapping an entire chat transcript |
| `ChatUser` | Showing a previous user prompt |
| `ChatAgent` | Showing an agent/assistant response |
| `ChatTool` | Showing a tool call and optional result |
| `ChatSkill` | Showing that a skill/plugin was loaded |
| `ChatTask` | Showing delegated subagent work |
| `ChatInput` | Showing the current prompt at the bottom |
| `Typewriter` | Animating typed input, usually inside `ChatInput` |
| `AsciiSpinner` | Showing a running status, usually via `ChatTask` |

## Composition Rules

- Wrap all `Chat*` components in an `AgentChat` container.
- Use `ChatUser` for previous user prompts.
- Use `ChatInput` only once per `AgentChat`, and only as the final element.
- Use `ChatTool` for tool calls; include slot content only when the result should be expandable.
- Use `ChatTask` for delegated subagent work, not for ordinary tool calls.
- Use `Typewriter` inside `ChatInput` when the prompt should appear as if it is being typed.

## Slidev `v-click` support

Each conversation element can be wrapped with `v-click` to reveal messages one by one during a
presentation. Use explicit click indexes when the conversation should move from typed input to
submitted message, running task, completed task, and final answer. `VSwitch` keeps changing states
in the same visual position.

```markdown
<AgentChat text-sm title="Interactive Agent Demo" max-h-100 mt-6>
  <ChatUser v-click="2" mb="1lh">Please inspect the auth flow and summarize the issue.</ChatUser>
  <VSwitch class="mb-[1lh]">
    <template #3>
      <ChatTask agent="explore" description="Inspect auth flow" status="running" collapsed>
      Reading src/auth/login.ts and related tests.
      </ChatTask>
    </template>
    <template #4-6>
      <ChatTask agent="explore" description="Inspect auth flow" status="completed">
      Found a stale comparison in src/auth/login.ts.
      </ChatTask>
    </template>
  </VSwitch>
  <ChatAgent v-click="5" mb="1lh">
    The login check compares against the submitted password directly. It should compare the stored password hash with <strong>hash(pass)</strong>.
  </ChatAgent>
  <ChatInput><Typewriter v-click="[1,2]" text="Please inspect the auth flow and summarize the issue." :speed="28" /></ChatInput>
</AgentChat>
```

Click path:

1. Input text is typed.
2. The typed message appears above the input and input is cleared
3. The delegated task starts running.
4. The running task switches to completed and displays its content
5. The agent answer appears.

### Swapping task state in place with `VSwitch`

Use `VSwitch` when a task should stay in the same visual position while its state changes, for
example from `running` to `completed`. The critical detail is the range of the completed-state
template: always check the number after the dash. It must keep the completed task mounted until the
last click state in the surrounding click path; otherwise the completed task disappears while later
`v-click` elements continue to appear.

If the switch uses an `at` prop, the template numbers are local to the switch. In that case, compare
the effective global end of the range with the last `v-click` on the slide instead of copying that
global click number into the template directly.

## MDC caveat

Slidev uses MDC mode to parse markdown inside Vue component slots. **Blank lines inside a
component's slot content will cause parse errors** because MDC interprets them as paragraph
breaks. Use `<br/>` tags for visual line breaks within a single slot instead:

```markdown
<!-- Wrong: blank line causes parse error -->
<ChatAgent>First paragraph.

Second paragraph.</ChatAgent>

<!-- Correct: use <br/> for breaks -->
<ChatAgent>First paragraph.<br/><br/>Second paragraph.</ChatAgent>
```

## `AgentChat`

Outer container that establishes the terminal window frame, dark color scheme, and monospace
font. All other `Chat*` components must be placed inside this container.

Control the text size from outside via UnoCSS utility classes on the container, such as
`text-sm`, `text-xs`, or another project utility that fits the available slide space.

If the conversation content is taller than available space, add a `max-h-*` utility class on the
container. The body area is scrollable and will not overflow.

**Spacing between chat lines** must be managed manually in the slide. The components have no
built-in vertical gap because the right grouping depends on the specific conversation shown and
cannot be derived from the element types alone. Prefer `lh` units for these gaps, such as
`mb-[1lh]` or `mt-[1lh]`, because they scale automatically when the container text size changes
later. When space is tight, `0.5lh` works as a tighter alternative.

```markdown
<AgentChat text-sm>
  <ChatUser>Fix the login bug</ChatUser>
  <ChatTask agent="explore" description="Search auth code" status="completed" mb="[1lh]">
    Found issue in src/auth.ts:42
  </ChatTask>
  <ChatAgent mb="[1lh]">I found the issue. Fixing it now.</ChatAgent>
  <ChatTool name="Edit" args="src/auth.ts" />
</AgentChat>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Coding Agent'` | Text shown in the title bar next to the window dots |
| `variant` | `'terminal' \| 'ide'` | `'terminal'` | Theme variant (IDE variant reserved for future use) |
| `hideTitle` | `boolean` | `false` | Hides the title bar (dots and title text) when set to `true` |

**Slots:**

| Slot | Description |
|------|-------------|
| default | Conversation elements (`ChatUser`, `ChatAgent`, `ChatTool`, `ChatSkill`, `ChatTask`, `ChatInput`) |

**CSS custom properties** (defined on the container, available to all children):

| Variable | Default | Purpose |
|----------|---------|---------|
| `--chat-bg` | `#1a1b26` | Main background |
| `--chat-bg-titlebar` | `#13131e` | Title bar background |
| `--chat-border` | `#414868` | Borders and window dots |
| `--chat-text` | `#a9b1d6` | Default text color |
| `--chat-text-bright` | `#c0caf5` | User text / emphasized text |
| `--chat-text-dim` | `#565f89` | Hints, labels, dimmed content |
| `--chat-accent-blue` | `#7aa2f7` | Prompt `>` prefix, cursor |
| `--chat-accent-cyan` | `#7dcfff` | Tool names |
| `--chat-accent-green` | `#9ece6a` | Agent indicator, completed status |
| `--chat-accent-purple` | `#bb9af7` | Task labels |
| `--chat-accent-red` | `#f7768e` | Failed status |
| `--chat-accent-yellow` | `#e0af68` | Strong text / emphasis |

**Usage:**

Basic container:

```markdown
<AgentChat text-sm>
  <ChatUser>Fix the login bug</ChatUser>
  <ChatAgent>I'll look at the code.</ChatAgent>
</AgentChat>
```

With height constraint and custom title:

```markdown
<AgentChat text-xs title="OpenCode" max-h-30>
  <ChatUser>Custom title with constrained height</ChatUser>
  <ChatAgent>Line 1</ChatAgent>
  <ChatAgent>Line 2</ChatAgent>
  <ChatAgent>Line 3</ChatAgent>
  <ChatAgent>Line 4</ChatAgent>
  <ChatAgent>Line 5</ChatAgent>
  <ChatAgent>Line 6</ChatAgent>
  <ChatAgent>Line 7</ChatAgent>
</AgentChat>
```

Without title bar for very short examples:

```markdown
<AgentChat text-xs hide-title>
  <ChatUser>No title bar</ChatUser>
  <ChatAgent>Useful when the surrounding slide already provides enough context.</ChatAgent>
</AgentChat>
```

With overridden accent colors:

```markdown
<AgentChat
  text-xs
  class="[--chat-accent-blue:#e0af68] [--chat-accent-green:#7dcfff] [--chat-accent-purple:#9ece6a]"
>
  <ChatUser>Color variables can be overridden on the container.</ChatUser>
  <ChatAgent>Only theme variables change; layout still comes from Uno classes.</ChatAgent>
</AgentChat>
```

## `ChatUser`

A user message with a blue `>` prompt prefix.

**Props:** None

**Slots:**

| Slot | Description |
|------|-------------|
| default | The user's message text |

**Usage:**

```markdown
<ChatUser>Fix the login bug in auth.ts</ChatUser>
<ChatUser>What about tests?</ChatUser>
```

## `ChatAgent`

An agent/assistant response with a green `●` indicator.

**Props:** None

**Slots:**

| Slot | Description |
|------|-------------|
| default | The agent's response text |

**Usage:**

```markdown
<ChatAgent>I found the issue on line 42.</ChatAgent>
<ChatAgent>Here are 3 options:<br/><br/>Option 1: ...<br/>Option 2: ...</ChatAgent>

<ChatAgent mb="1lh">
  Multi paragraph response.<br/><br/>
  The agent can use <em>emphasis</em> and <strong>strong text</strong>.
</ChatAgent>
```

## `ChatTool`

A tool call display. Shows the tool name and optional arguments. When slot content is provided,
the block becomes clickable and can be collapsed/expanded. Without slot content, only the header
line is shown (no hint, no click behavior).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | *(required)* | Tool name (e.g., `"Read"`, `"Edit"`, `"Bash"`) |
| `args` | `string` | `''` | Arguments shown next to the tool name |
| `collapsed` | `boolean` | `false` | Initial collapsed state (only relevant when slot content is provided) |

**Slots:**

| Slot | Description |
|------|-------------|
| default | Tool result content. When empty, the tool call is just a header line. |

**Usage:**

```markdown
<!-- Tool call without content (no collapse, no hint) -->
<ChatTool name="Edit" args="src/auth/login.ts" />

<!-- Tool call with visible content -->
<ChatTool name="Read" args="src/auth/login.ts">
  <pre>export function login(user, pass) {
  return user === pass;
}</pre>
</ChatTool>

<!-- Tool call with content, initially collapsed -->
<ChatTool name="Bash" args="npm test" collapsed>
  <pre>PASS src/auth.test.ts (3 tests)</pre>
</ChatTool>
```

## `ChatSkill`

A single-line indicator showing that a skill/plugin was loaded. Renders a lightning bolt icon,
"Loaded skill", and the skill name in a dimmed style (`--chat-text-dim`).

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | Name of the loaded skill |

**Usage:**

```markdown
<ChatSkill name="slidev-slide" />
<ChatSkill name="git-commit" />
```

## `ChatTask`

A subagent/task block for visualizing delegated work. Shows a status indicator, the word "Task",
an optional agent type, and a description. Supports the same collapse/expand pattern as
`ChatTool`.

The `running` status uses an animated Braille-dot spinner (`AsciiSpinner`).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | *(required)* | What the task does |
| `agent` | `string` | `''` | Subagent type (e.g., `"explore"`, `"general"`, `"Researcher"`) |
| `collapsed` | `boolean` | `false` | Initial collapsed state (only relevant when slot content is provided) |
| `status` | `'running' \| 'completed' \| 'failed'` | `'completed'` | Status indicator: green `●`, animated Braille spinner, or red `✕` |

**Slots:**

| Slot | Description |
|------|-------------|
| default | Task result content. When empty, the task is just a header line. |

**Usage:**

```markdown
<!-- Completed task with result -->
<ChatTask agent="explore" description="Search for API endpoints" status="completed">
  Found 12 endpoints in src/api/routes.ts
</ChatTask>

<!-- Running task, collapsed -->
<ChatTask agent="general" description="Writing integration tests" status="running" collapsed>
  Working...
</ChatTask>

<!-- Failed task without content -->
<ChatTask description="Deploy to staging" status="failed" />
```

## `ChatInput`

The input line at the bottom of the conversation. Shows a blue `>` prompt prefix and an animated
blinking cursor. Separated from the preceding content by extra top margin (`1.5lh`) and a subtle
top border.

Use `ChatInput` only once per `AgentChat`, and place it as the final element in the conversation.
It represents the current prompt, not historical user messages; use `ChatUser` for previous
prompts.

**Props:** None

**Slots:**

| Slot | Description |
|------|-------------|
| default | The input text. Can be empty for a blank prompt with just the cursor. |

**Usage:**

```markdown
<!-- Input with text and blinking cursor -->
<ChatInput>Can you also add tests?</ChatInput>

<!-- Empty prompt (just cursor) -->
<ChatInput />

<!-- Typing animation inside the input -->
<ChatInput>
  <Typewriter text="Summarize the changes" :speed="35" />
</ChatInput>
```

## `Typewriter`

Animates text as if it were being typed character by character. Each character appears with a
randomized delay for a natural feel; punctuation characters (`,;:.!?`) insert longer pauses. The
animation is `v-click`-aware: it starts when the element becomes visible and resets when hidden
again.

Designed for use inside `ChatInput` to simulate a user typing a follow-up message, but can also be
used standalone on any slide.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | *(required)* | The text to type out |
| `speed` | `number` | `50` | Base delay per character in milliseconds |
| `delay` | `number` | `0` | Initial delay before typing starts, in milliseconds |

**Usage:**

```markdown
<!-- Inside ChatInput for a typing animation -->
<ChatInput>
  <Typewriter v-click text="Can you also add tests?" />
</ChatInput>

<!-- Standalone with slower speed -->
<Typewriter text="Hello, world!" :speed="80" :delay="500" />
```

## `AsciiSpinner`

A pure-CSS animated spinner using Braille Unicode characters. Each frame is rendered in a
fixed-width box; an `overflow: hidden` window shows one frame at a time and a CSS `steps()`
animation scrolls through them.

Used internally by `ChatTask` for the `running` status, but can also be used standalone on any
slide.

**Usage:**

```markdown
<!-- Default Braille spinner -->
<AsciiSpinner />
```

## Example

```markdown
<AgentChat text-xs title="Agent Review Session" max-h-110>
  <ChatUser mb="1lh">Find the bug, fix it, run tests, and summarize the result.</ChatUser>

  <ChatTask agent="explore" description="Inspect relevant files" status="completed" mb="1lh">
    <ChatTool name="Read" args="src/auth/login.ts" />
    <ChatTool name="Read" args="src/auth/login.test.ts" />
  </ChatTask>

  <ChatAgent mb="1lh">
    I found an inverted comparison in <strong>login.ts</strong>.<br/><br/>
    The fix is small, but we should add a regression test for the failed login path.
  </ChatAgent>

  <ChatTool name="Edit" args="src/auth/login.ts" collapsed mb="1lh">
    <pre>- return user.name === pass<br/>+ return user.passwordHash === hash(pass)</pre>
  </ChatTool>

  <ChatTool name="Bash" args="npm test" mb="1lh">
    <pre>PASS src/auth/login.test.ts<br/>PASS src/auth/session.test.ts</pre>
  </ChatTool>

  <ChatAgent mb="1lh">Fixed the login check and verified the regression tests.</ChatAgent>
  <ChatInput>Cool, thank you!</ChatInput>
</AgentChat>
```
