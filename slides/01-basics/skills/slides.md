---
footerLink: https://agentskills.io
---

# Skills

A **skill** is a folder the agent can pull in *on demand*:

- `SKILL.md` plus optional references, scripts, and assets
- Useful for repeatable workflows, checklists, and domain knowledge
- *Progressive disclosure*: only the short **description** sits in the context — the agent reads the full skill when it's relevant
- You'll use ready-made skills in the upcoming exercises

<div class="mt-6 text-sm font-serif italic text-petrol">

The full catalog of agent building blocks follows in *Chapter 4*.

</div>

<!--
Skills sind der Baustein, den wir hier schon brauchen, weil die kommenden Übungen sie nutzen.

Die Idee: Statt eine lange Anleitung pauschal in den Kontext zu laden, sieht der Agent nur eine
Beschreibungs-Zeile. Erst wenn er die Skill braucht, liest er den Rest (progressive disclosure).

Die ganze Bausteinsammlung — Memory, Rules, Tools, Hooks, Subagents — kommt gebündelt in Kapitel 4.
-->

---
layout: two-cols
leftBackground: white
rightBackground: white
---

# Skills: <small>Example</small>

```text
pr-review/
├── SKILL.md
├── references/
│   └── review-rubric.md
└── scripts/
    └── check_diff.py
```

<div class="mt-6 text-sm">

⚠️ External skills run arbitrary code — treat them like npm packages and vet before install.

</div>

::right::

<div class="pt-14"></div>

```markdown
---
name: pr-review
description: Review pull requests for correctness,
  tests, and security. Use when the user asks for
  a PR review or merge readiness check.
---

# PR Review

1. Check the changed files.
2. Assess risks, missing tests, breaking changes.
3. Provide blockers and recommendations.
   Rubric: [references/review-rubric.md]
```

<!--
Links die Ordnerstruktur, rechts die SKILL.md. Die SKILL.md ist wie ein Inhaltsverzeichnis:
Sie verweist auf Rubric und Script, statt alles selbst zu enthalten.

Die Description trägt Aufgabe UND Trigger: "Use when the user asks for...". Das entscheidet,
ob der Agent den Skill überhaupt findet.

Security-Hinweis: Externe Skills aus Registries können beliebigen Code ausführen — wie npm-Pakete behandeln.
-->
