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

<!--
Master reference: Chapter 1 / Prelude / Slide 1
tmp/slide-corpus/[MASTER] Workshop_ Agentic Software Engineering (3 Tage)__c1155e03a39b/chapters/01-introduction-and-basics/index.md
-->

---
layout: sidebar
background: petrol
alignContent: center
sidebarBackground: white
---

<div class="flex justify-around">
    <Person 
        direction="vertical" 
        name="Jörg Müller" 
        image="https://res.cloudinary.com/innoq/image/upload/c_thumb,e_grayscale,f_auto,g_center,h_1600,q_auto,w_1600/v1/uploads-production/5nouikqbo2fcaexr2rtzqum89las?_a=BACJ3SAE"
    >
        Principal Consultant
    </Person>
    <Person 
        direction="vertical" 
        name="Torben Keller" 
        image="https://res.cloudinary.com/innoq/image/upload/c_thumb,e_grayscale,f_auto,g_center,h_1600,q_auto,w_1600/v1/uploads-production/87viwn9wbdpjad8ujdw10t0yycyx?_a=BACJ3SAE"
    >
        Consultant
    </Person>
</div>

::sidebar::
<h1 class="text-6xl leading-relaxed px-16">👋<br>Hi</h1>

<!-- Master reference: Chapter 1 / Prelude / Slide 2 -->

---
layout: center
---

<img src="/images/tractor-meme.png" />

---
layout: content-with-image
image: /backgrounds/4.webp
---

# Agenda

- Chapter 1: Introduction & Basics
- Chapter 2: Requirements with Generative AI
- Chapter 3: Designing Efficient Architecture
- Chapter 4: Accelerating Implementation
- Chapter 5: Optimizing Testing & QA
- Chapter 6: Streamlining CI/CD
- Chapter 7: Operations & Monitoring

<!-- Master reference: Chapter 1 / Prelude / Slide 4 -->

---
layout: content-with-image
image: /backgrounds/5.webp
---

# Timetable

- 9:30 - 11:00 Block 1 (90min)
- 11:00 - 11:15 Coffee Break (15min)
- 11:15 - 12:45 Block 2 (90min)
- 12:45 - 14:15 Lunch (90min)
- 14:15 - 15:45 Block 3 (90min)
- 15:45 - 16:00 Coffee Break (15min)
- 16:00 - 17:30 Block 4 (90min)

<!-- Master reference: Chapter 1 / Prelude / Slide 5 -->

---
layout: sidebar
alignContent: center
---

### What's your name?
### What do you do?
### Have you used AI so far?

::sidebar::

### Let's get to *know* each other!

---
src: ./slides/chapters/01-basics.md
---

---
src: ./slides/chapters/05-testing-and-qa.md
---

---
src: ./slides/chapters/06-cicd.md
---

---
src: ./slides/chapters/07-operations-and-monitoring.md
---

---

# LogoRow Test -- Foundation Models

<LogoRow class="h-full">
  <LogoCard name="GPT" subtitle="OpenAI">
    <img src="/logos/openai.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Claude" subtitle="Anthropic">
    <img src="/logos/claude.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Gemini" subtitle="Google">
    <img src="/logos/gemini.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Mistral" subtitle="Mistral">
    <img src="/logos/mistral.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Qwen" subtitle="Alibaba">
    <img src="/logos/qwen.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
</LogoRow>

---

# LogoRow Test -- Mixed (with/without subtitle)

<LogoRow class="h-full">
  <LogoCard name="Copilot" subtitle="GitHub">
    <img src="/logos/github-copilot.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Cursor">
    <img src="/logos/cursor.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Zed" subtitle="Zed Industries">
    <img src="/logos/zed.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Windsurf">
    <img src="/logos/windsurf.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
  <LogoCard name="Junie" subtitle="JetBrains">
    <img src="/logos/junie.svg" class="h-32 w-auto object-contain" />
  </LogoCard>
</LogoRow>
