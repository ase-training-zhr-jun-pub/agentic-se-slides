---
layout: center
background: petrol
---

# When output gets *cheap*,<br>the *expensive* things change

<div class="mt-10 flex items-center justify-center gap-6">
  <div class="bg-white text-petrol px-6 py-5 text-center">
    <div class="font-bold">Code output</div>
    <div>gets cheaper & faster</div>
  </div>
  <div class="text-apricot text-2xl font-bold">but</div>
  <div class="flex flex-col gap-2">
    <div class="bg-apricot text-white px-5 py-2 font-bold">Defects increase</div>
    <div class="bg-apricot text-white px-5 py-2 font-bold">Bottlenecks increase</div>
    <div class="bg-apricot text-white px-5 py-2 font-bold">Maintenance increases</div>
    <div class="bg-apricot text-white px-5 py-2 font-bold">Accountability increases</div>
    <div class="bg-apricot text-white px-5 py-2 font-bold">Knowledge loss increases</div>
  </div>
</div>

<!--
Kerngedanke des Kapitels. Wenn KI das Schreiben von Code billig macht, wird nicht alles einfacher,
die Kosten verschieben sich. Defekte, Engpässe, Wartung, Verantwortung und Wissensverlust werden teurer.
Wichtige Nuance (kommt später bei der Token-Ökonomie genauer): "billig" ist relativ. Der Output ist
gegenüber menschlicher Arbeit immer noch viel schneller und pro Einheit günstiger, auch wenn die
Tokenpreise gerade steigen. Und ein Teil dieser Kosten ist nur deshalb so hoch, weil die bisherigen
quersubventionierten Subscription-Modelle dazu verleitet haben, verschwenderisch mit der Technologie
umzugehen. Es entsteht viel Ausschuss, und Materialkosten sind in einer Fabrik ein echtes Problem.
-->

---
layout: default
---

# Example: Car Industry

<div class="flex items-stretch justify-center gap-6 mt-8">
  <div class="bg-lightGray text-petrol p-6 w-72 text-center">
    <div class="text-6xl mb-3">🔧</div>
    <div class="font-bold text-xl mb-3">Car Manufacture</div>
    <div class="text-base leading-relaxed">Craft assembly<br><b>12 h</b> per car<br><b>$850</b></div>
  </div>
  <div class="self-center text-apricot text-6xl font-bold">→</div>
  <div class="bg-petrol text-white p-6 w-72 text-center">
    <div class="text-6xl mb-3">🏭</div>
    <div class="font-bold text-xl mb-3">Car Factory</div>
    <div class="text-base leading-relaxed">Assembly line<br><b>93 min</b> per car<br><b>$260</b></div>
  </div>
</div>

<div class="mt-10 text-center text-lg text-petrol">Scaling didn't just solve problems.</div>
<div class="text-center text-lg text-petrol">It shifted them: monotony, worker morale, the $5 day.</div>

<!--
Ford hat die Manufaktur mit dem Fließband in Highland Park abgelöst: Die Bauzeit eines Model T sank
von gut zwölf Stunden auf 93 Minuten, der Preis von 850 auf 260 Dollar. Was selten erzählt wird: Ford
hatte ein heftiges Folgeproblem. Die Arbeit am Band wurde monoton, die Fluktuation explodierte, seine
Antwort war der Fünf-Dollar-Tag. Die Lektion ist nicht "Fließband gut", sondern: Skalierung löst nicht
nur Probleme, sie verschiebt sie. Qualität, Engpässe und Wissen mussten plötzlich anders organisiert
werden. Genau das passiert gerade mit Software.
-->


---
layout: default
---

# Muda (Waste)

<div class="text-center text-lg text-petrol mt-1">Ōno at Toyota defined seven kinds of waste, the enemy of throughput and quality.</div>

<div class="grid grid-cols-4 gap-3 mt-6 text-center">
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">🏭</div><div class="font-bold text-sm">Overproduction</div><div class="text-xs">making more than is needed</div>
  </div>
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">⏳</div><div class="font-bold text-sm">Waiting</div><div class="text-xs">idle time between steps</div>
  </div>
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">🚚</div><div class="font-bold text-sm">Transport</div><div class="text-xs">moving work, no value added</div>
  </div>
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">🛠️</div><div class="font-bold text-sm">Overprocessing</div><div class="text-xs">more work than required</div>
  </div>
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">📦</div><div class="font-bold text-sm">Inventory</div><div class="text-xs">unfinished work piling up</div>
  </div>
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">🔁</div><div class="font-bold text-sm">Motion</div><div class="text-xs">unnecessary back and forth</div>
  </div>
  <div class="bg-lightGray text-petrol p-3">
    <div class="text-3xl mb-1">❌</div><div class="font-bold text-sm">Defects</div><div class="text-xs">errors and rework</div>
  </div>
  <div class="bg-apricot text-petrol p-3 flex flex-col justify-center">
    <div class="text-3xl mb-1">🤖</div><div class="font-bold text-sm">Sound familiar?</div><div class="text-xs">Agents can increase most of them.</div>
  </div>
</div>

<!--
Taiichi Ōno (Toyota Production System) hat sieben Arten von Verschwendung (Muda) identifiziert und
kategorisiert, die zu niedrigerem Durchsatz und schlechterer Performance führen: Überproduktion,
Wartezeit, Transport, Überbearbeitung, Bestände, Bewegung, Ausschuss. Merkhilfe im Lean: TIMWOOD.
Der Punkt fürs Kapitel: Agentische Entwicklung ist geradezu eine Verschwendungsmaschine, wenn man nicht
gegensteuert. Überproduktion = Slop und zu viele PRs, Bestände = unreviewte Arbeit, die sich stapelt,
Wartezeit = Review- und CI-Queues, Ausschuss = teure Fehl-Merges und Rework, Überbearbeitung =
Over-Engineering. Muda ist also kein Industriethema von gestern, sondern beschreibt ziemlich genau,
was gerade entsteht.
-->

---
layout: default
---

# What industry learned while scaling

<div class="min-h-96 flex flex-col justify-center">
  <div class="grid grid-cols-6 gap-3 text-center">
    <div class="bg-lightGray text-petrol p-4">
      <div class="text-4xl mb-2">🛑</div>
      <div class="font-bold text-sm mb-1">Jidoka / Andon</div>
      <div class="text-xs leading-snug">Stop the line at the source of a defect</div>
    </div>
    <div class="bg-lightGray text-petrol p-4">
      <div class="text-4xl mb-2">📈</div>
      <div class="font-bold text-sm mb-1">SPC · Shewhart</div>
      <div class="text-xs leading-snug">Statistical Process Control: measure the process, not the product</div>
    </div>
    <div class="bg-lightGray text-petrol p-4">
      <div class="text-4xl mb-2">⛓️</div>
      <div class="font-bold text-sm mb-1">ToC · <br/>Goldratt</div>
      <div class="text-xs leading-snug">Theory of Constraints: find the one bottleneck</div>
    </div>
    <div class="bg-lightGray text-petrol p-4">
      <div class="text-4xl mb-2">🛠️</div>
      <div class="font-bold text-sm mb-1">TPM · Nakajima</div>
      <div class="text-xs leading-snug">Total Productive Maintenance: who keeps the machine running?</div>
    </div>
    <div class="bg-lightGray text-petrol p-4">
      <div class="text-4xl mb-2">🔄</div>
      <div class="font-bold text-sm mb-1">Kaizen · Toyota</div>
      <div class="text-xs leading-snug">Continuous improvement: build the learning loop in</div>
    </div>
    <div class="bg-teal text-white p-4">
      <div class="text-4xl mb-2">✅</div>
      <div class="font-bold text-sm mb-1">Kanban · Toyota</div>
      <div class="text-xs leading-snug">Visualize flow, limit work in progress</div>
    </div>
  </div>
  <div class="mt-10 text-center text-petrol text-lg">Answers to the pathologies of scale.</div>
</div>

<!--
Fünf strukturelle Antworten aus rund hundert Jahren Produktion. Keine davon ist nur ein Werkzeug, alle
reagieren auf dieselbe Krankheit: die Pathologien, die entstehen, wenn Produktion skaliert. Diese fünf
liefern uns die Brille für die Herausforderungen, die jetzt kommen, und sie tauchen nicht zufällig in
derselben Reihenfolge wieder auf: Engpass, Prozessmessung, Andon, Wartung/Verantwortung, Lernschleifen.
-->

---
layout: center
---

# But should we<br/> treat software like cars?

<div class="mt-8 text-center text-lg text-petrol max-w-4xl mx-auto">Programming is also design work, not just manufacturing.</div>
<div class="text-center text-lg text-petrol max-w-4xl mx-auto">Agents now sit in the design phase but also produce at factory speed.</div>
<div class="text-center text-lg text-petrol max-w-4xl mx-auto">That is exactly what breaks the old, clean split.</div>

<!--
Schärfung nach Daniels Feedback. Die alte, saubere Trennung: Baldur Bjarnason argumentierte schon vor
der agentischen Welle, dass Softwareentwicklung strukturell Design ist, nicht Manufacturing. Dave Farley
verortet Programmieren nahe am Design Engineering, während die Build-Pipeline dem Manufacturing
entspricht. Don Reinertsen: Design braucht Variabilität, sonst entstehen keine neuen "Rezepte";
Manufacturing ist das, was nach dem Design passiert, dort will man Determinismus, dort passen Shewharts
Regelkarten. Agenten sprengen diese Trennung: Sie sitzen in der Design-Phase, produzieren aber mit einer
Geschwindigkeit und Skalierung, die an Manufacturing erinnert. Genau deshalb ist die Übersetzung
industrieller Konzepte hier nicht trivial. Antwort auf die Titelfrage: nicht eins zu eins kopieren.
-->

---
layout: center
background: petrol
---

# When intelligence is accessible,<br/> but *Flow* isn't

<div class="mt-4 text-white text-xl">Everyone can switch AI on. But how does it move through organizations?</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto text-left">
  <div class="bg-apricot text-petrol p-6">
    <div class="text-4xl mb-3">🌊</div>
    <div class="font-bold mb-1">Water without pipes</div>
    <div class="text-base leading-snug">It pools, leaks, evaporates. Individuals get faster, the organization still learns nothing.</div>
  </div>
  <div class="bg-apricot text-petrol p-6">
    <div class="text-4xl mb-3">🚰</div>
    <div class="font-bold mb-1">Water with pipes</div>
    <div class="text-base leading-snug">Deliberate channels: close the learning loops, reconnect business data scattered across tools, ...</div>
  </div>
</div>

<!--
Framing fürs ganze Kapitel, auf zwei Ebenen. Robert Glaser: Wenn alle KI nutzen und das Unternehmen
trotzdem nichts lernt, liegt das daran, dass die Lern-Loops nicht geschlossen werden. Zugang allein
reicht nicht. Die Metapher: Intelligenz wird wie Wasser behandelt. In beiden Fällen ist es Wasser, der
Unterschied sind die Rohre. Ohne Rohre versickert der Nutzen, Einzelne werden schneller, die Organisation
lernt nichts. Mit Rohren fließt er dorthin, wo er gebraucht wird. Zweite Ebene: Rohre stehen auch für
Integration. Die Geschäftsdaten liegen auf zig SaaS-Tools verteilt, und plötzlich braucht man sie alle
im Zugriff. Genau dieser Integrationsteil ist gerade schmerzhaft, weil Daten nicht zugänglich sind oder
nicht über MCP freigegeben werden. Die folgenden Herausforderungen sind diese Rohre.
-->
