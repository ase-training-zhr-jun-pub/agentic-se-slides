# Bausteinansicht

## Stufe 1: Systemüberblick (Whitebox Calvin)

Das Calvin-System gliedert sich in drei eigenständige Services:

```mermaid
graph TD
    subgraph "Calvin System"
        SPA[SPA<br/>Single Page Application]
        ResourceService[Resource Service]
        BookingService[Booking Service]
    end
    
    subgraph "External Systems"
        Okta[Okta Identity Provider]
    end
    
    subgraph "Users"
        Consultant[INNOQ Consultants]
    end
    
    %% User interactions
    Consultant -->|Web Browser| SPA
    
    %% Service interactions
    SPA -->|REST API| ResourceService
    SPA -->|REST API| BookingService
    
    %% Authentication
    SPA -->|OAuth 2.0| Okta
    ResourceService -->|HTTP| Okta
    BookingService -->|HTTP| Okta
    
    class SPA applicationClass
    class ResourceService serviceClass
    class BookingService serviceClass
    class Okta externalClass
    class Consultant userClass
```

### Enthaltene Bausteine

| Name | Beschreibung | Verantwortlichkeit |
|------|--------------|-------------------|
| **SPA** | Single Page Application (Frontend) | Benutzerinteraktion, UI/UX, Client-side Routing |
| **Resource Service** | Verwaltung von Büros, Räumen und Arbeitsplätzen | CRUD für Ressourcen |
| **Booking Service** | Buchungsverwaltung und Geschäftslogik | Buchungslogik, Konfliktauflösung, Validierung |

### Wichtige Schnittstellen

- **SPA ↔ Resource Service**: REST API für Ressourcenabfragen und -verwaltung
- **SPA ↔ Booking Service**: REST API für Buchungsoperationen
- **Okta Integration**: OAuth 2.0 Authentication für alle Services