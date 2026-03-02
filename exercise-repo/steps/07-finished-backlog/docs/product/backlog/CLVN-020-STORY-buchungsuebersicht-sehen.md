---
Ticket-ID: CLVN-020-STORY-buchungsuebersicht-sehen
Created-At: 2025-10-14
Epic: CLVN-018-EPIC-buchungen-verwalten
Status: To-Do
---

# Buchungsübersicht sehen

## User Story
Als INNOQ-Mitarbeiter möchte ich eine Übersicht aller eigenen Raumbuchungen sehen, damit ich einen schnellen Überblick über meine gebuchten Räume bekomme

## Beschreibung
Diese User Story ermöglicht es Mitarbeitern, auf der Seite "Meine Buchungen" eine vollständige Liste aller ihrer Raumbuchungen einzusehen. Die Übersicht zeigt sowohl aktuelle als auch zukünftige Buchungen in einer strukturierten, übersichtlichen Darstellung. Dies ist die zentrale Funktion der Buchungsverwaltung und bildet die Grundlage für weitere Aktionen wie Detailansicht, Änderung oder Stornierung.

Die Übersicht soll dem Nutzer auf einen Blick zeigen:
- Welche Räume zu welchen Zeitpunkten gebucht sind
- An welchen Standorten die Buchungen stattfinden
- Relevante Buchungsdetails wie Meetingtitel und Zeitfenster

Die Darstellung muss sowohl auf Desktop- als auch auf mobilen Geräten funktional und übersichtlich sein.

## Akzeptanzkriterien

- [ ] Die Seite "Meine Buchungen" zeigt eine Liste aller Raumbuchungen des angemeldeten Mitarbeiters an
- [ ] Jede Raumbuchung in der Übersicht zeigt mindestens folgende Informationen:
  - Raumname
  - Standort
  - Datum und Uhrzeit (Start- und Endzeit)
- [ ] Die Buchungen sind chronologisch sortiert (nächste Buchung zuerst)
- [ ] Vergangene Buchungen werden visuell von aktuellen und zukünftigen Buchungen unterschieden (z.B. durch ausgegraut oder in separatem Bereich)
- [ ] Bei leerer Buchungsliste wird eine informative Meldung angezeigt (z.B. "Sie haben derzeit keine Buchungen")
- [ ] Die Übersicht ist responsiv und auf mobilen Geräten gut nutzbar
- [ ] Bei Netzwerkfehlern wird eine aussagekräftige Fehlermeldung angezeigt

## Definition of Done

- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
