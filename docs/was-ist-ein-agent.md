# Was ist ein Agent?

Diese Dokumentation beschreibt die inhaltlichen Konzepte für das Chapter "Agents" in der Präsentation. Sie dient als Referenz für zukünftige Änderungen und ermöglicht anderen Autoren nachzuvollziehen, was wir uns gedacht haben.

## Der Agent Harness

Der "Agent Harness" ist das Gerüst, das ein LLM zu einem handlungsfähigen Agenten macht. Er besteht aus vier Hauptkomponenten:

### 1. Environment (Die Umgebung)

Das Environment ist das System, auf dem der Agent arbeitet. Anders als ein Assistant, der nur Daten zurückgibt, **verändert** ein Agent seine Umgebung aktiv.

**Beispiele für Environments:**
- Filesystem (Code, Konfigurationen, Dokumentation)
- Git Repository (Versionskontrolle)
- APIs und externe Services
- Datenbanken
- Terminal / Shell
- IDE / Language Server Protocol (LSP)

**Wichtig:** Der Agent ist nicht nur passiver Leser, sondern aktiver Veränderer seiner Umgebung.

### 2. Tools (Die Werkzeuge)

Tools definieren, was der Agent tun kann. Sie bilden die "Capability Boundary" - alles außerhalb dieser Grenze ist dem Agent nicht zugänglich.

**Typische Tool-Kategorien:**

| Kategorie | Beispiele | Zweck |
|-----------|-----------|-------|
| **Lesen** | Dateien lesen, Code durchsuchen, Docs abrufen | Information gewinnen |
| **Schreiben** | Dateien erstellen, editieren, löschen | Zustand ändern |
| **Ausführen** | Commands, Tests, Builds starten | Aktionen triggern |
| **Suchen** | Grep, Find, LSP-Queries | Navigation im Code |

### 3. Observation / Feedback Loop

Der Agent beobachtet die Ergebnisse seiner Aktionen. Dieser Feedback-Mechanismus ermöglicht **Self-Correction** - der Agent kann Fehler erkennen, analysieren und beheben.

**Was wird beobachtet:**
- Tool-Output (Erfolg/Fehler)
- Compiler- und Runtime-Fehler
- Test-Ergebnisse (pass/fail)
- Diagnostics (LSP warnings, Linter-Meldungen)
- Zustandsänderungen (Git diff, Dateiänderungen)

**Self-Correction Beispiel:**
1. Agent schreibt Code
2. Test schlägt fehl
3. Agent liest Fehlermeldung
4. Agent korrigiert Code
5. Test läuft erfolgreich

### 4. Control Loop (Reason → Act → Observe)

Der Control Loop ist der Kern des agentic behavior. Er beschreibt den iterativen Zyklus, in dem ein Agent arbeitet:

1. **Reason**: Situation analysieren, nächsten Schritt planen
2. **Act**: Tool ausführen, Environment modifizieren
3. **Observe**: Ergebnis lesen, Fortschritt evaluieren
4. **Repeat** oder **Stop** wenn Ziel erreicht

Dieser Loop läuft so lange, bis das Ziel erreicht ist oder der Agent keine weiteren sinnvollen Aktionen mehr findet.

## Abgrenzung: Assistant vs. Agent

| Aspekt | Assistant | Agent |
|--------|-----------|-------|
| **Ablauf** | Workflow → Result | Loop on Environment |
| **Feedback** | Manuell vom Menschen | Automatisch aus Environment |
| **Output** | Gibt Daten zurück | Modifiziert Environment |
| **Context** | Wird bereitgestellt | Wird selbst entdeckt |
| **Fehlerkorrektur** | Durch Menschen | Self-Correction Loop |

### Kernaussage

> Ein Assistant durchläuft einen Workflow und liefert ein Ergebnis.
> Ein Agent arbeitet iterativ auf einer Umgebung, bis das Ziel erreicht ist.

## Philosophie

"Think of agents as interns. Always verify their work."

Agents sind mächtige Werkzeuge, aber sie machen Fehler. Wie bei einem Praktikanten sollte man ihre Arbeit immer überprüfen, bevor man sie akzeptiert.
