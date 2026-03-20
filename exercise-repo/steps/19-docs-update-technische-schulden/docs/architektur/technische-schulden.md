# Technical Debt - Calvin Prototyp

## Übersicht

Dieses Dokument dokumentiert die technischen Schulden, die während der Prototyping-Phase des Calvin-Systems bewusst eingegangen wurden. Diese Entscheidungen ermöglichen eine schnelle Entwicklung, müssen aber für die Produktionsversion adressiert werden.

## Authentifizierung und Autorisierung

### Fehlende Okta Integration ([ADR-003](adr/ADR-003-basic-auth-statt-okta-integration.md))

**Problem:**
- Aktuell wird Basic Auth ohne Passwort-Validierung verwendet
- Keine echte Authentifizierung oder Autorisierung
- Sicherheitslücke in der aktuellen Implementation

**Technische Schuld:**
- Spätere Migration zu OAuth 2.0/Okta erforderlich
- Refaktorierung der gesamten Authentifizierungs-Pipeline
- Integration mit Spring Security OAuth 2.0 Client

**Aufwand für Migration:**
- **Hoch** - Vollständige Neuimplementierung der Authentifizierung
- Okta Organization Setup
- Frontend OAuth Flow Implementation
- Backend Token-Validierung
- User Management Integration

**Priorität:** Kritisch für Produktionsumgebung

## Mock-Daten statt echtes Backend

### Resource Service Integration in SPA ([ADR-002](adr/ADR-002-resource-service-integration-in-spa.md))

**Problem:**
- Resource Service ist direkt in die SPA integriert mit Mock-Daten
- Keine persistente Datenhaltung für Ressourcen
- Statische JSON-Dateien statt dynamisches Backend
- Vermischung von Frontend- und Service-Logic

**Technische Schuld:**
- Spätere Refaktorierung zu separatem Microservice erforderlich
- Migration von Mock-Daten zu echter Datenbank
- API-Design und Service-Interface Definition
- Persistente Datenhaltung implementieren

**Aufwand für Migration:**
- **Hoch** - Vollständige Backend-Implementierung erforderlich
- Entweder: Booking Service um Resource-Management erweitern
- Oder: Neuen separaten Resource Service entwickeln
- Database Design und Setup für Ressourcendaten
- CRUD-Operationen und Business Logic implementieren
- API-Design und -Dokumentation
- Separate Deployment-Pipeline bei Microservice-Ansatz

**Priorität:** Hoch - Für funktionsfähiges Produktivsystem erforderlich
