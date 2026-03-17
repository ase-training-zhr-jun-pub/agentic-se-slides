---
layout: intro
background: petrol
---

### *Let's understand*
# Large Language Models

---
clicks: 6
---

# Autoregressive generation

<TokenPrediction :steps="[
  { token: 'Hello',  candidates: [[' world', 0.35], [' there', 0.28], [',', 0.20], ['!', 0.12]] },
  { token: ' world', candidates: [[',', 0.42], ['!', 0.25], ['.', 0.18], [' of', 0.10]] },
  { token: ',',      candidates: [[' how', 0.38], [' I', 0.22], [' my', 0.15], [' welcome', 0.12]] },
  { token: ' how',   candidates: [[' are', 0.45], [' do', 0.25], [' is', 0.18]] },
  { token: ' are',   candidates: [[' you', 0.62], [' we', 0.15], [' they', 0.12], [' things', 0.08]] },
  { token: ' you',   candidates: [['?', 0.55], ['!', 0.20], [' doing', 0.15], [' today', 0.08]] },
  { token: '?',      candidates: [['<|end|>', 0.85], [' I', 0.06], ['  \n', 0.04], [' Thank', 0.03]] },
]" />

---
# Watt für ein <Token value="Token" /> ist das?

---

# The Context Window

<ContextWindowAnimation h-380px text-xs leading-tight :tokens="tokens" :speed="12" :prefill="500" />

<script setup>
  import { contextWindowTokens as tokens } from '../data/context-window-tokens.ts'
</script>
