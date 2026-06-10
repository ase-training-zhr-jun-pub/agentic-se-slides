---
layout: intro
background: apricot
---

### *Agents can produce more than we can review*
# The Human Bottleneck

<!--
Challenge 1, erste Herausforderung. Die provokante Kernfrage: Wenn das Erzeugen von Code billig wird,
wo staut sich die Arbeit dann? Wir nehmen ein offensichtliches Beispiel, aber es ist nicht das einzige.
-->

---
layout: default
---

# A bottleneck just moved downstream

<div class="flex items-center justify-center gap-2 mt-6">
  <div class="bg-lightGray text-petrol px-3 py-4 text-center w-32">
    <div class="text-3xl mb-1">💡</div><div class="text-sm font-bold">Idea</div>
  </div>
  <div class="text-petrol text-xl">→</div>
  <div class="bg-apricot text-petrol px-3 py-4 text-center w-40">
    <div class="text-3xl mb-1">🤖</div><div class="text-sm font-bold">Coding agent</div>
  </div>
  <div class="text-petrol text-xl">→</div>
  <div class="text-3xl mb-1">📦</div>
  <div class="text-3xl mb-1">📦</div>
  <div class="text-3xl mb-1">📦</div>
  <div class="text-3xl mb-1">📦</div>
  <div class="text-petrol text-xl">→</div>
  <div class="bg-petrol text-white px-3 py-4 text-center w-40">
    <div class="text-3xl mb-1">👀</div><div class="text-sm font-bold">Review · CI · Integration</div>
  </div>
  <div class="text-petrol text-xl">→</div>
  <div class="bg-lightGray text-petrol px-3 py-4 text-center w-32">
    <div class="text-3xl mb-1">🚀</div><div class="text-sm font-bold">Ship</div>
  </div>
</div>

<div class="mt-5 text-center text-base text-petrol">Example: reviewable units are <b>bigger</b> and arrive <b>faster</b>.</div>

<div class="grid grid-cols-2 gap-4 mt-5">
  <div class="bg-lightGray text-petrol p-4">
    <div class="font-bold mb-1">Green isn't good enough</div>
    <div class="text-sm">An agent can make the tests pass and still hand you a change no team would merge. Passing a benchmark says little about real quality.</div>
  </div>
  <div class="bg-lightGray text-petrol p-4">
    <div class="font-bold mb-1">The human gate leaks</div>
    <div class="text-sm">One reviewer waving through a flood of large diffs is not a dependable check. The more they pass, the less it means.</div>
  </div>
</div>

<!--
Wenn nur die Code-erzeugende Station schneller wird, steigt nicht der Gesamtdurchsatz, es wächst der
Stapel davor. Wichtig: Das ist ein sehr offensichtliches Beispiel, aber kein Naturgesetz. Engpässe können
genauso weiter vorne sitzen, etwa in der Discovery. Das eigentlich Neue: Die reviewbare Einheit, die ein
Coding-Agent einem Team vor den Latz knallt, ist auf einmal größer und kommt schneller, und es kommen mehr
davon. Zwei Aspekte dieses einen Flaschenhalses: (1) Einen Benchmark zu bestehen ist nicht dasselbe wie
mergeable zu sein, viele Lösungen würden im echten Review nicht gemerged (METR). (2) Der Mensch als reine
Endkontrolle ist keine verlässliche Instanz, gerade bei einer Flut großer Diffs (Michael Seel, "Die Taube
sieht besser"). Quellen bewusst nur auf der Tonspur.
-->

---
layout: default
---

# Manage the flow, not the station

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="bg-lightGray text-petrol p-6">
    <div class="font-bold text-apricot text-lg mb-3">Think in constraints</div>
    <div class="space-y-2 text-base">
      <div>🔍 Find the <b>one</b> bottleneck</div>
      <div>🛡️ Protect it from junk work</div>
      <div>⚖️ Subordinate everything else to it</div>
    </div>
  </div>
  <div class="bg-petrol text-white p-6">
    <div class="font-bold text-apricot text-lg mb-3">An Andon equivalent</div>
    <div class="space-y-2 text-base">
      <div>🛑 Stop when artifacts lose the intent or drift out of the solution space</div>
      <div>🔁 …or an agent encounters the same problem all the time</div>
      <div>📉 Steer by flow & WIP, not lines of code</div>
    </div>
  </div>
</div>

<div class="mt-4 text-center text-sm text-petrol">Defining that stop condition is the hard part, and it is anything but trivial.</div>

<div class="mt-5 bg-apricot text-petrol px-8 py-4 text-center">
  <div class="font-bold text-base mb-1">🧭 TAKE HOME</div>
  <div class="text-xl">Where is your real bottleneck, and would you even notice if it moved?</div>
</div>

<!--
Erst den echten Engpass finden, ihn schützen, genau dort verbessern. Das Andon-Äquivalent ist hier
nicht trivial: In der Fabrik fragt man, ob ein Teil von der Spezifikation abweicht. Bei einem
LLM-Agenten reicht das nicht, da muss man fragen: Hat der Agent die Intention noch? Bewegt sich die
Lösung noch im definierten Lösungsraum? Es braucht nicht permanent einen Menschen im Getriebe, aber
etwas, das die Linie anhalten und neu kalibrieren kann. Steuerungsgrößen: Flow und WIP statt
Aktivitätsmetriken wie LoC oder PRs pro Tag.
-->
