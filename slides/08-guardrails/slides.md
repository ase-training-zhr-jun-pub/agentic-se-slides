---
layout: chapter
no: 8
background: /backgrounds/4.webp
---

# Guardrails & Qualitätsprüfung


---
src: ./guardrails/slides.md
---

---
src: ./lethal-trifecta/slides.md
---

---
src: ./sandboxing/slides.md
---

---
layout: takeaways
background: petrol
chapter: 8
---

1. Architekturvorgaben ohne LLM testbar und im CI verankern — nicht nur Empfehlung
2. Fitness Functions: ausführbar, reproduzierbar, blockierend
3. Java: ArchUnit; TypeScript: dependency-cruiser / ts-arch; sprachübergreifend: Semgrep
4. Jede Entscheidung sucht sich das passende Werkzeug — Test bleibt das Prinzip
5. Lethal Trifecta: private Daten + untrusted Input + externe Kommunikation — nie alle drei zugleich (Rule of Two)
6. Sandboxes + Network Policies adressieren zusammen alle drei Trifecta-Elemente
