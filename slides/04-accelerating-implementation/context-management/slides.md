---
layout: intro
background: petrol
---

### *Block A — What does my agent have?*
# Agent Primitives

<!--
Wir starten Block A: die Primitives, also die Bausteine, die jeder Agent in irgendeiner Form hat.
Egal ob Claude Code, Copilot, Cursor — alle nutzen dieselben fünf Konzepte.
Die Frage ist nur: was stelle ich als Mensch bereit, was holt sich der Agent selbst?
-->

---

# Agent Primitives

<div class="text-lg [&_td]:!py-3 [&_th]:!py-3">

| Problem | Building Block | Design Principle |
|---|---|---|
| Doesn't know the project | **Memory** | *Less is more* |
| Needs knowledge at runtime | **Instructions** | *Progressive Disclosure* |
| Needs capabilities | **Tools** | Too many = "Dumb Zone" |
| Makes mistakes unnoticed | **Verification** | *Success is silent* |
| Context window fills up | **Delegation** | *Context Firewall* |

</div>

<div class="mt-6 text-sm font-serif italic text-petrol">

We'll unpack each row: first the *problem*, then the *idea*, then the hands-on setup.

</div>

<!--
Die Tabelle ist der rote Faden für Block A — bewusst auf drei Spalten reduziert:

- "Problem": warum brauche ich das Primitive überhaupt? Jedes hat einen klaren Schmerz.
- "Building Block": der Baustein selbst.
- "Design Principle": die Faustregel, die hängen bleibt.

Die Detailspalten (was stelle ICH bereit, was holt sich der Agent zur Laufzeit) sind absichtlich
raus — die dröseln wir Zeile für Zeile in den folgenden Folien auf: erst Problem, dann die Idee
in Alltagssprache, dann die konkrete Umsetzung.

Verification ist neu in dieser Liste — wird oft vergessen, ist aber der Mechanismus, der den
Agent eigenständig iterieren lässt, ohne dass ich daneben sitzen muss.
-->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>Every session, the agent forgets your project</h2>

- A fresh agent has never seen your code, conventions, or past decisions
- You re-explain the same context over and over
- "Use our naming, our structure, our way" — every single time
- Left guessing, it guesses inconsistently

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Primitive</em></h3>
  <h1 class="text-white">Memory</h1>
</div>

<!--
Analogie für die Nicht-Techniker: Stell dir einen neuen Freelancer vor, der jeden Morgen das
ganze Projekt vergessen hat. Genau so startet ein Agent jede Session — bei null.
-->

---

# Memory: <small>The Idea</small>

- Write the project briefing **once**. The agent reads it at the start of every session
- *Keep it lean*: only durable facts (conventions, structure, decisions), not everything
- *Less is more*: an overloaded briefing makes the agent worse, not better

<!--
Brücke zur folgenden Dev-Folie: dieses Briefing heißt AGENTS.md — bei Claude Code CLAUDE.md.
-->

---

# Memory: <small>AGENTS.md</small>

- The shared standard — `AGENTS.md` is auto-attached to the context on every session
- Subdirectory `AGENTS.md` files attach when the agent works in that subtree
- **Claude Code** uses `CLAUDE.md` — connect both via an `@AGENTS.md` import or a symlink
- Path-scoped rules: `.claude/rules/**/*.md` with a `paths` glob in the frontmatter

<div class="mt-8 inline-block rounded-lg bg-lightGray px-5 py-3 font-serif italic text-petrol">
  <a href="https://agents.md">https://agents.md</a>
</div>

<!--
AGENTS.md ist der gemeinsame Standard quer durch Copilot, Claude Code, Cursor & Co.
Inhalt: Projektstruktur, Konventionen, Befehle.

Claude Code liest CLAUDE.md (Root + Subdirectories). Mit einem Import (@AGENTS.md) oder
Symlink lässt sich der AGENTS.md-Standard anbinden. Pfadbasierte Rules liegen in
.claude/rules/ und werden nur geladen, wenn ihr paths-Glob matched.

Wichtig: nicht alles reinpacken. ETH-Zürich-Studie hat 138 AGENTS.md-Files getestet —
LLM-generierte schaden der Performance, von Menschen geschriebene helfen nur ~4%.
Less is more.
-->

---

# Memory: <small>Path-scoped Rules</small>

- Split a fat `AGENTS.md` into focused, scoped instruction files
- Loaded only when a path matches — keeps the context window lean
- **Claude Code:** rules in `.claude/rules/` with a `paths:` glob in the frontmatter
- Works across the same agent ecosystem (Cursor "rules", etc.)

**Examples:**

Indentation rule for `src/**/*.ts`. <br/>
Test strategy rule for `**/*.spec.ts`.

<!--
Rules sind selektive Memories — werden nur geladen wenn ein Glob matched.
Das spart Context Window für Sessions, in denen die Rule nicht relevant ist.

Claude-konkret: Datei unter .claude/rules/foo.md mit YAML-Frontmatter
paths: "**/*.spec.ts" — wird nur geladen wenn der Agent in einem matching File arbeitet.
-->

---

# Memory: <small>Auto-Memory</small>

- The agent decides what to remember and manages its own memory
- Zero upkeep — it learns across sessions on its own
- ✅ No manual effort &nbsp;·&nbsp; ⚠️ it can remember wrong things, and you won't notice
- **Claude Code:** per-project notes in `~/.claude/projects/<project>/memory/`

<!--
Automatic: Built-in Memory-Manager (Claude Code Auto Memory, Mem0, OMEGA). Vorteil: keine Pflege.
Risiko: Memory Pollution — der Agent merkt sich Falsches und du merkst es nicht. Und: Automatic
Memory ist per-Person, geteiltes Team-Wissen MUSS trotzdem in AGENTS.md.
-->

---
layout: center
background: petrol
---

<div max-w="4/5" text-balance space-y-10>

## *Start manual. Move to hybrid. Use automatic with caution.*

## Team knowledge always belongs in *AGENTS.md*.

</div>

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>Some know-how is only needed sometimes</h2>

- Task-specific knowledge (how we release, how we write user stories) isn't needed every time
- Loading all of it always overwhelms the agent and wastes its attention
- But re-typing the same instructions each time is tedious and error-prone
- You want it *ready*, not always *present*

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Primitive</em></h3>
  <h1 class="text-white text-4xl">Instructions</h1>
</div>

<!--
Analogie: ein Rezeptordner. Du holst nur das Rezept raus, das du gerade kochst — nicht alle
Rezepte gleichzeitig auf den Tisch.
-->

---

# Instructions: <small>The Idea</small>

- Store reusable instructions and pull them in *on demand*
- The agent sees only a short label and reads the full recipe only when it's relevant
- *Progressive disclosure*: the right knowledge at the right moment, nothing more

<!--
Brücke zu den folgenden Dev-Folien: bei Claude Code sind das Commands (/...) und Skills.
-->

---

# Instructions: <small>Commands</small>

- Use built-in agent features, usually starting with `/`
- Additional *custom commands* offer predefined prompts from a markdown file
- Commands can be called with additional arguments

**Example:**

Execute a custom commit command. <br/>
`/commit`

---

# Instructions: <small>Skills</small>

- Store different skills in `SKILL.md` files
- Only the *description* of the skill is loaded into the context
- The agent decides when to read the full skill — *progressive disclosure*
- SKILL.md can reference further files for layered disclosure
- Beware: External skills from registries like skills.sh can execute arbitrary code.
- Treat external skills like npm packages. Double check before install.

<div class="mt-8 inline-block rounded-lg bg-lightGray px-5 py-3 font-serif italic text-petrol">
  <a href="https://agentskills.io/home">https://agentskills.io</a>
</div>

<!--
Skills sind das mächtigste Werkzeug gegen Context-Bloat. Statt 5kB Anleitung pauschal zu laden,
lädt der Agent nur eine Beschreibungs-Zeile. Erst wenn er die Skill braucht, liest er den Rest.

Frontier-Modelle können ~150-200 Instructions konsistent befolgen. Jede irrelevante
Instruction kostet Performance.

Security-Hinweis ist wichtig: Skill Registries sind ein neuer Vektor für Supply-Chain-Angriffe.
-->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>A chat agent can talk, but it can't act</h2>

- On its own, the agent only produces text
- It can't search the web, create a JIRA ticket, query a database, or run code
- Pure conversation. No hands to actually do things
- Real work needs more than words

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Primitive</em></h3>
  <h1 class="text-white">Tools</h1>
</div>

<!--
Analogie: der Unterschied zwischen einem Assistenten, mit dem du nur reden kannst, und einem,
der Zugriff auf Kalender und Postfach hat und Dinge für dich erledigt.
-->

---

# Tools: <small>The Idea</small>

- Tools give the agent *hands* — ways to act in the real world
- There are build-in tools and external tools
- Each tool is one capability: search, send, query, execute, ...
- But more isn't better: too many tools confuse the agent
- Curate a small, relevant set

<!--
Brücke zur Dev-Folie: technisch heißt der Standard dafür MCP (Model Context Protocol).
-->

---

# Tools & MCP

- Tools = the *capability boundary* of the agent
- MCP server = standard protocol to plug new tools in
- **Too many tool definitions fill the context window**
- CLI wrappers often beat MCP servers (less context, well-known patterns)
- MCP tool descriptions land in the *system prompt* — never connect to untrusted servers

<div class="mt-4 grid grid-cols-2 gap-4 text-sm">
  <div class="bg-lightGray px-4 py-3">
    <strong>CLI wrapper example</strong><br/>
    Instead of using a Gitlab MCP server, an agent could also use the glab CLI + examples in <code>AGENTS.md</code>.
  </div>
</div>

<!--
Anti-Pattern: 50 MCP-Server gleichzeitig connectet. Jede Tool-Beschreibung kostet Tokens
im System Prompt. Bei populären CLIs (git, gh, docker, kubectl) ist Prompting den Agenten
zur CLI-Nutzung oft besser als ein dedizierter MCP-Server — die CLI ist im Training reichlich
vorhanden, der Agent weiß was zu tun ist.

Sicherheitslücke: MCP-Tool-Beschreibungen können Prompt-Injections enthalten und werden
ungefragt in den System Prompt gelegt. Niemals untrusted Server connecten.
-->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>The agent is confidently wrong sometimes</h2>

- Output can look right and still be broken
- Mistakes slip through unnoticed until they reach production
- Without a check, *you* are the only safety net
- Reviewing everything by hand doesn't scale

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Primitive</em></h3>
  <h1 class="text-white text-4xl">Verification</h1>
</div>

<!--
Analogie: ein automatischer Korrekturleser oder eine Checkliste, die vor der Auslieferung
zuverlässig durchläuft — nicht ein Mensch, der jedes Mal alles gegenliest.
-->

---

# Verification: <small>The Idea</small>

- Automatic checks run *after* the agent works
- They report problems back to the **agent**, not to you — so it fixes itself
- *Success is silent, failures are loud* — you only step in when checks fail
- Turns "human in the loop" into "human *on* the loop"

<!--
Brücke zur Dev-Folie: technisch laufen diese Checks als Hooks im Agent-Lifecycle.
-->

---

# Verification & Back-Pressure

- Agent task success rate ≈ agent's ability to *verify its own work*
- Hooks = deterministic checkpoints in the agent lifecycle
- *Success is silent* (exit 0 → nothing in context)
- *Failures are loud* (exit 2 → errors injected, agent re-engages)
- Back-pressure: tests, typecheck, lint, coverage gates, UI tests (Playwright)

<div class="mt-10 bg-lightGray px-4 py-3 text-sm">

**Example:** Biome + TypeScript hook on agent stop — re-engages the agent if either fails.<br/> Full passing output is *swallowed* so the context window stays clean.

</div>

<!--
Das ist die wichtigste neue Folie in Block A. Der gesamte Harness-Engineering-Gedanke
hängt an Verification:

- Ohne Verification ist der Agent darauf angewiesen, dass der Mensch jede Änderung prüft.
- Mit Verification kann der Agent eigenständig iterieren — er bekommt Errors zurück
  und reagiert darauf. Human-in-the-Loop wird zu Human-on-the-Loop.

Hooks gibt es in Claude Code entlang des Lifecycles: SessionStart, UserPromptSubmit,
PreToolUse, PostToolUse, Stop, SubagentStop. Konfiguration in `.claude/settings.json`.

Wichtig: Output-Hygiene. Wenn der Linter durchläuft, soll *nichts* im Context landen.
Nur Fehler. Sonst füllt die nächste 5min-Test-Suite das ganze Window.
-->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>One agent doing everything gets overwhelmed</h2>

- A big task piles up clutter: every file read, every dead end
- The agent's working memory fills with noise and it loses the thread
- More memory ≠ better. Performance degrades (*context rot*)
- Focus gets lost in the pile

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Primitive</em></h3>
  <h1 class="text-white text-4xl">Delegation</h1>
</div>

<!--
Analogie: ein voller Schreibtisch. Statt alles selbst zu stapeln, gibst du eine Teilaufgabe an
eine Spezialistin ab, die separat arbeitet und dir nur das Ergebnis zurückbringt.
-->

---

# Delegation: <small>The Idea</small>

- Hand well-scoped sub-tasks to helper agents that work *separately*
- They do the messy digging and report back only a short summary
- The main agent's "desk" stays clean. Like a *context firewall*
- Split work to stay focused, not to assign job titles

<!--
Brücke zur Dev-Folie: technisch sind das Sub-Agents mit eigenem, isoliertem Context Window.
-->

---

# Delegation: <small>Subagents</small>

- Sub-agents run discrete tasks in *isolated context windows*
- *Context firewall*: intermediate noise never reaches the parent
- **Claude Code:** custom subagents (`.md` files in `.claude/agents/` or `~/.claude/agents/`) have their own system prompt + tool restrictions; the Task tool parallelizes them in-session
- Cost control: strong model for parent, cheaper model for sub-agents
- Anti-pattern: "frontend engineer" vs "backend engineer" sub-agents. Use sub-agents for *context isolation*, not role specialization.

<!--
Sub-Agents sind kein "spezialisierte Rolle"-Mechanismus, sondern ein "Müllabfuhr"-Mechanismus.
Der Parent-Agent sagt "such mir alle Dateien die X importieren" — der Sub-Agent macht 50
Tool Calls, liest 30 Files, und gibt am Ende eine 5-Zeilen-Antwort mit Filepaths zurück.

Die 30 Files landen NIE im Parent-Context. Das ist der ganze Trick.

Antipattern: zwei Sub-Agents "frontend dev" und "backend dev" — die teilen sich keine
Information, müssen alles re-discovern, kosten Token und bringen nichts.

Chroma's Context-Rot-Research ist die theoretische Begründung warum längerer Context nicht
hilft: bei jeder Verlängerung sinkt die Recall-Rate auch auf einfachen Tasks. Sub-Agents
schaffen das Problem aus der Welt.
-->
