---
layout: intro
background: petrol
---

### _Appendix —_

# Sandboxing

---

# Warum Sandboxing?

- Der Kochtopf als Falle
- Agents werden autonomer, wir profitieren davon aber wollen die Autonomie steuern
- Lokal Zugriff auf ALLE Dateien, ssh keys, Tokens, Cookies.. 🥸
- Aber: Overhead (je nach persönlicher Perspektive)

---

# Claude Sandbox

- Versuche unbefriedigend: Config im Workdir, Verwirrung, OS Integration ging nicht
- Herstellerabhängig
- Erfordert für mich zu viel _Believe and Trust_

---

# Container

- Reiner Container für Agent
- oder Dev-Container
- lightweight
- Konfiguration von Hand, wenig Konventionen
- Problem Docker-in-Docker
  - sysbox-runc Runtime kann das lösen
- Cloud-Native
- Angeblich Ausbrüche des Agents erfolgt

---

# Docker Sandbox

- Simpel zu installieren für lokales Setup
- early access, aber kommerziell (derzeit gratis)
- Micro-VM, kein Container
  - Start ist Docker-Image
  - Dann aber vollwertige Disk
  - Braucht mehr Disk-Space
  - Updates nur in der VM (oder re-create)
- Privater DockerD in der Sandbox
- LLM Proxy für Auth und Audit/Logging
- Pfade bleiben gleich
- => eingebaute Konventionen
