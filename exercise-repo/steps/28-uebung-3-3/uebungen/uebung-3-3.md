# Übung 3-3: Agent Setup

Um dem Agenten mit Kontext zu helfen und zusätzliche Tools zur Verfügung zu stellen, müssen wir unser Projekt richtig aufsetzen.

## Aufgabe 1: Context-File

Erstelle eine `CLAUDE.md` Datei im `backend/` Verzeichnis. Diese wird nur in den Kontext geladen, wenn der Agent im Backend-Ordner arbeiten soll. Die Datei sollte Informationen zu folgenden Punkten enthalten:

- Link zur Domänen- und Architekturdokumentation
- Backend-Technologie
- Allgemeine Ordner-Struktur
- Allgemeine Backend-Architektur (Layered, Hexagonal, ...)
- Wichtige Dateien
- Wichtige Bash-Commands
- Code Smells
- Run Configurations
- Andere Informationen, die wichtig für Claude Code sind

## Aufgabe 2: Hooks

- Erstelle eine Settings-Datei `/.claude/settings.json`.
- Füge eine Hook hinzu, die bei Writes und Edits den Formatter eurer Backend-Sprache ausführt.
- Teste anschließend, ob die Hook funktioniert.

Docs:

https://docs.anthropic.com/en/docs/claude-code/hooks#project-specific-hook-scripts
https://docs.anthropic.com/en/docs/claude-code/hooks-guide#code-formatting-hook

## Aufgabe 3: MCPs

- Füge Context7 und Playwright als MCP-Server im Project Scope hinzu. Die MCP-Server sollten dann in der `.mcp.json` konfiguriert sein.
- Teste anschließend beide MCP-Server.
- Suche danach nach weiteren spannenden MCP-Servern für deine Technologie (Sammlung z. B. unter https://github.com/punkpeye/awesome-mcp-servers).

Hinweise:

- Du benötigst keinen API-Key für Context7 (außer wenn die Rate Limits nicht mehr reichen).
- Für Playwright musst du in Codespaces die Flags `--no-sandbox` und `--isolated` setzen.
- Wenn du `claude mcp add` benutzt, gib den Scope Parameter `-s project` an.

Docs:

https://github.com/upstash/context7
https://github.com/microsoft/playwright-mcp
https://docs.anthropic.com/en/docs/claude-code/mcp#project-scope

## Aufgabe 4: LSP

- Suche nach bestimmten Funktionen oder Methoden im Frontend und/oder Backend.
- Installiere Plugins für LSP-Unterstützung: TypeScript fürs Frontend und das passende LSP-Plugin fürs Backend. Plugins lassen sich über den Command `/plugin` installieren. Dann im Suchfeld die gewünschte Programmiersprache eingeben und eine LSP-Option auswählen.
- Nachdem das Plugin installiert ist, wiederhole die Suche. Jetzt sollte Claude Code die Funktionen/Methoden über das LSP-Plugin finden und in den Treffern Source-Dateien mit passenden Codezeilen anzeigen.

Docs:

https://code.claude.com/docs/en/discover-plugins#code-intelligence
