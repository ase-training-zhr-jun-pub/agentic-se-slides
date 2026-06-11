# Kapitel 9 „Future Challenges" — Hintergrund, Quellen und Einordnung

Dieses Dokument erklärt die Folien des Kapitels 9, liefert die externen Quellen hinter den
(bewusst nur „auf der Tonspur" referenzierten) Aussagen und bewertet, wie belastbar die
einzelnen Betrachtungen sind. Zielgruppe: Trainer:innen, die das Kapitel halten und auf
Rückfragen tiefer einsteigen wollen.

**Aufbau des Kapitels:** Ein historischer Bogen (Manufaktur → Fabrik) liefert die Brille,
durch die anschließend drei Challenge-Gruppen betrachtet werden: (1) Throughput & Quality,
(2) Knowledge & People, (3) Cost & Responsibility. Der Schluss rahmt alles als offene Wette.

---

## 1. The Factory Arc — der historische Bogen

### „When output gets cheap, the expensive things change"

**Folie:** Code-Output wird billiger und schneller, dafür steigen Defekte, Engpässe,
Wartung, Verantwortung und Wissensverlust.

**Hintergrund:** Das ist die Kernthese des Kapitels und zugleich eine ökonomische
Binsenweisheit aus der Industriegeschichte: Wenn ein Produktionsschritt drastisch billiger
wird, wandern die Kosten in die umliegenden Schritte (Qualitätssicherung, Koordination,
Wartung). Empirisch gestützt wird sie inzwischen durch Telemetriedaten (siehe Faros AI
unter Abschnitt 4).

**Bewertung:** Solide. Die Folie behauptet keine Zahlen, sondern eine Verschiebung — und
genau die zeigen die verfügbaren Daten. Wichtige Nuance aus der Speaker-Note: „billig" ist
relativ; pro Einheit bleibt KI-Output gegenüber menschlicher Arbeit günstig, auch wenn
Tokenpreise steigen.

### „Example: Car Industry" (Ford)

**Folie:** Manufaktur 12 h/$850 pro Auto → Fließband 93 min/$260; Folgeprobleme Monotonie,
Fluktuation, Five-Dollar-Day.

**Hintergrund:** Historisch im Kern korrekt: Die Chassis-Montagezeit des Model T sank nach
Einführung des Fließbands in Highland Park (1913) von ~12,5 Stunden auf ~93 Minuten; der
Preis des Model T fiel von 850 $ (1908) auf ~260 $ (Mitte der 1920er). Der Five-Dollar-Day
(1914) war Fords Antwort auf extreme Fluktuation am monotonen Band.

**Bewertung:** Als Analogie sauber erzählt, die Zahlen vermengen allerdings zwei Zeiträume
(Montagezeit 1913/14, Endpreis 1925) — fürs Storytelling okay, bei Nachfragen transparent
machen. Die eigentliche Lektion („Skalierung verschiebt Probleme") ist die didaktisch
wertvolle Aussage, nicht die Zahlen.

### „Muda (Waste)" und „What industry learned while scaling"

**Folien:** Taiichi Ōnos sieben Verschwendungsarten (Merkhilfe TIMWOOD) und fünf/sechs
strukturelle Antworten der Industrie: Jidoka/Andon, SPC (Shewhart), Theory of Constraints
(Goldratt), TPM (Nakajima), Kaizen, Kanban.

**Hintergrund:**
- Taiichi Ōno: *Toyota Production System — Beyond Large-Scale Production* (1978/1988).
- Walter A. Shewhart: Statistical Process Control / Regelkarten (Bell Labs, 1920er).
- Eliyahu Goldratt: *The Goal* (1984) — Theory of Constraints.
- Seiichi Nakajima: Total Productive Maintenance (1970er/80er).
- Kaizen/Kanban: Bestandteile des Toyota-Produktionssystems.

**Bewertung:** Lehrbuchwissen, unstrittig. Die Pointe der Muda-Folie („Agents can increase
most of them") ist eine Übertragung, keine Empirie — aber eine sehr plausible: Slop/zu viele
PRs = Überproduktion, unreviewte Arbeit = Bestände, Review-/CI-Queues = Wartezeit, teure
Fehl-Merges = Ausschuss. Die Faros-Daten (s.u.) stützen genau diese Muster.

### „But should we treat software like cars?"

**Folie:** Programmieren ist auch Design-Arbeit, nicht nur Manufacturing. Agenten sitzen in
der Design-Phase, produzieren aber mit Fabrik-Geschwindigkeit — das sprengt die alte
Trennung.

**Hintergrund & Quellen:**
- Baldur Bjarnason argumentiert (vor der agentischen Welle), dass Softwareentwicklung
  strukturell Design ist, nicht Fertigung: *Out of the Software Crisis* —
  https://softwarecrisis.baldurbjarnason.com/
- Dave Farley verortet Programmieren als Design Engineering; das „Manufacturing" der
  Software ist die (quasi kostenlose) Build-/Deployment-Pipeline: *Modern Software
  Engineering* (Addison-Wesley, 2021).
- Donald Reinertsen: Produktentwicklung *braucht* Variabilität (sonst entsteht nichts
  Neues), Manufacturing will Determinismus: *The Principles of Product Development Flow*
  (Celeritas, 2009).

**Bewertung:** Das ist die intellektuell wichtigste Folie des Kapitels, weil sie die
Fabrik-Metapher selbst begrenzt — und damit dem häufigsten Einwand („Software ist keine
Fabrik!") zuvorkommt. Die Position „nicht eins zu eins kopieren" ist im Diskurs gut
abgesichert. Wer tiefer will: Reinertsens Unterscheidung zwischen Variabilität als
Wertquelle im Design und Variabilität als Defekt in der Fertigung ist die präziseste
theoretische Grundlage für das ganze Kapitel.

### „When intelligence is accessible, but Flow isn't" (Wasser & Rohre)

**Folie:** Alle können KI einschalten — aber ohne „Rohre" (geschlossene Lern-Loops,
Datenintegration) versickert der Nutzen; Einzelne werden schneller, die Organisation lernt
nichts.

**Hintergrund & Quelle:** Robert Glaser (ehem. Head of Data & AI bei INNOQ, heute Exxeta):
„When everyone has AI and the company still learns nothing" —
https://www.robert-glaser.de/when-everyone-has-ai-and-the-company-still-learns-nothing/
Glaser spricht von „Loop Intelligence": Welche (agentischen) Loops erzeugen wirklich
Lernen, welche bleiben offen, welche verfallen?

**Bewertung:** Konzeptionell stark und gut anschlussfähig (DevOps-Lernschleifen,
Knowledge Management). Es ist eine Praxisbeobachtung, keine Studie — als Framing-Folie
genau richtig eingesetzt. Die zweite Ebene (Geschäftsdaten in zig SaaS-Silos, MCP-Zugriff
als Schmerzpunkt) deckt sich mit verbreiteter Beratungserfahrung.

---

## 2. Challenge 1 · Throughput & Quality

### „The Human Bottleneck" / „A bottleneck just moved downstream"

**Folien:** Wenn die Code-Station schneller wird, staut sich die Arbeit vor Review, CI und
Integration. Zwei Verschärfungen: „Green isn't good enough" und „The human gate leaks".

**Hintergrund & Quellen:**
- **METR:** „Many SWE-bench-Passing PRs Would Not Be Merged into Main" (März 2026) —
  https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/
  Maintainer von SWE-bench-Repos haben 296 KI-generierte, benchmark-bestehende PRs
  begutachtet; ein erheblicher Teil wäre real nicht gemergt worden (Funktionalität,
  Seiteneffekte, Codequalität). Das stützt „Green isn't good enough" direkt.
- **Michael Seel, „Die Taube sieht besser":** öffentlich nicht auffindbar — vermutlich
  interner INNOQ-Talk/-Post. Der wissenschaftliche Hintergrund der Tauben-Metapher ist
  mutmaßlich Levenson et al., *Pigeons as Trainable Observers of Pathology and Radiology
  Breast Cancer Images* (PLOS ONE, 2015): trainierte Tauben erreichen bei Bildbefundung
  erstaunliche Trefferquoten — die Pointe ist die Unzuverlässigkeit menschlicher
  Sichtprüfung als alleinige Endkontrolle. **Empfehlung:** Quelle im Repo verlinken oder
  klären, ob/wo der Beitrag veröffentlicht ist.
- Die Flow-Logik (einen Engpass finden, schützen, alles unterordnen) ist Goldratts
  Theory of Constraints, angewandt auf den Entwicklungsprozess.
- Passend dazu: Faros AI misst 5x längere Median-Review-Zeiten in stark KI-adoptierenden
  Teams (s. Abschnitt „What to accelerate").

**Bewertung:** Empirisch die am besten abgesicherte Challenge des Kapitels. METR ist
seriös, aber die Stichprobe ist klein (296 PRs, 4 Maintainer, 3 Repos) — als Beleg für
„Benchmark ≠ mergeable" tragfähig, als Quantifizierung nicht. Wichtig ist die Nuance der
Speaker-Note: Der Review-Engpass ist ein *Beispiel*, kein Naturgesetz; der Engpass kann
auch in der Discovery sitzen (das bereitet Challenge 2 vor).

### „Manage the flow, not the station" (Andon-Äquivalent)

**Folie:** Constraints-Denken plus ein „Andon-Äquivalent": stoppen, wenn Artefakte die
Intention verlieren oder den Lösungsraum verlassen; Steuerung über Flow/WIP statt LoC.

**Bewertung:** Hier verlässt das Kapitel den gesicherten Boden und wird konstruktiv — das
sagt die Folie selbst („defining that stop condition is the hard part"). Ein operatives
Andon für LLM-Agenten gibt es als etabliertes Pattern noch nicht; Bausteine existieren
(Hooks/Back-Pressure aus Kapitel 4, LLM-as-Judge, Drift-Metriken). Ehrlich gerahmt als
offene Ingenieursaufgabe. Die Absage an Aktivitätsmetriken (LoC, PRs/Tag) ist durch die
DORA-/SPACE-Forschungslinie gut gedeckt.

---

## 3. Challenge 1b · Sameness Engineering

### „Good variability vs. drift" / „Measure the process, not the product"

**Folien:** Variabilität ist bei LLMs Feature, nicht Bug; dieselbe Mechanik erzeugt aber
auch Drift (Konventionen rutschen, derselbe Bug kehrt zurück). 2x2: Funktioniert es ×
Änderbarkeit, mit „Genie Tarpit" als Verlierer-Quadrant.

**Hintergrund & Quellen:**
- **Kent Beck, „Genie Tarpit"** (Software Design: Tidy First?, Substack) —
  https://tidyfirst.substack.com/p/genie-tarpit
  Becks Metapher: „Genies" liefern plausiblen Code („a degraded facsimile of the mediocre
  code it trained on"), der weder funktioniert noch änderbar ist; Komplexität stapelt sich,
  bis auch der Genie nicht mehr weiterkommt. Seine Unterscheidung Features (was der Code
  jetzt tut) vs. Futures (was wir aus ihm noch machen können) liegt der Änderbarkeits-Achse
  der Folie zugrunde.
- Six-Sigma-Referenz: Variabilität eliminieren ist in der Fertigung richtig, würde Agenten
  aber „zu Compilern machen" — das ist wieder Reinertsens Design-vs-Manufacturing-Punkt.
- Shewhart-Regelkarten setzen einen stabilen Prozess voraus; bei LLM-Agenten ist die
  analoge Frage „Hat der Agent die Intention noch?" — bewusst als Übertragung, nicht als
  fertige Methode markiert.

**Bewertung:** Konzeptionell stimmig und mit Beck prominent gestützt. „Parallele
Lösungsvarianten bewusst nutzen, dann das Beste mergen" (Worktrees, konkurrierende
Implementierungen) ist real beobachtbare Praxis (vgl. auch die Multi-Branch-Topologie in
Kapitel 4), aber noch ohne belastbare Wirksamkeitsdaten. Drift-Erkennung als offenes
Problem zu benennen ist ehrlich; konkrete Signale (ArchUnit-Verstöße, wiederkehrende
Defekt-Cluster) liefert das eigene Kapitel 8 — diese Brücke lohnt sich im Vortrag.

---

## 4. Challenge 2 · Knowledge & People

### „Cognitive & Intent Debt" / „The theory gets thinner"

**Folien:** Naur-Zitat („Software is a theory in the heads of the people who build it"),
Dreieck Technical / Cognitive / Intent Debt; KI beschleunigt alle drei.

**Hintergrund & Quellen:**
- **Peter Naur, „Programming as Theory Building"** (1985, in *Computing: A Human
  Activity*): Das Programm ist sekundär; primär ist die „Theorie" im Kopf des Teams. Das
  Folien-Zitat ist eine Paraphrase, kein wörtliches Naur-Zitat — im Vortrag besser als
  „nach Naur" kennzeichnen.
- **Margaret-Anne Storey et al., „From Technical Debt to Cognitive and Intent Debt:
  Rethinking Software Health in the Age of AI"** (März 2026) —
  https://arxiv.org/abs/2603.22106 (auch in ACM Queue:
  https://queue.acm.org/detail.cfm?id=3807966; Blogfassung:
  https://margaretstorey.com/blog/2026/02/09/cognitive-debt/)
  Ihr „Triple Debt Model" ist exakt das Dreieck der Folie: Technical Debt im Code,
  Cognitive Debt als Erosion des geteilten Verständnisses, Intent Debt als fehlende
  externalisierte Begründung (das „Why"), die Menschen *und* Agenten bräuchten.
- Verwandt: die METR-RCT-Studie (2025), nach der erfahrene Entwickler:innen sich mit
  KI schneller *fühlten*, aber 19 % langsamer waren — ein Hinweis, wie unzuverlässig
  Selbstwahrnehmung beim Delegieren ist.

**Bewertung:** Die Begriffsbildung ist frisch (2026), kommt aber von einer der
renommiertesten Empirikerinnen der Software-Engineering-Forschung und ist peer-reviewed
publiziert. Es ist ein konzeptionelles Modell, (noch) keine Messung — die Folie behauptet
auch nicht mehr. „Delegate the work, not the intelligence" ist als Leitsatz des Kapitels
eine gelungene Verdichtung von Storeys Argument. Die Gegenmaßnahmen-Folie (Intent
explizit machen, Theorie im Kopf halten, Loops zurückspielen) ist konsistent mit den
Building Blocks aus Kapitel 4 (AGENTS.md/Rules = externalisierter Intent).

### „A New Way to Collaborate" / „The Agentic Trio"

**Folien:** Teams werden kleiner (6–10 Personen → kleines autonomes Trio+Agents), das
„Agentic Trio" aus Product, UX, Engineering macht gemeinsam Discovery, Agenten übernehmen
die Delivery-Fleißarbeit.

**Hintergrund & Quellen:**
- **Daniel Westheide, „The Agentic Trio"** (INNOQ-Blog, Mai 2026) —
  https://www.innoq.com/en/blog/2026/05/the-agentic-trio/
  Kernthesen: Delivery wird so billig, dass eine kleine Einheit Discovery *und* Delivery
  gemeinsam besitzt; alle drei Rollen werden T-shaped (geteilte Kompetenz in
  Discovery-Methoden und „coding-agent literacy"); der Engineer wird zum „Agent Harness
  Engineer" (Quality Gates, Pipelines, Governance). Westheide zitiert Reinertsen: hohe
  Auslastung am Engpass ist der teuerste Zustand der Produktentwicklung.
- Das Trio-Modell selbst ist **Teresa Torres** (*Continuous Discovery Habits*, 2021) —
  Westheide erweitert es explizit.

**Bewertung:** Das ist die spekulativste Stelle des Kapitels — eine Organisations-These,
keine Empirie. Das „Tomorrow?"-Fragezeichen auf der Folie ist daher genau richtig.
Gegenargumente, die man kennen sollte: Brooks' Law verschwindet nicht (Koordination
zwischen *Trios* bleibt), und kleine Teams mit großem Scope erhöhen den Bus-Faktor —
was direkt mit der Cognitive-Debt-Folie davor kollidieren kann. Gerade diese Spannung
(kleinere Teams ↔ dünnere geteilte Theorie) ist eine gute Diskussionsfrage im Training.

### „What Should We Even Accelerate?"

**Folien:** Discovery & Design brauchen Variabilität und Zeit; Delivery & Build sind
automatisierbar. Ronacher-Zitat zur Eiche. „+54 % Bugs bei reinem Output-Fokus." „Automate
the chore, protect the friction." Kapazität in Discovery statt Features.

**Hintergrund & Quellen:**
- **Armin Ronacher, „Some Things Just Take Time"** (März 2026) —
  https://lucumr.pocoo.org/2026/3/20/some-things-just-take-time/
  Wörtlich: „Nobody is going to mass-produce a 50-year-old oak. And nobody is going to
  conjure trust, or quality, or community out of a weekend sprint."
- **Faros AI, „The AI Engineering Report 2026"** (März 2026, Telemetrie von ~22.000
  Entwickler:innen / 4.000+ Teams) — https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways
  (Zusammenfassung: https://adtmag.com/articles/2026/04/22/more-code-more-bugs.aspx)
  Befunde: +54 % Bugs pro Entwickler:in (Vorjahr: +9 %), Incidents-zu-PR-Verhältnis mehr
  als verdreifacht, Median-Review-Zeit ~5x; gleichzeitig +34 % Task- und +66 %
  Epic-Durchsatz. Genau das Doppelgesicht, das die Folie zeichnet.
- **„Outcome over Output":** Als Buchtitel von **Josh Seiden** (*Outcomes Over Output*,
  2019); Jeff Patton prägt sinngemäß „Minimize output, maximize outcome and impact"
  (*User Story Mapping*, 2014). Die Folie schreibt es Patton zu — fachlich vertretbar,
  präziser wäre Seiden (oder beide).
- **Daniel Westheide, „Using the space, not optimizing the treadmill"** (INNOQ-Blog,
  Mai 2026) — https://www.innoq.com/en/blog/2026/05/agentic-engineering-product-discovery/
  Kernthese: Die frei werdende Kapazität nicht in die „Output-Tretmühle" (mehr Features)
  stecken, sondern in mehr und bessere Discovery; „features per unit of time is not a
  meaningful metric". Er zitiert u.a. die Pendo-Studie (2019), nach der ~80 % der Features
  durchschnittlicher Produkte selten oder nie genutzt werden.

**Bewertung:** Inhaltlich die rundeste Challenge: eine starke empirische Stütze (Faros),
ein präzises Sprachbild (Ronacher) und eine klare Handlungsempfehlung (Westheide).
Einschränkungen fair benennen: Faros ist Telemetrie-Korrelation, keine kausale Studie, und
stammt von einem Anbieter, der Engineering-Analytics verkauft (Interessenlage). Der
+54 %-Wert gilt für Teams mit reinem Output-Fokus — er ist kein Naturgesetz agentischer
Entwicklung, sondern genau das Argument der Folie: Es kommt darauf an, wohin die Kapazität
fließt.

---

## 5. Challenge 3 · Cost & Responsibility

### „Affordability & Token Economics" / „The subsidy is ending"

**Folien:** Flatrate (unter Kosten verkauft) → Pay-per-Use; Kosten compounden pro Turn;
„Tokens are material now." Gegenmaßnahmen: AI-FinOps, Harness Engineering, Context
Engineering, Session-Disziplin.

**Hintergrund & Quellen:**
- **Anthropic Billing-Split** (Mai 2026, wirksam 15. Juni 2026): Subscription-Kontingente
  werden in interaktiven Chat und separate „agentic credits" (Agent SDK, Coding-Tools,
  headless Runs) getrennt — de facto Metered Billing für agentische Nutzung:
  https://beam.ai/agentic-insights/anthropics-new-billing-split-reveals-what-ai-agents-actually-cost
- **Tokenizer-Effekt:** Der mit Opus 4.7 eingeführte Tokenizer erzeugt für denselben Text
  bis zu ~35 % mehr Tokens — Listenpreis unverändert, effektive Kosten steigen:
  https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag
- **Uber:** 2026er-KI-Budget nach ~4 Monaten aufgebraucht, getrieben v.a. durch Claude
  Code (84 % der Devs „agentic users"); Spending-Caps eingeführt, COO stellt
  Kosten-Nutzen-Frage öffentlich:
  https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/ und
  https://techcrunch.com/2026/06/02/uber-caps-employee-ai-spending-after-blowing-through-budget-in-four-months/
- **ServiceNow:** Partnerschaft mit Anthropic, erwartet Vervierfachung der Nutzung —
  https://www.anthropic.com/news/servicenow-anthropic-claude (Die Speaker-Note nennt
  ServiceNow neben Uber als Budget-Beispiel; öffentlich gut belegt ist vor allem Uber.
  Ggf. Note präzisieren.)
- Das Compounding-Argument (jeder Turn sendet die ganze Historie) ist technisch korrekt
  und wird in Kapitel 4 (Token Economy) operationalisiert — die beiden Kapitel verweisen
  bewusst aufeinander: Kapitel 4 = taktisch, Kapitel 9 = strategisch.

**Bewertung:** Sehr aktuell und gut belegt — zugleich die volatilste Stelle des Kapitels:
Preise, Abrechnungsmodelle und die „$500–2.000 pro Engineer/Monat"-Spanne können in
Monaten veraltet sein. Vor jedem Training kurz gegenprüfen. Die Gegenmaßnahmen-Folie ist
Konsens-Praxis; bemerkenswert (und gut begründet) ist die bewusste *Nicht*-Empfehlung von
mehr Spec-Driven-Prozess in der Speaker-Note: mehr Specs ≠ mehr Qualität, Spec-Fehler
potenzieren sich nach hinten.

### „Governance & Ownership"

**Folien:** Verantwortung verschwindet still (Coding-Agent → Review-Agent → Merger → Team
→ 🤷); Wartung der „Anlage" (Modell-Drift, Prompt-Decay, Skills, MCP-Configs, Harness) ist
echte Arbeit und braucht benannte Owner.

**Hintergrund:** Hier gibt es (noch) keine prominente Einzelquelle — die Folie überträgt
bekannte Muster: das Accountability-Problem verteilter Verantwortung („problem of many
hands"), DevOps/SRE-Ownership-Prinzipien und Platform-Engineering-Praxis auf agentische
Setups. Storeys Intent-Debt-Argument liefert die wissenschaftliche Flanke (Verantwortung
braucht externalisierte Begründungen). Regulatorisch wächst der Druck ohnehin (EU AI Act,
Haftungsfragen bei KI-generiertem Code).

**Bewertung:** These, aber eine risikoarme: Dass unbenannte Verantwortung in komplexen
Systemen verdunstet, ist organisationswissenschaftlich alt und praktisch täglich
beobachtbar („einzelne Enthusiast:innen pflegen es nebenbei"). Der Vergleich mit TPM
(Nakajima) aus dem Factory-Arc gibt der Folie ihre Struktur: Wartung als geplante Arbeit
statt Heldentum. Wer hier Substanz nachlegen will, kann auf Team-Topologies-Vokabular
(Platform Team für das Harness) zurückgreifen.

---

## 6. Takeaways & Schluss

### Takeaways 1–4

Verdichten den Kapitelbogen (Kostenverschiebung, Flow statt Station, Delegate the work not
the intelligence, Fabrik beantwortet nicht *was*). Konsistent mit dem Vorangegangenen.

### Takeaways 5–8 — Achtung, Quellenmix

- **5 „Invite AI to the table in all areas of product development"** und
  **6 „Assume every day that this is the worst AI you'll ever use"** sind zwei der vier
  Prinzipien aus **Ethan Mollick, *Co-Intelligence: Living and Working with AI*** (2024)
  — nicht Westheide. (Mollicks vier Prinzipien: Always invite AI to the table; Be the
  human in the loop; Treat AI like a person, but tell it what kind; Assume this is the
  worst AI you will ever use.)
- **7 „Most of the design work must have happened before AI enters the picture"** und
  **8 „AI amplifies the existing foundation of product discovery, either positively or
  negatively"** ließen sich keiner veröffentlichten Quelle zuordnen — sie passen inhaltlich
  zu Westheides Discovery-Argument und zur Torres-Schule, sind aber so nicht in seinen
  Posts. **Empfehlung:** entweder als eigene Thesen kennzeichnen oder Quelle ergänzen.

### „If everyone can build, where's the edge?" / „Judgment as the moat? That's a bet"

**Hintergrund:** Wenn Baukapazität Commodity wird, differenziert das *Was* und *Warum* —
Urteil, Discovery, Problemverständnis. Die Speaker-Note verweist auf Westheide (Kapazität
in Discovery statt Features); Ronachers Eichen-Text liefert dieselbe Stoßrichtung von der
Handwerksseite.

**Bewertung:** Die ehrlichste Folie des Kapitels: Sie markiert die eigene Kernannahme
explizit als Wette („Everyone is making it right now. Whether it holds, we'll find out").
Gegenposition fürs Q&A: Wenn Modelle auch Urteil und Discovery übernehmen (bessere
Synthese aus Nutzerdaten, automatisierte Experimente), hält der „Judgment moat" nicht —
dann verschiebt sich der Engpass erneut, z.B. zu Distribution, Daten oder Vertrauen.
Genau deshalb endet das Kapitel richtig: Die Fragen sind wichtiger als die vorläufigen
Antworten.

---

## 7. Gesamtbewertung des Kapitels

**Was empirisch gut gestützt ist:**
- Benchmark ≠ mergeable (METR, März 2026) — kleines Sample, klare Aussage.
- Qualitäts-/Review-Folgekosten hoher KI-Adoption (Faros AI 2026: +54 % Bugs, 3x
  Incidents, 5x Review-Zeit — Telemetrie-Korrelation, Anbieter-Interessenlage beachten).
- Das Ende der Flatrate-Subvention (Anthropic Billing-Split, Tokenizer-Effekt, Uber).

**Was fundierte Konzeptarbeit ist (peer-reviewed bzw. etablierte Literatur):**
- Triple Debt Model (Storey et al. 2026), Naur (1985), Reinertsen (2009), Lean-Kanon
  (Ōno, Shewhart, Goldratt, Nakajima), Beck „Genie Tarpit".

**Was These/Wette ist (und so gekennzeichnet werden sollte):**
- Kleinere Teams / Agentic Trio (Westheide — explizit als Ausblick gerahmt).
- Andon-Äquivalent für Agenten (offene Ingenieursaufgabe).
- „Judgment as the moat" (auf der Folie selbst als Wette markiert — gut so).

**Zum Vorwurf „zu poetisch":** Die Metaphern (Fabrik, Wasser/Rohre, Eiche, Taube) sind
durchweg Träger konkreter, teils empirisch belegter Aussagen — sie *ersetzen* die Substanz
nicht, sie komprimieren sie. Verwundbar ist das Kapitel an drei Stellen: (1) die
Quellen sind fast vollständig „auf der Tonspur", d.h. ohne dieses Dokument schwer
nachprüfbar; (2) zwei Takeaways waren falsch zuordenbar (Mollick, nicht Westheide) und
zwei sind unbelegt; (3) „Die Taube sieht besser" ist öffentlich nicht auffindbar. Die
ersten beiden Punkte behebt dieses Dokument; für den dritten braucht es Michael Seel.

**Offene Folgearbeit:**
1. Quelle für „Die Taube sieht besser" klären (Michael Seel) und hier nachtragen.
2. Takeaways 7–8 attribuieren oder als eigene Thesen kennzeichnen.
3. Token-Ökonomie-Zahlen vor jedem Trainingstermin aktualisieren (volatil).
4. Optional: Footer-Links auf Westheide-Posts direkt auf die betreffenden Folien
   (Agentic Trio, What to accelerate), damit Teilnehmer:innen die Quellen finden.

---

## Quellenverzeichnis (kompakt)

| Quelle | Bezug im Kapitel |
|---|---|
| [METR: Many SWE-bench-Passing PRs Would Not Be Merged into Main (2026)](https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/) | Human Bottleneck — „Green isn't good enough" |
| [Faros AI: The AI Engineering Report 2026](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) ([Zusammenfassung ADTmag](https://adtmag.com/articles/2026/04/22/more-code-more-bugs.aspx)) | +54 % Bugs, 3x Incidents, 5x Review-Zeit |
| [Daniel Westheide: Using the space, not optimizing the treadmill (INNOQ, 2026)](https://www.innoq.com/en/blog/2026/05/agentic-engineering-product-discovery/) | What to accelerate, Schlussfolien |
| [Daniel Westheide: The Agentic Trio (INNOQ, 2026)](https://www.innoq.com/en/blog/2026/05/the-agentic-trio/) | New Collaboration |
| [Robert Glaser: When everyone has AI and the company still learns nothing](https://www.robert-glaser.de/when-everyone-has-ai-and-the-company-still-learns-nothing/) | Wasser-und-Rohre-Folie |
| [Margaret-Anne Storey et al.: From Technical Debt to Cognitive and Intent Debt (arXiv 2026)](https://arxiv.org/abs/2603.22106) ([ACM Queue](https://queue.acm.org/detail.cfm?id=3807966), [Blog](https://margaretstorey.com/blog/2026/02/09/cognitive-debt/)) | Cognitive & Intent Debt |
| Peter Naur: Programming as Theory Building (1985) | „The theory gets thinner" |
| [Kent Beck: Genie Tarpit (Tidy First?, Substack)](https://tidyfirst.substack.com/p/genie-tarpit) | Sameness Engineering |
| [Armin Ronacher: Some Things Just Take Time (2026)](https://lucumr.pocoo.org/2026/3/20/some-things-just-take-time/) | Eichen-Zitat |
| [Baldur Bjarnason: Out of the Software Crisis](https://softwarecrisis.baldurbjarnason.com/) | Software ist Design |
| Dave Farley: Modern Software Engineering (2021) | Design Engineering vs. Manufacturing |
| Donald Reinertsen: The Principles of Product Development Flow (2009) | Variabilität im Design; Engpass-Auslastung |
| Teresa Torres: Continuous Discovery Habits (2021) | Product Trio |
| Josh Seiden: Outcomes Over Output (2019) / Jeff Patton: User Story Mapping (2014) | Outcome over Output |
| Ethan Mollick: Co-Intelligence (2024) | Takeaways 5–6 |
| [Fortune: Uber COO zu AI-Spending (Mai 2026)](https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/), [TechCrunch: Uber caps AI spending (Juni 2026)](https://techcrunch.com/2026/06/02/uber-caps-employee-ai-spending-after-blowing-through-budget-in-four-months/) | Token Economics |
| [Anthropic Billing-Split (Analyse)](https://beam.ai/agentic-insights/anthropics-new-billing-split-reveals-what-ai-agents-actually-cost), [Tokenizer-Effekt Opus 4.7 (Finout)](https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag) | „The subsidy is ending" |
| [Anthropic × ServiceNow](https://www.anthropic.com/news/servicenow-anthropic-claude) | Token Economics (Speaker-Note) |
| Taiichi Ōno: Toyota Production System (1978); Eliyahu Goldratt: The Goal (1984); Walter Shewhart (SPC); Seiichi Nakajima (TPM) | Factory Arc |
| Levenson et al.: Pigeons as Trainable Observers of Pathology (PLOS ONE, 2015) | mutmaßlicher Hintergrund „Die Taube sieht besser" |
| Michael Seel: „Die Taube sieht besser" | **öffentlich nicht auffindbar — klären** |
