---
layout: chapter
no: 4
background: /backgrounds/4.webp
---

# Accelerating Implementation

<!--
Auf Basis der ganzen Dokumente die wir in der Produkt- und Architekturplanung erzeugt haben, können wir nun die Implementierung beginnen.
-->

---
src: ./context-challenges/slides.md
---

---
layout: intro
background: petrol
---

### *Agent Features*
# From *Primitives* to *Control*

<!--
Wir bauen jetzt das mentale Modell für alles, was ein Agent ausmacht.
Drei Ebenen, die du dir merken solltest.
-->

---
layout: default
background: white
---

# Three Levels

<div class="grid grid-cols-3 gap-6 pt-10 text-center text-petrol">
  <div class="bg-lightGray px-6 py-8">
    <div class="text-apricot font-serif italic text-xl mb-3">Level 1 — Block A</div>
    <h2 class="!text-3xl !mb-4">Primitives</h2>
    <p class="text-base">What the agent <em>has</em></p>
  </div>
  <div class="bg-lightGray px-6 py-8">
    <div class="text-apricot font-serif italic text-xl mb-3">Level 2 — Block B</div>
    <h2 class="!text-3xl !mb-4">Modes</h2>
    <p class="text-base">How the agent <em>operates</em></p>
  </div>
  <div class="bg-lightGray px-6 py-8">
    <div class="text-apricot font-serif italic text-xl mb-3">Level 3 — Block C</div>
    <h2 class="!text-3xl !mb-4">Control</h2>
    <p class="text-base">How <em>I stay</em> in charge</p>
  </div>
</div>

<!--
Drei Ebenen, ein roter Faden.

Block A — die Primitives. Was hat der Agent? Memory, Instructions, Tools, Verification, Delegation.
Das sind die fünf Bausteine.

Block B — die Modes. Wenn ich an den Primitives schraube, bekomme ich verschiedene Profile:
Planning, Assisted, Autopilot, YOLO, Research.

Block C — die operative Kontrolle. Wenn der Agent läuft, wie behalte ich den Überblick?
Session, Fleet, Ecosystem.
-->

---
src: ./context-management/slides.md
---

---
src: ./agent-modes/slides.md
---

---
src: ./additional-agent-features/slides.md
---

---
layout: exercise
chapter: 4
exercise: 1 + 2
task: Setup backend development
command: git switch main
---

---
src: ./agent-setup/slides.md
---

---
layout: intro
background: petrol
---

### *Development*
# Processes


---
src: ./autonomy-and-topology/slides.md
---

---
background: white
---

# From Spectrum to Practice

<div class="text-center text-base mb-6">We skip the old normal & zoom into the agentic end</div>

<div class="flex items-start justify-between gap-3 px-2 text-petrol">
  <div class="opacity-30"><EmojiStack emoji="🙌" size="lg"><p class="my-0 text-base font-bold">Manual</p></EmojiStack></div>
  <div class="opacity-30"><EmojiStack emoji="💪" size="lg"><p class="my-0 text-base font-bold">Assisted</p></EmojiStack></div>
  <div><EmojiStack emoji="📋" size="lg"><p class="my-0 text-base font-bold">SDD</p><p class="my-0 text-xs text-apricot font-serif italic">deep dive</p></EmojiStack></div>
  <div><EmojiStack emoji="🛡️" size="lg"><p class="my-0 text-base font-bold">Harness</p><p class="my-0 text-xs text-apricot font-serif italic">deep dive</p></EmojiStack></div>
  <div><EmojiStack emoji="🏄" size="lg"><p class="my-0 text-base font-bold">Vibed</p><p class="my-0 text-xs text-apricot font-serif italic">deep dive</p></EmojiStack></div>
  <div class="opacity-30"><EmojiStack emoji="🏭" size="lg"><p class="my-0 text-base font-bold">Autonomous</p></EmojiStack></div>
</div>

<div class="mt-12 grid grid-cols-3 gap-4 text-center text-petrol">
  <div class="bg-lightGray px-4 py-3"><span class="text-apricot font-serif italic">1</span><br/><strong>Vibe Coding</strong></div>
  <div class="bg-lightGray px-4 py-3"><span class="text-apricot font-serif italic">2</span><br/><strong>Spec-Driven Development</strong></div>
  <div class="bg-lightGray px-4 py-3"><span class="text-apricot font-serif italic">3</span><br/><strong>Harness Engineering</strong></div>
</div>

<!--
Übergang vom Spektrum in die Praxis. Manual und Assisted sind der alte Normalfall — die
lassen wir bewusst links liegen, darüber müssen wir nicht weiter reden. Autonomous ist das
ganz andere Ende: die "Software-Factory" — das vertiefen wir erst in Kapitel 9.

Wir zoomen jetzt ins agentische Feld und gehen drei Wege durch: zuerst Vibe Coding (der
wilde Einstieg), dann Spec-Driven Development (Disziplin), dann Harness Engineering (die
konstruierte Mitte — Ziel + Constraints + Validierung).
-->

---
src: ./vibe-coding/slides.md
---


---
src: ./spec-driven-development/slides.md
---

---
src: ./harness-engineering/slides.md
---

---
src: ./coding-with-agents/slides.md
---

---
layout: exercise
chapter: 4
exercise: 6
task: Coding Buddy
command: git merge uebung-3-6
---


---
layout: exercise
chapter: 4
exercise: 7
task: Create a pull request
command: git merge uebung-3-7
---


---
layout: exercise
chapter: 4
exercise: 8
task: Making Reviews
command: git merge uebung-3-8
---


---
layout: chapter
background: /backgrounds/4.webp
label: Recap
---

# Day 2

---
layout: intro
background: apricot
---

### *What is?*
# Vibe Coding

---
layout: intro
background: apricot
---

### *How can we use?*
# Test Driven Development

---
layout: intro
background: apricot
---

### *What is?*
# Spec Driven Development

---
src: ./development-use-cases/slides.md
---

---
layout: exercise
chapter: 4
exercise: 9
task: Optimize context with subagents
command: git merge uebung-3-9
---


---
layout: center
---

<img src="./assets/programmer-excuse-generating.png" class="mx-auto max-h-[78%] w-auto object-contain" />


---
layout: exercise
chapter: 4
exercise: 10
task: Parallelize work
command: git merge uebung-3-10
---


---
src: ./token-economy/slides.md
---

---
layout: takeaways
chapter: 4
---

1. Curated context enables bigger tasks
2. Use TDD to enhance the feedback loop
3. You push it, you own it
4. No vibe coding for production

