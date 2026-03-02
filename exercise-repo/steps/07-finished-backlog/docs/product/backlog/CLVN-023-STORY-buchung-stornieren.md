---
Ticket-ID: CLVN-023-STORY-buchung-stornieren
Created-At: 2025-10-14
Epic: CLVN-018-EPIC-buchungen-verwalten
Status: To-Do
---

# Raumbuchung stornieren

## User Story
Als INNOQ-Mitarbeiter möchte ich eine Raumbuchung stornieren, damit ich einen nicht mehr benötigten Raum freigeben kann

## Beschreibung

Diese User Story ermöglicht es Mitarbeitern, eine bestehende Raumbuchung zu stornieren, wenn der gebuchte Raum nicht mehr benötigt wird. Dies ist besonders wichtig in einer hybriden Arbeitsumgebung, wo sich Pläne häufig ändern können (z.B. Meeting abgesagt, auf Remote verschoben, Terminverschiebung).

Durch die Stornierungsfunktion wird der Raum wieder für andere Mitarbeiter verfügbar gemacht und trägt somit zu einer effizienteren Nutzung der Büroressourcen bei. Die Funktion sollte intuitiv und schnell zugänglich sein, um spontane Änderungen zu ermöglichen.

Die Stornierung sollte nur für zukünftige Buchungen möglich sein und entsprechende Bestätigungsschritte beinhalten, um versehentliche Stornierungen zu vermeiden. Nach erfolgreicher Stornierung sollte der Nutzer eine Bestätigung erhalten und die Buchung sollte aus der Liste der aktiven Buchungen entfernt werden.

## Akzeptanzkriterien

- [ ] In der Buchungsdetailansicht ist eine klar sichtbare "Stornieren"-Funktion verfügbar
- [ ] Vor der Stornierung erscheint ein Bestätigungsdialog, der die wichtigsten Buchungsdetails anzeigt
- [ ] Nur zukünftige Buchungen können storniert werden (keine Stornierung vergangener Buchungen)
- [ ] Nach Bestätigung wird die Buchung erfolgreich aus dem System entfernt
- [ ] Der Nutzer erhält eine Bestätigung über die erfolgreiche Stornierung
- [ ] Der stornierte Raum wird sofort wieder als verfügbar im System markiert
- [ ] Die stornierte Buchung verschwindet aus der Liste "Meine Buchungen"
- [ ] Bei technischen Fehlern wird eine verständliche Fehlermeldung angezeigt
- [ ] Die Stornierung kann nicht mehr rückgängig gemacht werden (eindeutige Warnung im Bestätigungsdialog)

## Definition of Done

- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
