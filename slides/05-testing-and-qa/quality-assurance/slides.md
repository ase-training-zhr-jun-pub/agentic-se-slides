---
layout: intro
background: petrol
---

### *Let's talk about*
# Quality Assurance


---
layout: intro
background: apricot
---

### *Use Agents to*
# Review Merge Requests


---
layout: default
---

# Review Merge Requests <small>Use Cases</small>

- Agents can be installed on your code management platform
- Can automatically start a review on a new MR
- This reduces idle time to wait for human reviews
- If something comes up in the agent review, you can fix it before "wasting time" of other teammates
- Agents tend to find even little things like typos, which humans sometimes miss
- Agent can also make changes on the spot

<PromptExample
  label="Example: Merge Request Review"
  prompt="@claude review this merge request"
/>

<!--
Der Agent als erster Reviewer: Er gibt sofort Feedback, bevor ein Mensch überhaupt Zeit hatte, sich den MR anzuschauen.

Das reduziert Zykluszeiten und schont die Zeit der menschlichen Reviewer für die wichtigen inhaltlichen Diskussionen.

Wichtig: Der Agent ersetzt nicht den menschlichen Review – er ergänzt ihn.
-->

---
layout: intro
background: apricot
---

### *Use Agents to identify*
# Security Risks


---
layout: default
---

# Identify Security Risks <small>Use Cases</small>

- Security vulnerabilities may be difficult to spot
- Use agents to find vulnerabilities
- If the agent does not find any, you are not safe, but safer than before

<PromptExample
  label="Example: Merge Request Review"
  prompt="@claude analyze the merge request and outline potential vulnerabilities in the implementation"
/>

<!--
Kein Security-Tool ersetzt einen echten Pentest – aber ein Agent kann schnell bekannte Muster erkennen: SQL Injection, unsichere Deserialisierung, fehlende Authentifizierung, etc.

"Safer than before" ist der Schlüsselsatz: Null Garantie, aber deutlich besser als gar kein Review.
-->

