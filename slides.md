---
theme: innoq
title: Agentic Software Engineering (Workshop)
info: |
  Slidev deck based on the master PDF.

  Local reference corpus (generated, gitignored):
  tmp/slide-corpus/[MASTER] Workshop_ Agentic Software Engineering (3 Tage)__c1155e03a39b/
mdc: true
layout: cover
background: /backgrounds/4.webp
---

# Agentic Software Engineering

### 3 Tage Workshop

::header::
WORKSHOP

---
layout: sidebar
background: petrol
alignContent: center
sidebarBackground: white
---

<div class="flex justify-around">
    <Person
        direction="vertical"
        name="Ole Wendland"
        image="/ole-wendland-ava.webp"
    >
        Senior Consultant
    </Person>
    <Person 
        direction="vertical" 
        name="Michael Krämer" 
        image="/michael-kraemer-ava.png"
    >
        Principal Consultant
    </Person>
</div>

::sidebar::
<h1 class="text-6xl leading-relaxed px-16">👋<br>Hi</h1>

---
layout: center
disabled: true
---

<img src="/images/tractor-meme.png" />


<!--
- Wir hören es heute an jeder Ecke
- Der Job des Softwareentwicklers wird durch KI ersetzt
- Unserer Meinung nach erst mal nicht
- Unser Job wird sich nur grundlegend verändern

- Dazu wollen wir euch in diesem Workshop mit dem nötigen Wissen austatten
-->

---
layout: content-with-image
image: /backgrounds/4.webp
---

# Agenda

- Chapter 1: Introduction & Basics
- Chapter 2: Requirements for Generative AI
- Chapter 3: Designing Efficient Architecture
- Chapter 4: Accelerating Implementation
- Chapter 5: Optimizing Testing & QA
- Chapter 6: Streamlining CI/CD
- Chapter 7: Operations & Monitoring

<!--
Wir starten mit einer Wiederholung der Grundlagen – weil wir sie für essenziell halten.

Danach schauen wir, wie uns KI bei der Erfassung von Anforderungen unterstützen kann.

Anschließend sehen wir, wie wir unsere Architektur mit KI planen können.
Dann geht es an die Implementierung von Features – auch hier mit KI-Unterstützung.

Im nächsten Schritt werfen wir einen Blick auf Testing und Qualitätssicherung.

Über neue Möglichkeiten in unseren CI/CD-Pipelines kommen wir zum Betrieb & Monitoring.

Zum Schluss geht’s um Integrationsmöglichkeiten bei Wartung und Weiterentwicklung unserer Software.
-->

---
layout: content-with-image
image: /backgrounds/5.webp
---

# Timetable

<Timetable
  startTime="09:00"
  :blocks="[
    { label: 'Block 1', duration: 90 },
    { label: 'Coffee Break', duration: 15, rowClass: 'opacity-60' },
    { label: 'Block 2', duration: 90 },
    { label: 'Lunch', duration: 60, rowClass: 'text-apricot' },
    { label: 'Block 3', duration: 90 },
    { label: 'Coffee Break', duration: 15, rowClass: 'opacity-60' },
    { label: 'Block 4', duration: 90 },
  ]"
/>

<!--
(9:00 - 10:30)
VOR ORT

Wir wollen unseren Tag in 4 Blöcke aufteilen.

Zwischen jedem Block gibt es eine Pause:
- Morgens eine Kaffeepause,
- Mittags eine längere Mittagspause
- Nachmittags noch mal eine Kaffeepause

Die Zeiten sind nur grober Richtplan!

Wir schauen wie wir durchkommen und passen entsprechend an.

Nun aber zu euch… [nächste Folie]

(Timetable)
VOR ORT

Wir wollen unseren Tag in 4 Blöcke aufteilen.

Zwischen jedem Block gibt es eine Pause:
- Morgens eine Kaffeepause,
- Mittags eine längere Mittagspause
- Nachmittags noch mal eine Kaffeepause

Die Zeiten sind nur grober Richtplan!

Wir schauen wie wir durchkommen und passen entsprechend an.

Nun aber zu euch… [nächste Folie]
-->

---
layout: sidebar
alignContent: center
---

### What's your name?
### What do you do?
### Have you used AI so far?
### Coffee or tea?

::sidebar::

### Let's get to *know* each other!

---
src: ./slides/01-basics/slides.md
---

---
src: ./slides/02-requirements-with-generative-ai/slides.md
---

---
src: ./slides/03-designing-efficient-architecture/slides.md
---

---
src: ./slides/04-accelerating-implementation/slides.md
---

---
src: ./slides/05-testing-and-qa/slides.md
---

---
src: ./slides/06-cicd/slides.md
---

---
src: ./slides/07-operations-and-monitoring/slides.md
---

---
src: ./slides/08-guardrails/slides.md
---

---
src: ./slides/09-challenges/slides.md
---

---
layout: team
---

::header::
# Vielen Dank! Fragen?!

::default::
<Person name="Ole Wendland" image="/ole-wendland-ava.webp" direction="vertical">Senior Consultant</Person>
<Person name="Michael Krämer" image="/michael-kraemer-ava.png" direction="vertical">Principal Consultant</Person>

::footer::
<InnoqLogo class="h-8" />
