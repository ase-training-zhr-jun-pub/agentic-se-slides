---
Ticket-ID: CLVN-009-STORY-belegte-zeitfenster-erkennen
Created-At: 2025-10-14
Epic: CLVN-005-EPIC-auswahl-treffen
Status: To-Do
---

# Belegte Zeitfenster erkennen

## User Story
Als INNOQ-Mitarbeiter möchte ich belegte Zeitfenster eines Raums auf einen Blick erkennen, damit ich Überschneidungen vermeiden kann

## Beschreibung
Nachdem ein Mitarbeiter einen Standort und einen spezifischen Raum ausgewählt hat, benötigt er eine klare visuelle Übersicht über alle bereits gebuchten Zeitfenster dieses Raums für den ausgewählten Tag oder Zeitraum. Diese Funktion ermöglicht es dem Mitarbeiter, auf einen Blick zu sehen, wann der Raum bereits belegt ist, ohne jedes einzelne Zeitfenster manuell prüfen zu müssen. Die Darstellung der belegten Zeitfenster soll intuitiv und übersichtlich sein, beispielsweise in Form einer Timeline oder eines Kalenderviews, der die Buchungen visuell hervorhebt. Dadurch kann der Mitarbeiter schnell freie Zeitfenster identifizieren und Überschneidungen bei der eigenen Buchung vermeiden. Diese Transparenz über die Raumbelegung ist essentiell für eine effiziente Planung und trägt zur Vermeidung von Doppelbuchungen und Ressourcenkonflikten bei.

## Akzeptanzkriterien

- [ ] Das System zeigt für einen ausgewählten Raum alle belegten Zeitfenster für den gewählten Tag visuell an (z.B. Timeline, Kalenderansicht)
- [ ] Belegte Zeitfenster sind klar von verfügbaren Zeitfenstern unterscheidbar (z.B. durch Farbe, Schattierung oder andere visuelle Marker)
- [ ] Für jedes belegte Zeitfenster werden mindestens Startzeit und Endzeit angezeigt
- [ ] Die Darstellung aktualisiert sich automatisch, wenn der Nutzer ein anderes Datum oder einen anderen Raum auswählt
- [ ] Freie Zeitfenster zwischen Buchungen sind eindeutig erkennbar
- [ ] Die Zeitfenster-Übersicht ist auf Desktop-Geräten gut lesbar und übersichtlich dargestellt
- [ ] Das System berücksichtigt die intelligente Verfügbarkeitslogik und zeigt nur tatsächlich belegte Zeitfenster an (keine abgelaufenen oder stornierten Buchungen)

## Definition of Done
- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
