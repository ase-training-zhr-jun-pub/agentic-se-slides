---
layout: intro
background: apricot
---

### *Let's talk about*
# Spec Driven Development

<!-- Master reference: Chapter 4 / Slide 173 -->

---
layout: default
background: white
---

<h1 class="text-petrol !text-5xl !mb-10">Spec Driven Development</h1>

<div class="grid grid-cols-2 gap-12 items-center">
  <div class="text-petrol text-2xl leading-tight space-y-3">
    <p>New term popularized by GitHub</p>
    <p>Announced with SpecKit</p>
    <p>Tooling around a fixed dev process</p>
    <p>Tells an agent exactly how to code</p>
  </div>

  <div class="flex flex-col gap-6 text-center">
    <div class="bg-apricot text-white text-2xl font-semibold px-6 py-4">1. Specify</div>
    <div class="bg-apricot text-white text-2xl font-semibold px-6 py-4">2. Plan</div>
    <div class="bg-apricot text-white text-2xl font-semibold px-6 py-4">3. Tasks</div>
    <div class="bg-apricot text-white text-2xl font-semibold px-6 py-4">4. Implement</div>
  </div>
</div>

<!-- Master reference: Chapter 4 / Slide 174 -->

---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Spec Driven Development</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">1. Specify</h1>
</div>

Use existing documentation like
- Epics and user stories
- Wikis
- Architecture documentation
- UX documentation

**Important:**

<ol class="list-decimal pl-5 text-left marker:text-apricot">
  <li>The agent must have access</li>
  <li>Keep it close to the agent</li>
  <li>Use text-based formats</li>
</ol>

<!-- Master reference: Chapter 4 / Slide 175 -->

---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Spec Driven Development</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">2. Plan</h1>
</div>

Create a plan for implementing the specs.

- What are the specs?
- How exactly do we meet the acceptance criteria?
- How does that affect the architecture?
- How does that change the domain model?
- Do we have to migrate the database?
- ...

<!-- Master reference: Chapter 4 / Slide 176 -->

---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Spec Driven Development</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">3. Tasks</h1>
</div>

- Split the plan into small, reviewable chunks
- If possible, create independent tasks
  - This enables working with multiple agents without merge conflicts
- Each task contains all information needed to start implementation

<!-- Master reference: Chapter 4 / Slide 177 -->

---

<div class="text-petrol !font-bold mb-8">
  <span class="text-apricot font-serif font-normal italic">Spec Driven Development</span>
  <span class="mx-2 font-normal text-petrol">|</span>
  <h1 class="text-petrol">4. Implement</h1>
</div>

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
layout: exercise
chapter: 4
exercise: 5
task: Planning & Task Breakdown
command: git merge uebung-3-5
---

<!-- Master reference: Chapter 4 / Slide 180 -->
