---
Ticket-ID: CLVN-024-STORY-buchung-aendern
Created-At: 2025-10-14
Epic: CLVN-018-EPIC-buchungen-verwalten
Status: To-Do
---

# Raumbuchung ändern/verschieben

## User Story
Als INNOQ-Mitarbeiter möchte ich eine Raumbuchung ändern/verschieben, damit ich auf Terminänderungen reagieren kann

## Beschreibung

Diese Story ermöglicht es Mitarbeitern, bestehende Raumbuchungen zu modifizieren, ohne sie zunächst stornieren und dann neu buchen zu müssen. Dies ist besonders wichtig in einer hybriden Arbeitsumgebung, in der sich Termine häufig ändern können (z.B. Meeting verschoben, Zeitfenster angepasst, anderer Raum benötigt).

Die Änderungsfunktion sollte folgende Aspekte einer Buchung editierbar machen:
- Datum der Raumbuchung
- Zeitfenster (Start- und Endzeit)
- Ausgewählter Raum (falls der ursprüngliche Raum nicht mehr passt)
- Meetingtitel
- Buchungsnotiz

Beim Ändern einer Buchung muss das System die Verfügbarkeit des Raums für den neuen Zeitraum prüfen und Doppelbuchungen verhindern. Die intelligente Verfügbarkeitslogik stellt sicher, dass nur verfügbare Ressourcen gebucht werden können. Falls der gewünschte neue Zeitraum oder Raum nicht verfügbar ist, sollte der Nutzer entsprechende Alternativen vorgeschlagen bekommen.

Nach erfolgreicher Änderung sollte der Nutzer eine Bestätigung erhalten, und die aktualisierte Buchung sollte in der Liste der aktiven Buchungen mit den neuen Daten erscheinen.

## Akzeptanzkriterien

- [ ] Der Nutzer kann über die Buchungsdetailansicht die Funktion "Buchung ändern" aufrufen
- [ ] Alle relevanten Buchungsdaten sind editierbar (Datum, Zeit, Raum, Meetingtitel, Notiz)
- [ ] Die Formularfelder sind mit den aktuellen Buchungsdaten vorausgefüllt
- [ ] Bei Änderung von Datum, Zeit oder Raum wird die Verfügbarkeit in Echtzeit geprüft
- [ ] Das System verhindert Doppelbuchungen durch die intelligente Verfügbarkeitslogik
- [ ] Falls der gewünschte neue Zeitraum/Raum nicht verfügbar ist, erhält der Nutzer eine entsprechende Meldung
- [ ] Der Nutzer kann alternative verfügbare Räume für den gewünschten Zeitraum angezeigt bekommen
- [ ] Vor dem Absenden der Änderung erhält der Nutzer eine Zusammenfassung der Änderungen zur Bestätigung
- [ ] Nach erfolgreicher Änderung erhält der Nutzer eine Bestätigungsmeldung
- [ ] Die geänderte Buchung erscheint mit aktualisierten Daten in der Buchungsübersicht
- [ ] Der ursprüngliche Raum/Zeitslot wird bei erfolgreicher Änderung wieder freigegeben
- [ ] Bei Abbruch des Änderungsvorgangs bleiben die ursprünglichen Buchungsdaten unverändert

## Definition of Done

- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
