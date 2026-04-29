---
layout: intro
background: petrol
---

### *Use Agents for*
# Architecture Decisions


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
layout: sidebar
slideNumber: false
---

## Explore Options<br/>and Trade-offs

<AgentChat>
  <ChatUser mb="1lh">Given the following situation [...], which options do we have to solve this?</ChatUser>
  <ChatTask agent="explore" description="Identify options" status="completed" collapsed mb="1lh">
    <ChatTool name="Read" args="docs/architecture.md" />
    <ChatTool name="Read" args="docs/adrs/ADR-0001-*.md" />
    <ChatTool name="WebSearch" args="messaging patterns distributed systems" />
  </ChatTask>
  <ChatAgent>Here are 3 options:<br/><br/>Option 1: [...]<br/>Option 2: [...]<br/>Option 3: [...]<br/><br/>When choosing option 1, the consequences would be [...]</ChatAgent>
</AgentChat>

::sidebar::
## *Use Agents for* Architecture Decisions

<!--
Der Agent sammelt mögliche Optionen und analysiert deren Konsequenzen – das ist genau die Vorarbeit, die in Architekturmeetings viel Zeit kostet.

Der Mensch trifft die finale Entscheidung. Der Agent beschleunigt die Vorbereitung und stellt sicher, dass keine offensichtlichen Optionen übersehen werden.

Wichtig: Den Kontext des Systems mitgeben (vorhandene Technologien, Constraints, Teamgröße), damit die Optionen realistisch sind.
-->


---
layout: sidebar
---

## Document Decisions

<AgentChat>
  <ChatUser>
      We held an architecture meeting where we discussed topic [...].
      The meeting transcript is here: <strong>@docs/meetings/M-0042-meeting-title.md</strong>.
      Create an ADR from the transcript.
  </ChatUser>
  <ChatTool mt="0.5lh" mb="1lh" name="Read" args="/docs/meetings/M-0042-meeting-title.md" collapsed />
  <ChatAgent>
      I've read the <em>transcript</em> and identified the key decision, context, and consequences. Let me read the ADR template and create the document.
  </ChatAgent>
  <ChatTool mt="0.5lh" name="Read" args="/docs/adrs/template.md" collapsed />
  <ChatTool name="Write" args="/docs/adrs/ADR-0010-adr-title.md" collapsed />
</AgentChat>

::sidebar::
## *Use Agents for* Architecture Decisions

<!--
Hier sehen wir den zweiten Schritt: Aus dem Meeting-Transkript wird automatisch ein strukturiertes ADR generiert.

Der Agent liest das Transkript, extrahiert Kontext, Entscheidung und Konsequenzen, und schreibt das ADR direkt ins Repository.

Das ist einer der stärksten Anwendungsfälle: Meetings erzeugen normalerweise viel Gesprächsstoff aber wenig Dokumentation. Agenten schließen diese Lücke.
-->
