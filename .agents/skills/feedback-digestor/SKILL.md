---
name: feedback-digestor
description: >
  Überführt loses, unstrukturiertes Feedback in GitHub Issues im Projekt-Board.
  Nutze diesen Skill immer, wenn der User Feedback strukturieren und als Issues anlegen möchte –
  egal ob die Quelle ein Slack-Thread, eine E-Mail, ein Miro-Board-Export, ein Meeting-Protokoll,
  eine Textnachricht, ein Copy-Paste aus einem Chat, handschriftliche Notizen, ein Audio-Transkript
  oder sonstige lose Notizen sind.
  Auch bei Begriffen wie „Feedback als Issues", „Issues aus Feedback", „Feedback einpflegen",
  „Rückmeldungen als Tickets", „Anmerkungen ins Board", „Review-Ergebnisse eintragen",
  „Feedback strukturieren" oder „Feedback digestieren" diesen Skill verwenden.
---

# Feedback Digestor

Überführt unstrukturiertes Feedback beliebiger Herkunft in klassifizierte GitHub Issues im Projekt-Board.

## Ziel-Setup

- **Repo:** `innoq/agentic-se-slides`
- **Projekt:** `#15` (ASE Training), Board: https://github.com/orgs/innoq/projects/15
- **Script:** `scripts/create-issues.sh` (relativ zu diesem Skill-Verzeichnis) übernimmt die gesamte gh-CLI-Mechanik

## Workflow

### 1. Quelle verstehen

Lies das gesamte Feedback und identifiziere:

- **Quellformat:** Slack-Thread, E-Mail, Freitext, Transkript, Miro-Export, etc.
- **Kontext:** Worum geht es? (Workshop, Präsentation, Übung, Setup, etc.)
- **Beteiligte:** Namen standardmäßig ENTFERNEN (anonymisieren), es sei denn der User sagt explizit etwas anderes.
- **Sprache:** Issues immer auf Deutsch verfassen (Board-Sprache). Originalkommentare bei Bedarf als Zitat (`> ...`) im Body belassen.

### 2. Items extrahieren

Jeder eigenständige Feedback-Punkt wird zunächst ein Item:

- **Ein Item = ein abarbeitbarer Punkt.** Mehrere Punkte in einem Absatz → separate Items.
- **Kontext bewahren:** Referenzen (Folie X, Kapitel Y, Datei Z) immer übernehmen.
- **Originalintention respektieren:** Kern bewahren, knapp und handlungsorientiert formulieren.
- **Implizite Items erkennen:** Versteckte Handlungspunkte explizit machen.

### 3. Kleinkram bündeln

Feedback (gerade aus Slack-Threads) enthält oft viele kleine Einzelpunkte. Nicht jeder davon rechtfertigt ein eigenes Issue.

**Bündelungsregeln:**

1. **Nur XS/S-Items bündeln.** Ab Size M → immer eigenständiges Issue.
2. **Gruppierung** (in dieser Reihenfolge prüfen):
   - Gleicher Typ + gleicher Bereich → z.B. „Typos und Korrekturen in Kapitel 3"
   - Gleicher Typ + kein klarer Bereich → z.B. „Diverse Typos und Korrekturen"
   - Gleicher Bereich + gemischte Typen → z.B. „Kleinere Anpassungen Folie 12"
3. **Ab 2 Items** gleicher Gruppe bündeln. Einzelnes XS/S ohne Geschwister → eigenständig.
4. **Max ~10 Subtasks** pro Issue. Darüber aufteilen.

**Gebündeltes Issue:** Body enthält Checkbox-Liste als Subtasks. Size neu schätzen basierend auf Gesamtaufwand. Priority = höchste aus der Gruppe.

### 4. Items klassifizieren

Jedes Item bekommt drei Dimensionen:

#### Typ → GitHub Label

| Label | Bedeutung |
|-------|-----------|
| `feedback:fix` | Tippfehler, faktischer Fehler, Korrektur |
| `feedback:inhalt` | Inhaltliche Änderung, Ergänzung, Streichung |
| `feedback:struktur` | Didaktik, Aufbau, Reihenfolge, Ablauf |
| `feedback:design` | Visuelles, Layout, Typografie |
| `feedback:uebung` | Übungen betreffend (Inhalt, Ablauf, Material) |
| `feedback:setup` | Technisches Setup, Infrastruktur, Tooling |
| `feedback:material` | Trainingsmaterial, Handouts, Begleitdokumentation |

**Neue Labels:** Nur anlegen, wenn keines der bestehenden `feedback:*`-Labels passt. Vor dem Anlegen prüfen, ob ein bestehendes Label mit leicht angepasster Interpretation reicht. Neue Labels immer im `feedback:`-Namespace halten. Das Script legt fehlende Labels automatisch an.

#### Scope → GitHub Label (zusätzlich zum Typ)

| Label | Bedeutung |
|-------|-----------|
| `slides` | Feedback bezieht sich auf die Präsentationsfolien |
| `exercise` | Feedback bezieht sich auf die Übungen |

Jedes Issue bekommt **zusätzlich** zum `feedback:*`-Label ein Scope-Label:
- Eindeutig Folien → `slides`. Eindeutig Übungen → `exercise`.
- Betrifft beides → **beide** Labels setzen (`slides` + `exercise`).
- Scope erst nach Interpretation klar oder unklar → weglassen. Im Zweifel lieber kein Scope-Label als ein falsches.

#### Aufwand → Size

| Size | Bedeutung |
|------|-----------|
| `XS` | Unter 5 Minuten, trivial |
| `S` | Unter 15 Minuten, kein Abstimmungsbedarf |
| `M` | 15 Min bis ein paar Stunden, evtl. Abstimmung nötig |
| `L` | Größerer Umbau, mehrere Stunden |
| `XL` | Team-Entscheidung, ggf. mehrere Tage |

#### Dringlichkeit → Priority

| Priority | Bedeutung |
|----------|-----------|
| `low` | Nice-to-have, keine Eile |
| `medium` | Sinnvoll, aber nicht dringend |
| `high` | Sollte bald gemacht werden, beeinträchtigt Qualität |
| `urgent` | Muss vor nächster Durchführung fix sein |

**Default:** `low`. Nur `urgent` bei offensichtlich Blockierendem/Fehlerhaftem.

### 5. Vorschau zeigen und bestätigen lassen

**Bevor irgendein Issue erstellt wird**, dem User eine Vorschau-Tabelle zeigen:

```
| #  | Titel                              | Labels                    | Size | Prio   | Subtasks |
|----|-------------------------------------|---------------------------|------|--------|----------|
| 1  | Typos in Kapitel 2                  | feedback:fix, slides      | S    | low    | 4        |
| 2  | Security-Grundlagen früher einbauen | feedback:struktur         | L    | high   | —        |
| 3  | Pair-Programming Übung unklar       | feedback:uebung, exercise | M    | medium | —        |
```

Fragen: „Soll ich diese X Issues so anlegen? Änderungen gewünscht?"
Erst nach Bestätigung weiter.

### 6. JSON generieren und Script ausführen

Nach Bestätigung eine JSON-Datei generieren und das gebündelte Script aufrufen.

#### JSON-Format

```json
[
  {
    "title": "Typos Folien 9-42",
    "body": "## Beschreibung\n\nGesammelte Tippfehler in Folien 9 bis 42.\n\n## Subtasks\n\n- [ ] F9: Screenshot updaten\n- [ ] F11: Coding Assistant → Coding Agent\n\n## Quelle\n\nSlack-Feedback, Januar 2026",
    "labels": ["feedback:fix", "slides"],
    "size": "S",
    "priority": "low"
  },
  {
    "title": "Security-Grundlagen früh einbauen",
    "body": "## Beschreibung\n\nSecurity-Grundlagen früh einbauen:\n- LLM-Risiken erklaeren\n- Prompt Injection Demo\n\n## Quelle\n\nSlack-Feedback, Januar 2026",
    "labels": ["feedback:inhalt"],
    "size": "L",
    "priority": "high"
  }
]
```

**Regeln für die JSON:**
- **title:** Natürliche Sprache mit Umlauten und Sonderzeichen — `gh` und GitHub kommen damit klar.
- **body:** Vollständiges Markdown. Umlaute und Sonderzeichen sind hier OK — wird über `--body-file` an gh übergeben.
- **body-Struktur:** Immer mit `## Beschreibung` starten. Bei gebündelten Issues `## Subtasks` mit Checkbox-Liste. Am Ende `## Quelle`.
- **labels:** Array mit einem oder mehreren `feedback:*` Labels.
- **size/priority:** Exakt die Werte aus den Tabellen oben.

#### Script aufrufen

```bash
# JSON in Temp-Datei schreiben
# Pfad zum Script relativ zum Skill-Verzeichnis:
bash .claude/skills/feedback-digestor/scripts/create-issues.sh /tmp/feedback-issues.json
```

Das Script:
- Legt fehlende Labels automatisch an
- Erstellt jedes Issue mit `--body-file` (kein Shell-Quoting-Problem)
- Fügt jedes Issue dem Projekt #15 hinzu
- Setzt Status (Backlog), Size und Priority als Project-Fields
- Gibt eine laufende Fortschrittsanzeige und Zusammenfassung aus

Bei großen Batches (>20 Issues) das Script im Background starten.

### 7. Zusammenfassung

Nach dem Script-Lauf dem User berichten:

```
Erstellt: X Issues aus [Quelle]

Quick Wins (XS/S): X Issues
Medium (M): X Issues
Groß (L/XL): X Issues

Priority low: X | medium: X | high: X | urgent: X

Board: https://github.com/orgs/innoq/projects/15
```

## Sonderfälle

| Fall | Vorgehen |
|------|----------|
| **Lob / Positives** | Nicht als Issue. In der Chat-Antwort unter „Das lief gut" zusammenfassen. |
| **Strategische Vorschläge** | Issue mit Size XL, im Body Team-Entscheidung markieren. |
| **Widersprüchliches Feedback** | Nicht auflösen. Separate Issues, im Body aufeinander verweisen. |
| **Unklares Feedback** | Issue anlegen, im Body „⚠ Rückfrage nötig" markieren. |
| **Mehrere Quellen** | Ein Durchlauf, Quelle pro Issue im Body angeben. |
| **Duplikate** | Vor Erstellung mit `gh search issues --repo innoq/agentic-se-slides "<Stichwort>"` prüfen, ob ein ähnliches Issue existiert. Bei Treffer: User fragen ob Duplikat oder eigenständig. |

## Qualitätskriterien

1. **Vollständig:** Kein Feedback-Punkt geht verloren
2. **Atomar:** Jedes Issue ist ein einzelner, abarbeitbarer Punkt
3. **Referenziert:** Wo möglich, mit konkreter Stelle verknüpft
4. **Klassifiziert:** Jedes Issue hat Label, Size und Priority
5. **Anonymisiert:** Keine Namen von Feedbackgebenden
6. **Handlungsorientiert:** Titel und Body sagen, was zu tun ist
7. **Im Board:** Jedes Issue ist im Projekt #15 mit gesetzten Fields
