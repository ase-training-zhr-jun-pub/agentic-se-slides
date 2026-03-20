---
Ticket-ID: CLVN-014-STORY-buchungsnotiz-hinzufuegen
Created-At: 2025-10-14
Epic: CLVN-012-EPIC-raum-buchen
Status: To-Do
---

# Buchungsnotiz hinzufügen

## User Story
Als INNOQ-Mitarbeiter möchte ich eine Notiz zur Buchung hinzufügen können, damit ich wichtige Informationen zum Meeting festhalten kann

## Beschreibung
Der Mitarbeiter hat bereits einen Raum ausgewählt und befindet sich im Buchungsformular. Um wichtige Informationen zum geplanten Meeting zu dokumentieren, soll er die Möglichkeit haben, eine optionale Notiz zur Buchung hinzuzufügen. Diese Notiz kann Details wie Agenda-Punkte, benötigte Vorbereitung, technische Anforderungen oder andere relevante Informationen enthalten. Die Buchungsnotiz ist ein internes Informationsfeld, das dem Mitarbeiter und anderen Beteiligten hilft, den Kontext der Raumbuchung zu verstehen. Im Gegensatz zum Meetingtitel (der als Hauptüberschrift dient) bietet die Notiz Raum für ausführlichere Beschreibungen und Details.

## Akzeptanzkriterien

- [ ] Der Mitarbeiter kann im Buchungsformular ein Textfeld für Notizen sehen
- [ ] Das Notizfeld unterstützt Freitext mit mindestens 500 Zeichen Länge
- [ ] Das Notizfeld ist als optional gekennzeichnet (kein Pflichtfeld)
- [ ] Die eingegebene Notiz wird bei der Buchungsbestätigung angezeigt
- [ ] Die Notiz bleibt auch nach dem Absenden der Buchung gespeichert und kann später eingesehen werden
- [ ] Zeilenumbrüche in der Notiz werden korrekt dargestellt
- [ ] Bei leerer Notiz erfolgt keine Fehlermeldung (da optional)
- [ ] Die Zeichenanzahl wird dem Nutzer angezeigt (z.B. "0/500 Zeichen")

## Definition of Done
- [ ] Akzeptanzkriterien erfüllt
- [ ] Min. 1 Unit Test geschrieben
- [ ] Manuell getestet
- [ ] Dokumentation geupdated
