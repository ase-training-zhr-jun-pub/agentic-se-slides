# Agentic Software Engineering Workshop

Dieses Repository enthält Übungen für den Agentic Software Engineering Workshop.
Bevor es losgeht, forkst du dieses Repository und startest **in deinem Fork** einen Codespace.
Im Codespace arbeitest du in einer isolierten, sicheren Umgebung mit deinem KI-Agenten - und wir starten alle mit denselben Voraussetzungen.

> [!NOTE]
> Die Screenshots sind eingeklappt, damit der Text in der Markdown-Vorschau im Vordergrund bleibt. Klicke auf den jeweiligen Block, um sie zu öffnen.

## Repo forken

Anleitung, wie du das Repo mit den Übungen in deinen GitHub-Account forkst.

1. Teile dem Trainer deinen GitHub-Username mit.
2. Einladung öffnen.
3. Einladung akzeptieren.
4. Repo forken.
5. Beim Fork: "Copy the main branch only" abwählen und "Create fork" klicken.

> [!IMPORTANT]
> Deaktiviere beim Fork unbedingt "Copy the main branch only" - sonst fehlen dir später Übungs-Branches.

<details>
<summary>Screenshots anzeigen</summary>

<p><a href="uebungen/assets/invite-email.png"><img src="uebungen/assets/invite-email.png" alt="Einladung öffnen" width="900"></a></p>

<p><a href="uebungen/assets/invite-accept.png"><img src="uebungen/assets/invite-accept.png" alt="Einladung akzeptieren" width="900"></a></p>

<p><a href="uebungen/assets/repo-fork-button.png"><img src="uebungen/assets/repo-fork-button.png" alt="Fork Button" width="900"></a></p>

<p><a href="uebungen/assets/fork-create.png"><img src="uebungen/assets/fork-create.png" alt="Fork erstellen" width="900"></a></p>

</details>

## Codespace erzeugen

Öffne das Repository auf GitHub und erstelle dir einen Codespace. Folge dafür der Bilderanleitung.

> [!IMPORTANT]
> Setze `AWS_BEARER_TOKEN_BEDROCK` als Codespace Secret, damit du Zugriff auf Claude Code bekommst.

1. Klicke auf den "Code" Button.
2. Gehe in den "Codespaces" Tab.
3. Klicke auf die 3 Punkte.
4. Klicke auf "New with options".
5. Trage den `AWS_BEARER_TOKEN_BEDROCK` ein. Du bekommst ihn von den Trainern.
6. Erstelle den Codespace.

<details>
<summary>Screenshots anzeigen</summary>

<p><a href="uebungen/assets/codespace-code-button.png"><img src="uebungen/assets/codespace-code-button.png" alt="Code Button" width="900"></a></p>

<p><a href="uebungen/assets/codespace-tab.png"><img src="uebungen/assets/codespace-tab.png" alt="Codespaces Tab" width="900"></a></p>

<p><a href="uebungen/assets/codespace-menu-dots.png"><img src="uebungen/assets/codespace-menu-dots.png" alt="Menü mit drei Punkten" width="900"></a></p>

<p><a href="uebungen/assets/codespace-new-with-options.png"><img src="uebungen/assets/codespace-new-with-options.png" alt="New with options" width="900"></a></p>

<p><a href="uebungen/assets/codespace-options-api-key.png"><img src="uebungen/assets/codespace-options-api-key.png" alt="API Key eintragen und Codespace erstellen" width="900"></a></p>

</details>

### Troubleshooting: Angeblich kein Internet

> [!TIP]
> Wenn GitHub im Codespace "offline" meldet: Erlaube "Tracking-Cookies" und schalte eventuelle Ad-Blocker aus.

<details>
<summary>Screenshot anzeigen</summary>

<p><a href="uebungen/assets/codespace-offline-troubleshooting.png"><img src="uebungen/assets/codespace-offline-troubleshooting.png" alt="Angeblich offline" width="900"></a></p>

</details>

## Claude Code einrichten

1. Öffne Claude Code über die Terminal-Integration.
2. Wähle ein Theme aus.
3. Den API-Key für Claude Code benutzen.
4. Wähle ein Terminal-Setup (am besten das empfohlene; das lässt sich später bei Bedarf ändern).
5. Bestätige, dass du dem Ordner vertraust.
6. Claude Code benutzen.

> [!IMPORTANT]
> Prüfe, dass Claude Code den API-Key über die Environment-Variable nutzt ("Overrides (via env)").

<details>
<summary>Screenshots anzeigen</summary>

<p><a href="uebungen/assets/claude-open-terminal-integration.png"><img src="uebungen/assets/claude-open-terminal-integration.png" alt="Claude Code öffnen" width="900"></a></p>

<p><a href="uebungen/assets/claude-theme.png"><img src="uebungen/assets/claude-theme.png" alt="Theme auswählen" width="900"></a></p>

<p><a href="uebungen/assets/claude-api-key-prompt.png"><img src="uebungen/assets/claude-api-key-prompt.png" alt="API Key Prompt" width="900"></a></p>

<p><a href="uebungen/assets/claude-terminal-setup.png"><img src="uebungen/assets/claude-terminal-setup.png" alt="Terminal Setup" width="900"></a></p>

<p><a href="uebungen/assets/claude-trust-folder.png"><img src="uebungen/assets/claude-trust-folder.png" alt="Ordnervertrauen bestätigen" width="900"></a></p>

<p><a href="uebungen/assets/claude-ready.png"><img src="uebungen/assets/claude-ready.png" alt="Claude Code bereit" width="900"></a></p>

</details>
