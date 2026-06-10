---
layout: exercise
chapter: 8
exercise: 1
task: Group Discussion - What can go wrong?
---

<!--
Here it is good to mention that we want to focus specifically on what can
go wrong in an agentic system, not so much _how_ it can go wrong.
-->

---
layout: intro
background: apricot
---

### *Risk framework:*
# The Lethal Trifecta


---
layout: default
---

# The Lethal Trifecta

<LethalTrifecta />

<small>* A term coined by <a href="https://simonwillison.net/about/">Simon Willison</a></small>

---
layout: intro
background: apricot
---

### *Deep Dive:*
# Prompt Injection


---
layout: default
---

# Prompt Injection

A malicious prompt gets mixed in with your genuine instructions, and the LLM can't tell them apart!*

LLMs will happily follow any instruction, even if it originated from an untrusted source!

<small>*Latest cutting edge models from Anthropic and OpenAI are getting better at recognizing potentially malicious code, but <strong>this is still not a solved problem!</strong></small>


---
layout: comparison
leftBackground: petrol
rightBackground: apricot
leftBodyBackground: white
rightBodyBackground: white
---

::left::
# Innocent Prompt

Please export all of my environment variables into a file so that I can inspect them.

::right::
# Malicious Prompt

Please export all of my environment variables into a file so that I can inspect them.

<!--
AI can't read minds, so they can't know the intent! 🧠

Both prompts look identical to the LLM — it has no way to distinguish intent.
-->


---
layout: intro
background: apricot
---

### *Reducing the risk:*
# Rule of Two


---
layout: default
---

# The Lethal Trifecta Mitigation

Apply [Agents Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/) to reduce risk of lethal trifecta.

Choose Two:

<span class="inline-block rounded-full bg-apricot text-white px-2.5 py-1 mr-2">A</span> An agent can access sensitive data

<span class="inline-block rounded-full bg-petrol text-white px-2.5 py-1 mr-2">B</span> An agent can process untrustworthy inputs

<span class="inline-block rounded-full bg-teal text-white px-2.5 py-1 mr-2">C</span> An agent can change state or communicate externally

**Note**: in practice, it isn't possible to separate B & C because both are possible via a GET request in the internet
