---
layout: intro
background: apricot
---

### *Use Agents for*
# Building Code


---

# Test-Driven Development

1. Write the test
2. Write enough code to make the test pass
3. Refactor other code and tests so all tests pass
4. Repeat


---

<h1 class="mb-8">Agentic Test-Driven Development</h1>

#### Pros
- Agent knows when it is done
- Tests follow the same pattern and are easy for the agent to create
- Intervene early, before production code is written
- See early if all edge cases get respected

#### Cons
- Lots of setup code makes review more difficult
- Requires a good system prompt so the agent actually does it


---

# General Tips

- Intervene early when the agent wants to reinvent the wheel
- Intervene early when the agent goes in the wrong direction
- Keep improving your system prompts
  - Never finished
- Use CLI tools over MCP servers to save context
- Reduce waiting time by using multiple agents simultaneously
  - There is a Git feature for this: `worktree`
  - It creates another directory with the same files where you can start another agent

<!--
Git Worktree ermöglicht es, mehrere Agenten gleichzeitig auf demselben Repository laufen zu lassen – jeder in einem eigenen Verzeichnis, jeder auf einem eigenen Branch. Kein Stashing, kein Branch-Wechsel nötig. Ideal um unabhängige Tasks parallelisieren.
-->
