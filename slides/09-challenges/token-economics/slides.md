---
layout: intro
background: apricot
---

### *Is this still affordable?*
# Affordability & Token Economics

<!--
Challenge 3, erste Herausforderung. Bleibt das Ganze finanzierbar? Die Ökonomie hinter den Agenten
verändert sich gerade massiv, und das hat direkte Folgen fürs Team.
-->

---
layout: default
---

# The subsidy is ending

<div class="flex items-stretch justify-center gap-4 mt-6">
  <div class="bg-lightGray text-petrol p-5 w-80">
    <div class="text-3xl mb-1">💳</div><b>Flat subscription</b>
    <div class="text-sm mt-1">Sold below cost. "Use all you want" quietly rewarded waste.</div>
  </div>
  <div class="pt-5">
    <div class="text-petrol text-2xl font-bold">→</div>
  </div>
  <div class="bg-petrol text-white p-5 w-80">
    <div class="text-3xl mb-1">📊</div><b>Pay per use</b>
    <div class="text-sm mt-1">Metered. Every token is real money now.</div>
  </div>
</div>

<div class="flex items-center justify-center gap-6 mt-8">
  <div class="flex items-end gap-2">
    <div class="bg-apricot w-8 h-6"></div>
    <div class="bg-apricot w-8 h-10"></div>
    <div class="bg-apricot w-8 h-16"></div>
    <div class="bg-apricot w-8 h-24"></div>
  </div>
  <div class="text-base text-petrol max-w-md text-left">Within one session, each turn resends the whole context. Cost <b>compounds</b> per step, it doesn't add up per task.</div>
</div>

<div class="mt-6 text-center text-lg text-petrol">Tokens are <b>material</b> now. And material costs money.</div>

<!--
Die Botschaft: Das Monetarisierungsmodell kippt von quersubventionierten Flatrates hin zu nutzungsbasierter
Abrechnung. Anbieter haben Rechenleistung lange unter Kosten verkauft, auch um den Einstieg zu erleichtern.
Das hat dazu verleitet, verschwenderisch umzugehen. Jetzt wird metered abgerechnet (Anthropic agentic
credits, GitHub Copilot AI Credits, Tokenizer-Erhöhung um bis zu 35%). Warum compounding: Agentische
Sessions laden pro Turn die ganze Historie neu, der Verbrauch wächst pro Schritt, nicht pro Aufgabe.
Firmen wie Uber und ServiceNow haben Jahresbudgets in Monaten verbraucht, 500 bis 2.000 Dollar pro Engineer
und Monat sind real. Tokens sind ein Material wie in einer Fabrik, und Ausschuss kostet.
-->

---
layout: default
---

# Discipline and cost ownership

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="bg-lightGray text-petrol p-2">
    <div class="text-xl mb-1">💰</div><b class="text-base">AI-FinOps</b>
    <div class="text-sm mt-1">Cost awareness and ownership in the team, the way DevOps brought ops in. Every dev sees what they burn.</div>
  </div>
  <div class="bg-lightGray text-petrol p-2">
    <div class="text-xl mb-1">🔧</div><b class="text-base">Harness engineering</b>
    <div class="text-sm mt-1">Offload to deterministic tools, CLIs and scripts, give the agent backpressure. Often the bigger lever.</div>
  </div>
  <div class="bg-lightGray text-petrol p-2">
    <div class="text-xl mb-1">🎯</div><b class="text-base">Context engineering</b>
    <div class="text-sm mt-1">Load only what's relevant. No noise, no dead weight in the window.</div>
  </div>
  <div class="bg-lightGray text-petrol p-2">
    <div class="text-xl mb-1">♻️</div><b class="text-base">Session discipline</b>
    <div class="text-sm mt-1">One task, then reset and compact.</div>
  </div>
</div>

<div class="mt-5 bg-apricot text-petrol px-8 py-4 text-center">
  <div class="font-bold text-base mb-1">🧭 TAKE HOME</div>
  <div class="text-xl">Do you know your cost per merged change, or just your monthly bill?</div>
</div>

<!--
Zwei Seiten einer Medaille: Disziplin und Kostenbewusstsein. AI-FinOps bringt die Ownership für Kosten ins
Team, so wie DevOps das Bewusstsein für den Betrieb gebracht hat. Jede:r sieht, wie viel an Tokens
durchgeht, und es braucht ein betriebswirtschaftliches Verständnis fürs Kosten-Nutzen-Verhältnis.
Harness Engineering ist oft der größere Hebel: Vieles besser deterministisch über Tools, CLIs oder Skripte
lösen statt es per Prompt vom Agenten erraten zu lassen, und dem Agenten Backpressure geben, damit er die
Aufgabe richtig löst. Context Engineering: nur Relevantes laden. Session-Disziplin: eine Aufgabe pro Session,
dann zurücksetzen und komprimieren. Bewusst nicht Spec-Driven als Empfehlung, das verleitet zu zu vielen,
zu umfangreichen Specs, deren Fehler sich nach hinten potenzieren. Saubere, zugreifbare Requirements und ein
guter Plan vor dem Lauf: ja. Mehr Specs ist nicht mehr Qualität.
-->
