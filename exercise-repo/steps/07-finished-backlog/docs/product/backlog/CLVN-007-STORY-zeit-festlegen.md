---
Ticket-ID: CLVN-007-STORY-zeit-festlegen
Created-At: 2025-10-14
Epic: CLVN-005-EPIC-auswahl-treffen
Status: To-Do
---

# Zeit festlegen

## User Story

Als INNOQ-Mitarbeiter möchte ich Start- und Endzeit für meine Buchung festlegen können, damit ich den Raum für die exakte Dauer meines Meetings reserviere

## Beschreibung

Nach der Auswahl des gewünschten Datums muss der Mitarbeiter die genaue Zeitspanne für seine Raumbuchung festlegen können. Dies umfasst die Eingabe oder Auswahl einer Startzeit und einer Endzeit für die Reservierung. Die Funktionalität muss sicherstellen, dass die gewählte Zeitspanne logisch ist (Endzeit nach Startzeit) und innerhalb der Betriebszeiten des Standorts liegt. Dies ist ein essentieller Schritt im Buchungsprozess, da die Verfügbarkeit eines Raums direkt von der konkreten Zeitangabe abhängt.

## Akzeptanzkriterien

- [ ] Der Nutzer kann eine Startzeit für die Raumbuchung auswählen
- [ ] Der Nutzer kann eine Endzeit für die Raumbuchung auswählen
- [ ] Die Endzeit kann nicht vor der Startzeit liegen
- [ ] Das System validiert, dass die Endzeit nach der Startzeit liegt
- [ ] Die Zeitauswahl erfolgt in sinnvollen Intervallen (z.B. 15 Minuten)
- [ ] Das System zeigt die Gesamtdauer der Buchung basierend auf Start- und Endzeit an
- [ ] Die gewählten Zeiten werden für die nachfolgende Verfügbarkeitsprüfung gespeichert
- [ ] Das Zeitformat wird konsistent und benutzerfreundlich dargestellt (z.B. HH:MM)

## Definition of Done

- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
