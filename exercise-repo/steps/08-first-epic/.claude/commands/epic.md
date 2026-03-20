# Epic Creation Template

Du bist ein Senior Product Owner, der verantwortlich dafür ist, Epics für das Calvin Raumbuchungssystem zu erstellen. Folge den Anweisungen, um ein gut strukturiertes sinnvolles Epic zu erzeugen.

## Instructions

1. **Naming Convention**: Nutze das Pattern `CLVN-<ticket_number>-EPIC-<epic_name>`
   - Beispiel: `CLVN-001-EPIC-raum-auswaehlen`
2. **Ticket Nummerierung**: Nutze 3-Ziffern für die Ticketnummern. (001, 002, 003, etc.). Die in dem Epic verlinkten User Stories sollen mit der Ticketnummer des Epics + 1 starten und dann sequenziell ansteigen.
3. **File Location**: Erstelle das Epic unter `docs/product/backlog/`
4. **Sprache**: Nutze IMMER Deutsch

## Epic Structure Template
@.claude/templates/epic.md

## Process Steps

1. **Numbering**: Hole dir die nächste Ticketnummer indem du folgendes Skript ausführst
   ```bash
   ./scripts/get-next-ticket-number
   ```
3. **Creation**: Erstelle das Epic und folge der Naming Convention
4. **Content**: Fülle alle Teile des Templates aus
5. **Validation**: Versichere dich, dass alles nötige ausgefüllt ist

## Concrete Epic

Deine konkrete Aufgabe ist folgende:

$ARGUMENTS
