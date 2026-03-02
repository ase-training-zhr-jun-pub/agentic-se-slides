# Exercise-Repository Generator (Overlay-Ansatz)

## Ziel

Dieser Ordner erzeugt aus einer deklarativen Ordnerstruktur ein
Git-Repository, das als Trainings-Repository für Workshop-Teilnehmer dient.

**Dieser Ordner (Source)** enthält:

- die fachliche Entwicklung des Workshops
- die Step-Definitionen (Overlays)
- den Generator, der daraus ein Git-Repo erzeugt

**Das generierte Repository** enthält:

- eine lineare Commit-Historie
- jeder Commit repräsentiert einen Übungsschritt
- optionale Tags pro Checkpoint
- keine Workshop-Redaktionshistorie

Der Generator ist deterministisch reproduzierbar — gleiche Eingabe erzeugt
identische Commit-Hashes.

---

## Grundprinzip: Overlay-Modell

Statt vollständige Snapshots pro Schritt zu speichern, besteht das Modell aus:

- einem vollständigen `base/`-Startzustand
- mehreren `steps/<id>/`-Overlay-Verzeichnissen
- jedes Overlay enthält **nur die Änderungen dieses Schritts**

Der Generator:

1. Initialisiert ein neues Git-Repository
2. Kopiert `base/`
3. Commit
4. Wendet jedes Overlay in Reihenfolge der `steps.yaml` an
5. Commit pro Schritt
6. Setzt optional Tags

---

## Verzeichnisstruktur

```
exercise-repo/
│
├── base/                          # Vollständiger Startzustand (Step 00)
│   ├── .claude/
│   ├── .devcontainer/
│   └── scripts/
│
├── steps/
│   ├── 01-product-vision/         # Nur geänderte/neue Dateien
│   ├── 02-glossary/
│   ├── 03-proto-persona/
│   ├── ...
│   └── 17-bedrock-config/
│       ├── .devcontainer/         # Geänderte Datei
│       └── .delete                # Liste zu löschender Dateien
│
├── meta/
│   └── steps.yaml                 # Step-Definitionen, Tags, Author
│
├── generator/
│   ├── generate.ts                # Der Generator
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Overlay-Regeln

### 1. Dateien hinzufügen

Wenn eine Datei neu eingeführt wird, liegt sie im entsprechenden
Step-Overlay:

```
steps/01-product-vision/docs/product/product-vision.md
```

### 2. Dateien ändern

Wenn eine Datei geändert wird, liegt die **vollständige neue Version** im
Step-Overlay:

```
steps/02-glossary/docs/CLAUDE.md
```

Der Generator überschreibt die vorhandene Datei im Ziel-Repo.

### 3. Dateien löschen

Dateilöschungen werden über eine `.delete`-Datei im Step definiert:

```
steps/17-bedrock-config/.delete
```

Inhalt (eine Datei pro Zeile, Kommentare mit `#`):

```
# Alte Settings entfernen
.claude/settings.json
```

Der Generator entfernt diese Dateien **vor** dem Kopieren der Overlay-Dateien.

---

## meta/steps.yaml

Definiert Commit-Messages, Tags und Author-Daten.

```yaml
commitAuthor:
  name: Workshop Bot
  email: workshop@example.com

branches:
  main: 11-finished-backlog
  complete: 35-uebung-3-10

steps:
  - id: "00"
    message: setup codespace

  - id: 01-product-vision
    message: Added Product Vision
    tags:
      - uebung-1-1

  - id: 07-finished-backlog
    message: |
      finished backlog

      Alle Epics und User Stories für die Raumbuchungs-App
      wurden im Product Backlog erfasst.
    tags:
      - uebung-1-5
      - uebung-2-1
```

Regeln:

- `id` muss exakt mit dem Ordnernamen unter `steps/` übereinstimmen
  (Ausnahme: `"00"` referenziert `base/`)
- Die Reihenfolge im Array definiert die Commit-Reihenfolge
- `tags` ist optional (Array von Tag-Namen)
- `message` unterstützt mehrzeilige Strings via YAML Block-Scalar (`|`)

### branches

Die optionale `branches`-Sektion definiert, welcher Branch auf welchen
Step-Commit zeigt:

```yaml
branches:
  main: 11-finished-backlog
  complete: 35-uebung-3-10
```

- Jeder Key ist ein Branch-Name, jeder Value eine Step-ID
- Die Step-ID muss in `steps` existieren
- Der **erste Eintrag** wird zum aktiven Branch (HEAD) im generierten Repo
- Mehrere Branches dürfen auf denselben Step zeigen
- Wenn `branches` fehlt, wird ein einzelner `main`-Branch auf dem letzten
  Commit erzeugt

Damit lässt sich steuern, wo Teilnehmer nach dem Klonen landen (`main`),
während der vollständige Endzustand auf einem separaten Branch
(z.B. `complete`) verfügbar bleibt.

---

## Generator

### Voraussetzungen

- Node.js (>= 18)

### Installation

```bash
npm install
```

### Ausführung

```bash
npm run generate:exercise-repo -- --out /pfad/zum/ziel-repo
```

Mit explizitem Commit-Datum und Commit-Intervall:

```bash
npm run generate:exercise-repo -- \
  --out /pfad/zum/ziel-repo \
  --commit-date 2026-05-07 \
  --commit-interval 5m
```

| Flag                | Beschreibung                                      | Default                |
| ------------------- | ------------------------------------------------- | ---------------------- |
| `--source`          | Pfad zum `exercise-repo/`-Ordner                  | `<root>/exercise-repo` |
| `--out`             | Pfad für das generierte Repo                      | `<root>/tmp/workshop-repo` |
| `--commit-date`     | Zeitpunkt des ersten Commits                      | Heute, `00:00:00Z`     |
| `--commit-interval` | Abstand zwischen den Commit-Zeitpunkten pro Step  | `1m`                   |

`--commit-date` akzeptiert ein Datum (`YYYY-MM-DD`) oder einen ISO-Zeitpunkt:

```bash
--commit-date 2026-05-07
--commit-date 2026-05-07T09:00:00Z
```

`--commit-interval` akzeptiert einfache positive Zeitspannen:

```bash
--commit-interval 30s
--commit-interval 1m
--commit-interval 5m
--commit-interval 1h
--commit-interval 1d
```

### Ablauf

#### 1. Vorbereitung

- Zielverzeichnis löschen (falls vorhanden)
- Neues Git-Repository initialisieren
- Commit-Author aus `steps.yaml` setzen
- GPG-Signing deaktivieren
- Deterministische Commit-Zeiten (`--commit-date` + `n * --commit-interval`)

#### 2. Base-Commit

- Kopiert gesamten Inhalt von `base/`
- `git add -A && git commit` mit Step `00`

#### 3. Steps anwenden

Für jeden Step in `steps.yaml`:

1. Falls `.delete` existiert: alle gelisteten Dateien löschen
2. Overlay-Dateien rekursiv ins Ziel kopieren
3. `git add -A`
4. Commit mit der definierten Message
5. Falls `tags` definiert: `git tag -a` für jeden Tag

#### 4. Branches setzen

Falls `branches` definiert ist:

1. Für jeden Eintrag: Branch auf den Commit des referenzierten Steps setzen
2. Den ersten Branch als aktiven Branch (HEAD) auschecken
3. Den initialen `master`-Branch entfernen

---

## Determinismus

Um reproduzierbare Commit-Hashes zu erzeugen, verwendet der Generator:

- Feste Author-Daten (aus `steps.yaml`)
- Feste Commit-Zeiten (`--commit-date` + `n * --commit-interval`)
- Feste Committer-Daten via `GIT_AUTHOR_DATE` / `GIT_COMMITTER_DATE`

Das bedeutet: gleicher Input und gleiche CLI-Optionen erzeugen **immer**
identische Commit-Hashes. Ohne explizites `--commit-date` verwendet der
Generator das aktuelle Datum; dadurch unterscheiden sich die Commit-Hashes
zwischen Läufen an verschiedenen Tagen.

---

## Dateikopierstrategie

- Rekursives Kopieren
- Bestehende Dateien werden überschrieben
- `.git/` wird niemals kopiert oder überschrieben
- `.delete` wird nicht ins Ziel kopiert

---

## Vorteile

- **Keine Snapshot-Duplikation** — nur tatsächliche Änderungen pro Step
- **Änderungen an Base-Dateien** erfordern keine Anpassung späterer Steps
- **Klare Trennung** — Workshop-Entwicklung im Source-Repo, didaktische
  Historie im generierten Repo
- **Einfach wartbar** — neuer Step = neuer Ordner + Eintrag in `steps.yaml`
- **Deterministisch** — identische Ausgabe bei jedem Durchlauf
