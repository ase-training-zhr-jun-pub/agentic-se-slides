---
layout: chapter
no: 6
background: /backgrounds/4.webp
---

# CI/CD


---
layout: intro
background: petrol
---

### *Use Cases for*
# CI/CD


---
layout: intro
background: apricot
---

### *Use Agents to evaluate*
# CI/CD Strategies


---
layout: default
---

# CI/CD Strategies

- Use the Agent as input for CI/CD strategy decisions
- Find the right CI/CD setup for the project

<!--
Welche Deployment-Strategie passt zum Projekt? Blue/Green, Canary, Feature Flags?

Agents können hier als Sparringspartner dienen: Anforderungen beschreiben, Strategie-Empfehlungen bekommen.
-->

---
layout: intro
background: apricot
---

### *Use Agents to help with*
# Automation


---
layout: default
---

# Automation

- Create scripts that are executed in the pipeline
- Automate repetitive work
- Way faster than before

<!--
Bash-Skripte, Python-Skripte, Makefile-Targets – früher zeitaufwendig, heute in Minuten generiert.

Der Agent kennt gängige CI/CD-Plattformen (GitHub Actions, GitLab CI, Jenkins) und schreibt passende Skripte.
-->

---
layout: intro
background: apricot
---

### *Use Agents to integrate*
# Feature Flags


---
layout: default
---

# Feature Flags

- Enable specific features just for a small user group
- Use the Agent to integrate feature flags in code
- Find the right location for feature flags

<!--
Feature Flags ermöglichen sicheres Deployment: Code landet in Produktion, ist aber noch nicht für alle Nutzer aktiv.

Der Agent kann bestehenden Code analysieren und die richtigen Stellen für Flag-Checks vorschlagen.
-->

---
layout: intro
background: apricot
---

### *Use Agents to write*
# Pipelines


---
layout: default
---

# Pipelines

- Use agents to create whole pipelines
- Make your pipelines locally testable for the agent to create the feedback loop
- Before: We needed DevOps specialists
- Now: Enablement to build and optimize pipelines

<!--
Lokale Testbarkeit ist der Schlüssel für den Feedback Loop: z.B. mit `act` für GitHub Actions oder `gitlab-runner` lokal.

Früher war Pipeline-Wissen Spezialisten-Know-how. Jetzt kann jeder Developer eine funktionierende Pipeline erstellen.
-->

---
layout: exercise
chapter: 6
exercise: 1
task: Setup a CI pipeline
command: git merge uebung-5-1
---

---
layout: intro
background: apricot
---

### *Use Agents in*
# Pipeline Jobs


---
layout: default
---

# Pipeline Jobs

- Use Agents in Pipeline Jobs to do tasks
- Example:
  - Generate Release Notes
  - Do Reviews
  - Find untested edge cases
  - Recommend Merge or not

<!--
Agents nicht nur zum Schreiben von Pipelines – sondern auch als Job innerhalb der Pipeline.

Release Notes generieren ist ein klassisches Beispiel: Aus Git-Log + Tickets automatisch user-friendly Changelogs erstellen.

"Merge or not" ist ambitioniert – aber als Input für eine Entscheidung sehr wertvoll.
-->

---
layout: intro
background: apricot
---

### *Use Agents to create*
# Infrastructure as Code


---
layout: default
---

# Infrastructure as Code

- Use Agents to create infrastructure as code
- Make it locally testable for the agent to enable the feedback loop
- Before: We needed DevOps specialists
- Now: Everybody is enabled to create IaC files

<!--
Terraform, Pulumi, Kubernetes-Manifeste, Helm Charts – alles IaC-Formate, die Agents sehr gut kennen.

Lokale Testbarkeit: z.B. `terraform plan` oder `kubectl --dry-run` als Feedback-Loop für den Agent.

Demokratisierung von DevOps-Wissen – ähnlich wie bei Pipelines.
-->

---
layout: intro
background: apricot
---

### *Use Agents to migrate*
# Infrastructure as Code


---
layout: default
---

# Infrastructure as Code Migration

- Agents are excellent in translating
- Use Agents to migrate from one IaC format to another

<!--
Klassisches Migrations-Szenario: CloudFormation zu Terraform, oder Terraform zu Pulumi.

Agents sind stark im Übersetzen zwischen Formaten – sie kennen die Semantik beider Seiten.

Immer validieren: `terraform plan` ausführen und Output prüfen lassen.
-->

---
layout: takeaways
chapter: 6
---

1. Writing scripts is no longer time-consuming
2. The barrier to writing pipelines is lowered
3. Automate user-friendly release notes
4. Creating and maintaining IaC gets easier

<!--
Der rote Faden: Agents demokratisieren DevOps-Wissen.

Was früher Spezialisten vorbehalten war – Pipelines, IaC, Automations-Skripte – ist jetzt für alle zugänglich.
-->

