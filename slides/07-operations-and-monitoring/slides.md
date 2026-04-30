---
layout: chapter
no: 7
background: /backgrounds/4.webp
---

# Operations & Monitoring


---
layout: intro
background: petrol
---

### *Use Cases for*
# Operations & Monitoring


---
layout: default
---

# Create Logs

- Implement Logging API
- Create logs in the right spots

<!--
Logging ist oft stiefmütterlich behandelt – zu wenig, zu viel, oder an den falschen Stellen.

Agents können bestehenden Code analysieren und gezielt Log-Statements an sinnvollen Stellen einfügen: beim Eintritt in wichtige Methoden, bei Fehlern, bei State-Änderungen.
-->

---
layout: default
---

# Interact with Operations Tools

- Common operations tools provide MCP Servers
- Explain what the dashboard is about
- Propose metrics & visualizations
- Create & update dashboards
- Execute queries in proprietary query languages
- Adjust alerts

<!--
Ops-Tools wie Grafana, Datadog, oder Prometheus haben ihre eigenen Query-Sprachen (PromQL, LogQL, etc.) – schwer zu lernen, gut für Agents.

Mit dem MCP Server kann der Agent direkt mit dem Tool interagieren: Dashboards lesen, Queries ausführen, Alerts anpassen.

"Explain what the dashboard is about" – besonders wertvoll für neue Teammitglieder oder bei Incident-Analyse.
-->

---
layout: demo
---

https://play.grafana.org/dashboards <br/>
https://github.com/grafana/mcp-grafana

<!--
[Demo: Grafana MCP Server]

play.grafana.org ist eine öffentliche Grafana-Instanz – ideal für Demo-Zwecke.

Agent verbinden, Dashboard erklären lassen, dann eine PromQL-Query generieren lassen.
-->

---
layout: default
---

# Fix Bugs Automatically

- Generate alert reports
- Use logs to locate the source of errors
- Use the log inspection to fix the bug

<!--
Der Workflow: Alert ausgelöst → Agent liest Logs → Agent identifiziert den Fehler → Agent schlägt Fix vor oder implementiert ihn direkt.

Das schließt den Kreislauf: Monitoring → Bugfix ohne menschlichen Eingriff.

Vorsicht: Automatische Fixes in Produktion brauchen Guardrails und menschliche Freigabe.
-->

---
layout: exercise
chapter: 7
exercise: 1
task: Trigger claude from issues
command: git merge uebung-6-1
---

---
layout: default
---

# Fix Database Performance Issues

- Agents can use database MCP Servers
- Use `EXPLAIN` to inspect index hits
- Adjust queries & indexes to fix performance issues

<!--
EXPLAIN / EXPLAIN ANALYZE ist das Standard-Werkzeug für Query-Performance – aber die Ausgabe ist nicht intuitiv zu lesen.

Agents können EXPLAIN-Output interpretieren und konkrete Optimierungen vorschlagen: fehlende Indexes, unnötige Full Table Scans, N+1-Probleme.

Mit Database MCP Server kann der Agent die Optimierungen sogar direkt testen.
-->

---
layout: default
---

# Fix Code Performance Issues

- Agents can use tracing data
- Identify resource-hungry functions
- Propose changes

<!--
Tracing-Daten (z.B. von Jaeger, Zipkin, oder OpenTelemetry) zeigen wo Zeit verloren geht.

Agents können Flame Graphs und Trace-Daten interpretieren und die hotspots im Code lokalisieren.

Dann: Refactoring-Vorschläge direkt im Code, z.B. Caching einbauen, ineffiziente Loops optimieren.
-->

---
layout: takeaways
chapter: 7
---

1. Agents can interact with Ops tools
2. Agents can help to find performance issues
3. Write proprietary queries in tools with Agents
4. Agents can fix bugs automatically

<!--
Operations war lange eine Blackbox für viele Developers.

MCP Server ändern das: Agents können jetzt direkt mit Ops-Tools sprechen und helfen, Probleme schneller zu lösen.
-->

