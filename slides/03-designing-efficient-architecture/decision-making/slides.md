---
layout: intro
background: petrol
---

### *Use Agents for*
# Decision Making


---
layout: center
---

## Software architecture
## is all about *trade-offs*

<!--
Es gibt selten eine "richtige" Architekturentscheidung – es gibt nur bessere und schlechtere Kompromisse für den jeweiligen Kontext.

Jede Entscheidung hat Konsequenzen: Wer Performance wählt, zahlt oft mit Komplexität. Wer Flexibilität wählt, zahlt mit Overhead.

Deswegen ist es so wichtig, Entscheidungen zu dokumentieren – damit zukünftige Teams die Kompromisse verstehen.
-->


---
layout: center
---

## Our decisions must be
## *well-reasoned* and *transparent*

<!--
Nachvollziehbarkeit ist nicht optional – weder für Teams noch für Agenten.

Ein Agent kann eine bestehende Architektur nur dann sinnvoll weiterentwickeln, wenn er die bisherigen Entscheidungen und ihre Begründungen kennt.

Gut dokumentierte Entscheidungen sind die Grundlage dafür, dass Agenten im richtigen Kontext arbeiten.
-->


---

# Architecture Decision Record (ADR)

## Document Decisions

- `Title`: What is the decision about?
- `Context`: The circumstances - technical, political, social, and project aspects
- `Decision`: The reply to the circumstances
- `Status`: Proposed, accepted, deprecated, or superseded
- `Consequences`: All consequences, including negative ones

<!--
ADRs sind das bewährteste Format zur Dokumentation von Architekturentscheidungen. Kurz, strukturiert, versionierbar.

Jedes Feld hat einen klaren Zweck:
- Context erklärt das "Warum jetzt?"
- Decision ist der eigentliche Beschluss
- Consequences zeigt ehrlich auch negative Folgen – das unterscheidet gute ADRs von schlechten

ADRs sollten direkt im Repository neben dem Code liegen, damit sie mit dem Code versioniert werden.
-->


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

<!--
Der Agent sammelt mögliche Optionen und analysiert deren Konsequenzen – das ist genau die Vorarbeit, die in Architekturmeetings viel Zeit kostet.

Der Mensch trifft die finale Entscheidung. Der Agent beschleunigt die Vorbereitung und stellt sicher, dass keine offensichtlichen Optionen übersehen werden.

Wichtig: Den Kontext des Systems mitgeben (vorhandene Technologien, Constraints, Teamgröße), damit die Optionen realistisch sind.
-->


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

<!--
Hier sehen wir den zweiten Schritt: Aus dem Meeting-Transkript wird automatisch ein strukturiertes ADR generiert.

Der Agent liest das Transkript, extrahiert Kontext, Entscheidung und Konsequenzen, und schreibt das ADR direkt ins Repository.

Das ist einer der stärksten Anwendungsfälle: Meetings erzeugen normalerweise viel Gesprächsstoff aber wenig Dokumentation. Agenten schließen diese Lücke.
-->

