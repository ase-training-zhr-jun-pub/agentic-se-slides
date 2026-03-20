# Übung 2-3: Dokumentation

Das Team hat weitere Entscheidungen getroffen und diese als ADRs dokumentiert.

1. Der Ressource-Service wird in die SPA integriert. Die Standorte, Räume und Ausstattungen werden als Mock-Daten in der SPA hinterlegt. Der Booking-Service arbeitet nur mit den IDs aus den Mock-Daten.
2. Wir verzichten auf eine Okta-Integration für den Prototypen. Diese liefern wir nach, wenn das System in Produktion geht. Wir setzen stattdessen auf Basic-Auth ohne Passwörter, damit wir schnell mit verschiedenen Nutzern testen können und gleichzeitig keine Abhängigkeiten zu Drittsystemen haben.

## Aufgabe

Passe die bisherige Dokumentation an die neuen Entscheidungen aus den ADRs an.

Erweitere die Architekturdokumentation außerdem um `docs/architektur/technische-schulden.md` für technische Schulden.
