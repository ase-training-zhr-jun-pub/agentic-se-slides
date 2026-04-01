---
layout: intro
background: petrol
---

### *Let's talk about*
# Quality Assurance

<!-- Master reference: Chapter 5 / Slide 246 -->

---
layout: intro
background: apricot
---

### *Use Agents to*
# Review Merge Requests

<!-- Master reference: Chapter 5 / Slide 247 -->

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

<!-- Master reference: Chapter 5 / Slide 248 -->

---
layout: intro
background: apricot
---

### *Use Agents to identify*
# Security Risks

<!-- Master reference: Chapter 5 / Slide 249 -->

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

<!-- Master reference: Chapter 5 / Slide 250 -->
