---
name: pdf-exercise-markdown
description: Konvertiert ein Übungs-/Kapitel-PDF in Übungs-Markdown-Dateien (pro Übung) und optionale Vollseiten-Grafiken (PNG) als Assets in eigenen exercise-repo Step-Overlays.
allowed-tools: Bash(*)
---

# PDF -> Markdown (Übungen)

Dieses Skill beschreibt einen Workflow, um ein PDF mit Übungen und ggf. Infografiken in GitHub-Flavored Markdown zu überführen.

Konventionen aus dem Workshop-Repo:

- Jede Übung bekommt einen eigenen Step (Overlay) unter `exercise-repo/steps/<NN>-uebung-<X>-<Y>/`.
- Der Step enthält nur die Übungsdatei unter `uebungen/` und ggf. Grafiken unter `uebungen/assets/`.
- Dateinamen folgen den Tags: `uebungen/uebung-<X>-<Y>.md`.
- Inhalte sind UTF-8 (Umlaute ok). Dateinamen bleiben ASCII.
- Hinweise wie `Startpunkt: ...` werden in den Übungs-Markdowns weggelassen.

Wichtig: Kein `pdf-slide-corpus` verwenden.

## Input (vom User oder aus dem Repo ableiten)

- PDF-Datei: z.B. `[TEMPLATE] Agentic Software Engineering.pdf`
- Ziel-Steps: `exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/uebung-<X>-<Y>.md`
- Assets-Ordner (pro Übung): `exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>/`
- Step-Definitionen: `exercise-repo/meta/steps.yaml` (Commit-Messages + Tags)

## Workflow

### 1) PDF sichten (Seiten + Text)

```bash
pdfinfo "<pdf>.pdf"
pdftotext "<pdf>.pdf" - | sed -n '1,200p'
```

Optional: Text seitenweise prüfen (hilft beim Erkennen von Übungsseiten vs. Infografiken):

```bash
pdftotext -f 1 -l 1 "<pdf>.pdf" -
pdftotext -f 2 -l 2 "<pdf>.pdf" -
```

Heuristik:

- Wenn eine Seite `Übung`/`Uebung` enthält: Übungsseite -> Markdown.
- Wenn eine Seite keine Übung ist (z.B. Domänen-Diagramm, User Journey, User Story Map): Vollseiten-Grafik -> PNG Asset.

### 2) Grafiken extrahieren

Es gibt zwei Fälle:

#### Fall A: Infografik als ganze Seite (empfohlen: Vollseiten-PNG)

```bash
mkdir -p "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>"
pdftoppm -png -r 200 -f <page> -l <page> -singlefile "<pdf>.pdf" \
  "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>/<slug>"
```

Das erzeugt `<slug>.png`.

#### Fall B: Eingebettete Screenshots (optional: echte Bilder extrahieren)

Liste zuerst alle Bilder (damit klar ist, ob echte Screenshots vorhanden sind):

```bash
pdfimages -list "<pdf>.pdf"
```

Extrahiere dann Bilder nach `exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>/` (oder temporär mit Prefix, falls du umbenennen willst):

```bash
mkdir -p "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>"
pdfimages -png "<pdf>.pdf" "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>/tmp"
ls -la "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>" | sed -n '1,200p'
```

Hinweise:

- `pdfimages` erzeugt typischerweise `tmp-000.png`, `tmp-001.png`, ...
- Manche PDFs enthalten zusätzliche Masken/Artefakte (kleine, einfarbige PNGs). Diese nicht referenzieren; ggf. löschen.

### 3) Bilder benennen

Ziel: sprechende, stabile Dateinamen (damit später Referenzen nicht brechen).

Da `uebungen/assets/` pro Übung in einem eigenen Step liegt, sind Kollisionen seltener; trotzdem sprechende Namen verwenden.

Empfehlung:

- `fork-create.png`, `codespace-new-with-options.png`, `claude-theme.png`, ...

Wenn du keine sprechenden Namen willst:

- nutze präfixierte Namen im Flat-Ordner, z.B. `<slug>--000.png`, `<slug>--001.png`.

### 4) Markdown schreiben (GFM)

Grundregeln:

- Text steht im Vordergrund; Screenshots sind standardmäßig eingeklappt.
- Nutze GitHub Alerts für starke Hervorhebung: `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`.
- Keine `Startpunkt: ...` Zeilen in den Übungsdateien.
- UTF-8 verwenden (Umlaute im Text beibehalten).

#### Template: eingeklappte Screenshots

```md
<details>
<summary>Screenshots anzeigen</summary>

<p>
  <a href="assets/datei.png">
    <img src="assets/datei.png" alt="Beschreibung" width="900">
  </a>
</p>

</details>
```

#### Template: Infografik (vollseitig)

```md
<details>
<summary>Informationsgrafik (anzeigen)</summary>

![Titel](assets/<topic>/<slug>.png)

</details>
```

#### Template: starker Hinweis

```md
> [!IMPORTANT]
> Kurzer, konkreter Hinweis (was genau tun/unterlassen und warum).
```

### 5) Pfade korrekt setzen

Wenn die Übungs-Markdown unter `.../uebungen/uebung-<X>-<Y>.md` liegt, sind Assets relativ unter `assets/...`.

### 6) Quality Checks

- Stimmt der Textfluss (ohne dass Bilder alles überschwemmen)?
- Sind alle Bilder korrekt verlinkt (keine 404 in der Preview)?
- Enthalten Screenshots keine Secrets/PII?
  - Falls doch: Screenshot ersetzen, zuschneiden oder manuell unkenntlich machen.

## Step-Integration (exercise-repo)

1) Lege pro Übung einen neuen Step-Ordner an: `exercise-repo/steps/<NN>-uebung-<X>-<Y>/`.
2) Lege dort `uebungen/uebung-<X>-<Y>.md` (und ggf. `uebungen/assets/...`) ab.
3) Trage den Step in `exercise-repo/meta/steps.yaml` ein:

```yaml
- id: 02-uebung-1-1
  message: added uebung-1-1 exercise
  tags:
    - uebung-1-1
```

Wichtig:

- `id` muss exakt dem Ordnernamen unter `exercise-repo/steps/` entsprechen.
- Step-Nummern sind fortlaufend ohne Buchstaben.
- Wenn du neue Steps *vorne* einfügst, musst du nachfolgende Step-Ordner und die `id`s in `steps.yaml` umnummerieren.

## Output

- Pro Übung ein Step-Overlay unter `exercise-repo/steps/<NN>-uebung-<X>-<Y>/`
- Übungs-Markdown unter `uebungen/uebung-<X>-<Y>.md`
- Optional: PNGs unter `uebungen/assets/<topic>/`
