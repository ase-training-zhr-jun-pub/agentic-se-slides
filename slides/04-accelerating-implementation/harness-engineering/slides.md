---
layout: intro
background: apricot
---

### *Let's talk about*
# Harness Engineering

<!--
Fortführung nach SDD. Harness Engineering ist die Mitte des Spektrums: Der Mensch definiert
Ziel + Constraints, der Agent arbeitet selbständig, eine Validierungs-Schicht stellt sicher,
dass das Ergebnis brauchbar ist. Nicht "kein Review" wie bei Vibe Coding, aber auch kein
manuelles Durchgehen jeder Zeile.
-->

---

# Agent = Model + *Harness*

<div class="text-lg mt-6 max-w-3xl">

The harness is *everything around the model* — the controls that catch mistakes and let the agent **self-correct**.

</div>

<div class="mt-10 bg-lightGray px-6 py-5 max-w-3xl">

> "The model is probably fine. It's a skill issue."

When an agent repeats a mistake, you **engineer the harness** so it never makes that mistake again — instead of waiting for the next model.

</div>

<div class="mt-6 text-sm font-serif italic text-petrol">
You already met the parts: instructions, tools, verification, hooks, sub-agents. The harness wires them into feedback loops.
</div>

<!--
Kernidee von Martin Fowler: Agent = Model + Harness. Das Harness ist alles außer dem Modell —
der Teil, den DU für deinen Use Case baust.

Das Zitat (sinngemäß Mitchell Hashimoto, via hlyr.dev): "Das Modell ist meistens fein —
es ist ein Skill Issue." Die meisten Agent-Fehler sind Konfigurationsprobleme, keine
Modell-Grenzen. Wenn der Agent denselben Fehler wiederholt: Harness anpassen, nicht auf
GPT-6 warten.

Tie-back: Die Bausteine aus Block A/C (Instructions, Tools, Verification, Hooks, Sub-Agents)
sind genau die Bauteile des Harness.
-->

---

# Two Ways to Steer

<div class="grid grid-cols-2 gap-8 mt-6 text-petrol">

<div>
<div class="text-petrol text-xl mb-3">🔧 Tooling — deterministic</div>
<div class="space-y-2 text-base">
  <div class="bg-lightGray px-4 py-2"><strong>Agent hooks</strong> — fastest, every change</div>
  <div class="bg-lightGray px-4 py-2"><strong>Git hooks</strong> — pre-commit / pre-push</div>
  <div class="bg-lightGray px-4 py-2"><strong>CI/CD</strong> — slowest, last line</div>
</div>
</div>

<div>
<div class="text-petrol text-xl mb-3">📝 Prompting — contextual</div>
<div class="space-y-2 text-base">
  <div class="bg-lightGray px-4 py-2"><strong>Global rules / AGENTS.md</strong> — always loaded</div>
  <div class="bg-lightGray px-4 py-2"><strong>Scoped rules / Skills</strong> — conditional</div>
  <div class="bg-lightGray px-4 py-2"><strong>Docs / Specs</strong> — on demand</div>
</div>
</div>

</div>

<div class="mt-8 bg-apricot rounded text-white px-5 py-3 text-center text-lg">
If you can <em>tool</em> it, tool it. If you can't, <em>prompt</em> it.
</div>

<!--
Zwei Pyramiden (INNOQ-Artikel "Vom Vibe-Coder zum Agentic Engineer"):

Tooling-Pyramide — deterministische Durchsetzung, von schnell+häufig (Agent-Hooks) über
Git-Hooks bis langsam+selten (CI/CD). Das sind "Sensors": sie beobachten den Output und
erzwingen Korrektur.

Prompt-Pyramide — kontextuelle Führung, von immer geladen (AGENTS.md) über bedingt (Skills)
bis on-demand (Docs/Specs). Das sind "Guides": sie steuern VOR dem Handeln.

Faustregel: "If you can tool it, tool it. If you can't, prompt it." Deterministisch schlägt
probabilistisch, wo immer es geht — Tests/Linter laufen in Millisekunden, sind verlässlich
und billig genug für jeden Change. Semantisches Urteil (LLM-Review) nur dort, wo nötig.
-->

---

# The Harness Is *Never Done*

<div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 mt-8 text-petrol text-lg max-w-3xl">
  <div class="text-apricot font-serif italic">→</div>
  <div>Every recurring mistake becomes a <strong>new check</strong> — a guide before, or a sensor after.</div>
  <div class="text-apricot font-serif italic">→</div>
  <div><strong>Computational first</strong> (lint, test, types — cheap & fast), <strong>inferential</strong> only where judgment is needed.</div>
  <div class="text-apricot font-serif italic">→</div>
  <div>You keep <strong>ownership</strong>: review the business logic, let the harness cover the rest.</div>
</div>

<div class="mt-10 text-base font-serif italic text-petrol max-w-3xl">
"I don't need to know every line for ownership. I need to be confident my change works and doesn't break anything."
</div>

<!--
Das Harness ist nie fertig — es wächst mit jedem PR-Review (INNOQ). Jeder wiederkehrende
Fehler wird zu einer neuen Kontrolle codiert (Boris Chernys Spreadsheet-Methode: Fehler
sammeln → in Tooling gießen).

Computational vs. inferential (Fowler): Erst deterministisch (Linter, Tests, Typechecks —
Millisekunden, verlässlich), inferentiell (LLM-Judges, AI-Review) nur wo semantisches
Urteil gebraucht wird.

Die menschliche Rolle verschiebt sich: nicht jede Zeile lesen, sondern die Business-Logik
reviewen und am Harness selbst iterieren. Ownership ohne Allwissenheit — Confidence kommt
aus dem Harness, nicht aus dem manuellen Durchlesen.

Quellen: martinfowler.com/articles/exploring-gen-ai/harness-engineering.html ·
hlyr.dev/blog/skill-issue-harness-engineering-for-coding-agents ·
innoq.com/en/blog/2026/04/vom-vibe-coder-zum-agentic-engineer/
-->
