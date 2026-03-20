# Qualitätsanforderungen

Diese Qualitätsszenarien definieren die wesentlichen Qualitätsmerkmale des Calvin-Systems gemäß arc42 Kapitel 10.

## Qualitätsszenarien

### QS-1: Performance bei Raumsuche

**Qualitätsmerkmal**: Performance / Antwortzeit

**Szenario**:
Während der normalen Arbeitszeit sucht ein INNOQ-Mitarbeiter im Calvin-System nach verfügbaren Räumen an einem bestimmten Standort für einen ausgewählten Zeitraum. Die Suchergebnisliste mit allen verfügbaren Räumen wird innerhalb von 500ms angezeigt, auch bei gleichzeitiger Nutzung durch bis zu 150 Mitarbeiter.

**Motivation**:
Die schnelle Anzeige von Suchergebnissen ist essentiell für die in der Vision versprochene "unkomplizierte unbürokratische leichte Buchung". Mitarbeiter wie Alex Berger, die nur einen Tag pro Woche im Büro sind, müssen ihre Buchungen schnell und effizient durchführen können.

---

### QS-2: Verhinderung von Doppelbuchungen

**Qualitätsmerkmal**: Zuverlässigkeit / Datenintegrität

**Szenario**:
In einer normalen Betriebssituation versuchen zwei INNOQ-Mitarbeiter gleichzeitig (innerhalb derselben Sekunde) denselben Raum für denselben Zeitraum zu buchen. Das System verarbeitet die erste vollständige Buchungsanfrage erfolgreich und lehnt die zweite Anfrage mit einer verständlichen Fehlermeldung ab. Doppelbuchungen werden in 99,9% der Fälle serverseitig verhindert.

**Motivation**:
Die Verhinderung von Doppelbuchungen ist ein Kernfeature von Calvin und essentiell für das Nutzervertrauen. Das System muss die "Sicherheit einen Arbeitsplatz, oder Meetingraum wirklich verfügbar zu haben" garantieren.

---

### QS-3: Verfügbarkeit während Arbeitszeiten

**Qualitätsmerkmal**: Verfügbarkeit

**Szenario**:
Während der typischen INNOQ-Arbeitszeiten (8:00-18:00 Uhr an Werktagen) ist das Calvin-System verfügbar und funktionsfähig. Das System erreicht eine Verfügbarkeit von 98% während dieser Kernarbeitszeiten. Bei einem Ausfall ist das System innerhalb von 30 Minuten wieder betriebsbereit.

**Motivation**:
Obwohl Ausfälle durch alternative Kommunikationswege (z.B. interner Messenger) kompensiert werden können, sollte Calvin während der Arbeitszeiten verlässlich verfügbar sein, um den Buchungsprozess nicht zu behindern.

---

### QS-4: Erweiterbarkeit um neue Standorte

**Qualitätsmerkmal**: Änderbarkeit / Erweiterbarkeit

**Szenario**:
Bei geplanter INNOQ-Expansion fügt ein Entwickler einen neuen Standort mit allen zugehörigen Räumen und Arbeitsplätzen zum Calvin-System hinzu. Die Implementierung, das Testing und das Deployment der Änderung sind innerhalb eines Release-Zyklus (2 Wochen) abgeschlossen, ohne bestehende Funktionalität zu beeinträchtigen.

**Motivation**:
INNOQ betreibt aktuell 8 Standorte und könnte in Zukunft expandieren. Die Multi-Standort-Architektur muss flexibel genug sein, um neue Standorte mit vertretbarem Aufwand zu integrieren.

---

### QS-5: Intuitive Bedienbarkeit für neue Mitarbeiter

**Qualitätsmerkmal**: Benutzbarkeit / Erlernbarkeit

**Szenario**:
Ein neuer INNOQ-Mitarbeiter ohne vorherige Schulung nutzt Calvin zum ersten Mal, um einen Arbeitsplatz für den nächsten Tag zu buchen. Der Mitarbeiter findet intuitiv den richtigen Weg durch die Oberfläche und schließt die Buchung erfolgreich in maximal 5 Minuten und maximal 20 Klicks ab. 90% der neuen Mitarbeiter schaffen ihre erste Buchung ohne Hilfe.

**Motivation**:
Die Vision betont "unkomplizierte unbürokratische leichte Buchung für jeden". Das System muss selbsterklärend sein, auch wenn im Zweifel Kollegen helfen können. Eine niedrige Einstiegshürde fördert die angestrebte 90%ige Mitarbeiterakzeptanz.

---

## Priorisierung

1. **QS-2 (Doppelbuchungen)** - Kritisch, Kernfeature
2. **QS-1 (Performance)** - Hoch, direkter Einfluss auf Nutzererfahrung
3. **QS-5 (Benutzbarkeit)** - Hoch, essentiell für Akzeptanz
4. **QS-3 (Verfügbarkeit)** - Mittel, Ausfälle sind kompensierbar
5. **QS-4 (Erweiterbarkeit)** - Mittel, ausreichend Vorlaufzeit
