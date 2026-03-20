# Übung 3-9: Kontext optimieren

Tests produzieren viel Text im Terminal. Wenn der Agent diesen Text immer dem Kontext hinzufügt, wächst der Kontext schnell mit unwichtigen Tokens. Das können wir durch einen Subagent, der nur die Tests ausführt, optimieren.

## Aufgabe

1. Erstelle einen Subagent `test-executor`, der entweder alle oder nur einzelne Tests ausführt. Nutze dazu den `/agents` Command.
2. Der Subagent gibt zurück, ob alle Tests durchgelaufen sind oder welche Tests fehlerhaft waren.
3. Lasse dann auf einem neuen Branch für Story 016 die Integration mit dem Frontend vom Agenten entwickeln und erstelle einen PR, wenn du fertig bist.

Docs:

https://docs.anthropic.com/en/docs/claude-code/sub-agents#file-format
