# Slide Structure

So organisieren wir Slides in diesem Repository.

## Ziele

Die Struktur der Slide-Dateien soll:

- die inhaltliche Gliederung des Workshops sichtbar machen
- Kapitel als eigenstaendige Einheiten abbilden
- eigenstaendige Themenbloecke sauber kapseln
- relative Asset-Pfade dort ermoeglichen, wo sie sinnvoll sind
- auch bei wachsender Anzahl an Slides uebersichtlich bleiben

## Grundstruktur

Die Slides sind dreistufig organisiert:

1. Root-Deck
2. Kapitel
3. Themenbloecke

Die zentrale Einstiegdatei bleibt `slides.md` im Repository-Root.

Beispiel:

```text
slides.md
slides/
  01-kapitel-name/
    slides.md
    themenblock-a/
      slides.md
    themenblock-b/
      slides.md
      assets/
        beispielbild.png

  02-kapitel-name/
    slides.md

public/
  backgrounds/
  logos/
  images/
  videos/
```

## Root-Deck

Die Datei `slides.md` im Root ist der Einstiegspunkt des gesamten Decks.

Sie enthaelt:

- das Workshop-Intro
- organisatorische oder globale Einstiegsfolien
- die Includes der Kapitel in der gewuenschten Reihenfolge

Sie enthaelt keine ausgelagerten Intro-Unterordner.

Beispiel:

```md
---
src: ./slides/01-kapitel-name/slides.md
---
```

## Kapitel

Jedes Kapitel liegt in einem eigenen Ordner unter `slides/`.

Der Kapitelordner enthaelt immer eine Datei `slides.md`.

Beispiel:

```text
slides/
  01-kapitel-name/
    slides.md
```

Die Kapiteldatei `slides/<kapitel>/slides.md` enthaelt:

- den Kapitel-Opener
- kleine Uebergangsfolien
- Intro-, Outro- und Takeaway-Folien des Kapitels
- Includes auf eigenstaendige Themenbloecke des Kapitels

Intro-, Outro- und Takeaway-Folien eines Kapitels werden nicht in eigene Dateien ausgelagert, sondern direkt in der Kapiteldatei gepflegt.

## Themenbloecke

Eigenstaendige Themenbloecke liegen in eigenen Unterordnern innerhalb eines Kapitels.

Jeder Themenblock hat einen eigenen Ordner mit einer Datei `slides.md`.

Beispiel:

```text
slides/
  01-kapitel-name/
    themenblock-a/
      slides.md
```

Ein Themenblock bekommt einen eigenen Unterordner, wenn mindestens eines der folgenden Kriterien erfuellt ist:

- der Block ist inhaltlich eigenstaendig
- der Block umfasst mehrere zusammengehoerige Slides
- der Block besitzt eigene Assets
- der Block wird voraussichtlich weiter wachsen

Kleine Einzelthemen oder kurze verbindende Folien bleiben direkt in `slides/<kapitel>/slides.md`.

## Kapitel mit nur einem Themenblock

Kapitel mit nur einem einzigen Themenblock werden nicht kuenstlich weiter untergliedert.

In diesem Fall enthaelt `slides/<kapitel>/slides.md` den eigentlichen Kapitelinhalt direkt.

Beispiel:

```text
slides/
  02-kapitel-name/
    slides.md
```

Erst wenn ein Kapitel fachlich waechst oder mehrere eigenstaendige Themenbloecke enthaelt, werden diese als Unterordner herausgezogen.

## Assets

Assets werden danach organisiert, ob sie global wiederverwendbar, lokal zu einem Kapitel oder lokal zu einem Themenblock gehoeren.

### Globale Assets

Wiederverwendete oder deckweite Assets liegen in `public/`.

Dazu gehoeren insbesondere:

- Hintergruende
- Logos
- globale Bilder
- allgemeine Videos
- mehrfach genutzte Illustrationen

Beispiele:

```text
public/backgrounds/
public/logos/
public/images/
public/videos/
```

Diese Assets werden mit root-basierten Pfaden referenziert.

Beispiel:

```md
<img src="/logos/openai.svg" />
```

### Lokale Assets

Assets, die nur zu einem Kapitel gehoeren und direkt in `slides/<kapitel>/slides.md` verwendet werden, liegen in einem lokalen `assets/`-Ordner direkt im Kapitelordner.

Beispiel:

```text
slides/
  01-kapitel-name/
    slides.md
    assets/
      kapitelbild.png
```

Diese Assets werden relativ referenziert.

Beispiel:

```md
<img src="./assets/kapitelbild.png" />
```

Assets, die nur zu einem einzelnen Themenblock gehoeren, liegen im jeweiligen Themenblock in einem lokalen `assets/`-Ordner.

Beispiel:

```text
slides/
  01-kapitel-name/
    themenblock-b/
      slides.md
      assets/
        beispielbild.png
```

Diese Assets werden relativ referenziert.

Beispiel:

```md
<img src="./assets/beispielbild.png" />
```

## Frontmatter-Optionen

Für globale Darstellungsoptionen einzelner Slides können zusätzliche Frontmatter-Keys gesetzt werden.

### `slideNumber`

Steuert die Sichtbarkeit der globalen Seitenzahl pro Slide.

- nicht gesetzt oder `true`: Seitenzahl anzeigen
- `false`: Seitenzahl auf dieser Slide ausblenden

Beispiel:

```yaml
---
slideNumber: false
---
```

### `footerDir`

Steuert die Anordnung von Footer-Link und Seitenzahl.

- nicht gesetzt oder `default`: Link links, Seitenzahl rechts
- `reverse`: Seitenzahl links, Link rechts

Beispiele:

```yaml
---
footerLink: https://example.com/source
footerDir: reverse
---
```

Auch wenn `slideNumber: false` gesetzt ist, wirkt `footerDir` auf die Position des Links:

```yaml
---
slideNumber: false
footerLink: https://example.com/source
footerDir: reverse
---
```

Ergebnis: Keine Seitenzahl, Link steht rechts.

### `footerLink`

Zeigt einen oder mehrere Links im globalen Footer an. Der Linktext ist immer die vollständige URL.
Bei mehreren Links werden die URLs untereinander angezeigt.

Beispiele:

```yaml
---
footerLink: https://example.com/source
---
```

```yaml
---
footerLink:
  - https://example.com/source
  - https://github.com/example/repo
---
```

### `footerLinkColor`

Farbe des Footer-Links. Wenn nicht gesetzt, wird die Farbe automatisch aus dem Slide-Hintergrund abgeleitet.

Erlaubte Werte: `petrol`, `apricot`, `white`, `black`, `primary`, `accent`.

### `slideNumberColor`

Farbe der Seitenzahl. Wenn nicht gesetzt, wird die Farbe automatisch aus dem Slide-Hintergrund abgeleitet.

Erlaubte Werte: `petrol`, `apricot`, `white`, `black`, `primary`, `accent`.

Beispiel (z. B. für Sidebar-Slides mit geteiltem Hintergrund):

```yaml
---
footerLinkColor: white
slideNumberColor: petrol
---
```

Lokale Daten oder Hilfsdateien, die ausschliesslich zu einem Themenblock gehoeren, liegen ebenfalls direkt im Themenblockordner, zum Beispiel in `data/`.

Beispiel:

```text
slides/
  01-kapitel-name/
    themenblock-b/
      slides.md
      data/
        beispieldaten.ts
```

Es werden keine kapiteluebergreifenden Sammelordner fuer themenblockspezifische Assets oder Daten angelegt.

## Namenskonventionen

Fuer die Dateibenennung gelten folgende Regeln:

- Einstiegdateien heissen immer `slides.md`
- Kapitelordner beginnen mit einer numerischen Reihenfolge
- Kapitelordner verwenden sprechende Slugs
- Themenblock-Ordner verwenden ebenfalls sprechende Slugs

Beispiele:

```text
slides/01-kapitel-name/
slides/02-kapitel-name/
slides/01-kapitel-name/themenblock-a/
slides/01-kapitel-name/themenblock-b/
```

Es werden keine alternierenden Dateinamen wie `index.md`, `chapter.md` oder `topic.md` verwendet.

## Includes

Includes folgen immer der inhaltlichen Hierarchie:

- Root-`slides.md` inkludiert Kapitel
- Kapitel-`slides.md` inkludiert eigenstaendige Themenbloecke

Beispiel im Root:

```md
---
src: ./slides/01-kapitel-name/slides.md
---
```

Beispiel im Kapitel:

```md
---
src: ./themenblock-a/slides.md
---
```

## Leitlinien fuer die Aufteilung

Bei der Entscheidung, ob Inhalt direkt in einer Kapiteldatei bleibt oder in einen Themenblock ausgelagert wird, gilt:

- Intro-, Outro- und Takeaway-Folien bleiben in der uebergeordneten Datei
- eigenstaendige Inhaltsbloecke werden ausgelagert
- kleine Kapitel bleiben flach
- zusaetzliche Struktur wird nur eingefuehrt, wenn sie die Orientierung verbessert

Die Struktur soll die fachliche Gliederung sichtbar machen, nicht kuenstlich Tiefe erzeugen.

## Zusammenfassung

Die Organisation folgt diesen einfachen Regeln:

- `slides.md` im Root ist der Einstiegspunkt des Decks
- jedes Kapitel hat einen eigenen Ordner mit `slides.md`
- eigenstaendige Themenbloecke liegen in eigenen Unterordnern mit `slides.md`
- Intros, Outros und Takeaways bleiben in der uebergeordneten Datei
- kleine Kapitel mit nur einem Themenblock bleiben flach
- globale Assets liegen in `public/`
- themenblockspezifische Assets liegen lokal im jeweiligen `assets/`-Ordner
