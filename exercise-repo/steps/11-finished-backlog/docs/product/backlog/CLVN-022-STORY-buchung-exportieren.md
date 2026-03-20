---
Ticket-ID: CLVN-022-STORY-buchung-exportieren
Created-At: 2025-10-14
Epic: CLVN-018-EPIC-buchungen-verwalten
Status: To-Do
---

# Raumbuchung exportieren/teilen

## User Story

Als INNOQ-Mitarbeiter möchte ich eine Raumbuchung exportieren/teilen, damit ich die Buchungsinformationen mit anderen teilen kann

## Beschreibung

Diese User Story ermöglicht es Mitarbeitern, die Details einer Raumbuchung zu exportieren oder mit anderen zu teilen. Dies ist besonders wichtig für die Koordination von Meetings und die Weitergabe von Buchungsinformationen an Kollegen, die nicht direkt Zugriff auf das Buchungssystem haben oder die Informationen in ihrem persönlichen Kalender benötigen.

Die Export-/Teilfunktion soll verschiedene Formate unterstützen, um maximale Flexibilität bei der Verwendung der Buchungsinformationen zu gewährleisten. Typische Anwendungsfälle sind das Hinzufügen der Raumbuchung zum persönlichen Kalender (via iCal/ICS-Datei), das Teilen via E-Mail oder das Kopieren eines direkten Links zur Buchung.

Diese Funktion erhöht die Transparenz und erleichtert die Kommunikation über gebuchte Räume innerhalb der Organisation.

## Akzeptanzkriterien

- [ ] In der Buchungsdetailansicht ist eine klar sichtbare Export-/Teilen-Funktion verfügbar
- [ ] Der Nutzer kann die Raumbuchung als iCal/ICS-Datei exportieren, um sie in gängigen Kalendersystemen (Outlook, Google Calendar, Apple Calendar) zu importieren
- [ ] Die exportierte iCal-Datei enthält alle relevanten Buchungsinformationen: Meetingtitel, Raum, Standort, Start- und Endzeit, Raumausstattung und optionale Buchungsnotiz
- [ ] Der Nutzer kann einen direkten Link zur Buchungsdetailansicht generieren und kopieren
- [ ] Der generierte Link ermöglicht anderen authentifizierten INNOQ-Mitarbeitern den direkten Zugriff auf die Buchungsdetails (Read-Only)
- [ ] Das System zeigt eine Bestätigung an, wenn der Export erfolgreich war oder der Link kopiert wurde
- [ ] Die Export-/Teilfunktion funktioniert sowohl für aktive als auch für vergangene Buchungen
- [ ] Bei Fehlern (z.B. Netzwerkprobleme) wird eine verständliche Fehlermeldung angezeigt

## Definition of Done

- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
