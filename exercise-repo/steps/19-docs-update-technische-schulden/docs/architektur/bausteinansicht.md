# Bausteinansicht

## Stufe 1: Systemüberblick (Whitebox Calvin)

Das Calvin-System besteht aus einer SPA mit integriertem Resource Service und einem separaten Booking Service. Diese Architektur wurde für die Prototyping-Phase optimiert (siehe ADR-002 und ADR-003):

```mermaid
graph TD
    subgraph "Calvin System - Prototyp"
        SPA["SPA<br/>Single Page Application"]
        BookingService["Booking Service"]
    end
    
    subgraph "Users"
        Consultant["INNOQ Consultants"]
    end
    
    %% User interactions
    Consultant -->|"Web Browser"| SPA
    
    %% Service interactions
    SPA -->|"REST API"| BookingService
    
    class SPA applicationClass
    class BookingService serviceClass
    class Consultant userClass
```

### Enthaltene Bausteine

| Name | Beschreibung | Verantwortlichkeit |
|------|--------------|-------------------|
| **SPA** | Single Page Application (Frontend) | Benutzerinteraktion, UI/UX, Client-side Routing |
| **Booking Service** | Buchungsverwaltung und Geschäftslogik | Buchungslogik, Konfliktauflösung, Validierung |

### Wichtige Schnittstellen

- **SPA ↔ Booking Service**: REST API für Buchungsoperationen