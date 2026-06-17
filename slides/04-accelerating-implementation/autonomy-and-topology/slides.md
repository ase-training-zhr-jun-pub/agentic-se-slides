---
layout: intro
background: apricot
---

### *How autonomous?*
# The Autonomy Spectrum

<!--
Wir haben jetzt gesehen was ein Agent ist und welche Tools es draußen gibt.
Aber: Agenten sind nicht entweder "an" oder "aus". Sie sitzen auf einem Spektrum.
Auf dem Spektrum bewegen wir uns je nach Aufgabe, Vertrauen und Risiko.
-->

---
background: white
---

# The Autonomy Spectrum *at a glance*

<div class="block mt-10 mb-4">
  <div class="text-center text-base">← more human — more agentic →</div>
</div>
<div class="flex items-center justify-between gap-3 mt-20 px-2 text-petrol">
  <div class=""><EmojiStack emoji="🙌" size="lg"><p class="my-0 text-lg font-bold">Manual Coding</p></EmojiStack></div>
  <div class=""><EmojiStack emoji="💪" size="lg"><p class="my-0 text-lg font-bold">Assisted Coding</p></EmojiStack></div>
  <div class=""><EmojiStack emoji="📋" size="lg"><p class="my-0 text-lg font-bold">SDD</p></EmojiStack></div>
  <div class=""><EmojiStack emoji="🛡️" size="lg"><p class="my-0 text-lg font-bold">Harness</p></EmojiStack></div>
  <div class=""><EmojiStack emoji="🏄" size="lg"><p class="my-0 text-lg font-bold">Vibed</p></EmojiStack></div>
  <div class=""><EmojiStack emoji="🏭" size="lg"><p class="my-0 text-lg font-bold">Factory</p></EmojiStack></div>
</div>

<!--
Dieselben sechs Stufen wie in der Tabelle — nur fürs Auge. Die Treppe steigt nach rechts:
mehr Agent, weniger Mensch. Das Tag unter jedem Level ist die Kernkompetenz, die der
Mensch auf dieser Stufe braucht — sie verschiebt sich vom Handwerk zur Ziel-Definition.

Inspiriert von Dan Shapiros "Five Levels — from spicy autocomplete to the software factory".
-->

---

# The Autonomy Spectrum — *in detail*

<div class="text-center text-petrol mb-3 text-base">← more human — more agentic →</div>

<div class="text-xs [&_td]:!py-1 [&_th]:!py-1 [&_td]:!px-2 [&_th]:!px-2">

| | 🙌 <br/>Manual | 💪 <br/>Assisted | 📋 <br/>SDD | 🛡️<br/> Harness | 🏄 <br/>Vibed | 🏭 <br/>Autonomous |
|---|---|---|---|---|---|---|
| **Specs** | Human | Human | Human & Agent | Human & Agent | Human <br/> (Rough idea) | Agent derives |
| **Planning** | Human | Human | Human & Agent | Human & Agent | Agent | Agent |
| **Implementation** | Human | Human + assist | Agents | Agents | Agent | Agent Teams |
| **Control** | Human review | Human review | Human & Agent reviews | Human & Agent reviews | No review | Agent self-review |
| **Feedback** | Human | Human | Human | Human & Backpressure | Human | Human<br/> (on deliverable) |

</div>

<!--
Die Spalten von rechts nach links lesen — Manual ganz rechts, Autonomous ganz links.
Mit jeder Stufe gibt der Mensch mehr Kontrolle ab. Die Kernkompetenz des Menschen verschiebt sich:
Vom Handwerk über Spezifikation hin zu Goal-Definition und Harness-Design.

Wichtig: Die "Control"-Zeile zeigt was passiert wenn Code geprüft wird — nicht ob.
Bei Vibe Coded gibt es schlicht keinen Review. Bei Harness Engineering übernimmt
das ein deterministisches Validierungssystem (Tests, Linter, Hooks).

Harness Engineering ist die Mitte: Mensch definiert Ziel + Constraints, Agent arbeitet
selbständig, eine Validierungs-Schicht stellt sicher dass das Ergebnis brauchbar ist.
-->

---
layout: center
background: petrol
---

<div max-w="4/5" text-balance space-y-12>

## The level you choose depends on *task, trust, and risk*.

## A team can operate in *multiple* levels simultaneously.

</div>

<!--
Niemand sitzt auf einer Stufe fest. Für eine Story-Refinement-Session wählt man Manual.
Für ein Bugfix mit guten Tests vielleicht Spec Driven. Für die x-te
Datenmigration mit etablierter Pipeline Harness Eng oder gar Autonomous.
-->

---
layout: intro
background: apricot
disabled: true
---

### *Orthogonal axis*
# Agent Topology

<!--
Die Autonomie-Stufe ist eine Dimension. Eine zweite, unabhängige Dimension ist die Topologie:
Wie viele Agenten arbeiten parallel? Ein Agent kann auf jeder Autonomie-Stufe laufen — solo oder im Schwarm.
-->

---
background: white
disabled: true
---

# Agent Topology *at a glance*

<div class="text-center text-base mb-2">← Solo — Delegated →</div>

<div class="flex items-center justify-around gap-4 mt-16 text-petrol">
  <EmojiStack emoji="🤖" size="lg">
    <p class="my-0 text-xl font-bold">Solo</p>
    <p class="my-0 text-sm leading-snug">One agent,<br/>one task</p>
  </EmojiStack>
  <div class="text-4xl text-apricot">—</div>
  <EmojiStack emoji="🤖 🔄 🤖 🤖" size="lg">
    <p class="my-0 text-xl font-bold">Sub-Agents</p>
    <p class="my-0 text-sm leading-snug">Orchestrator +<br/>isolated context</p>
  </EmojiStack>
  <div class="text-2xl text-apricot">—</div>
  <EmojiStack emoji="🤖 🔄 🌿🤖 🌿🤖 🌿🤖" size="lg">
    <p class="my-0 text-xl font-bold">Multi-Branch</p>
    <p class="my-0 text-sm leading-snug">Parallel branches,<br/>async delegation</p>
  </EmojiStack>
</div>

<!--
Visuelles Gegenstück zur Autonomie-Treppe — dieselben drei Topologien wie in der Tabelle.
Solo: ein Mensch, ein Agent. Sub-Agents: ein Orchestrator delegiert an isolierte Sub-Agents.
Multi-Branch: mehrere Agents auf eigenen Branches, asynchron. Von links nach rechts wächst
die Delegation — und mit ihr der Koordinationsaufwand.
-->

---
disabled: true
---

# Agent Topology — *How Many Agents?*

<div class="text-center mb-3 text-base">← Solo — Delegated →</div>

<div class="text-sm">

| | Solo Agent | Sub-Agent Architecture | Multi-Branch / Delegated |
|---|---|---|---|
| **Description** | One agent, one task | Parent orchestrates,<br /> sub-agents isolate context | Multiple agents, independent branches |
| **Coordination** | None needed | Context firewall, progressive disclosure | Branches + PRs, optional worktrees |
| **Example** | Claude Code solo (CLI / IDE) | Claude Code Subagents, Custom Agents | Claude Code Teams, `@claude` on GitHub Issues/PRs |
| **Strength** | Simplicity | Controlled autonomy, no context rot | Throughput, async delegation |
| **Risk** | Context limit on large tasks | Orchestration overhead, token cost | Merge conflicts, architectural drift |

</div>

<div class="mt-6 bg-lightGray px-4 py-3 text-sm">

Topology is *independent* of autonomy level. Each cell can combine with any column from the Autonomy Spectrum.

</div>

<!--
Solo: Klassisch. Ein Agent, ein Terminal, eine Aufgabe.

Sub-Agents: Ein orchestrierender Parent-Agent delegiert isolierte Tasks an Sub-Agents,
die in eigenem Context arbeiten. In Claude Code ist das der Task-Tool-Mechanismus — er
parallelisiert Sub-Agents innerhalb einer Session, jeder mit eigenem Context Window.
Custom Agents (.claude/agents/*.md) liefern die Spezialisierung.

Multi-Branch / Delegated: Mehrere Agenten arbeiten parallel auf eigenen Branches an
verschiedenen Features. Über die Claude GitHub App läuft das nativ über Issues/PRs:
@claude zuweisen → eigener Branch + PR pro Task → walk away. Claude Code Teams und
Conductor sind alternative Implementierungen des gleichen Mental Models.

Sweet Spot 3-8 parallele Tasks mit visueller Übersicht.

Wichtig zu betonen: Eine Multi-Branch-Fleet auf YOLO-Niveau ist etwas radikal anderes
als auf Spec Driven Niveau. Topologie und Autonomie sind orthogonale Achsen.
-->

---
layout: intro
background: apricot
disabled: true
---

### *The other side of the table*
# Human Topology

<!--
Bis jetzt ging es nur um Agents. Aber die zweite Hälfte der Gleichung sind die Menschen.
Wie viele arbeiten zusammen? Das war lange trivial — wird mit Agents aber zur Kernfrage.
-->

---
background: white
disabled: true
---

# Human Topology — *Before Agents*

<div></div>
<div class="flex items-center justify-center gap-24 mt-25 text-petrol">
  <EmojiStack emoji="🧑‍💻" size="lg">
    <p class="my-0 text-2xl font-bold">Human solo</p>
    <p class="my-0 text-base leading-snug">One person,<br/>full ownership</p>
  </EmojiStack>
  <EmojiStack emoji="👥" size="lg">
    <p class="my-0 text-2xl font-bold">Human-only team</p>
    <p class="my-0 text-base leading-snug">Dev team,<br/>shared ownership</p>
  </EmojiStack>
</div>

<div class="mt-16 text-center text-base text-petrol">
The normal case — so far.
</div>

<!--
Zwei Baseline-Topologien ohne Agents: Eine Person allein, oder ein klassisches Team.
Das war der Normalfall. Jetzt kommen die Agents obendrauf — und vervielfachen die Konstellationen.
-->

---
background: white
disabled: true
---

# Human Topology — *With Agents on Top*

<div class="grid grid-cols-2 gap-8 mt-6 text-petrol">

<div>
<div class="text-petrol text-lg mb-3">🧑‍💻 Human solo</div>
<div class="space-y-3">
  <div class="bg-lightGray px-4 py-3"><span class="text-2xl mr-2">🧑‍💻 + 🤖</span><br/><strong>Agent solo</strong> — one human drives one agent</div>
  <div class="bg-lightGray px-4 py-3"><span class="text-2xl mr-2">🧑‍💻 + 🤖🤖🤖</span><br/><strong>Agent team</strong> — one human orchestrates a fleet</div>
</div>
</div>

<div>
<div class="text-petrol text-lg mb-3">👥 Human team</div>
<div class="space-y-3">
  <div class="bg-lightGray px-4 py-2"><span class="text-2xl mr-2">🧑‍💻🤖 + 🧑‍💻🤖 + 🧑‍💻🤖</span><br/><strong>One agent per member</strong> — isolated, everyone on their own</div>
  <div class="bg-lightGray px-4 py-2"><span class="text-2xl mr-2">👥 → 🤖</span><br/><strong>Agentic ensemble</strong> — team drives one agent together (mob)</div>
  <div class="bg-lightGray px-4 py-2"><span class="text-2xl mr-2">👥 + 🤖🤖🤖</span><br/><strong>Agent teams</strong> — human team plus agent teams</div>
</div>
</div>

</div>

<!--
Sobald Agents dazukommen, explodiert die Matrix. Fünf Konstellationen, gruppiert nach
Mensch-solo und Mensch-Team:

Human solo: ein Mensch + ein Agent (klassisch), oder ein Mensch + eine ganze Agent-Flotte.

Human team — hier wird es spannend:
- Jeder hat seinen eigenen Agent, isoliert — jeder werkelt für sich. Risiko: Wildwuchs, Drift.
- Agentic Ensemble / Mob: das ganze Team steuert gemeinsam EINEN Agent — wie Mob-Programming.
- Human team + Agent teams: das volle Programm, Teams aus Menschen und Teams aus Agents.

Das blüht uns in den Teams. Die Kernfragen verschieben sich von "wie code ich" zu
"wie koordinieren wir" und "wer ownt das Ergebnis".
-->
