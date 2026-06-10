---
layout: intro
background: petrol
---

### *Customizing your Agent*
# Building Blocks

<!--
Ihr habt nun gesehen wie ein Agent grundsätzlich funktioniert.

Jetzt schauen wir uns die Bausteine an, mit denen wir einen Agenten an unser Projekt und unsere Arbeitsweise anpassen.
-->

---

# Where does information live?

The key question for every building block:

- **Always in context** — memory files & rules
- **Loaded only when needed** — skills & path-based rules
- **In its own context** — subagents
- **Outside the model** — hooks & external tools

<!--
Die Mechanismen werden oft verwechselt. Die entscheidende Frage ist immer: Wo lebt die Information?

- Immer im Kontext: kostet bei jedem Task Tokens – also kurz halten
- Bei Bedarf geladen: Skills und pfadbasierte Rules
- Eigener Kontext: Subagents isolieren Arbeit
- Außerhalb des Modells: Hooks erzwingen Verhalten deterministisch – nicht hoffen, sondern erzwingen
-->

---
footerLink: https://agents.md
---

# Memory: <small>AGENTS.md</small>

- Persistent instructions, automatically attached to the context on a new session
- AGENTS.md files in subdirectories get attached when the agent works in the subdirectory
- Keep it short — every line costs context on every task
- Implemented by most agents. Exception: Claude Code (`CLAUDE.md`)

<!--
AGENTS.md ist der Standard-Dateiname, Claude Code nutzt CLAUDE.md. Mit einem Import (@AGENTS.md) oder Symlink lässt sich beides verbinden.

Richtwert: unter 200 Zeilen. Je länger die Datei, desto mehr Kontext kostet sie und desto schlechter werden einzelne Regeln befolgt.
-->

---
layout: comparison
leftBackground: petrol
rightBackground: apricot
leftBodyBackground: white
rightBodyBackground: white
badge: vs.
---

::left::
# Belongs in AGENTS.md
- Build, test & run commands
- Architecture boundaries & important paths
- Counterintuitive conventions: <br/>"pnpm, not npm"
- Concise team standards
- References to skills & docs

::right::
# Doesn't belong
- Long API documentation
- Large code examples
- One-off task instructions
- Rules better enforced by linters, tests, or hooks
- Secrets, tokens, private paths

<!--
Faustregel: Nur was der Agent fast immer wissen muss.

Alles was deterministisch erzwungen werden kann (Formatierung, Linting) gehört nicht in Prosa-Anweisungen, sondern in Hooks oder Tooling – dazu kommen wir gleich.
-->

---

# Memory: <small>Rules</small>

- Split up your AGENTS.md into multiple modular rules
- Manage all rules in one place, e.g. `.claude/rules/`
- Without a path pattern: loaded at startup, just like AGENTS.md
- With glob patterns: loaded only when the agent reads matching files
- Ideal when instructions apply only to specific parts of a repository

<!--
Rules sind modulare Markdown-Dateien. Alle .md-Dateien im rules-Ordner werden rekursiv gefunden.

Mit paths-Frontmatter werden sie erst geladen, wenn der Agent passende Dateien anfasst – das spart Kontext.
-->

---

# Rules: <small>Example</small>

`.claude/rules/api.md`

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "tests/**/*.test.ts"
---

# API rules

- Validate inputs with Zod.
- Return errors via `ApiError`.
- Log 5xx errors with request context.
```

Loaded only when the agent touches files under `src/api/` or `tests/`.

<!--
Das paths-Frontmatter macht die Rule pfadbasiert: Sie kostet nur Kontext, wenn sie relevant ist.

Ohne paths wäre sie eine ganz normale, immer geladene Regel-Datei.
-->

---

# Memory: <small>Auto Memory</small>

- The agent maintains its own notes across sessions
- An index file is loaded at startup, topic files are read on demand
- Local to your machine — not shared with the team
- Deliberately move team-relevant insights into AGENTS.md, rules, or skills

**Example:** Claude Code stores notes per project in `~/.claude/projects/<project>/memory/`

<!--
Auto Memory ist NICHT die CLAUDE.md – der Agent schreibt sich selbst lokale Notizen, die nicht im Repo landen.

Wichtig fürs Team: Erkenntnisse, die alle brauchen, bewusst in AGENTS.md, eine Rule oder einen Skill überführen.
-->

---

# Instructions: <small>Commands</small>

- Slash entry points, usually starting with `/`
- Built-in agent features vs. custom commands
- Custom commands offer predefined prompts from a markdown file
- Commands can be called with additional arguments
- Keep workflows with side effects manual — the agent should not trigger them on its own

<!--
Built-in Commands wie /compact oder /model sind CLI-Features. Custom Commands sind Prompts in Markdown-Dateien.

Workflows mit Seiteneffekten (/deploy, /commit, /release) sollte der Agent nicht selbstständig starten dürfen – das sehen wir gleich im Beispiel.
-->

---

# Commands: <small>Example</small>

`.claude/commands/fix-issue.md`

```markdown
---
description: Fix a GitHub issue by issue number and target branch.
argument-hint: "<issue> [branch]"
disable-model-invocation: true
---

Fix issue `$0` on branch `$1`.
If `$1` is empty, use the current branch.
```

Invoke it with: `/fix-issue 123 feature/login`

<!--
Die Frontmatter-Felder:
- description: was der Command tut – taucht im /-Menü auf
- argument-hint: zeigt dem User, welche Argumente erwartet werden
- disable-model-invocation: true bedeutet, nur der Mensch darf den Command starten – der Agent nicht

$0 und $1 sind die Argument-Platzhalter, $ARGUMENTS wäre der komplette Text nach dem Command.
-->

---
footerLink: https://agentskills.io
---

# Instructions: <small>Skills</small>

- A skill is a folder: `SKILL.md` plus optional references, scripts, and assets
- Useful for repeatable workflows, checklists, and domain knowledge
- The description is the most important trigger: what the skill does *and* when to use it
- The agent decides when to read the full skill
- Scripts are executed — their source code never enters the context

<!--
Skills sind ein offener Standard (agentskills.io).

Die Description entscheidet, ob der Skill gefunden wird: Aufgabe + Trigger + Grenzen. "Helps with documents" ist zu schwach.

SKILL.md unter 500 Zeilen halten, Details in kleine Referenz-Dateien auslagern.
-->

---
layout: two-cols
leftBackground: white
rightBackground: white
---

# Skills: <small>Example</small>

```text
pr-review/
├── SKILL.md
├── references/
│   └── review-rubric.md
└── scripts/
    └── check_diff.py
```

::right::

<div class="pt-14"></div>

```markdown
---
name: pr-review
description: Review pull requests for correctness,
  tests, and security. Use when the user asks for
  a PR review or merge readiness check.
---

# PR Review

1. Check the changed files.
2. Assess risks, missing tests, breaking changes.
3. Provide blockers and recommendations.
   Rubric: [references/review-rubric.md]
```

<!--
Links die Ordnerstruktur, rechts die SKILL.md.

Die SKILL.md funktioniert wie ein Inhaltsverzeichnis: Sie verweist auf die Rubric und das Script, statt alles selbst zu enthalten.

Die Description enthält Aufgabe UND Trigger: "Use when the user asks for..."
-->

---

# Skills: <small>Progressive Disclosure</small>

- **Step 1: Startup** — only name and description are in the context
- **Step 2: Invocation** — the full `SKILL.md` content gets loaded
- **Step 3: On demand** — referenced files are read, scripts are executed

<br/>

#### Pay only for the context you actually need.

<!--
Das ist der eigentliche Clou von Skills: Im Normalfall liegt nur die Beschreibung im Kontext.

Erst beim Aufruf wird die SKILL.md geladen, Supporting Files nur wenn die SKILL.md auf sie verweist und sie relevant sind.

So skalieren Skills: Man kann viele davon haben, ohne den Kontext vollzumüllen.
-->

---

# Skills: <small>Frontmatter</small>

| Field | Purpose |
| --- | --- |
| `name`, `description` | What the skill does *and* when to use it |
| `disable-model-invocation` | Only manually via `/name` — for workflows with side effects |
| `user-invocable` | Hide from the `/` menu — only the agent invokes it |
| `paths` | Activate only when matching files are read |
| `context: fork` | Run the skill in an isolated subagent context |
| `allowed-tools` | Pre-approve tools for this skill |

<!--
Die Frontmatter steuert, wer einen Skill auslösen darf und wo er läuft.

- disable-model-invocation: Mensch only – für /deploy, /commit & Co.
- user-invocable: false – Agent only, taucht nicht im /-Menü auf
- context: fork – der Skill läuft als Subagent und müllt den Hauptkontext nicht zu

Damit verschwimmt die Grenze zwischen Commands und Skills: Custom Commands sind heute Teil des Skill-Systems.
-->

---

# Delegation: <small>Subagents</small>

- Agents can spawn subagents with their own context, tools, and model
- Noisy work — research, test runs, reviews — does not fill the main context
- The orchestrating agent gives instructions and receives a compact result
- Custom subagents can have a separate system prompt and be limited to certain tools and permissions
- Context will not be shared between agents

<!--
Subagents isolieren Arbeit: Der rohe Output (Testlogs, Suchergebnisse) bleibt im Subagent-Kontext, zurück kommt nur die Zusammenfassung.

Trigger: per Prompt (generische Subagents) oder als konfigurierte, spezialisierte Subagents – Beispiel auf der nächsten Folie.
-->

---

# Subagents: <small>Example</small>

`.claude/agents/code-reviewer.md`

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and
  missing tests. Use proactively after code changes.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer.
Return blockers first, then recommendations.
```

The body becomes the subagent's system prompt.

<!--
- description steuert die Delegation: "Use proactively after code changes" – der Agent delegiert selbstständig
- tools: Allowlist – der Reviewer darf lesen und suchen, aber nichts schreiben
- model: ein günstigeres/schnelleres Modell reicht oft für Teilaufgaben

Der Markdown-Body unter der Frontmatter ist der System-Prompt des Subagents.
-->

---

# Subagents: <small>Frontmatter</small>

| Field | Purpose |
| --- | --- |
| `name`, `description` | Required — the description controls delegation |
| `tools` / `disallowedTools` | Tool allowlist or denylist |
| `model`, `effort` | Cheaper or stronger model for the task |
| `skills` | Load the full content of named skills at startup |
| `memory` | Own persistent memory: `user`, `project`, or `local` |
| `background` | Run concurrently while the main agent continues |
| `isolation: worktree` | Work on an isolated copy in a temporary git worktree |

<!--
Die wichtigsten Felder über name/description hinaus:

- tools: Allowlist – ein Reviewer braucht kein Write
- model/effort: Kostensteuerung – Recherche und Tests brauchen selten das größte Modell
- skills: lädt benannte Skills komplett in den Subagent-Kontext – der Subagent muss sie nicht erst entdecken
- memory: eigenes persistentes Gedächtnis über Sessions hinweg; project ist teilbar im Repo
- background: läuft parallel weiter, Ergebnis kommt später
- isolation worktree: eigener Git-Worktree – mehrere Agents können parallel an Dateien arbeiten, ohne sich in die Quere zu kommen
-->


---

# Execution: <small>Hooks</small>

- Automatic lifecycle handlers: **Event → Matcher → Handler**
- Run because an event occurs — not because the agent remembers
- Deterministic rules and quality gates: don't hope, enforce
- Events: before/after tool use, prompt submitted, session start, agent stops
- Handlers can block an action before it happens

<!--
Hooks sind der deterministische Baustein: Sie laufen IMMER, wenn das Event eintritt – egal was das Modell gerade denkt.

Typische Gates: Linter/Formatter nach jedem Write, Tests vor dem Abschluss, gefährliche Shell-Kommandos blockieren.

PostToolUse kann nichts mehr verhindern, was schon passiert ist – zum Blockieren PreToolUse nutzen.
-->

---

# Hooks: <small>Example</small>

`.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command",
            "command": "node .claude/hooks/format-changed-file.mjs" }
        ]
      }
    ]
  }
}
```

After every file change, the formatter runs — deterministic, every time.

<!--
Event: PostToolUse – nach jedem erfolgreichen Tool-Aufruf.
Matcher: Edit|Write – nur bei Dateiänderungen.
Handler: ein Script, das die geänderte Datei formatiert.

Das Script bekommt die Tool-Details als JSON über stdin. Blockierende Hooks (PreToolUse) signalisieren mit Exit-Code 2.
-->

---

# Execution: <small>MCP Servers</small>

- Connect the agent to external systems: GitHub, Jira, databases, browsers
- You know the protocol — as a building block it's part of your team setup
- Team-shared configuration lives in the repo, e.g. `.mcp.json`
- No secrets in the config — use environment variables
- Only add trusted servers: prompt-injection and supply-chain risks

<!--
MCP kennt ihr schon aus dem Tools-Teil. Hier geht es um MCP als Baustein des Projekt-Setups:

Die .mcp.json liegt im Repo und wird vom Team geteilt – jeder bekommt dieselben Integrationen.

Secrets gehören in Umgebungsvariablen, nie in die committete Config.

MCP-Server liefern Inhalte in euren Kontext – nur vertrauenswürdige Server einbinden.
-->

---

# MCP: <small>Example</small>

`.mcp.json`

```json
{
  "mcpServers": {
    "internal-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_API_TOKEN}"
      }
    }
  }
}
```

Committed to the repo — the token stays in an environment variable.

<!--
Typisches Muster: Die Config ist team-shared im Repo, das Token kommt aus der Umgebung.

Tool-Definitionen liefert der Server zur Laufzeit – moderne Agents laden Schemas erst, wenn ein Tool wirklich gebraucht wird (Tool Search).
-->

---

# Distribution: <small>Plugins</small>

- Bundle skills, commands, subagents, hooks, and MCP servers into one installable package
- Distribute the same setup across repositories and teams
- Start repo-local — extract a plugin once multiple repos need the same setup

**Example:** An engineering plugin sharing the team's review skill and commit hooks.

<!--
Plugins sind die Verteilungsschicht. Für ein einzelnes Repo reichen lokale Skills und Rules im Repository – per PR reviewbar.

Erst wenn mehrere Repos oder Teams dasselbe Setup brauchen, lohnt sich ein Plugin, z.B. über einen internen Marketplace.
-->

---

# Building Blocks: <small>Summary</small>

| Building Block | Where it lives | Use it for |
| --- | --- | --- |
| AGENTS.md | always in context | what the agent must always know |
| Rules | startup or per path | area-specific conventions |
| Commands | manual entry point | user-triggered workflows |
| Skills | loaded when needed | repeatable workflows & knowledge |
| Subagents | own context | noisy or parallel work |
| Hooks | outside the model | deterministic enforcement |
| MCP Servers | outside the model | external systems & tools |
| Plugins | packaged & installed | distribution across repos & teams |

<!--
Die Abschluss-Tabelle schließt den Kreis zur Eingangsfrage: Wo lebt die Information?

Faustregel: AGENTS.md und Rules enthalten nur, was der Agent fast immer wissen muss. Skills enthalten wiederholbare Abläufe. Subagents isolieren Arbeit. Hooks erzwingen Verhalten deterministisch. MCP verbindet externe Systeme. Plugins verteilen das Setup ins Team.
-->
