# Übung 4-3: End-to-End-Tests

Nachdem wir jetzt Unit- und Integrationstests aufgebaut haben, wollen wir jetzt auch End-To-End-Tests hinzufügen. Dafür haben wir schon eine Dokumentation, wie das Testing ablaufen soll und ein `e2e` Verzeichnis mit einer Konfiguration für Playwright-Tests.

## Aufgabe

Lasse dir einen E2E-Test für den Raumbuchungsprozess entwickeln. Der Test soll folgende Schritte abdecken:

1. Buchungsübersicht öffnen
2. Bisherige Buchungen merken
3. Standort-Seite öffnen
4. Standort auswählen
5. Datum auswählen
6. Raum auswählen
7. Buchen
8. Buchungsübersicht öffnen
9. Verifizieren, dass neue Buchung existiert
