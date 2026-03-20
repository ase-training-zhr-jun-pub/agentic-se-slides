# Übung 2-2: Entscheidungen treffen

Die Architekturdokumentation ist weiter gewachsen. Es gab außerdem die Entscheidung, dass das Buchen der Räume in einen einzelnen Service ausgelagert werden soll. Jetzt ist offen, welche Technologie für den Booking-Service gewählt werden soll.

## Aufgabe

Entscheide zusammen mit dem Agenten, welche Technologie der Service nutzen soll. Wäge dazu die Vor- und Nachteile von drei Technologien ab.

Dokumentiere deine Entscheidung anschließend in einem ADR unter:

`docs/architektur/adrs/ADR-001-technologie-stack-fuer-booking-service.md`

## Anforderungen

> [!IMPORTANT]
> Du wirst in einer späteren Aufgabe diesen Service implementieren. Nutze also eine Technologie, in der du dich auskennst.

- REST-API
- Kompatibilität mit dateibasierter Datenbank (z.B. SQLite, H2, ...)
- Perspektivisch muss eine Okta-Integration möglich sein
- Schnelle Entwicklung möglich

> [!NOTE]
> Spring Boot mit Kotlin funktioniert nicht gut in VSCode.
