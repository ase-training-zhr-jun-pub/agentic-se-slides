# Übung 1-4: User Story

Nachdem wir jetzt unser erstes Epic in unserem Backlog haben, wollen wir auch unsere User Stories zum Backlog hinzufügen.

## Aufgabe

Erstelle einen Command, der aus der Liste an User-Stories im Epic einheitliche User-Story-Tickets im Backlog erstellt.

## Anforderungen

- Das Epic muss über die `$ARGUMENTS` übergeben werden.
- Der Agent findet eigenständig heraus, für welche User-Story im Epic ein Ticket erstellt werden soll.
- Im Ticket gibt es eine Beschreibung der User Story, Akzeptanzkriterien und ein DoD (Definition of Done).
- Das zugehörige Epic wird verlinkt.
- Alle Stories sind einheitlich fortlaufend benannt als: `CLVN-<NUMBER>-STORY-<NAME>` ohne doppelte Ticketnummern.
