---
layout: intro
background: apricot
---

### *Use Agents for*
# Documentation

<!-- Master reference: Chapter 3 / Slide 128 -->

---

# Architecture Documentation

- Create central macro architecture documentation
- Create microarchitecture documentation for each system
- Document just the important parts
- Use a template
- Make it available for the agent

**Result**

- Prevents forgetting
- Minimizes know-how transfer and searching
- Agents can work on it

<!-- Master reference: Chapter 3 / Slide 129 -->

---
layout: two-cols
leftBackground: white
rightBackground: white
---

::left::

# Template <small>Arc42</small>

- 12 chapters for documentation
- Just use what is important for your system
- Created by Gernot Starke

::right::

<div class="space-y-[2px] pt-2 text-[0.95rem] leading-tight text-primary">
  <p class="my-0 bg-apricot px-5 py-2">1. Introduction &amp; Goals</p>
  <p class="my-0 bg-apricot px-5 py-2">2. Constraints</p>
  <p class="my-0 bg-apricot px-5 py-2">3. Context &amp; Scope</p>
  <p class="my-0 bg-apricot px-5 py-2">4. Solution Strategy</p>
  <p class="my-0 bg-apricot px-5 py-2">5. Building Block View</p>
  <p class="my-0 bg-apricot px-5 py-2">6. Runtime View</p>
  <p class="my-0 bg-apricot px-5 py-2">7. Deployment View</p>
  <p class="my-0 bg-apricot px-5 py-2">8. Crosscutting Concepts</p>
  <p class="my-0 bg-apricot px-5 py-2">9. Architectural Decisions</p>
  <p class="my-0 bg-apricot px-5 py-2">10. Quality Requirements</p>
  <p class="my-0 bg-apricot px-5 py-2">11. Risks &amp; Technical Debt</p>
  <p class="my-0 bg-apricot px-5 py-2">12. Glossary</p>
</div>

<!-- Master reference: Chapter 3 / Slide 130 -->

---

# System Context <small>Arc42</small>

- Delimits your system from all its communication partners
  - Neighboring systems
  - Users
- Specifies which external interfaces exist
- If necessary, differentiate
  - Business context (domain-specific inputs and outputs)
  - Technical context (channels, protocols, hardware)

<!-- Master reference: Chapter 3 / Slide 131 -->

---
layout: content-with-image
imageAlign: center
---

## Building Block View <small>Arc42</small>

- Static decomposition of the system
- Analogy House: the *floor plan*.
- **Level 1** is the white box description of the overall system together with black box descriptions of all contained building blocks.
- **Level 2** zooms into some building blocks of level 1. Thus it contains the white box description of selected building blocks of level 1, together with black box descriptions of their internal building blocks.
- **Level 3** (not shown in the diagram above) zooms into details of selected building blocks of level 2, and so on.

::image::
<img src="./assets/arc42-building-block-view.png" mt-20 />

<!-- Master reference: Chapter 3 / Slide 132 -->
