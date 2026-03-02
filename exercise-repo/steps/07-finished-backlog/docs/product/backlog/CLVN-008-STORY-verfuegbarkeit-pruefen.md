---
Ticket-ID: CLVN-008-STORY-verfuegbarkeit-pruefen
Created-At: 2025-10-14
Epic: CLVN-005-EPIC-auswahl-treffen
Status: To-Do
---

# Verfügbarkeit prüfen

## User Story
Als INNOQ-Mitarbeiter möchte ich die Verfügbarkeit eines Raums für meinen gewählten Zeitraum prüfen können, damit ich weiß, ob der Raum frei ist

## Beschreibung

Nachdem ein Mitarbeiter Standort, Datum, Start- und Endzeit für eine Raumbuchung festgelegt hat, muss er die Verfügbarkeit des gewünschten Raums für den spezifischen Zeitraum prüfen können. Das System soll dabei die intelligente Verfügbarkeitslogik nutzen, um zu ermitteln, ob der Raum im gewünschten Zeitfenster verfügbar ist oder bereits durch eine andere Buchung belegt ist. Die Verfügbarkeitsinformation muss klar und eindeutig angezeigt werden, um dem Mitarbeiter eine schnelle Entscheidung zu ermöglichen. Diese Funktionalität ist essentiell für die Vermeidung von Doppelbuchungen und Ressourcenkonflikten.

## Akzeptanzkriterien

- [ ] Das System zeigt für jeden Raum die Verfügbarkeit für den vom Nutzer gewählten Zeitraum (Datum, Startzeit, Endzeit) an
- [ ] Die Verfügbarkeitsanzeige unterscheidet klar zwischen "verfügbar" und "belegt" Status
- [ ] Die Verfügbarkeitsprüfung berücksichtigt alle existierenden Buchungen für den gewählten Raum
- [ ] Wenn ein Raum teilweise belegt ist (z.B. nur für einen Teil des gewünschten Zeitraums), wird dies entsprechend angezeigt
- [ ] Die Verfügbarkeitslogik verhindert Doppelbuchungen automatisch
- [ ] Nur verfügbare Räume können für eine Buchung ausgewählt werden
- [ ] Die Anzeige ist visuell klar erkennbar (z.B. durch Farben, Icons oder eindeutige Beschriftung)

## Definition of Done
- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
