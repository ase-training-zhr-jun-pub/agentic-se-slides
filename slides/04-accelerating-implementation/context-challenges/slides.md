---
layout: center
background: petrol
---

## Dealing with context is *hard* .

<!-- Master reference: Chapter 4 / Slide 142 -->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

# Context gets too large for the model

- The context window is exceeded
- Older content is silently dropped once the limit is hit
- Long prompts can get expensive (`tokens = cost`)
- Important info might fall out of context without warning

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Problem 1</em></h3>
  <h1 class="text-white">Overflow</h1>
</div>

<!-- Master reference: Chapter 4 / Slide 143 -->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

# Context includes irrelevant or noisy information

- Too much noise reduces answer quality
- The model may miss the point or give generic responses
- LLMs can latch onto unimportant details
- Makes prompting and control harder
- Better prompt structure or pre-filtering helps a lot

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Problem 2</em></h3>
  <h1 class="text-white">Distraction</h1>
</div>

<!-- Master reference: Chapter 4 / Slide 144 -->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

# Context includes harmful or manipulative content

- Can happen on purpose or not
- LLMs might pick up and repeat poisoned inputs
- Prompt injection or jailbreaks become possible
- Can happen through user input, plugins, files, APIs, or even system prompts
- Needs sanitizing, context validation, or guardrails

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Problem 3</em></h3>
  <h1 class="text-white">Poisoning</h1>
</div>

<!-- Master reference: Chapter 4 / Slide 145 -->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

# Fuzzy, vague, or ambiguous inputs confuse the model

- Inputs are unclear, loosely worded, or open to interpretation
- Similar but slightly different ideas are mixed together
- The prompt lacks precision or does not specify what matters most
- The LLM might average or merge things that should stay separate
- Often caused by bad prompts, overly abstract context, or lack of structure

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Problem 4</em></h3>
  <h1 class="text-white">Confusion</h1>
</div>

<!-- Master reference: Chapter 4 / Slide 146 -->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

# Contradictory statements within the context

- Two or more sources explicitly disagree on a point
- The model cannot resolve who is right and may pick randomly
- Order of information matters; recency bias is real
- Creates unreliable or misleading outputs
- Especially dangerous in fact-based or regulated use cases

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Problem 5</em></h3>
  <h1 class="text-white">Clash</h1>
</div>

<!-- Master reference: Chapter 4 / Slide 147 -->

---
layout: sidebar
sidebarBackground: petrol
alignContent: center
---

# LLMs degrade as context gets longer

- Earlier information gets less attention
- Long context does not equal better results
- Even trivial tasks fail when buried deep in context
- One irrelevant chunk can hurt accuracy
- Shuffled text can outperform well-structured docs
- Lost in the middle is real; central tokens have less impact

::sidebar::

<div class="-mx-4 text-center">
  <h3 class="[&_em]:text-apricot"><em>Problem 6</em></h3>
  <h1 class="text-white">Rot</h1>
</div>

<!-- Master reference: Chapter 4 / Slide 148 -->

---
layout: center
---

<div class="w-full h-full flex items-center justify-center">
  <img src="./assets/lost-in-the-middle.png" class="max-h-full w-auto object-contain" />
</div>

<!-- Master reference: Chapter 4 / Slide 149 -->
