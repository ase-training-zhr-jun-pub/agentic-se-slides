# ADR-003: Basic Auth statt Okta Integration für Prototyp

**Status:** Accepted  
**Datum:** 2025-09-01  
**Kontext:** Entscheidung über die Authentifizierungsmethode für den Calvin-Prototyp: Okta Integration vs. vereinfachte Basic Authentication.

## Problemstellung

Das Calvin-System benötigt eine Authentifizierungslösung für den Prototyp. In ADR-001 wurde OAuth 2.0 Integration mit Okta als Produktionsanforderung definiert. Für die Prototyping-Phase stellt sich die Frage, ob die vollständige Okta-Integration implementiert oder eine vereinfachte Lösung verwendet werden soll.

## Optionen

### Option 1: Vollständige Okta Integration (OAuth 2.0)

**Beschreibung:** Implementation der vollständigen OAuth 2.0 Integration mit Okta wie in der Produktionsversion geplant

**Vorteile:**
- Produktionsnahe Implementierung
- Sichere Authentifizierung und Autorisierung
- Einheitliche Identity Management Lösung
- Keine spätere Migration erforderlich

**Nachteile:**
- Abhängigkeit zu externem System (Okta)
- Komplexe Konfiguration und Setup
- Längere Entwicklungszeit für Prototyp
- Zusätzliche Kosten für Okta-Instanz
- Erschwerte Testdateneinrichtung

**Technische Details:**
- OAuth 2.0 Flow Implementation
- Okta Organization Setup erforderlich
- Spring Security OAuth 2.0 Client Konfiguration
- Token-basierte Authentifizierung

### Option 2: Basic Auth ohne Passwörter (Empfohlen)

**Beschreibung:** Vereinfachte Basic Authentication ohne Passwort-Validierung für schnelle Benutzer-Identifikation

**Vorteile:**
- Schnelle Prototyp-Entwicklung ohne externe Abhängigkeiten
- Einfache Testbenutzer-Erstellung
- Keine Okta-Konfiguration erforderlich
- Flexibles Testen mit verschiedenen Benutzern
- Reduzierte Komplexität während Entwicklung

**Nachteile:**
- Nicht produktionstauglich (Sicherheitslücke)
- Spätere Migration zu OAuth 2.0 erforderlich
- Keine echte Authentifizierung oder Autorisierung
- Temporäre technische Schuld

**Technische Details:**
- HTTP Basic Authentication Header
- Username wird übertragen, Passwort ignoriert
- Spring Security Custom Authentication Provider
- Einfache In-Memory User-Registry

## Entscheidung

**Empfehlung:** Option 2 - Basic Auth ohne Passwörter

## Begründung

- **Prototyping-Fokus:** Schnelle Validierung der Kernfunktionalität steht im Vordergrund
- **Keine externen Abhängigkeiten:** Vermeidung von Okta-Setup und -Konfiguration
- **Testfreundlichkeit:** Einfache Erstellung und Verwaltung von Testbenutzern
- **Zeitersparnis:** Deutlich reduzierte Entwicklungszeit für Authentifizierung
- **Flexibilität:** Einfacher Wechsel zwischen verschiedenen Testbenutzern
- **Risikominimierung:** Keine Abhängigkeit zu externen Services während Prototyping

## Konsequenzen

**Positive:**
- Schnelle Prototyp-Entwicklung ohne externe Systemabhängigkeiten
- Einfache Testdurchführung mit verschiedenen Benutzerprofilen
- Reduzierte Infrastruktur-Komplexität
- Fokus auf Kernfunktionalität statt Authentifizierung

**Negative:**
- Sicherheitslücke in der aktuellen Implementation
- Spätere Migration zu OAuth 2.0/Okta erforderlich
- Temporäre Abweichung von Produktionsarchitektur
- Zusätzlicher Refaktorierungsaufwand für Produktionsversion

## Nächste Schritte

1. Implementation von Basic Auth ohne Passwort-Validierung
2. Erstellung einer einfachen Benutzer-Registry für Testzwecke
3. Definition der Migrationsstrategie zu OAuth 2.0/Okta für Produktionsversion
4. Dokumentation der temporären Authentifizierungslösung für das Entwicklungsteam
