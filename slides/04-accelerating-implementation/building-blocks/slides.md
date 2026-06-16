---
layout: intro
background: petrol
---

### *Block A — What does my agent have?*
# Building Blocks

<!--
Wir haben die einzelnen Primitives im Vortrag schon durchgespielt. Hier nur noch einmal die
Übersicht — und dann gehen wir auf drei Themen ein, die heute aufkamen: das Zusammenspiel
Command → Agent → Skills → MCP, ein PreToolUse-Hook gegen Prod-DB-Zugriff, und ein Plugin-Beispiel.
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
Das ist auch der rote Faden der folgenden Übersicht.
-->

---

# The Building Blocks <small>at a glance</small>

<div class="text-sm [&_td]:!py-2 [&_th]:!py-2">

| Need | Mechanism | Rule of thumb |
|---|---|---|
| Understand the project | `CLAUDE.md`, `.claude/rules/` | Durable instructions — keep them short |
| Learn across sessions | Auto Memory | Local notes Claude maintains itself |
| Reusable knowledge or a workflow | **Skill** | Loaded only when needed |
| Deliberately start via `/name` | **Command** / manual skill | User-facing entry point |
| Keep noisy work out of context | **Subagent** | Own context, tools, model |
| Make something deterministic | **Hook** / permission | Don't hope — enforce |
| Access external systems | **MCP** | APIs, DBs, browsers, SaaS |
| Distribute several components | **Plugin** | One installable package |

</div>

<div class="mt-4 text-sm font-serif italic text-petrol">

Keep `CLAUDE.md` & rules to what Claude almost always needs. Everything else loads on demand, runs in its own context, or is enforced outside the model.

</div>

<!--
Die Übersicht ersetzt den ausführlichen Durchlauf von heute Vormittag. Faustregel: CLAUDE.md und
Rules nur für das, was Claude fast immer wissen muss. Skills für wiederholbare Verfahren. Commands
als sichtbare Einstiegspunkte. Subagents isolieren Arbeit. Hooks erzwingen Verhalten. MCP verbindet
externe Systeme. Plugins verteilen Setups.
-->

---

# A team workflow

<div class="text-2xl font-serif italic text-apricot mt-1 mb-4">Command → Agent → Skills → MCP</div>

<div class="grid grid-cols-[6.5rem_1fr] gap-x-5 gap-y-2 items-center text-petrol text-sm">
  <div class="text-apricot font-serif italic text-xl text-right">Command</div>
  <div class="bg-lightGray px-4 py-2">Thin, visible entry point — <code>/review-pr 123</code>. Goal, inputs, delegation.</div>
  <div class="text-apricot font-serif italic text-xl text-right">Agent</div>
  <div class="bg-lightGray px-4 py-2">A <strong>subagent</strong> isolates the noisy work — research, diffs, test runs — in its own context.</div>
  <div class="text-apricot font-serif italic text-xl text-right">Skills</div>
  <div class="bg-lightGray px-4 py-2">Domain knowledge & output format — review rubric, checklist, structure.</div>
  <div class="text-apricot font-serif italic text-xl text-right">MCP</div>
  <div class="bg-lightGray px-4 py-2">External systems — read the PR, post the review (GitHub, Jira, DB).</div>
</div>

<div class="mt-4 text-sm font-serif italic text-petrol">Hooks &amp; permissions wrap the whole flow as guardrails.</div>

<!--
Das ist das Muster, nach dem heute gefragt wurde. Der Command bleibt dünn: Ziel, Inputs, Delegation.
Die laute Arbeit landet im Subagent mit eigenem Kontext. Die Skills liefern Fachwissen und Format.
MCP verbindet die externen Systeme. Drumherum erzwingen Hooks und Permissions die harten Regeln.
-->

---

# Example: <small><code>/review-pr 123</code></small>

1. **Command** `/review-pr` — passes the PR number, stays thin
2. **Subagent** `code-reviewer` — pulls the diff and runs tests in its own context
3. **Skill** `pr-review` — applies the team's rubric, returns blockers first
4. **MCP** GitHub — fetches the PR and posts the review comment

`.claude/commands/review-pr.md`

```markdown
---
description: Review a GitHub pull request by number.
argument-hint: "<pr-number>"
disable-model-invocation: true
---

Review PR #$1. Delegate to the `code-reviewer` subagent and apply the
`pr-review` skill. Return blockers first, then recommendations.
```

<!--
Der Command ist bewusst dünn und delegiert. disable-model-invocation hält den Workflow
menschen-getriggert. Der Subagent macht die laute Arbeit, der Skill liefert die Rubrik,
MCP redet mit GitHub. So bleibt der Hauptkontext sauber.
-->

---

# Verification: <small>PreToolUse Hook</small>

- Hooks run because an **event** fires — not because the agent remembers
- **Event → Matcher → Handler**; `PreToolUse` fires *before* a tool runs
- The handler can **block**: `exit 2` (or a `deny` decision) stops the action
- *Don't hope — enforce.* Ideal as a hard guardrail around production data
- `PostToolUse` is too late — it cannot prevent what already happened

<!--
PreToolUse ist der richtige Event, um etwas zu verhindern. exit 2 ist der blockierende Exit-Code
(exit 1 ist nur ein nicht-blockierender Hook-Fehler). PostToolUse läuft erst nach dem Tool-Call und
kann nichts mehr aufhalten. Genau das wollen wir für den Prod-DB-Schutz.
-->

---

# Hook: <small>Block prod DB</small>

A `PreToolUse` hook runs before **every** Bash command — and can block it:

**1. Register the hook** · `.claude/settings.json`

```json
{ "hooks": {
  "PreToolUse": [
    { "matcher": "Bash",
      "hooks": [{ "type": "command", "command": ".claude/hooks/block-prod-db.sh" }] }
  ]
}}
```

**2. The check** · `.claude/hooks/block-prod-db.sh`

```bash
command=$(jq -r '.tool_input.command')   # the command Claude wants to run
if echo "$command" | grep -q "prod-db.internal"; then   # touches prod DB?
  echo "Production database is off-limits" >&2
  exit 2     # BLOCK — never runs; Claude sees the error
fi
# falls through to exit 0 = ALLOW
```

<!--
Zwei Teile:
1. settings.json REGISTRIERT den Hook — Event PreToolUse, Matcher Bash, Handler = das Skript.
   Das ist der Hook selbst: er feuert vor jedem Bash-Aufruf.
2. Das Skript ist die LOGIK: Es bekommt den geplanten Befehl als JSON über stdin (jq zieht das
   command-Feld raus), grep prüft auf den Prod-DB-Host, exit 2 blockt den Tool-Call bevor er läuft.
   Ohne Treffer fällt das Skript auf exit 0 durch und der Befehl ist erlaubt.

In der Praxis statt eines Hosts auch Connection-String oder PROD_DATABASE_URL matchen.
-->

---

# Distribution: <small>Plugins</small>

- A plugin bundles **skills, commands, agents, hooks, MCP servers, LSP, monitors & settings** into one installable package
- Reach for it when **several repos need the same setup**, or to distribute reviewed team standards
- Start repo-local — extract a plugin once the setup is actually shared

```text
engineering-plugin/
├── .claude-plugin/
│   └── plugin.json        # manifest
├── skills/pr-review/
├── agents/code-reviewer.md
├── hooks/hooks.json
└── .mcp.json
```

<!--
Plugin = Verteilungsschicht. Für ein einzelnes Repo reichen lokale Skills, Agents und Hooks. Erst wenn
mehrere Repos oder Teams dasselbe Setup brauchen, lohnt sich ein Plugin. Nur plugin.json liegt in
.claude-plugin/, alle Komponentenordner im Plugin-Root.
-->

---

# Plugin: <small>Manifest & install</small>

`.claude-plugin/plugin.json`

```json
{
  "name": "engineering-workflows",
  "version": "1.0.0",
  "description": "Shared Claude Code workflows for engineering teams"
}
```

Install from an internal marketplace:

```text
/plugin marketplace add ./company-claude-marketplace
/plugin install engineering-workflows@company-tools
```

Components are namespaced with the plugin name, e.g. `/engineering-workflows:pr-review`.

<!--
Im Manifest ist nur name Pflicht, version aber dringend empfohlen für nachvollziehbare Updates. Teams
verteilen Plugins über ein internes Marketplace-Repo. Nur vertrauenswürdige Quellen hinzufügen — Plugins
bringen Hooks, MCP-Server und Binaries mit und laufen lokal mit den Rechten des Users.
-->
