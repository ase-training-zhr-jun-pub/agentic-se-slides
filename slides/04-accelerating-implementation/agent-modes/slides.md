---
layout: intro
background: petrol
---

### *Block B — How do the primitives combine?*
# Agent Modes

<!--
Block B: wenn ich die Primitives unterschiedlich konfiguriere, bekomme ich verschiedene "Modes".
Modes sind keine eigenen Features — sie sind nur Profile auf den Slidern der Primitives.
-->

---

# Agent Modes

<div class="text-xl [&_td]:!py-3 [&_th]:!py-3">

| Mode | In plain terms | Human role |
|---|---|---|
| **Planning** | Thinks first, changes nothing — produces a plan | Reviews the plan |
| **Assisted / Interactive** | Works step by step, asks before acting | Approves every step |
| **Autopilot** | Runs on its own, checks guard the work | Steps in on failures |
| **Research** | Reads and searches, gathers findings | Reviews the result |

</div>

<div class="mt-6 text-petrol text-sm">

Modes aren't magic. They're *sliders on the primitives* you could also configure manually. With harness engineering, you build your own custom modes.

</div>

<!--
Jeder Mode ist nur eine Voreinstellung auf den Primitives aus Block A.

Plan Mode — in Claude Code via Shift+Tab (Modus-Wechsel) oder `/plan`:
Read-only, kein Schreiben, nur Plan.

Assisted/Interactive — der klassische Modus (Default in Claude Code). Jedes Tool will
Approval, jeder Edit geht durch den Menschen.

Autopilot — Skills sind aktiv, Tools auto-approved, Hooks laufen auf Stop, der Mensch
wird nur beim Gate-Failure aktiv. Hier zahlt sich Verification aus. In Claude Code:
auto-accept (Shift+Tab) bzw. headless mit Permission-Allowlists. Ohne Guardrails kippt
Autopilot in "YOLO" (--dangerously-skip-permissions) — gleiches Prinzip ohne
Sicherheitsgurte, nur in Sandbox + isoliertem Branch sinnvoll.

Research — anderer Tool-Mix (Search statt Edit), Sub-Agents für deep research, am Ende
ein Output-Doc.

Die folgenden vier Folien dröseln jeden Mode in Alltagssprache auf.
-->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>Think first — produce a plan, change nothing</h2>

- The agent explores and proposes an approach, but makes no changes
- Read-only: safe to run even on important projects
- You review and adjust the plan before any work starts
- Best when the task is fuzzy or the stakes are high

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Mode</em></h3>
  <h1 class="text-white">Planning</h1>
</div>

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>Step by step, with your hand on the wheel</h2>

- The agent proposes one action at a time and waits
- You approve — or correct — before each step happens
- Slow, but maximally controlled: nothing happens behind your back
- Best for getting to know the agent, or for sensitive changes

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Mode</em></h3>
  <h1 class="text-white">Assisted</h1>
</div>

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>Runs on its own, checks keep it honest</h2>

- The agent acts without asking for each step
- Automatic checks catch mistakes and make it self-correct
- You step in only when a check fails or the agent derails — "human *on* the loop"
- Needs good guardrails first; without them it's just "no seatbelts"

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Mode</em></h3>
  <h1 class="text-white">Autopilot</h1>
</div>

<!--
Hier lebt der ehemalige YOLO-Mode: Autopilot ohne Guardrails. Gleiches Prinzip, nur ohne
Sicherheitsnetz — gehört in eine Sandbox auf einem isolierten Branch.
-->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

<h2 text-balance>Gather and synthesize, don't change things</h2>

- The agent reads, searches, and fetches — it doesn't edit
- It often delegates the digging to helper agents, then reports back
- Produces a summary or document for you to review
- Best for exploring a topic, a codebase, or a set of options

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Mode</em></h3>
  <h1 class="text-white">Research</h1>
</div>

---
layout: center
background: petrol
---

<div max-w="4/5" text-balance space-y-12>

## Each level on the *Autonomy Spectrum* roughly corresponds to a mode.

## Or a *custom mode* you build yourself.

</div>

<!--
Brücke zurück zur Autonomy-Spectrum-Folie aus Block 1:
Manual ≈ kein Mode (rein menschlich)
Assisted ≈ Assisted/Interactive Mode
Spec Driven ≈ Planning Mode + Autopilot in Sequenz
Harness Engineering ≈ custom Autopilot mit Hooks
Vibe Coded ≈ YOLO
Autonomous ≈ headless Autopilot mit Verification
-->
