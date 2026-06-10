---
layout: intro
background: apricot
---

### *When variability loses its intent*
# Sameness Engineering

<!--
Challenge 1, zweite Herausforderung. Knüpft direkt an den Engpass an: Ein Teil der unreviewten Masse ist
nicht nur viel, sondern subtil kaputt. LLMs erzeugen Variabilität, die Kunst ist, gute von schlechter
zu unterscheiden.
-->

---
layout: default
---

# Good variability vs. drift

<div class="max-w-3xl mx-auto mt-8">
  <div class="flex gap-3">
    <div class="flex items-center justify-center w-8">
      <div class="-rotate-90 text-sm font-bold text-petrol whitespace-nowrap">Does it work? →</div>
    </div>
    <div class="grid grid-cols-2 gap-3 flex-1 text-center">
      <div class="bg-lightGray text-petrol p-4"><div class="text-2xl mb-1">⚠️</div><b>Rigid</b><div class="text-xs">works now, painful later</div></div>
      <div class="bg-lightGray text-petrol p-4"><div class="text-2xl mb-1">✅</div><b>Good code</b><div class="text-xs">works & stays adaptable</div></div>
      <div class="bg-lightGray text-petrol p-4"><div class="text-2xl mb-1">❌</div><b>Genie tarpit</b><div class="text-xs">plausible, but neither</div></div>
      <div class="bg-lightGray text-petrol p-4"><div class="text-2xl mb-1">⚠️</div><b>Broken</b><div class="text-xs">changeable, doesn't work</div></div>
    </div>
  </div>
  <div class="flex justify-between text-sm font-bold text-petrol mt-2 pl-10">
    <span>Hard to change</span><span>Easy to change →</span>
  </div>
</div>

<div class="mt-6 text-center text-base text-petrol">LLMs vary by design. <b>Variability is the feature, not the bug.</b></div>
<div class="text-center text-base text-petrol">Drift is the bad kind: conventions slip, the same bug returns, quality erodes.</div>

<!--
LLMs erzeugen Variabilität nicht trotz, sondern wegen ihres Funktionsprinzips. Würde man sie vollständig
eliminieren, so wie Six Sigma es in der Fabrik zu Recht tut, wären Agenten nur noch Compiler. Variabilität
ist also nicht der Bug, den man herausoptimiert, sie ist das Feature. Das Problem: Erwünschte Variabilität
(verschiedene valide Lösungswege, kreative Implementierungen) und unerwünschte (Drift über Iterationen,
Halluzinationen, inkonsistente Konventionen) kommen aus demselben Mechanismus. Genie Tarpit (Kent Beck):
plausibel aussehender Code, der auf beiden Achsen verliert. Quellen nur auf der Tonspur.
-->

---
layout: default
---

# Measure the process, not the product

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="bg-lightGray text-petrol p-6">
    <div class="font-bold text-lg mb-3">✅ Use the variety on purpose</div>
    <div class="text-base leading-relaxed">Run several valid solutions in parallel: worktrees, quick prototypes, competing implementations. Then pick the best parts and merge them into one.</div>
  </div>
  <div class="bg-petrol text-white p-6">
    <div class="font-bold text-apricot text-lg mb-3">❌ Watch the drift signals deliberately</div>
    <div class="text-base leading-relaxed">Conventions slip. Architecture boundaries blur. The same defect keeps returning. Humans already can get this wrong, and it gets much harder now.</div>
  </div>
</div>

<div class="mt-8 bg-apricot text-petrol px-8 py-4 text-center">
  <div class="font-bold text-base mb-1">🧭 TAKE HOME</div>
  <div class="text-xl">What would tell you the codebase is drifting?</div>
</div>

<!--
Erwünschte Variabilität bewusst nutzen: mehrere valide Lösungen parallel erzeugen (Worktrees, schnelle
Prototypen, konkurrierende Implementierungen), dann die besten Teile herauspicken und zu einer Version
zusammenführen. Das tun heute noch die wenigsten, es ist eine echte neue Möglichkeit. Auf der anderen
Seite die Drift-Signale: Kontrollgrenzen im Shewhart-Sinne setzen einen prinzipiell stabilen Prozess
voraus. Hier ist die Frage eine andere: Hat der Agent die Intention noch, bewegt sich die Lösung noch im
Lösungsraum? Drift zu erkennen war auch früher schon schwer und menschenmöglich zu vergeigen, jetzt wird
es noch wichtiger, sehr bewusst darauf zu achten.
-->
