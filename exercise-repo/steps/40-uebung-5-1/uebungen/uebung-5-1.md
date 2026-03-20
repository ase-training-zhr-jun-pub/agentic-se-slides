# Übung 5-1: CI/CD Pipeline

Nachdem unser Prototyp jetzt fertig ist, wollen wir ihn auch automatisiert in der Pipeline testen und deployen.

## Aufgabe

Erstelle für das Backend einen GitHub-Workflow die

1. den Code testet
2. die Testergebnisse mit der `dorny/test-reporter` zu GitHub Action reported
3. das Backend als Docker-Image baut
4. das Image in die GitHub-Container-Registry (GHCR) des Repos pusht
