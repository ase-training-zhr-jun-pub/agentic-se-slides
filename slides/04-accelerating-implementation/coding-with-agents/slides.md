---
layout: intro
background: petrol
---

### *Use Agents for*
# Building Code

<!-- Master reference: Chapter 4 / Slide 182 -->

---

# Test-Driven Development

## by Kent Beck

1. Write the test
2. Write enough code to make the test pass
3. Refactor other code and tests so all tests pass
4. Repeat

<!-- Master reference: Chapter 4 / Slide 183 -->

---

# Test-Driven Development

## with Agents

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

# General Tips

## when coding with agents

- Intervene early when the agent wants to reinvent the wheel
- Intervene early when the agent goes in the wrong direction
- Keep improving your system prompts
  - Never finished
- Use CLI tools over MCP servers to save context
- Reduce waiting time by using multiple agents simultaneously
  - There is a Git feature for this: `worktree`
  - It creates another directory with the same files where you can start another agent

<!-- Master reference: Chapter 4 / Slide 185 -->
