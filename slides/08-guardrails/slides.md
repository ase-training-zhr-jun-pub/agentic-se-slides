---
layout: chapter
no: 8
background: /backgrounds/4.webp
---

# Guardrails & Quality Assurance


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

1. Make architecture rules testable without an LLM and anchor them in CI — not just a recommendation
2. Fitness functions: executable, reproducible, blocking
3. Java: ArchUnit; TypeScript: dependency-cruiser / ts-arch; cross-language: Semgrep
4. Every decision picks its own tool — testing remains the principle
5. Lethal Trifecta: private data + untrusted input + external communication — never all three at once (Rule of Two)
6. Sandboxes + network policies together address all three trifecta elements
