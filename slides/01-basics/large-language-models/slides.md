---
layout: intro
background: petrol
---

### *Let's understand*
# Large Language Models

<!-- Master reference: Chapter 1 / Slide 014 -->

---

# LLMs are *Calculators* for <br /> the next best Token

<div class="grid cols-3 items-center justify-center gap-8 mt-12">
  <div text-sm leading-tight class="flex flex-wrap gap-1">
        <Token value="You" />
        <Token value=" are" />
        <Token value=" a" />
        <Token value=" help" />
        <Token value="ful" />
        <Token value="assistant" />
        <Token value="." />
        <Token value=" Be" />
        <Token value=" conc" />
        <Token value="ise" />
        <Token value=" and" />
  </div>
  <v-switch unmount>
      <template #0><div class="bg-black text-white px-16 py-12 text-4xl font-bold rounded">LLM</div></template>
      <template #1><img src="./assets/llm-math-meme.gif" /></template>
      <template #2>
          <div class="font-serif italic leading-tight text-2xl b-petrol b-3 p-2">
            <span>h ＝ Transformer(</span>
            <span block ml-10 tracking-wide>
                <span text-apricot>i<sub>1</sub></span>,
                <span text-apricot>i<sub>2</sub></span>,
                <span text-apricot>i<sub>3</sub></span>, …
                <span text-apricot>i<sub>n</sub></span>;
            </span>
            <span block ml-10 tracking-wide>
                <span text-green-400>p<sub>1</sub></span>,
                <span text-green-400>p<sub>2</sub></span>,
                <span text-green-400>p<sub>3</sub></span>, …
                <span text-green-400>p<sub>n</sub></span>
            </span>
            <span>)</span>
          </div>
      </template>
  </v-switch>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2"><Token value=" clear" /> 0.6</div>
    <div class="flex items-center gap-2"><Token value=" give" /> 0.25</div>
    <div class="flex items-center gap-2"><Token value=" be" /> 0.02</div>
  </div>
  <div relative text-center>Input Sequence<div class="absolute -right-6 top-0 text-2xl">→</div></div>
  <div relative text-center>Linear algebra<div class="absolute -right-6 top-0 text-2xl">→</div></div>
  <div relative text-center>Output<br/>Probability</div>
</div>

<!-- Master reference: Chapter 1 / Slide 015 -->

---
layout: center
---

## The initial *input sequence* is <br/> typically called a *Prompt*

<!-- Master reference: Chapter 1 / Slide 018 -->

---
layout: center
background: petrol
---

<h1 text-accent> Tokens <span text-white>≠</span> Words</h1>

<!-- Master reference: Chapter 1 / Slide 019 -->

---
layout: demo
link: https://tiktokenizer.vercel.app/?model=gpt2
---

<!-- Master reference: Chapter 1 / Slide 020 -->

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

<!-- Master reference: Chapter 1 / Slides 021-025 -->

---

## Constrained Creativity: Steering Token Choice

**1. Top-k**
- "Choose from the **k most likely tokens**"
- Balances output:
  - **Low k** → focused, deterministic
  - **High k** → more creative, but potentially less coherent

**2. Top-p (Nucleus Sampling)**
- "Choose from tokens whose **cumulative probability ≥ p**"
- Dynamic token pool based on uncertainty
- More adaptive than Top-k: token count can vary depending on the distribution

<!-- Master reference: Chapter 1 / Slide 026 -->

---

**3. Temperature**
- "Scales token probabilities before sampling"
- Controls randomness:
  - **Low temp (e.g. 0.2--0.5)** → conservative, deterministic
  - **High temp (e.g. 1.5--2.0)** → diverse, creative, less predictable

**Combined Effect**
- The model generates logits
- **Temperature** scales the logits
- **Top-k** limits to the k most likely tokens
- **Top-p** trims this list to tokens with cumulative probability ≥ p
- The final token is sampled randomly from this set

→ Balances **coherence and creativity**

<!-- Master reference: Chapter 1 / Slide 027 -->

---
layout: center
background: apricot
---

# Further Information

<img src="./assets/bbycroft-screenshot.png" class="h-72 rounded shadow-lg mt-4" />

*https://bbycroft.net/llm*

<!-- Master reference: Chapter 1 / Slide 028 -->

---
layout: sidebar
sidebarBackground: petrol
image: /backgrounds/4.webp
---

## Teaching to converse

- Special tokens are introduced during subsequent training sessions:
  - <Token leading-tight value="<|start|>" />
  - <Token leading-tight value="<|message|>" />
  - <Token leading-tight value="<|end|>" />
- These tokens allow us to represent a conversation
- LLMs are good at replicating patterns, so they can continue the conversation naturally

*https://cookbook.openai.com/articles/openai-harmony#special-tokens*

::sidebar::

<h4 class="text-center">From<br/><em>text completion</em><br/>to <em>assistant</em></h4>

<!-- Master reference: Chapter 1 / Slide 029 -->

---

# Structured Output

### For further use

- Text needs full-text parsing, which is complex and error-prone.
- Instead, force the LLM to return its output in a specific format, such as JSON
- Provide a JSON schema in the prompt
- Tell the model it must adhere to the schema
- Then, it returns JSON

<!-- Master reference: Chapter 1 / Slide 030 -->
