---
layout: intro
background: petrol
---

### *Use Agents for*
# Spec Driven Development

<!-- Master reference: Chapter 4 / Slide 173 -->

---
layout: two-cols
---

::left::

# Spec Driven Development

- New term popularized by GitHub
- Announced with SpecKit
- Tooling around a fixed development process
- Tells an agent exactly how to code

::right::

<div class="h-full flex flex-col justify-center gap-8 text-center">
  <div class="bg-apricot text-white text-3xl font-semibold px-6 py-5">1. Specify</div>
  <div class="bg-apricot text-white text-3xl font-semibold px-6 py-5">2. Plan</div>
  <div class="bg-apricot text-white text-3xl font-semibold px-6 py-5">3. Tasks</div>
  <div class="bg-apricot text-white text-3xl font-semibold px-6 py-5">4. Implement</div>
</div>

<!-- Master reference: Chapter 4 / Slide 174 -->

---

# 1. Specify

## Spec Driven Development

Use existing documentation like

- Epics and user stories
- Wikis
- Architecture documentation
- UX documentation

## Important

1. The agent must have access
2. Keep it close to the agent
3. Use text-based formats

<!-- Master reference: Chapter 4 / Slide 175 -->

---

# 2. Plan

## Spec Driven Development

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

## Spec Driven Development

- Split the plan into small, reviewable chunks
- If possible, create independent tasks
  - This enables working with multiple agents without merge conflicts
- Each task contains all information needed to start implementation

<!-- Master reference: Chapter 4 / Slide 177 -->

---

# 4. Implement

## Spec Driven Development

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
layout: two-cols
---

::left::

# Specs vs. Memory

## Spec Driven Development

<div class="mt-10 bg-lightGray px-8 py-10 text-center">
  <h3 class="!text-4xl">Memory Bank</h3>
  <div class="mt-8 flex flex-col gap-6">
    <div class="bg-apricot px-6 py-4 text-2xl">Agents.md</div>
    <div class="bg-apricot px-6 py-4 text-2xl">Arc42.md</div>
    <div class="bg-apricot px-6 py-4 text-2xl">Requirements.md</div>
    <div class="text-3xl">...</div>
  </div>
</div>

::right::

<div class="mt-26 bg-lightGray px-8 py-10 text-center">
  <h3 class="!text-4xl">Specs</h3>
  <div class="mt-8 flex flex-col gap-6">
    <div class="bg-apricot px-6 py-4 text-2xl">Story-042</div>
    <div class="bg-apricot px-6 py-4 text-2xl">Subtask-123</div>
    <div class="bg-apricot px-6 py-4 text-2xl">Plan-123</div>
    <div class="text-3xl">...</div>
  </div>
</div>

<!-- Master reference: Chapter 4 / Slide 179 -->

---
layout: multi-col
---

::header::

# Spec Implementation Levels

## Spec Driven Development

<div class="grid grid-cols-3 gap-8 pt-10 text-[0.95rem] leading-snug">
  <div>
    <div class="bg-apricot px-4 py-4 text-center text-2xl">Spec First</div>
    <ol class="mt-6 pl-8 text-2xl leading-relaxed">
      <li>Write a spec</li>
      <li>Use the spec when implementing</li>
      <li>Throw the spec away</li>
    </ol>
  </div>
  <div>
    <div class="bg-apricot px-4 py-4 text-center text-2xl">Spec Anchored</div>
    <ol class="mt-6 pl-8 text-2xl leading-relaxed">
      <li>Write a spec</li>
      <li>Use the spec when implementing</li>
      <li>Keep the spec</li>
      <li>Update the spec when something changes</li>
    </ol>
  </div>
  <div>
    <div class="bg-apricot px-4 py-4 text-center text-2xl">Spec as Source</div>
    <ol class="mt-6 pl-8 text-2xl leading-relaxed">
      <li>Write a spec</li>
      <li>Use the spec when implementing</li>
      <li>Keep the spec</li>
      <li>Update the spec when something changes</li>
      <li>Throw away the code and rebuild from spec</li>
    </ol>
  </div>
</div>

<!-- Master reference: Chapter 4 / Slide 180 -->
