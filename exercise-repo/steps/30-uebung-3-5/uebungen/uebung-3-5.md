# Übung 3-5: Planning & Task Breakdown

Nachdem wir gesehen haben, dass Vibe-Coding auf diese Art und Weise Glücksspiel ist und das Ergebnis alleine durch die Menge an Code kaum reviewbar scheint, kommen wir zum Schluss, dass Anforderungen alleine mit Agenten nicht ausreichen. Wir müssen weiterhin richtiges Software Engineering betreiben, um zuverlässig zu guten Ergebnissen zu kommen.

Wir schmeißen also die Ergebnisse des Vibe-Codings weg und fangen noch einmal neu an.

Im richtigen Software Engineering würden wir uns erst einmal überlegen, wie wir etwas umsetzen wollen und was dafür sinnvolle Aufgabenpakete sind. Das machen wir jetzt auch.

Wir möchten Story 016 (Sprint) umsetzen und fangen mit einem Planning & Task Breakdown an. Unterstützend dafür gibt es einen Command `/plan`.

## Aufgabe

1. Wechsle zurück auf main.
2. Starte Claude Code neu, ohne das `--dangerously-skip-permissions`-Flag.
3. Sieh dir Story 016 an und plane mit dem Agenten zusammen, wie die Story umgesetzt werden soll. Breche die Story dann in sinnvolle Subtasks herunter, die wieder als Tickets in den Backlog gelegt werden. Jeder Subtask soll eine reviewbare Einheit an Code werden.
4. Nutze dafür den `/plan` Command.
5. Committe die neuen Tickets.

## Hinweis

Nutzung des Plan Commands: Nutze den Command so: `/plan @userstory`. Der Command plant dann mit dir zusammen die Story und erstellt automatisch am Ende die Subtasks an der richtigen Stelle.
