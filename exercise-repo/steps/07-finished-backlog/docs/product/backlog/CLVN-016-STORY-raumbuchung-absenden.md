---
Ticket-ID: CLVN-016-STORY-raumbuchung-absenden
Created-At: 2025-10-14
Epic: CLVN-012-EPIC-raum-buchen
Status: To-Do
---

# Raumbuchung absenden

## User Story
Als INNOQ-Mitarbeiter möchte ich die Raumbuchung absenden können, damit die Reservierung verbindlich gespeichert wird

## Beschreibung
Nachdem der Mitarbeiter alle erforderlichen Informationen für die Raumbuchung eingegeben hat, muss er die Möglichkeit haben, die Buchung final abzusenden. Durch das Absenden wird die Reservierung verbindlich im System gespeichert und der ausgewählte Raum für den gewählten Zeitraum blockiert.

Das Absenden stellt den letzten Schritt im Buchungsprozess dar und löst wichtige Folgeprozesse aus:
- Persistierung der Buchungsdaten im System
- Aktivierung der intelligenten Verfügbarkeitslogik (Blockierung des Raums)
- Vorbereitung der Buchungsbestätigung
- Verhinderung von Doppelbuchungen

Der Absende-Button sollte erst aktiviert werden, wenn alle Pflichtfelder ausgefüllt sind.

## Akzeptanzkriterien
- [ ] Ein prominent platzierter "Buchen"-Button ist im Buchungsformular sichtbar
- [ ] Der Button ist deaktiviert, solange nicht alle Pflichtfelder ausgefüllt sind
- [ ] Der Button wird aktiviert, sobald alle Pflichtfelder valide ausgefüllt sind
- [ ] Bei erfolgreicher Verfügbarkeit wird die Buchung im System gespeichert
- [ ] Der gebuchte Raum wird automatisch für den gewählten Zeitraum blockiert
- [ ] Bei Konflikten (Raum wurde zwischenzeitlich gebucht) erhält der Mitarbeiter eine klare Fehlermeldung
- [ ] Nach erfolgreichem Absenden wird der Mitarbeiter zur Buchungsbestätigung weitergeleitet
- [ ] Während des Absende-Vorgangs wird ein Loading-Indikator angezeigt
- [ ] Der Button ist während des Absende-Vorgangs deaktiviert, um Mehrfachklicks zu verhindern
- [ ] Bei technischen Fehlern wird eine verständliche Fehlermeldung angezeigt
- [ ] Die Buchungsdaten bleiben bei einem Fehler erhalten (kein Datenverlust)

## Definition of Done
- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
