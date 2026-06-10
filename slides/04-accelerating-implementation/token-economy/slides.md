---
layout: intro
background: apricot
---

### *Let‘s talk about*
# Token Usage *in Practice*

<!--
Schlanke Kosten-Linse direkt beim Implementieren. Anlass: die Umstellung auf Usage-based
Billing (z. B. Anthropic agentic credits, GitHub Copilot AI Credits) macht Verschwendung vom
reinen Qualitäts- zum Kostenthema. Diese paar Folien sind die taktische Sicht — die strategische
Vertiefung (Affordability, AI-FinOps, Cost per merged change) kommt in Kapitel 9.

Die meisten Hebel kennen wir schon verstreut (CLI > MCP, deterministische Tools, Context-
Disziplin). Hier bündeln wir sie unter einer klaren Frage: Wie kriege ich dasselbe Ergebnis
für weniger Tokens?
-->

---

# Make the Spend *Visible*

<div class="text-lg max-w-3xl text-petrol">

You can't manage what you can't see.<br/> Before you optimize, *look* at what a session burns.

</div>

<div class="grid grid-cols-2 gap-4 mt-8 text-petrol">
  <div class="bg-lightGray px-4 py-3">
    <div class="font-mono text-petrol text-base mb-1">/usage</div>
    <div class="text-sm">Tokens &amp; limits for the current billing period</div>
  </div>
  <div class="bg-lightGray px-4 py-3">
    <div class="font-mono text-petrol text-base mb-1">/context</div>
    <div class="text-sm">What's filling the window <em>right now</em> — Skills, Tools, MCP, ...</div>
  </div>
  <div class="bg-lightGray px-4 py-3">
    <div class="font-mono text-petrol text-base mb-1">/cost</div>
    <div class="text-sm">Cost and duration of the current session</div>
  </div>
  <div class="bg-lightGray px-4 py-3">
    <div class="font-mono text-petrol text-base mb-1">/status</div>
    <div class="text-sm">Show loaded environment details (model, account, MCP servers, ...)</div>
  </div>
</div>

<div class="mt-8 text-petrol text-base">
Glance <em>before</em> and <em>after</em> a task. The habit is the lever.
</div>

<!--
Awareness zuerst — der Einstieg vor allen Hebeln. Du kannst nicht steuern, was du nicht siehst.
Bevor man optimiert, schaut man sich an, was eine Session überhaupt verbraucht.

Die Commands in Claude Code:
- /usage — Verbrauch und Limits im aktuellen Abrechnungszeitraum (Plan-Limits).
- /context — Momentaufnahme des Context Windows: was steckt gerade drin (Files, Tools, History).
  Claude Code zeigt hier den Breakdown — so erkennt man Bloat (riesige CLAUDE.md, zu viele
  MCP-Tools) sofort.
- /cost — Kosten und Dauer der laufenden Session.
- /status — geladene Umgebung: Modell, Account, MCP-Server, Konnektivität.

Die eigentliche Botschaft ist nicht der konkrete Befehl, sondern die Gewohnheit: vor und nach
einer Aufgabe kurz draufschauen. Verbrauch wird zur Zahl, die man beobachtet — keine Überraschung
auf der Rechnung. Das ist die Mikro-Version dessen, was in Kapitel 8 als AI-FinOps groß wird.
-->

---

# Match the *Model* to the Job

<div class="text-lg mt-2 max-w-3xl text-petrol">

Big brain for *thinking*, small brain for *typing*. The model is a dial, not a default.

</div>

<div class="text-xl [&_td]:!py-3 [&_th]:!py-3 mt-6">

| Task | Model | Why |
|---|---|---|
| Plan, architecture, hard debugging | **Big / frontier** | reasoning pays for itself |
| Implementation, refactor, boilerplate | **Smaller / faster** | volume work, easy to verify |
| Bulk / mechanical edits | **No LLM — script** | deterministic, ~free |

</div>

<div class="mt-6 text-sm font-serif italic text-petrol">
Switch deliberately — Claude Code <code>/model</code> or <code>--model</code> per session; pair a strong parent agent with a cheaper model for sub-agents.
</div>

<!--
Das stärkste neue Stück. Bislang taucht Modellwahl nur als Fußnote bei der Delegation-Folie
auf (starkes Parent-Modell, billiges Sub-Agent-Modell). Hier wird es zum Prinzip erhoben.

Großes Modell, wo Denken den Preis rechtfertigt: Plan, Architektur, harte Debugging-Sessions.
Kleineres/schnelleres Modell für die Masse: Umsetzung, Refactoring, Boilerplate — gut prüfbar,
also verzeiht es schwächeres Reasoning. Und die wichtigste Zeile als Brücke zur nächsten Folie:
rein mechanische Massenarbeit gehört gar nicht ans LLM, sondern in ein Skript.

Claude Code: Modellwechsel via /model in der Session oder --model beim Start. Konkret heißt das
Opus für Plan/Architektur/Debugging, Sonnet für die Masse der Umsetzung, Haiku für simple
Volume-Arbeit und Sub-Agents. Modellempfehlungen nach Szenario beim Kunden separat dokumentiert.
-->

---

# Batch Work Is a *Script*, Not a Session

<div class="text-lg mt-2 max-w-3xl text-petrol">

Recurring mass operations don't belong in a chat loop. Every turn resends the whole context, so cost *compounds* per step.

</div>

<div class="grid grid-cols-2 gap-8 mt-6 text-petrol">

<div>
<div class="text-xl mb-3">🔁 Loop the agent</div>
<div class="space-y-2 text-base">
  <div class="bg-lightGray px-4 py-2">Rename across 200 files, turn by turn</div>
  <div class="bg-lightGray px-4 py-2">Cost grows with every step</div>
  <div class="bg-lightGray px-4 py-2">Non-deterministic, hard to review</div>
</div>
</div>

<div>
<div class="text-xl mb-3">📜 Generate once, run</div>
<div class="space-y-2 text-base">
  <div class="bg-lightGray px-4 py-2">Agent writes the script <strong>once</strong></div>
  <div class="bg-lightGray px-4 py-2">The script does the bulk work</div>
  <div class="bg-lightGray px-4 py-2">Deterministic, repeatable, ~free</div>
</div>
</div>

</div>

<div class="mt-8 bg-apricot rounded text-white px-5 py-3 text-center text-lg">
If a task repeats, the LLM should write the tool — not <em>be</em> the tool.
</div>

<!--
Anknüpfung an Harness Engineering ("If you can tool it, tool it") und an die Kostenmechanik
aus Kapitel 8: in einer Session lädt jeder Turn die ganze Historie neu, Kosten compounden pro
Schritt. Eine Massenoperation Turn für Turn vom Agenten ausführen zu lassen ist deshalb teuer
UND unzuverlässig.

Besser: das LLM einmal das Skript schreiben lassen (Codemod, sed/jq-Pipeline, kleines CLI),
das Skript erledigt die 200 Files deterministisch und quasi kostenlos. Beispiele: Import-
Migration, Rename über viele Dateien, Fixtures regenerieren, Format-Konvertierung.

Kernsatz: Wenn sich eine Aufgabe wiederholt, soll das LLM das Werkzeug schreiben, nicht das
Werkzeug sein.
-->

---

# Every Tool Costs *Tokens*

<div class="grid grid-cols-2 gap-8 mt-6 text-petrol">

<div>
<div class="text-xl mb-3">🔌 Let less <em class="text-apricot font-serif italic">in</em></div>
<div class="space-y-2 text-base">
  <div class="bg-lightGray px-4 py-2">MCP tool descriptions sit in the <strong>context</strong></div>
  <div class="bg-lightGray px-4 py-2">Skill descriptions sit in the <strong>context</strong></div>
  <div class="bg-lightGray px-4 py-2">Enable only what the task needs</div>
  <div class="bg-lightGray px-4 py-2">Prefer a <strong>CLI wrapper</strong> over an MCP server</div>
</div>
</div>

<div>
<div class="text-xl mb-3">🗜️ Let less <em class="text-apricot font-serif italic">back</em></div>
<div class="space-y-2 text-base">
  <div class="bg-lightGray px-4 py-2">Tool output is tokens too</div>
  <div class="bg-lightGray px-4 py-2">Filter noisy output (<code>git status</code>, test runners)</div>
  <div class="bg-lightGray px-4 py-2"><strong>rtk</strong> — CLI proxy + hook, 60–90% fewer tokens</div>
</div>
</div>

</div>

<div class="mt-8 bg-apricot rounded text-white px-5 py-3 text-center text-lg">
Two levers: fewer tools <em>in</em>, less noise <em>back</em>.
</div>

<!--
Zwei Seiten desselben Hebels — Tools als Kostenfaktor, nicht nur als "Dumb Zone"-Qualitäts-
problem (das hatten wir in Block A, Tools & MCP).

Let less in: MCP-Tool-Beschreibungen landen im System-Prompt und werden jeden Turn neu geladen
— compoundet. Nur aktivieren, was die Aufgabe braucht (Kunden-Handlungsempfehlung "Bewusstes
Ein- und Ausschalten von Tools"). CLI-Wrapper schlagen oft den MCP-Server (weniger Context,
bekannte Patterns).

Let less back: Tool-Output ist genauso Tokens. Lauten Output filtern, bevor er ins Window läuft
— das ist die produktisierte Form der Verification-Regel "surface errors only". Konkret: rtk
(Rust Token Killer, github.com/rtk-ai/rtk) — CLI-Proxy mit Auto-Rewrite-Hook, komprimiert
gängige Dev-Commands um 60–90 %.
-->

---

# Rewind, Don't *Steer*

<div class="text-lg mt-2 max-w-3xl text-petrol">

When the agent takes a wrong turn or breaks out of the task,<br /> *roll the conversation back* & don't try to talk it back on track.

</div>

<div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 mt-8 text-petrol text-lg max-w-3xl">
  <div>❌</div>
  <div><strong>Steering</strong> leaves the wrong turn in the context and the model keeps anchoring on it.</div>
  <div>❌</div>
  <div>Every correction prompt resends that noise. <strong>Cost compounds</strong>, quality drifts.</div>
  <div>✅</div>
  <div><strong>Rewind</strong> to just before the wrong turn and re-prompt from a clean point.</div>
</div>

<div class="mt-8 bg-apricot rounded text-white px-5 py-3 text-center text-lg">
A clean restart beats a long argument — cheaper <em>and</em> better.
</div>

<!--
Das reaktive Gegenstück zu den vier proaktiven Hebeln: Wenn der Agent falsch abbiegt, das Ziel
verfehlt oder aus der Aufgabe ausbricht.

Reflex ist Steering — per Prompt gegensteuern, dem Agenten gut zureden, ihn zum Zurückrudern
bewegen. Das ist meist die schlechtere Wahl: Der falsche Turn bleibt im Context, das Modell
ankert weiter daran, und jeder Korrektur-Prompt schickt den Schrott erneut mit. Ergebnis: höhere
Wahrscheinlichkeit, dass es schlechter statt besser wird, und mehr verheizte Tokens als nötig.

Besser: die Conversation an den Punkt VOR dem Fehlabzweig zurückdrehen und von dort sauber neu
prompten. Claude Code unterstützt das via Rewind (Doppel-Escape bzw. /rewind); andere
Harnesses haben ähnliche Mechanismen. Konkreter Mechanismus/Command variiert je Tool — das
Prinzip zählt.

Saubere Neustarts sind billiger UND liefern bessere Ergebnisse als lange Diskussionen im
verschmutzten Context.
-->
