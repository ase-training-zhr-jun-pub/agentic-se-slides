---
layout: intro
background: apricot
---

### *Use Agents for*
# Documentation


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

<!--
Architektur-Dokumentation hat zwei Zielgruppen: Menschen und Agenten.

Für Menschen: Know-how sichern, Onboarding beschleunigen, Entscheidungen nachvollziehbar machen.
Für Agenten: Kontext bereitstellen, damit sie fundierte Vorschläge machen können statt ins Blaue zu raten.

"Make it available for the agent" ist kein Zusatz – es ist der entscheidende Punkt. Wer seine Dokumentation im Repository pflegt, gibt Agenten automatisch Zugriff darauf.
-->


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

<!--
Arc42 ist das bekannteste deutschsprachige Architektur-Dokumentationsframework. Es gibt eine klare Struktur vor, ohne zu viel zu erzwingen.

Wichtig: "Just use what is important" – man muss nicht alle 12 Kapitel befüllen. Kleine Systeme brauchen vielleicht nur Kapitel 3, 5 und 9.

Arc42 ist auch mit Agenten gut kombinierbar: Man kann den Agenten beauftragen, bestehende Dokumentation in Arc42-Kapitel zu überführen oder ein neues System direkt nach Arc42 zu dokumentieren.
-->


---

# System Context <small>Arc42</small>

- Delimits your system from all its communication partners
  - Neighboring systems
  - Users
- Specifies which external interfaces exist
- If necessary, differentiate
  - Business context (domain-specific inputs and outputs)
  - Technical context (channels, protocols, hardware)

<!--
Der Systemkontext ist oft der wertvollste Teil der Architekturdokumentation – und der am einfachsten zu erstellende.

Ein Agent kann aus vorhandenem Code, API-Definitionen oder Infrastruktur-Konfigurationen einen ersten Systemkontext-Entwurf erstellen.

Differenzierung Business/Technical Context: Fachlicher Kontext erklärt WAS ausgetauscht wird, technischer Kontext erklärt WIE. Oft reicht der fachliche Kontext.
-->


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

<!--
Die Building Block View ist die statische Dekomposition des Systems – vergleichbar mit dem Grundriss eines Hauses.

Level 1 zeigt das Gesamtsystem als White Box mit seinen Hauptbausteinen als Black Boxes. Nur so weit zoomen, wie es dem Verständnis dient.

Agenten können aus Codestrukturen (Packages, Module, Services) automatisch einen ersten Entwurf der Building Block View generieren. Das spart erheblich Zeit beim initialen Dokumentieren.
-->

