---
name: marketing-briefing
description: >
  Erstellt aus Trainings-, Workshop- oder Foliendokumentation ein extern nutzbares Marketingbriefing
  als Markdown-Datei. Nutze diesen Skill immer, wenn der User aus einem Training, Workshopdeck,
  Slidev-Projekt, Kurskonzept, Agenda, Übungsrepo oder internen Trainingsnotizen eine kompakte
  Beschreibung für Marketing, Vertrieb, Website, Landingpage, Newsletter, Eventseite oder externe
  Ankündigung ableiten möchte. Trigger auch bei Formulierungen wie „Marketingbriefing extrahieren",
  „Training für Marketing zusammenfassen", „extern kommunizierbare Workshop-Infos", „Was können wir
  über das Training bewerben?", „Beschreibung für Marketing/Vertrieb" oder „Themen und Didaktik
  zusammenfassen", auch wenn der User nicht explizit nach einem Skill fragt.
---

# Training Marketing Briefing

Erzeuge aus Trainingsmaterial ein kompaktes, extern verwendbares Marketingbriefing. Das Briefing soll Marketing und Vertrieb helfen, das Training verständlich und attraktiv zu kommunizieren. Die Datei enthält nur Informationen, die Marketing in Werbematerialien weiterverarbeiten kann.

## Ziel

Das Ergebnis ist eine Markdown-Datei, die direkt an Marketing weitergegeben werden kann. Sie beschreibt:

- worum es im Training geht
- welche groben Themenblöcke behandelt werden
- welche Techniken, Werkzeuge und Arbeitsweisen vorkommen
- welche didaktischen Methoden eingesetzt werden
- welche Zielgruppen und Nutzenversprechen plausibel aus dem Material ableitbar sind
- welche Inhalte Marketing für Website, Landingpage, Newsletter, Eventseite oder Vertriebsmaterial nutzen kann

## Typische Quellen

Arbeite mit den verfügbaren Quellen im Projekt, insbesondere:

- `slides.md` als Einstieg in Slidev-Decks
- `slides/**/slides.md` für Kapitel und Themenblöcke
- `docs/` für Struktur-, Konzept- und Begleitdokumentation
- Übungsbeschreibungen, README-Dateien oder Trainingsnotizen, falls der User sie nennt

Wenn keine konkrete Quelle genannt wird, suche zuerst nach Deck-Einstiegspunkten wie `slides.md`, Kapiteldateien und relevanten Dokumenten. Verwende die Dateistruktur und Kapitelüberschriften, um die grobe Trainingsdramaturgie zu verstehen.

## Arbeitsweise

### 1. Material grob erfassen

Lies zuerst die Struktur, nicht jedes Detail:

- Titel, Untertitel, Dauer und Agenda
- Kapitel- und Themenblocknamen
- Takeaways und Sprecherkommentare, soweit sie grobe Aussagen liefern
- Exercise-, Demo- und Workshop-Folien als Hinweise auf Methoden
- Hinweise auf Beispielprojekt, Coding-Übungen, Gruppenarbeit, Diskussionen oder Tool-Demos

Gehe erst tiefer in einzelne Kapitel, wenn die Struktur allein nicht ausreicht, um Themen, Techniken oder Didaktik korrekt zu beschreiben.

### 2. Externe Perspektive einnehmen

Schreibe für Marketing, nicht für Trainer:innen oder Teilnehmer:innen im Kursraum.

- Formuliere nutzenorientiert und verständlich.
- Hebe konkrete Lernerfahrungen hervor, ohne Aufgabenlösungen zu verraten.
- Verwende keine internen Branch-Namen, Commands, Dateipfade oder Übungsnummern.
- Keine vertraulichen Details, internen Notizen, unfertigen Inhalte oder Sprecherregie übernehmen.
- Wenn Inhalte noch unfertig oder unsicher wirken, übernimm sie nicht als Briefing-Aussage.

### 3. Richtige Detailtiefe wählen

Das Briefing ist eine Marketinggrundlage, kein Trainingsskript.

Bevorzuge:

- grobe Themenblöcke statt Folie-für-Folie-Zusammenfassungen
- Beispiele auf Konzeptniveau statt konkrete Aufgabenstellungen
- „konkretes Softwareprojekt" statt Projektname, Fachdomäne, Repository-, Branch- oder Kommando-Details
- „Agenten in CI/CD-Pipelines einsetzen" statt konkrete YAML- oder Tool-Konfigurationen
- „interaktive Übungen mit direktem Tool-Einsatz" statt vollständige Übungsanleitungen

Vermeide:

- interne Speaker Notes als Zitate
- konkrete Prompts, Lösungen, Git-Kommandos oder Exercise-IDs
- Name, Domäne oder fachliche Details des Beispielprojekts, sofern der User sie nicht ausdrücklich extern kommunizieren möchte
- lange technische Exkurse
- falsche Werbeversprechen, die nicht aus dem Material ableitbar sind

### 4. Beispielprojekt abstrahieren

Beschreibe das Beispielprojekt nur auf der Ebene des Lernformats:

- „konkretes Softwareprojekt"
- „durchgängiges Beispielprojekt"
- „realitätsnahe Entwicklungsaufgaben"
- „praktische Arbeit an typischen Artefakten eines Softwareprojekts"

Nenne den Projektnamen, die Fachdomäne oder konkrete Funktionen des Projekts nicht. Marketing braucht an dieser Stelle vor allem die Aussage, dass Praktiken nicht abstrakt, sondern an einem greifbaren Softwareprojekt geübt werden.

### 5. Didaktik explizit extrahieren

Leite die didaktischen Methoden aus Layouts, Notizen und Übungsfolien ab. Typische Kategorien:

- kurze Theorie-Inputs zur Einordnung
- Live-Demos mit realen Tools
- hands-on Übungen an einem konkreten Softwareprojekt
- Reflexion und Diskussion im Plenum
- schrittweiser Aufbau entlang eines Softwareentwicklungsprozesses
- Validierung und Review von KI-generierten Ergebnissen
- Arbeit mit konkreten Artefakten wie Personas, User Stories, ADRs, Tests, Pipelines oder Dashboards

Beschreibe diese Methoden als extern kommunizierbare Lernformate.

## Ausgabeformat

Erzeuge eine Markdown-Datei. Wenn der User keinen Pfad nennt, schreibe standardmäßig nach `docs/marketing-briefing.md`. Verwende einen anderen Pfad nur, wenn der User ihn explizit nennt.

Verwende diese Struktur:

```markdown
# Marketingbriefing: [Trainingstitel]

## Kurzbeschreibung

[2-4 Sätze: Worum geht es, warum ist es relevant, was nehmen Teilnehmende mit?]

## Zielgruppe

- [Zielgruppe 1]
- [Zielgruppe 2]
- [Optional: Voraussetzungen oder Erfahrungsniveau]

## Nutzenversprechen

- [Konkreter Nutzen]
- [Konkreter Nutzen]
- [Konkreter Nutzen]

## Themenblöcke

### [Themenblock]

- [Grobe Inhalte]
- [Extern verständliche Stichpunkte]

### [Themenblock]

- [Grobe Inhalte]
- [Extern verständliche Stichpunkte]

## Techniken und Arbeitsweisen

- [Technik oder Arbeitsweise]
- [Werkzeugkategorie oder Methode]
- [Praktisches Artefakt]

## Praktischer Anteil

- [Wie wird praktisch gearbeitet?]
- [Wie wird an einem konkreten Softwareprojekt geübt?]
- [Welche Ergebnisse entstehen im Training?]

## Didaktisches Konzept

- [Methode]
- [Methode]
- [Methode]

## Extern kommunizierbare Highlights

- [Bewerbbarer Punkt]
- [Bewerbbarer Punkt]
- [Bewerbbarer Punkt]
```

## Schreibstil

- Sprache: standardmäßig Deutsch, außer der User wünscht Englisch.
- Ton: nüchternes Briefing, professionell, prägnant und konkret.
- Schreibe keine fertige Marketingcopy. Marketing soll daraus eigene Texte nach eigenen Tone-of-Voice-Guides ableiten können.
- Nutze Stichpunkte, wo sie Marketing schnell weiterverarbeiten kann.
- Verwende keine Buzzword-Ketten ohne Substanz.
- Bleibe bei Aussagen, die durch das Material gestützt werden.

## Qualitätssicherung

Prüfe vor Abschluss:

- Deckt das Briefing Themen, Techniken, praktischen Anteil und Didaktik ab?
- Ist es extern verständlich, ohne interne Trainingsdetails?
- Enthält es keine Branches, Commands, Dateipfade, Exercise-IDs oder Sprecherregie?
- Bleibt das Beispielprojekt abstrakt beschrieben, ohne Projektname, Domäne oder konkrete Funktionen?
- Ist die Datei als Markdown sauber strukturiert und direkt weitergebbar?

## Beispiel für angemessene Abstraktion

Zu detailliert:

> Die Teilnehmenden wechseln auf `uebung-1-4` und erzeugen User Stories mit Claude Code.

Passend für Marketing:

> Die Teilnehmenden erarbeiten Anforderungen hands-on mit KI-Unterstützung und überführen sie in konkrete Produktartefakte wie Personas, User Journeys und User Stories.

Zu detailliert:

> Das Beispielprojekt ist „[Projektname]", ein System aus [Fachdomäne] mit konkreten Funktionen wie [Featureliste].

Passend für Marketing:

> Die Teilnehmenden üben die Praktiken an einem konkreten Softwareprojekt und übertragen sie auf typische Artefakte aus Produktentwicklung, Architektur, Implementierung und Betrieb.

Zu detailliert:

> In Kapitel 6 schreiben die Teilnehmenden eine konkrete CI-Konfiguration und testen sie lokal mit einem bestimmten Runner.

Passend für Marketing:

> Das Training zeigt, wie KI-Agenten beim Aufbau und bei der Optimierung von CI/CD-Automatisierung unterstützen können.
