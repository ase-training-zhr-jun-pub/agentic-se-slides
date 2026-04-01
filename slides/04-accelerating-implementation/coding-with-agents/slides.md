---
layout: intro
background: apricot
---

### *Use Agents for*
# Building Code

<!-- Master reference: Chapter 4 / Slide 182 -->

---

# Test-Driven Development

<ol class="list-decimal pl-5 text-left marker:text-apricot">
  <li>Write the test</li>
  <li>Write enough code to make the test pass</li>
  <li>Refactor other code and tests so all tests pass</li>
  <li>Repeat</li>
</ol>

<!-- Master reference: Chapter 4 / Slide 183 -->

---

<h1 class="mb-8">Agentic Test-Driven Development</h1>


## Pros
- Agent knows when it is done
- Tests follow the same pattern and are easy for the agent to create
- Intervene early, before production code is written
- See early if all edge cases get respected

## Cons
- Lots of setup code makes review more difficult
- Requires a good system prompt so the agent actually does it

<!-- Master reference: Chapter 4 / Slide 184 -->

---

<h1 class="mb-8">General Tips</h1>

- Intervene early when the agent wants to reinvent the wheel
- Intervene early when the agent goes in the wrong direction
- Keep improving your system prompts
  - Never finished
- Use CLI tools over MCP servers to save context
- Reduce waiting time by using multiple agents simultaneously
  - There is a Git feature for this: `worktree`
  - It creates another directory with the same files where you can start another agent

<!-- Master reference: Chapter 4 / Slide 185 -->
