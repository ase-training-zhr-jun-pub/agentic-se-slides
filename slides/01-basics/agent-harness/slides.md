---
layout: intro
background: petrol
---

### *Understanding*
# The Agent Harness


---
layout: content-with-image
---

# What is an agent?

- Uses an interchangeable LLM as a brain
- Has memory loss after a couple of beers
- Can change the environment
- Has access to external sources
- Has a set of tools to get the job done
- Got an attitude

::image::

<img src="./assets/bender-tool-belt.png" alt="" class="h-full w-full object-cover" />

<!--
Manages the context for you. Or tries to.
-->

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


---
layout: center
background: petrol
---

<div max-w="4/5" text-balance space-y-16>

## The agent *modifies* the environment to achieve goals.

## Unlike assistants that return data, agents *change state*.

</div>

---
layout: sidebar
sidebarBackground: petrol
image: /backgrounds/5.webp
---

# Tools

- Read (files, code, config)
- Write (create, edit, delete)
- Execute (commands, tests, builds)
- Search (grep, find, LSP)

<h3 mt-10> Tools define the <em>capability boundary</em> of the agent</h3>

::sidebar::

<h4 class="text-center">How agents interact with the <em>environment</em></h4>


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

<h4 class="text-center">Closing the <em>loop</em></h4>


---

# The Control<br/>Loop

<div class="flex items-center justify-center h-4/5">
  <div class="absolute inset-0">
    <ArcLine
      class="text-petrol"
      center="50% 56%"
      radius="36%"
      :startAngle="77"
      :endAngle="143"
      head="arrow"
      :strokeWidth="3"
      clockwise
    />
    <ArcLine
      class="text-petrol"
      center="50% 56%"
      radius="36%"
      :startAngle="-33"
      :endAngle="23"
      head="arrow"
      :strokeWidth="3"
      clockwise
    />
    <ArcLine
      class="text-petrol"
      center="50% 56%"
      radius="36%"
      :startAngle="197"
      :endAngle="283"
      head="arrow"
      :strokeWidth="3"
      clockwise
    />
    <EmojiStack class="absolute anchor-center left-[60%] top-[20%]" name="zap" size="lg">
      <h3>Act</h3>
      <p text-sm>Execute tool,<br/>modify environment</p>
    </EmojiStack>
    <EmojiStack class="absolute anchor-center left-[63%] top-[77%]" name="eye" size="lg">
      <h3>Observe</h3>
      <p text-sm>Read results,<br/>evaluate progress</p>
    </EmojiStack>
    <EmojiStack class="absolute anchor-center left-[30%] top-[62%]" name="brain" size="lg">
      <h3>Reason</h3>
      <p text-sm>Analyze situation,<br/>plan next step</p>
    </EmojiStack>
  </div>
</div>


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

- **Linear** execution path
- Returns data to human
- Human provides context
- No environment modification

::right::

# Agent

<img h-44 object-contain mb-8 mx-auto src="./assets/agent-workflow.png" />

- Uses **iterative feedback** loop
- Modifies environment directly
- Discovers own context
- Self-corrects on errors

::badge::

<div class="w-20 h-20 rounded-full bg-white flex items-center justify-center">
  <div class="font-serif italic text-4xl text-petrol">vs.</div>
</div>

<!--
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
