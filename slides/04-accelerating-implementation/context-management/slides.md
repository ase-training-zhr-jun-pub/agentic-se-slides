---
layout: intro
background: petrol
---

### *Context Management*
# Building Blocks

---

# Memory: <small>Agents.md</small>

- Store relevant information for the agent
- Agents.md files get automatically attached to the context on a new session
- Agents.md files in subdirectories get attached when the agent works in the subdirectory
- Implemented by most Agents. Exception: Claude Code (`CLAUDE.md`)

<div class="mt-8 inline-block rounded-lg bg-lightGray px-5 py-3 font-mono text-primary">
  https://agents.md
</div>

---

# Memory: <small>Rules</small>

- A way to store memory
- Split up your AGENTS.md into multiple rules
- Manage all rules in one place
- Configure glob patterns for loading the rule

**Examples:**

Indention Rule. <br/>
Test Strategy Rule. Always write unit tests.

---

# Instructions: <small>Commands</small>

- Use build-in agent features, usually starting with `/`
- Custom commands offer predefined prompts from a markdown file
- Commands can be called with additional arguments

**Example:**

Execute a custom commit command. <br/>
`/commit`

---

# Instructions: <small>Skills</small>

- Store different skills in SKILL.md files
- A description of the skill is loaded into the context
- The agent decides when to read the full skill
- Use it to load instructions only when needed

**Example:** Commit Message Skill<br/>
Enforce a template for commit messages. Use when the agent wants to commit something.

---

# Delegation: <small>Subagents</small>

- Agents can spawn subagents to parallelize certain tasks
- Can be triggered by
  - Prompt (spawns generic subagents)
  - Configuration of custom subagents for specialized tasks
- Custom subagents can have a separate system prompt and be limited to certain  tools and permissions
- The orchestrating agent gives instructions to the subagents
- Context will not be shared between agents

**Example:** Test Executor Agent

Executes the tests and reports the results.

---

# Building Blocks

| Category     | Human Provided          | Agent Invoked        |
| ------------ | ----------------------- | -------------------- |
| Memory       | AGENTS.md / Rules       | Read / MCP Resources |
| Instructions | Prompt / Command        | Skills               |
| Execution    | Shell Injection / Hooks | Tool Use / MCP Tools |
| Delegation   | New Session             | Subagents            |

---
layout: exercise
chapter: 4
exercise: 1 + 2
task: Setup backend development
command: git switch main
---
