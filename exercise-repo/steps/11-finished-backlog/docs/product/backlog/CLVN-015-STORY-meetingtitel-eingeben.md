---
Ticket-ID: CLVN-015-STORY-meetingtitel-eingeben
Created-At: 2025-10-14
Epic: CLVN-012-EPIC-raum-buchen
Status: To-Do
---

# Meetingtitel eingeben

## User Story

Als INNOQ-Mitarbeiter möchte ich einen Meetingtitel eingeben können, damit andere Mitarbeiter den Zweck der Buchung erkennen können

## Beschreibung

Der Mitarbeiter hat bereits einen Raum ausgewählt, Datum und Zeit festgelegt, und befindet sich im Buchungsformular. Um die Raumbuchung für andere Mitarbeiter nachvollziehbar und transparent zu gestalten, soll er die Möglichkeit haben, einen aussagekräftigen Meetingtitel einzugeben. Der Meetingtitel ist das zentrale Identifikationsmerkmal einer Buchung und erscheint in allen Übersichten, Kalendern und Buchungsbestätigungen.

Der Meetingtitel dient als Hauptüberschrift der Buchung und hilft anderen Mitarbeitern zu verstehen, welche Art von Meeting stattfindet, ohne dass sie die kompletten Details einsehen müssen. Dies ist besonders wichtig in einer hybriden Arbeitsumgebung, wo Transparenz über Raumnutzung die Zusammenarbeit erleichtert.

Im Gegensatz zur optionalen Buchungsnotiz (siehe CLVN-014) ist der Meetingtitel ein Pflichtfeld, da jede Raumbuchung einen identifizierbaren Namen benötigt. Der Titel sollte prägnant sein und den Zweck des Meetings klar kommunizieren (z.B. "Architektur-Review", "Kundenpräsentation XYZ", "Team-Retrospektive").

## Akzeptanzkriterien

- [ ] Der Mitarbeiter kann im Buchungsformular ein Eingabefeld für den Meetingtitel sehen
- [ ] Das Titelfeld ist als Pflichtfeld gekennzeichnet (z.B. mit Sternchen oder "erforderlich"-Hinweis)
- [ ] Das Titelfeld unterstützt Freitext mit mindestens 100 Zeichen Länge
- [ ] Das System zeigt eine Fehlermeldung an, wenn der Mitarbeiter versucht, ohne Meetingtitel fortzufahren
- [ ] Der eingegebene Meetingtitel wird in der Buchungsbestätigung prominent angezeigt
- [ ] Der Meetingtitel wird in der Raumübersicht und im Kalender als Hauptbezeichnung der Buchung verwendet
- [ ] Das Titelfeld bietet eine klare visuelle Hierarchie als wichtigstes Eingabefeld im Formular
- [ ] Sonderzeichen und Umlaute werden korrekt verarbeitet und gespeichert

## Definition of Done

- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
