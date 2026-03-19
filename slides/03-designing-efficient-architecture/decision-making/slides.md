---
layout: intro
background: petrol
---

### *Use Agents for*
# Decision Making

<!-- Master reference: Chapter 3 / Slide 120 -->

---
layout: center
---

## Software architecture
## is all about *trade-offs*

<!-- Master reference: Chapter 3 / Slide 121 -->

---
layout: center
---

## Our decisions must be
## *well-reasoned* and transparent

<!-- Master reference: Chapter 3 / Slide 122 -->

---

# Architecture Decision Record (ADR)

## Document Decisions

- `Title`: What is the decision about?
- `Context`: The circumstances - technical, political, social, and project aspects
- `Decision`: The reply to the circumstances
- `Status`: Proposed, accepted, deprecated, or superseded
- `Consequences`: All consequences, including negative ones

<!-- Master reference: Chapter 3 / Slide 123 -->

---

# Architecture Decision Record (ADR)

## Example (Sketched)

- `Title`: Usage of ping mechanisms
- `Context`: Participating systems for the daily calculation must be available
- `Decision`: Use ping to check availability before usage; heartbeat messages were considered but are too complex right now
- `Status`: Accepted
- `Consequences`:
  - All systems implement ping mechanisms
  - Risk of ping flooding by malicious or careless systems
  - Performance overhead and less simple tests

<!-- Master reference: Chapter 3 / Slide 124 -->

---

# Agents for Decision Making

## Gather

Given the following situation, which options do we have to solve this?

> Here are 3 options:
>
> Option 1: ...
> Option 2: ...
> Option 3: ...
>
> When choosing option 1, the consequences would be ...

<!-- Master reference: Chapter 3 / Slide 125 -->

---

# Agents for Decision Making

## Document

We held an architecture meeting where we discussed topic `...`.

The meeting transcript is here: `/docs/meetings/M-0042-meeting-title.md`

Create an ADR from the transcript.

```text
> Read(/docs/meetings/ADR-0010-adr-title.md)

* Thinking

Write(/docs/adrs/ADR-0010-adr-title.md)
```

<!-- Master reference: Chapter 3 / Slide 126 -->
