# Preview Deployments

Dieses Repo erzeugt für Pull Requests automatisch Preview-Deployments auf **Cloudflare Pages**. Die Logik liegt in `.github/workflows/cloudflare-pages-preview.yml`.

## Überblick

- Jeder Pull Request bekommt eine eigene Cloudflare-Pages-Preview-Branch im Format `pr-<PR-Nummer>`.
- Der Workflow baut den Slidev-Deck-Stand des PR-Head-Commits und deployed `dist/` nach Cloudflare Pages.
- Nach erfolgreichem Deployment schreibt der Workflow die Preview-URL als Kommentar in den Pull Request.
- Beim Schließen des Pull Requests werden die zugehörigen Cloudflare-Preview-Deployments gelöscht und der Kommentar wird aktualisiert.

## Warum `pull_request_target`?

Der Workflow verwendet `pull_request_target`, nicht `pull_request`.

Das ist nötig, weil Pull Requests bei uns aus Forks kommen und der Workflow Zugriff auf Repository-Secrets braucht:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `SLIDEV_THEME_DEPLOY_KEY`

Bei normalen `pull_request`-Workflows stehen diese Secrets für Fork-PRs nicht zur Verfügung. `pull_request_target` läuft im Kontext des Ziel-Repositories und kann daher Secrets verwenden.

Wichtig: Der Workflow checkt danach explizit den PR-Head aus:

```yaml
repository: ${{ github.event.pull_request.head.repo.full_name }}
ref: ${{ github.event.pull_request.head.sha }}
```

Damit wird der tatsächlich vorgeschlagene PR-Code gebaut, nicht der Stand von `master`.

## Sicherheitsannahme

Dieser Workflow führt PR-Code mit verfügbaren Secrets aus. Das ist bewusst so konfiguriert, weil das Repository privat ist und PRs nur von vertrauenswürdigen Personen aus dem Unternehmen kommen.

Falls sich diese Annahme ändert, sollte der Workflow nicht mehr automatisch für alle Fork-PRs deployen. Dann wären mindestens ein Label-Gate oder ein zweistufiger Build/Deploy-Prozess nötig.

## Deploy-Job

Der Job `deploy-preview` läuft für alle PR-Actions außer `closed`.

Ablauf:

1. Checkout des PR-Head-Commits.
2. Setup von Node.js 22 mit npm-Cache.
3. Einrichtung des SSH Deploy Keys für das private Theme-Repo.
4. `npm ci`.
5. `npm run build`.
6. Deployment von `dist/` nach Cloudflare Pages per `cloudflare/wrangler-action@v3`.
7. Erstellen oder Aktualisieren eines PR-Kommentars mit der Preview-URL.

Die Cloudflare-Branch ist:

```text
pr-<PR-Nummer>
```

Der Deployment-Command ist sinngemäß:

```bash
wrangler pages deploy dist \
  --project-name="$CLOUDFLARE_PAGES_PROJECT_NAME" \
  --branch="pr-<PR-Nummer>" \
  --commit-hash="<PR-HEAD-SHA>" \
  --commit-message="PR #<PR-Nummer> preview"
```

## PR-Kommentar

Der Workflow verwendet einen Marker, damit pro PR nur ein Preview-Kommentar gepflegt wird:

```html
<!-- cloudflare-pages-preview -->
```

Beim nächsten Deployment sucht der Workflow nach einem vorhandenen Kommentar mit diesem Marker und aktualisiert ihn. Falls kein Kommentar existiert, wird ein neuer Kommentar erstellt.

## Theme-Dependency per SSH Deploy Key

Das Slidev-Theme wird als GitHub-Dependency installiert:

```json
"slidev-theme-innoq": "github:innoq/slidev-theme-innoq#v1.0.0"
```

In `package-lock.json` ist diese Dependency als SSH-URL aufgelöst:

```text
git+ssh://git@github.com/innoq/slidev-theme-innoq.git#...
```

Deshalb braucht `npm ci` im GitHub Actions Runner einen SSH-Key mit Leserecht auf `innoq/slidev-theme-innoq`.

### Deploy Key Erzeugen

Einen neuen Key lokal erzeugen:

```bash
ssh-keygen -t ed25519 -C "agentic-se-slides-preview-theme-readonly" -f slidev-theme-innoq-deploy-key
```

Dabei entstehen zwei Dateien:

- `slidev-theme-innoq-deploy-key`: privater Schlüssel, niemals committen
- `slidev-theme-innoq-deploy-key.pub`: öffentlicher Schlüssel

### Public Key Im Theme-Repo Hinterlegen

Im Repo `innoq/slidev-theme-innoq`:

1. `Settings` öffnen.
2. `Deploy keys` öffnen.
3. `Add deploy key` wählen.
4. Inhalt von `slidev-theme-innoq-deploy-key.pub` einfügen.
5. `Allow write access` deaktiviert lassen.
6. Key speichern.

Der Deploy Key sollte nur Read-only-Zugriff auf das Theme-Repo haben.

### Private Key Im Slides-Repo Hinterlegen

Im Repo `innoq/agentic-se-slides`:

1. `Settings` öffnen.
2. `Secrets and variables` öffnen.
3. `Actions` öffnen.
4. `New repository secret` wählen.
5. Name: `SLIDEV_THEME_DEPLOY_KEY`.
6. Value: vollständiger Inhalt von `slidev-theme-innoq-deploy-key`.

Der Workflow schreibt diesen Secret zur Laufzeit nach `~/.ssh/slidev-theme-innoq`, setzt `chmod 600`, ergänzt `github.com` zu `known_hosts` und konfiguriert SSH so, dass GitHub-Zugriffe diesen Key verwenden.

## Cloudflare-Konfiguration

Der Workflow erwartet folgende Repository-Secrets und Variables im Repo `innoq/agentic-se-slides`.

Secrets:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token mit Zugriff auf das Pages-Projekt.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID.
- `SLIDEV_THEME_DEPLOY_KEY`: privater SSH Deploy Key für `innoq/slidev-theme-innoq`.

Variables:

- `CLOUDFLARE_PAGES_PROJECT_NAME`: Name des Cloudflare Pages Projekts.

## Cleanup-Job

Der Job `cleanup-preview` läuft, wenn ein Pull Request geschlossen wird.

Ablauf:

1. Wrangler wird global installiert.
2. Preview-Deployments des Cloudflare Pages Projekts werden als JSON gelistet.
3. Die Liste wird auf Deployments mit Branch `pr-<PR-Nummer>` gefiltert.
4. Alle passenden Deployment IDs werden mit `wrangler pages deployment delete ... --force` gelöscht.
5. Der PR-Kommentar wird auf `Cloudflare Pages Preview removed.` aktualisiert.

Das Löschen nutzt `--force`, weil Cloudflare Deployments mit aktivem Alias sonst nicht ohne Weiteres löschen kann.

## Troubleshooting

### `SLIDEV_THEME_DEPLOY_KEY secret is not configured.`

Das Secret fehlt im Repo `innoq/agentic-se-slides` oder ist nicht für Actions verfügbar.

Prüfen:

- Repository Secret heißt exakt `SLIDEV_THEME_DEPLOY_KEY`.
- Secret ist im Ziel-Repo hinterlegt, nicht im Theme-Repo.
- Workflow läuft im erwarteten Repository-Kontext.

### `Permission denied (publickey)` Bei `npm ci`

Der Runner kann das Theme-Repo nicht per SSH lesen.

Prüfen:

- Public Key ist als Deploy Key in `innoq/slidev-theme-innoq` hinterlegt.
- Private Key ist vollständig und unverändert als `SLIDEV_THEME_DEPLOY_KEY` im Slides-Repo hinterlegt.
- Deploy Key hat kein abweichendes Format oder zusätzliche führende/abschließende Zeichen.
- `Allow write access` ist nicht nötig.

### Kein Preview-Kommentar Im PR

Prüfen:

- Der Deploy-Schritt war erfolgreich.
- Der Workflow hat `issues: write` und `pull-requests: write` Permissions.
- Es gibt keinen Fehler im `actions/github-script`-Schritt.

### Preview Wird Nach PR-Schließung Nicht Gelöscht

Prüfen:

- `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID` sind korrekt.
- `CLOUDFLARE_PAGES_PROJECT_NAME` stimmt mit dem Cloudflare-Projekt überein.
- Die Deployment-Branch in Cloudflare heißt `pr-<PR-Nummer>`.
- Der Cleanup-Job wurde durch die PR-Action `closed` ausgelöst.
