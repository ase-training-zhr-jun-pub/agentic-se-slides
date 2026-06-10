---
layout: intro
background: petrol
---

### _Mitigation Strategy 1:_

# Sandboxing

---

# Why Sandboxing?

- The boiling-frog trap
- Agents become more autonomous — we benefit, but want to control that autonomy
- Locally: access to ALL files, SSH keys, tokens, cookies... 🥸
- But: overhead (depending on your personal perspective)

---

# Claude Sandbox

- My attempts were unsatisfying: config in the workdir, confusion, OS integration didn't work
- Vendor-specific
- Requires too much _believe and trust_ for my taste

---

# Container

- Plain container for the agent
- or a dev container
- Lightweight
- Manual configuration, few conventions
- Docker-in-Docker is a problem
  - the sysbox-runc runtime can solve it
- Cloud-native
- Agent breakouts have reportedly happened

---

# Docker Sandbox

- Simple to install for a local setup
- Early access, but commercial (currently free)
- Micro-VM, not a container
  - Starts from a Docker image
  - But then a full-fledged disk
  - Needs more disk space
  - Updates only inside the VM (or re-create)
- Private dockerd inside the sandbox
- LLM proxy for auth and audit/logging
- Paths stay the same
- ⇒ built-in conventions

---
layout: default
---

# A good option: Docker Sandboxes

- The API is developed especially for agentic software engineering and policy controls are dev friendly (not the case for many solutions)
- Docker Sandboxes spin up _MicroVMs_ which provide a greater isolation level than containers
- Containers share the host kernel (breaking out of container breaks isolation boundary)
- Agents have successfully broken out of Docker containers

<!--
Erwähnenswert: Claude Code bringt auch eigenes Sandboxing mit (siehe Folie "Claude Sandbox"
weiter vorne) — das ist aber herstellerabhängig. Docker Sandboxes sind die tool-unabhängige
Variante mit feingranularen Network Policies.
-->


---
layout: default
---

# Creating a Docker Sandbox

```
cd ~/my-project
sbx run claude
```


---
layout: two-cols
---

# Sandboxes provide isolation

```
user@host$ ls
...
Documents
Downloads
my-project
Pictures
...
```

Only the project folder is mounted into the sandbox

::right::


In the eyes of the agent, nothing else exists!

```
user@sandbox$ ls
my-project
```

✅ protection against access to **private data**

---
layout: default
---

# Reusable Dev Setup

- use [kits](https://docs.docker.com/ai/sandboxes/customize/kits/) to create reusable docker sandbox config


---
layout: intro
background: apricot
---

### *Mitigation Strategy 2:*
# Network Policies


---
layout: default
---

# Are sandboxes enough?

- Sandboxes alone don't prevent **communicating externally** or **exposure to untrusted content**
- Free internet access leaves agents susceptible to prompt injection via web content
- Even without production credentials, our codebase is confidential
- We need to **lock down the network!**


---
layout: default
---

# Configure policy rules

Initiate Docker Sandbox policies

```
sbx policy reset
```

Select policy

```
Choose a default network policy:

     1. Open         — All network traffic allowed, no restrictions.
     2. Balanced     — Default deny, with common dev sites allowed.
     3. Locked Down  — All network traffic blocked unless you allow it.

  Use ↑/↓ to navigate, Enter to select, or press 1–3.
```

To protect against lethal trifecta, prefer `Locked Down`.

---
layout: default
---

# Adding new policy rule

View all sandboxes with info about accepted/rejected network traffic

```
sbx
```

Adding a rule globally via Docker Sandboxes:

```
sbx policy allow network -g api.anthropic.com
```

Adding a rule for a specific Docker Sandbox:

```
sbx policy allow network claude-my-project npmjs.org
```

Starting with policy `Locked Down` is less convenient, but you can add rules one at a time.

<!--
api.anthropic.com ist der Endpunkt, über den die eigentlichen Claude-API-Requests laufen.
Damit Claude Code vollständig funktioniert, braucht es laut Netzwerk-Doku noch ein paar
weitere Endpunkte (Auth, Updates, Telemetrie) — im Workshop reicht es, das einmal zu
erwähnen.
-->

