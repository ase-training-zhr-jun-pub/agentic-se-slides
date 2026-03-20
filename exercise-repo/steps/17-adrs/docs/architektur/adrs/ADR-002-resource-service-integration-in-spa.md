# ADR-002: Resource Service Integration in SPA

**Status:** Accepted  
**Datum:** 2025-09-01  
**Kontext:** Entscheidung über die Integration des Resource Service in die Single Page Application (SPA) für die Verwaltung von Standorten, Räumen und Ausstattungen.

## Problemstellung

Das Calvin-System benötigt einen Resource Service zur Verwaltung von:
- Standorten (Locations)
- Räumen (Rooms) 
- Ausstattungen (Equipment)

Diese Daten werden vom Booking Service für die Buchungslogik benötigt. Es stellt sich die Frage, ob der Resource Service als separater Microservice implementiert oder in die SPA integriert werden soll.

## Optionen

### Option 1: Separater Resource Service (Microservice)

**Beschreibung:** Implementation als eigenständiger Microservice mit eigener API und Datenbank

**Vorteile:**
- Klare Trennung der Verantwortlichkeiten
- Unabhängige Skalierbarkeit
- Microservice-Architektur-Konformität
- Separate Deployment-Zyklen möglich

**Nachteile:**
- Zusätzliche Komplexität in der Infrastruktur
- Network Latency zwischen Services
- Längere Entwicklungszeit für Prototyp
- Zusätzliche Service-Discovery und Load Balancing

### Option 2: Integration in SPA mit Mock-Daten (Empfohlen)

**Beschreibung:** Der Resource Service wird direkt in die SPA integriert, mit statischen Mock-Daten für Standorte, Räume und Ausstattungen

**Vorteile:**
- Schnellere Prototyp-Entwicklung
- Keine zusätzliche Service-Infrastruktur erforderlich
- Reduzierte Komplexität während der Prototyping-Phase
- Einfache Datenverwaltung über Mock-Dateien
- Keine Network-Calls zwischen Frontend und Resource Service

**Nachteile:**
- Nicht skalierbar für Produktionsumgebung
- Daten sind statisch und nicht dynamisch verwaltbar
- Spätere Migration zu Microservice erforderlich
- Vermischung von UI- und Business-Logic

**Technische Details:**
- Mock-Daten als JSON-Dateien in der SPA
- Booking Service arbeitet nur mit Resource-IDs
- Einfache In-Memory-Datenhaltung im Frontend

## Entscheidung

**Empfehlung:** Option 2 - Integration in SPA mit Mock-Daten

## Begründung

- **Prototyping-Fokus:** Das primäre Ziel ist die schnelle Entwicklung eines funktionsfähigen Prototypen
- **Reduzierte Komplexität:** Vermeidung zusätzlicher Service-Infrastruktur in der Prototyping-Phase
- **Zeiteffizienz:** Schnellere Implementierung ermöglicht früheres Feedback und Iteration
- **Ausreichend für Proof-of-Concept:** Mock-Daten sind für die Validierung der Booking-Logik ausreichend
- **Klare Trennung:** Booking Service arbeitet nur mit IDs, wodurch spätere Migration vereinfacht wird

## Konsequenzen

**Positive:**
- Deutlich beschleunigte Prototyp-Entwicklung
- Reduzierte Infrastructure-Komplexität
- Einfache Testdaten-Verwaltung
- Fokus auf Kern-Funktionalität (Booking Logic)

**Negative:**
- Spätere Refaktorierung zu Microservice erforderlich
- Statische Daten nicht für Produktionsumgebung geeignet
- Temporäre Vermischung von Frontend- und Service-Logic

## Nächste Schritte

1. Erstellung von Mock-JSON-Dateien für Standorte, Räume und Ausstattungen
2. Implementation der Resource-Service-Logic in der SPA
3. Sicherstellung, dass Booking Service nur mit Resource-IDs arbeitet
4. Definition der Migration-Strategie zu separatem Microservice für Produktionsumgebung