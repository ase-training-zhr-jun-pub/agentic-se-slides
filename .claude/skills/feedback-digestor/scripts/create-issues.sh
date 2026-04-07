#!/bin/bash
# create-issues.sh — Erstellt GitHub Issues aus einer JSON-Datei und ordnet sie einem Projekt zu.
#
# Usage: bash create-issues.sh <issues.json>
#
# Die JSON-Datei muss ein Array von Issue-Objekten enthalten:
# [
#   {
#     "title": "Issue-Titel (ASCII, keine Umlaute)",
#     "body": "Markdown-Body mit ## Beschreibung etc.",
#     "labels": ["feedback:fix"],
#     "size": "M",
#     "priority": "medium"
#   }
# ]
#
# Labels werden automatisch angelegt falls sie nicht existieren.
# Jedes Issue wird dem Projekt hinzugefügt und die Fields Status, Size, Priority gesetzt.

# ── Konfiguration (hartcodiert) ───────────────────────────────────────────────

REPO="innoq/agentic-se-slides"
PROJECT_ID="PVT_kwDOAAXTmc4BQvjn"
PROJECT_NUM=15
OWNER="innoq"

STATUS_FIELD="PVTSSF_lADOAAXTmc4BQvjnzg-xlrE"
BACKLOG_OPT="f75ad846"
SIZE_FIELD="PVTSSF_lADOAAXTmc4BQvjnzg-xl1E"
PRIO_FIELD="PVTSSF_lADOAAXTmc4BQvjnzg-xvLA"

declare -A SIZE_OPTS=([XS]="6c6483d2" [S]="f784b110" [M]="7515a9f1" [L]="817d0097" [XL]="db339eb2")
declare -A PRIO_OPTS=([low]="e52086ce" [medium]="383f94d5" [high]="79077b0c" [urgent]="73a611e8")

# Label-Definitionen: name → "description|color"
declare -A LABEL_DEFS=(
  ["feedback:fix"]="Tippfehler, faktischer Fehler, Korrektur|d73a4a"
  ["feedback:inhalt"]="Inhaltliche Aenderung, Ergaenzung, Streichung|0075ca"
  ["feedback:struktur"]="Didaktik, Aufbau, Reihenfolge, Ablauf|7057ff"
  ["feedback:design"]="Visuelles, Layout, Typografie|e6b422"
  ["feedback:uebung"]="Uebungen betreffend|a2eeef"
  ["feedback:setup"]="Technisches Setup, Infrastruktur, Tooling|5319e7"
  ["feedback:material"]="Trainingsmaterial, Handouts, Begleitdokumentation|008672"
  ["exercise"]="Feedback bezieht sich auf Uebungen|c5def5"
  ["slides"]="Feedback bezieht sich auf Folien|fbca04"
)

# ── Preflight-Checks ─────────────────────────────────────────────────────────

for cmd in gh jq; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "Fehler: '$cmd' ist nicht installiert."
    exit 1
  fi
done

if ! gh auth status &>/dev/null; then
  echo "Fehler: Nicht bei GitHub authentifiziert. Bitte 'gh auth login' ausfuehren."
  exit 1
fi

# ── Validierung ───────────────────────────────────────────────────────────────

INPUT_FILE="$1"

if [[ -z "$INPUT_FILE" ]]; then
  echo "Usage: bash create-issues.sh <issues.json>"
  exit 1
fi

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Fehler: Datei '$INPUT_FILE' nicht gefunden."
  exit 1
fi

ISSUE_COUNT=$(jq length "$INPUT_FILE")
if [[ "$ISSUE_COUNT" -eq 0 ]]; then
  echo "Fehler: JSON-Array ist leer."
  exit 1
fi

echo "=== $ISSUE_COUNT Issues aus $INPUT_FILE ==="

# ── Temp-Verzeichnis ──────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_TMP="$SCRIPT_DIR/../.tmp"
mkdir -p "$PROJECT_TMP"
TMPDIR=$(mktemp -d "$PROJECT_TMP/run.XXXXXX")
trap "rm -rf $TMPDIR" EXIT

# ── Labels sicherstellen ─────────────────────────────────────────────────────

echo ""
echo "--- Labels pruefen ---"

# Alle Labels aus der JSON sammeln (defensiv: Issues ohne labels-Array ueberspringen)
NEEDED_LABELS=$(jq -r '.[] | select(.labels != null and (.labels | length) > 0) | .labels[]' "$INPUT_FILE" | sort -u)

for label in $NEEDED_LABELS; do
  if [[ -n "${LABEL_DEFS[$label]}" ]]; then
    IFS='|' read -r desc color <<< "${LABEL_DEFS[$label]}"
    gh label create "$label" --description "$desc" --color "$color" --repo "$REPO" 2>/dev/null && echo "  + $label" || echo "  = $label (existiert)"
  else
    # Unbekanntes Label — mit Default-Farbe anlegen
    gh label create "$label" --description "" --color "ededed" --repo "$REPO" 2>/dev/null && echo "  + $label (neu, Default-Farbe)" || echo "  = $label (existiert)"
  fi
done

# ── Issues erstellen ──────────────────────────────────────────────────────────

echo ""
echo "--- Issues erstellen ---"

CREATED=0
FAILED=0

for i in $(seq 0 $((ISSUE_COUNT - 1))); do
  title=$(jq -r ".[$i].title" "$INPUT_FILE")
  body=$(jq -r ".[$i].body" "$INPUT_FILE")
  size=$(jq -r ".[$i].size" "$INPUT_FILE")
  prio=$(jq -r ".[$i].priority" "$INPUT_FILE")

  # Body in eigene Temp-Datei pro Issue (hilfreich fuer Debugging und spaetere Parallelisierung)
  BODY_FILE="$TMPDIR/body-${i}.md"
  echo "$body" > "$BODY_FILE"

  # gh issue create Befehl zusammenbauen
  cmd=(gh issue create --repo "$REPO" --title "$title" --body-file "$BODY_FILE")

  # Labels hinzufuegen
  label_count=$(jq -r ".[$i].labels | length" "$INPUT_FILE")
  for j in $(seq 0 $((label_count - 1))); do
    label=$(jq -r ".[$i].labels[$j]" "$INPUT_FILE")
    cmd+=(--label "$label")
  done

  # Issue erstellen
  output=$("${cmd[@]}" 2>&1)
  if [[ $? -ne 0 ]]; then
    echo "FAIL: $title — $output"
    FAILED=$((FAILED + 1))
    continue
  fi

  url=$(echo "$output" | grep -oE 'https://github.com/[^ ]+' | head -1)
  if [[ -z "$url" ]]; then
    echo "FAIL (no URL): $title — $output"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Zum Projekt hinzufuegen
  BOARD_OK=true
  item_id=$(gh project item-add "$PROJECT_NUM" --owner "$OWNER" --url "$url" --format json 2>/dev/null | jq -r '.id') || true

  if [[ -z "$item_id" || "$item_id" == "null" ]]; then
    echo "  WARN: Issue erstellt ($url), aber konnte nicht zum Board hinzugefuegt werden."
    BOARD_OK=false
  fi

  if [[ "$BOARD_OK" == true ]]; then
    # Status → Backlog
    if ! gh project item-edit --project-id "$PROJECT_ID" --id "$item_id" \
      --field-id "$STATUS_FIELD" --single-select-option-id "$BACKLOG_OPT" 2>/dev/null; then
      echo "  WARN: Status fuer '$title' konnte nicht gesetzt werden."
    fi

    # Size setzen
    if [[ -n "${SIZE_OPTS[$size]}" ]]; then
      if ! gh project item-edit --project-id "$PROJECT_ID" --id "$item_id" \
        --field-id "$SIZE_FIELD" --single-select-option-id "${SIZE_OPTS[$size]}" 2>/dev/null; then
        echo "  WARN: Size fuer '$title' konnte nicht gesetzt werden."
      fi
    fi

    # Priority setzen
    if [[ -n "${PRIO_OPTS[$prio]}" ]]; then
      if ! gh project item-edit --project-id "$PROJECT_ID" --id "$item_id" \
        --field-id "$PRIO_FIELD" --single-select-option-id "${PRIO_OPTS[$prio]}" 2>/dev/null; then
        echo "  WARN: Priority fuer '$title' konnte nicht gesetzt werden."
      fi
    fi
  fi

  CREATED=$((CREATED + 1))
  echo "[$CREATED/$ISSUE_COUNT] $title -> $url"
done

# ── Zusammenfassung ───────────────────────────────────────────────────────────

echo ""
echo "=== Fertig ==="
echo "Erstellt: $CREATED"
echo "Fehlgeschlagen: $FAILED"
echo "Board: https://github.com/orgs/innoq/projects/15"
