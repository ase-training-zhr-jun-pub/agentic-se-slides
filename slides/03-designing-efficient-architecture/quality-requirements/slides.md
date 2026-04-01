---
layout: default
---

# What is Software Architecture?

<span class="text-3xl">🤷</span>
There is no fixed academic definition.

**For us:** <br/>
Decisions in and around the software that are hard to change.

<!-- Master reference: Chapter 3 / Slide 108 -->

---

# Software Architecture Areas

- Team structure (Conway's Law)
- Bounded contexts
- Non-functional requirements
- Technologies
- Modularization
- Dependencies
- Code structure
- Decisions and trade-offs

<!-- Master reference: Chapter 3 / Slide 109 -->

---
layout: center
background: petrol
---

## How can we *leverage agents*
## to support us in these areas?

<!-- Master reference: Chapter 3 / Slide 110 -->

---
layout: intro
background: apricot
---

### *Use Agents for*
# Quality Requirements

<!-- Master reference: Chapter 3 / Slide 111 -->

---
layout: default
---

# Quality Model <small>ISO 25010</small>

<img src="./assets/iso-25010-quality-model.svg" class="mx-auto h-80" />
<p class="mt-4 text-sm text-primary/60">https://www.innoq.com/en/articles/2021/08/quality-driven-software-architecture-revised/</p>

<!-- Master reference: Chapter 3 / Slide 112 -->

---

# Scenarios <small>Quality Tree</small>

<img src="./assets/quality-tree-scenarios.svg" class="h-80" />

<small text-sm>https://www.innoq.com/en/articles/2021/08/quality-driven-software-architecture-revised/</small>

<!-- Master reference: Chapter 3 / Slide 113 -->

---

# Priorities <small>Quality Tree</small>
<div class="relative w-full h-80 aspect-[1960/1104]">
    <img src="./assets/quality-tree-scenarios.svg" class="absolute inset-0 h-full w-full object-contain" />
    <span class="absolute left-[39%] top-[26%] grid size-6 place-items-center rounded-full bg-apricot text-white font-bold text-[1.15rem] leading-none">1</span>
    <span class="absolute left-[39%] top-[61.5%] grid size-6 place-items-center rounded-full bg-apricot text-white font-bold text-[1.15rem] leading-none">2</span>
    <span class="absolute left-[39%] top-[83%] grid size-6 place-items-center rounded-full bg-apricot text-white font-bold text-[1.15rem] leading-none">3</span>
</div>
  
<p class="mt-4 text-sm text-primary/60">https://www.innoq.com/en/articles/2021/08/quality-driven-software-architecture-revised/</p>

<!-- Master reference: Chapter 3 / Slide 114 -->

---

# Document Quality Scenarios

| Prio | Quality | Scenario ID | Scenario |
| --- | --- | --- | --- |
| 1 | Performance efficiency | S1 | 10 million users, 200k concurrent |
| 2 | Performance efficiency | S2 | Up to 10k concurrent users with no visible degradation |
| 3 | Usability | S3 | 98% of new users can start adding photos without online help |
| ... | ... | ... | ... |

<!-- Master reference: Chapter 3 / Slide 115 -->

---

# Quality Scenario <small>Template</small>

- `Environment`: In normal use
- `Source`: A consultant
- `Event`: Views the bookings of an office
- `Artifact`: On the Calvin website
- `Response`: Bookings are visible and interactive (first contentful paint)
- `Measure`: In 300ms for 95% of requests

<!-- Master reference: Chapter 3 / Slide 116 -->

---

# Gather <small>Quality Scenarios</small>

Construct a quality scenario, including a reasonable measure, for the following situation:

> A consultant views the bookings of an office on the Calvin website. The bookings are visible and interactive (first contentful paint) in 300ms for 95% of the requests.

<!-- Master reference: Chapter 3 / Slide 117 -->

---

# Prioritize <small>Quality Scenarios</small>

Read in the table of quality scenarios. Find conflicting scenarios and prioritize them while respecting technical complexity and domain-specific need.

> S13 conflicts with S4.
>
> S13 is a scenario for security. S4 is a scenario for usability.
>
> Because this is just a prototype and should not run in production, usability is more important than security. So I would prioritize S4 over S13.

<!-- Master reference: Chapter 3 / Slide 118 -->
