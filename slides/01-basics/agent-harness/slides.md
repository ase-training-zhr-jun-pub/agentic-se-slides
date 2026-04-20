---
layout: intro
background: petrol
---

### *Understanding*
# The Agent Harness

<!-- Master reference: Chapter 1 / Slide 045 -->

---
layout: content-with-image
image: ./assets/bender-tool-belt.png
---

# What is an agent?

- Uses an interchangeable LLM as a brain
- Has memory loss after a couple of beers
- Can change the environment
- Has access to external sources
- Has a set of tools to get the job done
- Got an attitude

<!-- Master reference: Chapter 1 / Slide 046 -->

---
layout: sidebar
sidebarBackground: petrol
image: /backgrounds/5.webp
---

# Environment

- Filesystem (code, configs, docs)
- Version Control (git)
- APIs and Services
- Databases
- Terminal / Shell
- IDE / LSP

## The agent's "world"

::sidebar::

<h3 class="text-center">What the<br/>agent<br/><em>operates on</em></h3>

<!-- Master reference: Chapter 1 / Slide 047 -->

---
layout: center
---

## The agent modifies the environment to achieve goals.

## Unlike assistants that return data, agents **change state**.

<!-- Master reference: Chapter 1 / Slide 048 -->

---
layout: sidebar
sidebarBackground: petrol
image: /backgrounds/5.webp
---

# Tools

- Read
  - Files, code, config
- Write
  - Create, edit, delete
- Execute
  - Commands, Tests, Builds
- Search
  - Grep, Find, LSP

## Tools define the *capability boundary* of the agent

::sidebar::

<h3 class="text-center">How agents<br/>interact<br/>with the<br/><strong>environment</strong></h3>

<!-- Master reference: Chapter 1 / Slide 049 -->

---
layout: sidebar
sidebarBackground: petrol
image: /backgrounds/5.webp
---

# Observation & Feedback

What agents observe:
- Tool Results - Output from actions
- Error Messages - Compilation, runtime
- Test Results - Pass/fail status
- Diagnostics - LSP warnings, lints
- State Changes - Git diff, file changes

::sidebar::

<h3 class="text-center">Closing<br/>the<br/><strong>loop</strong></h3>

<!-- Master reference: Chapter 1 / Slide 050 -->

---

# The Control Loop

<div class="flex items-center justify-center h-4/5">
  <div class="relative w-120 h-90">
    <div class="absolute top-0 right-16 text-center">
      <div class="text-4xl">⚡</div>
      <h3 class="mt-1">Act</h3>
      <p class="text-sm">Execute tool,<br/>modify environment</p>
    </div>
    <div class="absolute left-0 top-1/3 text-center">
      <div class="text-4xl">🧠</div>
      <h3 class="mt-1">Reason</h3>
      <p class="text-sm">Analyze situation,<br/>plan next step</p>
    </div>
    <div class="absolute bottom-0 right-16 text-center">
      <div class="text-4xl">👁️</div>
      <h3 class="mt-1">Observe</h3>
      <p class="text-sm">Read results,<br/>evaluate progress</p>
    </div>
    <div class="absolute top-12 left-24 text-4xl text-petrol">↗</div>
    <div class="absolute top-12 right-4 text-4xl text-petrol">↘</div>
    <div class="absolute bottom-16 left-16 text-4xl text-petrol">↖</div>
  </div>
</div>

<!-- Master reference: Chapter 1 / Slide 051 -->

---
layout: comparison
leftBackground: apricot
rightBackground: petrol
leftBodyBackground: white
rightBodyBackground: white
---

::left::

# Assistant

<img h-44 object-contain mb-8 mx-auto src="./assets/assistant-worflow.png" />

- Linear execution path
- Returns data to human
- Human provides context
- No environment modification

::right::

# Agent

<img h-44 object-contain mb-8 mx-auto src="./assets/agent-workflow.png" />

- Uses Iterative feedback loop
- Modifies environment directly
- Discovers own context
- Self-corrects on errors

::badge::

<div class="w-20 h-20 rounded-full bg-white flex items-center justify-center">
  <div class="font-serif italic text-4xl text-petrol">vs.</div>
</div>

<!--
Master reference: Chapter 1 / Slide 052

(Assistants)
Assistants bekommen einen Prompt und liefern eine Ausgabe

Sie können für eine bessere Ausgabe auch auf Daten, und Tools zurückgreifen.

Ziel ist es aber am Ende einen Output-Text zu produzieren

(Agents)
Agents gehen jetzt noch weiter.

Sie sollen Aufgaben übernehmen.

Wichtig ist nicht mehr die Ausgabe, sondern dass die Umgebung beeinflusst wurde.

Dabei hängen sie in einer Feedback-Schleife mit der Umgebung uns stoppen erst, wenn sie von der Umgebung das Feedback bekommen haben, dass die Aufgabe gelöst ist

Der Mensch gibt nur noch einen Prompt rein und den Rest übernimmt der Agent.

Die Umgebung wird dabei durch Tools beeinflusst.
-->

---
layout: center
background: petrol
---

# Think of agents as *interns*.<br/>Always *verify* their work.

<!-- Master reference: Chapter 1 / Slide 053 -->
