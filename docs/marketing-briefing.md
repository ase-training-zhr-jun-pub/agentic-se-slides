# Marketingbriefing: Agentic Software Engineering

## Kurzbeschreibung

Das dreitägige Training zeigt, wie KI-Agenten den gesamten Softwareentwicklungsprozess unterstützen: von Produkt- und Anforderungsarbeit über Architektur, Implementierung und Qualitätssicherung bis zu CI/CD, Betrieb und Monitoring. Teilnehmende lernen, Agenten nicht nur als Chat-Assistenten, sondern als werkzeugfähige Entwicklungsbegleiter mit Feedback-Schleifen, Kontextmanagement und konkreten Projektartefakten einzusetzen. Der Schwerpunkt liegt auf realistischem Software Engineering mit KI-Unterstützung: beschleunigt, aber überprüfbar, strukturiert und verantwortungsvoll.

## Zielgruppe

- Softwareentwickler:innen, die KI-Agenten systematisch in ihren Entwicklungsalltag integrieren möchten.
- Tech Leads, Architekt:innen und Senior Engineers, die Agenten für Planung, Architektur, Review und Qualitätssicherung bewerten oder einführen wollen.
- DevOps- und Plattform-nahe Entwickler:innen, die KI-Unterstützung in CI/CD, Automatisierung, Infrastructure as Code und Betrieb nutzen möchten.
- Produkt- und Engineering-nahe Rollen, die verstehen wollen, wie KI-Agenten Anforderungen, Dokumentation und Umsetzungsplanung beeinflussen.
- Sinnvoll sind praktische Entwicklungserfahrung, Grundkenntnisse in Git und die Bereitschaft, hands-on mit Entwicklungswerkzeugen zu arbeiten.

## Nutzenversprechen

- Teilnehmende verstehen die technischen Grundlagen von LLMs, Kontext, Tool-Use, MCP und Agenten-Feedback-Schleifen.
- Teilnehmende können KI-Agenten entlang typischer Softwareentwicklungsaufgaben einsetzen, ohne bewährte Engineering-Praktiken aufzugeben.
- Teilnehmende lernen, Anforderungen, Architekturentscheidungen, Dokumentation, Implementierungsplanung, Tests und Pipelines mit Agentenunterstützung zu erstellen und zu validieren.
- Teilnehmende entwickeln ein realistisches Verständnis dafür, wo Agenten produktiv beschleunigen und wo Review, Guardrails und menschliche Entscheidungen unverzichtbar bleiben.
- Teams erhalten eine gemeinsame Sprache für Agentic Software Engineering und konkrete Ansatzpunkte für den Transfer in eigene Projekte.

## Themenblöcke

### Grundlagen von KI-Agenten

- Foundation Models, Large Language Models und autoregressive Textgenerierung.
- Kontext, Memory und die Bedeutung hochwertiger Eingabedaten für Agentenergebnisse.
- Tool-Use, Model Context Protocol und Agent Harness als technische Grundlage agentischer Systeme.
- Unterschiede zwischen Assistenten und Agenten: Agenten beobachten, handeln und verändern Systemzustand.
- Einordnung der aktuellen Agentenlandschaft und typischer Werkzeugkategorien.

### Anforderungen und Produktentwicklung mit generativer KI

- KI-Unterstützung im Produktentwicklungszyklus.
- Erarbeitung und Pflege von Produktartefakten wie Glossaren, Proto-Personas, User Journeys, User Story Maps, Epics und User Stories.
- Prompting-Techniken für strukturierte Ergebnisse und wiederverwendbare Arbeitsweisen.
- Aufbau eines konsistenten Backlogs auf Basis vorhandener Produktdokumentation.
- Agentenunterstützte Prototypen zur schnellen Validierung von Produktideen.

### Architektur und technische Entscheidungen

- Ableitung und Dokumentation von Qualitätsanforderungen, unter anderem mit Qualitätsszenarien.
- Nutzung bewährter Architekturmethoden und Qualitätsmodelle mit KI-Unterstützung.
- Strukturierte Architekturentscheidungen inklusive Optionen, Trade-offs und ADRs.
- Pflege von Architekturdokumentation, Systemkontexten, Bausteinsichten und technischen Schulden.
- Validierung von Agentenergebnissen als fester Bestandteil der Architekturarbeit.

### Implementierung mit Agenten

- Kontextmanagement als Voraussetzung für größere und zuverlässigere Agentenaufgaben.
- Agenten-Setup mit Memory, Regeln, Commands, Skills, Subagents, IDE-Integrationen und Hooks.
- Abgrenzung von experimentellem Vibe Coding zu produktionsfähigem Software Engineering.
- Spec Driven Development, Planning Mode, Task Breakdown und reviewbare Umsetzungseinheiten.
- Agenten als Coding Buddy für Features, Refactorings, Debugging, Bibliotheksnutzung, Git-Workflows, Pull Requests und Reviews.
- Parallelisierung von Entwicklungsarbeit mit mehreren Agenten und getrennten Arbeitskontexten.

### Testing und Qualitätssicherung

- Generierung und Verbesserung von Unit Tests, Integrationstests und End-to-End-Tests.
- Identifikation ungetesteter Edge Cases und Lücken in bestehenden Testsuiten.
- Einsatz von UI-Interpretation und Browser-Automatisierung für realitätsnahe E2E-Szenarien.
- Review von Merge Requests, Iteration über Findings und Bewertung agentengenerierter Änderungen.
- Nutzung von Agenten zur Erkennung von Qualitäts- und Sicherheitsrisiken.

### CI/CD und Automatisierung

- KI-Agenten als Unterstützung bei CI/CD-Strategien, Automatisierung und Pipeline-Design.
- Erstellung und Optimierung von Skripten, Workflows und wiederholbaren Automatisierungsschritten.
- Test- und Build-Automatisierung inklusive Reporting und Containerisierung.
- Agenten als Pipeline-Jobs, etwa für Release Notes, Reviews oder Hinweise auf ungetestete Randfälle.
- Unterstützung bei Infrastructure as Code und Migrationen zwischen IaC-Formaten.

### Operations und Monitoring

- Einsatz von Agenten für Logging, Metriken, Dashboards, Alerts und proprietäre Query-Sprachen.
- Interaktion mit Operations- und Monitoring-Werkzeugen über geeignete Integrationen.
- Analyse von Logs, Alerts, Datenbankabfragen und Tracing-Daten zur Fehler- und Performance-Diagnose.
- Agentenunterstützte Vorschläge für Bugfixes und Performance-Optimierungen.
- Diskussion notwendiger Guardrails für automatisierte Änderungen im Betrieb.

## Techniken und Arbeitsweisen

- Arbeit mit KI-Agenten in einer isolierten, reproduzierbaren Entwicklungsumgebung.
- Kontextkuratierung durch Dokumentation, Regeln, Memory, Skills, Commands und Subagents.
- Iteratives Arbeiten mit Agenten: planen, ausführen, beobachten, validieren und verbessern.
- Erstellung und Pflege konkreter Artefakte wie Glossar, Personas, User Journeys, Story Maps, Backlog, Qualitätsszenarien, ADRs, Architekturdokumentation, Tests und Pipelines.
- Spec Driven Development, Test Driven Development, Review-getriebene Umsetzung und sinnvolle Task-Zerlegung.
- Nutzung von Integrationen für Entwicklungs-, Repository-, CI/CD- und Monitoring-Werkzeuge.
- Bewusster Umgang mit Risiken wie Halluzinationen, Kontextverlust, schwer reviewbaren Änderungen und ungeprüfter Automatisierung.

## Praktischer Anteil

- Das Training ist als Hands-on-Workshop angelegt und nutzt ein durchgängiges Softwareprojekt als roten Faden.
- Teilnehmende arbeiten in einem vorbereiteten Übungsrepository mit reproduzierbaren Ausgangszuständen und aufeinander aufbauenden Arbeitsschritten.
- Die praktischen Übungen führen von Produkt- und Anforderungsartefakten über Architektur und Implementierungsplanung bis zu Tests, CI/CD und agentengetriebenen Repository-Workflows.
- Ergebnisse entstehen als konkrete Projektartefakte, nicht nur als Chatverläufe: Dokumentation, Backlog-Einträge, Architekturentscheidungen, Codeänderungen, Tests, Pull Requests, Pipeline-Konfigurationen und Issues.
- Die Übungen betonen Reviewbarkeit und Validierung: Agentenergebnisse werden geprüft, verbessert und in kleinere, nachvollziehbare Einheiten überführt.
- Teilnehmende erleben sowohl produktive Einsatzszenarien als auch bewusst risikoreiche Ansätze, um Grenzen und notwendige Guardrails einschätzen zu können.

## Didaktisches Konzept

- Kurze Theorie-Inputs schaffen gemeinsames Verständnis für Konzepte wie LLMs, Kontext, Tool-Use, MCP, Agent Harness und Feedback Loops.
- Live-Demos machen neue Werkzeuge und Arbeitsweisen unmittelbar sichtbar, bevor sie in Übungen angewendet werden.
- Hands-on-Übungen am durchgängigen Softwareprojekt übertragen Konzepte direkt in typische Artefakte und Entwicklungsaufgaben.
- Die Kapitel folgen dem Softwareentwicklungsprozess und bauen fachlich aufeinander auf: Anforderungen, Architektur, Implementierung, Tests, CI/CD und Betrieb.
- Reflexion und Diskussion helfen, Nutzen, Risiken, Qualitätsansprüche und organisatorische Implikationen einzuordnen.
- Wiederkehrende Validierungs- und Review-Schritte vermitteln, dass KI-Agenten Engineering-Praktiken beschleunigen, aber nicht ersetzen.
- Die Teilnehmenden arbeiten kollaborativ mit Agenten und treffen weiterhin selbst fachliche, technische und qualitative Entscheidungen.

## Extern kommunizierbare Highlights

- Dreitägiger Intensivworkshop zu Agentic Software Engineering entlang des kompletten Softwareentwicklungsprozesses.
- Praxisnaher Einsatz von KI-Agenten an einem durchgängigen Softwareprojekt statt isolierter Prompt-Beispiele.
- Konkrete Arbeit mit Produktartefakten, Architekturentscheidungen, Implementierung, Tests, Pull Requests, Pipelines und Betriebsdaten.
- Fokus auf professionelle Engineering-Praktiken: Kontextmanagement, Spezifikation, Reviewbarkeit, Tests, Validierung und Guardrails.
- Vermittlung moderner Agenten-Konzepte wie Tool-Use, MCP, Skills, Subagents und agentische Feedback-Schleifen.
- Realistische Einordnung von Chancen und Grenzen: Beschleunigung durch Agenten bei gleichzeitigem Fokus auf Qualität, Sicherheit und Verantwortung.
