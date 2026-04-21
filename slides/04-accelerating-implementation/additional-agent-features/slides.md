---
layout: intro
background: petrol
---

### *Additional*
# Agent Features


---

# Planning Mode

- Only plans what to do, no execution
- Does not modify the environment
- Waits for human feedback first, then executes the plan

#### Trigger plan mode in Claude Code

- `Mac`: `Shift + Tab + Tab`
- `Windows`: `Shift + Tab + Tab`


---

# Context Compaction

- When the context window exceeds, you can compact the context
- Reduces costs because the context is too big
- The agent creates a summary of the current session
- Frees the context and continues with the summary in a new session
- The summary may miss important details

#### Example: In Claude Code

- `/context` -- visualize current context usage
- `/compact` -- focus on code samples and API usage


---

# Hooks

- Allows registration of custom scripts on agent lifecycle hooks
- Hooks get triggered on actions like writing a file or ending a user task
- Can be used to run deterministic tools like a linter, type checks, or tests

#### Example: File protection hook

Prevent the agent from reading or writing sensitive files.

