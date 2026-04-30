# Cheatsheet

## Text extrahieren

```bash
pdfinfo "<pdf>.pdf"
pdftotext "<pdf>.pdf" - | sed -n '1,200p'
```

## Text seitenweise prüfen

```bash
pdftotext -f 1 -l 1 "<pdf>.pdf" -
pdftotext -f 2 -l 2 "<pdf>.pdf" -
```

## Bilder im PDF finden

```bash
pdfimages -list "<pdf>.pdf"
```

## Vollseiten-Grafik rendern (PNG)

```bash
mkdir -p "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>"
pdftoppm -png -r 200 -f <page> -l <page> -singlefile "<pdf>.pdf" \
  "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>/<slug>"
```

## Eingebettete Bilder extrahieren (PNG)

```bash
mkdir -p "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>"
pdfimages -png "<pdf>.pdf" "exercise-repo/steps/<NN>-uebung-<X>-<Y>/uebungen/assets/<topic>/tmp"
```

## GFM Alerts

```md
> [!NOTE]
> Info

> [!TIP]
> Tipp

> [!IMPORTANT]
> Wichtig

> [!WARNING]
> Warnung
```

## Bilder einklappen (Preview freundlich)

```md
<details>
<summary>Screenshots anzeigen</summary>

<p><a href="assets/datei.png"><img src="assets/datei.png" alt="Beschreibung" width="900"></a></p>

</details>
```
