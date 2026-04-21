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

