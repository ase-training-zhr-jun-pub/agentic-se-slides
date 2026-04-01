---
layout: intro
background: petrol
---

### *Context Management*
# Building Blocks

---
layout: default
---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Memory</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">Agents.md</h1>
</div>

- Store relevant information for the agent
- Agents.md files get automatically attached to the context on a new session
- Agents.md files in subdirectories get attached when the agent works in the subdirectory
- Implemented by most Agents. Exception: Claude Code (`CLAUDE.md`)

<div class="mt-8 inline-block rounded-lg bg-lightGray px-5 py-3 font-mono text-primary">
  https://agents.md
</div>

---
layout: default
---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Memory</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">Rules</h1>
</div>


- A way to store memory
- Split up your AGENTS.md into multiple rules
- Manage all rules in one place
- Configure glob patterns for loading the rule

**Examples:**

Indention Rule. <br/>
Test Strategy Rule. Always write unit tests.

---
layout: default
---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Instructions</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">Commands</h1>
</div>

- Use build-in agent features, usually starting with `/`
- Custom commands offer predefined prompts from a markdown file
- Commands can be called with additional arguments

**Example:**

Execute a custom commit command. <br/>
`/commit`

---
layout: default
---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Instructions</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">Skills</h1>
</div>

- Store different skills in SKILL.md files
- A description of the skill is loaded into the context
- The agent decides when to read the full skill
- Use it to load instructions only when needed

**Example:** Commit Message Skill<br/>
Enforce a template for commit messages. Use when the agent wants to commit something.

---
layout: default
---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Delegation</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">Subagents</h1>
</div>

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
layout: default
---

# Building Blocks

<div class="grid grid-cols-[1.1fr_1.3fr_1.3fr] text-xl leading-snug">
  <div class="bg-apricot text-white font-extrabold px-6 py-5"></div>
  <div class="bg-apricot text-white font-extrabold px-6 py-5">Human Provided</div>
  <div class="bg-apricot text-white font-extrabold px-6 py-5">Agent Invoked</div>

  <div class="px-6 py-6">Memory</div>
  <div class="px-6 py-6">AGENTS.md / Rules</div>
  <div class="px-6 py-6">Read / MCP Resources</div>

  <div class="bg-lightGray px-6 py-6">Instructions</div>
  <div class="bg-lightGray px-6 py-6">Prompt / Command</div>
  <div class="bg-lightGray px-6 py-6">Skills</div>

  <div class="px-6 py-6">Execution</div>
  <div class="px-6 py-6">Shell Injection / Hooks</div>
  <div class="px-6 py-6">Tool Use / MCP Tools</div>

  <div class="bg-lightGray px-6 py-6">Delegation</div>
  <div class="bg-lightGray px-6 py-6">New Session</div>
  <div class="bg-lightGray px-6 py-6">Subagents</div>
</div>

---
layout: exercise
chapter: 4
exercise: 1 + 2
task: Setup backend development
command: git switch main
---
