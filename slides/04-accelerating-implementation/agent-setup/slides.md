# Agent Setup: <small>Memory</small>

Document your project knowledge in a memory file:
- General code structure
- Code Smells
- Development Process
- Bash Commands
  - Linter
  - Formatter
  - Run Configurations


<!--
AGENTS.md ist der Standard-Dateiname – Claude Code nutzt CLAUDE.md als Ausnahme. Der Inhalt ist derselbe: Projektkontext, Konventionen, Befehle. Diese Datei ist das erste was der Agent liest.
-->

---

# Agent Setup: <small>MCP Servers</small>

- IntelliJ MCP Server
- Playwright
- Context7
- Postgres
- Gitlab / GitHub / Jira
- …


<!--
IntelliJ MCP Server makes the IDE usable for the Agent. This is very useful if you use Jetbrains Products

Playwright enables the agent to click through web pages

Context7 provides access to the latest versions of libraries

Which MCP Servers you need is really specific to your technology
-->

---

# Agent Setup: <small>IDE Integrations</small>

- IDEs may have plugins to integrate (CLI) agents 
- Enables to see diffs of CLI agents in the IDE
- Interact with the agent in your IDE
- CLI agents get IDE context automatically, e.g. errors or problems

---

# Agent Setup: <small>Hooks</small>

- Lint and format code on Write / Edit
- Secure access to .env files and keys

---
layout: exercise
chapter: 4
exercise: 3
task: Agent Setup
command: git merge uebung-3-3
---
