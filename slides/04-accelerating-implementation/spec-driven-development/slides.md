---
layout: intro
background: apricot
---

### *Let's talk about*
# Spec Driven Development

<!-- Master reference: Chapter 4 / Slide 173 -->

---
layout: two-cols
leftBackground: white
rightBackground: white
alignContent: center
---

::left::

# Spec Driven Development

- New term popularized by GitHub
- Announced with SpecKit
- Tooling around a fixed dev process
- Tells an agent exactly how to code

  
::right::

<div flex justify-center>

```mermaid
flowchart TD
  A[Specify] --> B[Plan]
  B --> C[Tasks]
  C --> D[Implement]
```

</div>

<!-- Master reference: Chapter 4 / Slide 174 -->

---

# 1. Specify

Use existing documentation like
- Epics and user stories
- Wikis
- Architecture documentation
- UX documentation

**Important:**

1. The agent must have access
2. Keep it close to the agent
3. Use text-based formats

<!-- Master reference: Chapter 4 / Slide 175 -->

---

# 2. Plan

Create a plan for implementing the specs.

- What are the specs?
- How exactly do we meet the acceptance criteria?
- How does that affect the architecture?
- How does that change the domain model?
- Do we have to migrate the database?
- ...

<!-- Master reference: Chapter 4 / Slide 176 -->

---

# 3. Tasks

- Split the plan into small, reviewable chunks
- If possible, create independent tasks
  - This enables working with multiple agents without merge conflicts
- Each task contains all information needed to start implementation

<!-- Master reference: Chapter 4 / Slide 177 -->

---

# 4. Implement

- Implement the tasks
- Review the code
- Use specialized agents and set up feedback loops
  - Database migration expert -> needs database access
  - Backend developer -> can test the backend
  - Frontend developer -> has browser access
  - Debugging expert -> has access to logs and debugger
  - ...

<!-- Master reference: Chapter 4 / Slide 178 -->

---
layout: default
background: white
---

# Specs vs. Memory

<div class="grid grid-cols-2 gap-12">
  <div class="bg-lightGray px-8 py-8 text-center">
    <h3 class="!text-3xl !mb-4">Memory Bank</h3>
    <div class="mt-6 flex flex-col gap-4">
      <div class="bg-apricot px-6 py-3 text-xl">Agents.md</div>
      <div class="bg-apricot px-6 py-3 text-xl">Arc42.md</div>
      <div class="bg-apricot px-6 py-3 text-xl">Requirements.md</div>
      <div class="text-2xl">...</div>
    </div>
  </div>

  <div class="bg-lightGray px-8 py-8 text-center">
    <h3 class="!text-3xl !mb-4">Specs</h3>
    <div class="mt-6 flex flex-col gap-4">
      <div class="bg-apricot px-6 py-3 text-xl">Story-042</div>
      <div class="bg-apricot px-6 py-3 text-xl">Subtask-123</div>
      <div class="bg-apricot px-6 py-3 text-xl">Plan-123</div>
      <div class="text-2xl">...</div>
    </div>
  </div>
</div>

<!-- Master reference: Chapter 4 / Slide 179 -->

---
layout: multi-col
---

::header::

<h1 class="text-petrol !text-5xl !mb-8">Spec Implementation Levels</h1>

<div class="grid grid-cols-3 gap-8 text-xl leading-snug">
  <div>
    <div class="mb-5 bg-apricot px-4 py-4 text-center text-2xl">Spec First</div>
    <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
      <div class="text-apricot">1.</div><div>Write a Spec</div>
      <div class="text-apricot">2.</div><div>Use the Spec when implementing</div>
      <div class="text-apricot">3.</div><div>Throw the spec away</div>
    </div>
  </div>
  <div>
    <div class="mb-5 bg-apricot px-4 py-4 text-center text-2xl">Spec Anchored</div>
    <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
      <div class="text-apricot">1.</div><div>Write a Spec</div>
      <div class="text-apricot">2.</div><div>Use the Spec when implementing</div>
      <div class="text-apricot">3.</div><div>Keep the Spec</div>
      <div class="text-apricot">4.</div><div>Update the Spec when something changes</div>
    </div>
  </div>
  <div>
    <div class="mb-5 bg-apricot px-4 py-4 text-center text-2xl">Spec as Source</div>
    <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
      <div class="text-apricot">1.</div><div>Write a Spec</div>
      <div class="text-apricot">2.</div><div>Use the Spec when implementing</div>
      <div class="text-apricot">3.</div><div>Keep the Spec</div>
      <div class="text-apricot">4.</div><div>Update the Spec when something changes</div>
      <div class="text-apricot">5.</div><div>Throw away the code and rebuild from Spec</div>
    </div>
  </div>
</div>

---

# SDD Frameworks

<div class="grid grid-cols-4 gap-6 pt-20 text-center text-petrol">
  <div>
    <h3 class="!text-3xl !mb-6">Spec Kit</h3>
    <p class="mx-auto max-w-[15rem] break-words font-serif italic text-xl leading-snug text-petrol/40">https://github.github.com/spec-kit/</p>
  </div>
  <div>
    <h3 class="!text-3xl !mb-6">OpenSpec</h3>
    <p class="mx-auto max-w-[15rem] break-words font-serif italic text-xl leading-snug text-petrol/40">https://openspec.dev/</p>
  </div>
  <div>
    <h3 class="!text-3xl !mb-6">BMAD</h3>
    <p class="mx-auto max-w-[15rem] break-words font-serif italic text-xl leading-snug text-petrol/40">https://docs.bmad-method.org/</p>
  </div>
  <div>
    <h3 class="!text-3xl !mb-6">Tessl</h3>
    <p class="mx-auto max-w-[15rem] break-words font-serif italic text-xl leading-snug text-petrol/40">https://tessl.io</p>
  </div>
</div>

---
layout: exercise
chapter: 4
exercise: 5
task: Planning & Task Breakdown
command: git merge uebung-3-5
---

<!-- Master reference: Chapter 4 / Slide 180 -->
