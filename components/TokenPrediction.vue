<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $clicks } = useSlideContext()

/**
 * Each step is an object with:
 *   - token: the token string that gets added to the sequence
 *   - candidates: array of [token, probability] tuples for the prediction table
 *
 * The first candidate is always the one that gets "selected" on the next click
 * and must match the next step's token. Every token and candidate receives a
 * stable `view-transition-name` so the browser can animate matched elements
 * (fly from table → sequence) and cross-fade unmatched ones automatically.
 *
 * Example usage in a slide:
 *
 *   <TokenPrediction :steps="[
 *     { token: 'Hello', candidates: [[' world', 0.35], [' there', 0.28]] },
 *     { token: ' world', candidates: [[',', 0.42], ['!', 0.25]] },
 *     { token: ',', candidates: [] },
 *   ]" />
 */
interface Step {
  token: string
  candidates: [string, number][]
}

const props = defineProps<{
  steps: Step[]
}>()

// Own step counter so we can delay the DOM update into the View Transition callback.
const step = ref($clicks.value)

watch($clicks, (newClicks, oldClicks) => {
  const isForward = newClicks > oldClicks

  if (!document.startViewTransition || !isForward) {
    step.value = newClicks
    return
  }

  const transition = document.startViewTransition(async () => {
    step.value = newClicks
    await nextTick()
  })
  transition.finished.catch(() => {})
})

const visibleTokens = computed(() => {
  const count = Math.min(step.value + 1, props.steps.length)
  return props.steps.slice(0, count).map((s, i) => {
    const vtName = tokenVTName(i)
    return {
      value: s.token,
      style: vtName ? { viewTransitionName: vtName } : undefined,
    }
  })
})

const currentCandidates = computed(() => {
  if (props.steps.length === 0) return []
  const idx = Math.min(step.value, props.steps.length - 1)
  return props.steps[idx].candidates.map(([value, probability], i) => {
    const vtName = candidateVTName(i)
    return {
      value,
      probability,
      style: vtName ? { viewTransitionName: vtName } : undefined,
    }
  })
})

const isFinished = computed(() => step.value >= props.steps.length - 1)

/**
 * The first candidate at step N is the token that will appear in the sequence
 * at position N+1. So we give it view-transition-name: token-{N+1}.
 * The sequence token at index I gets view-transition-name: token-{I}.
 * The browser matches them and animates the fly-over. Unmatched candidates
 * (i > 0) just fade out automatically.
 */
function tokenVTName(index: number): string | undefined {
  // token-0 is always present from the start and never transitions in — skip it
  if (index === 0) return undefined
  return `token-${index}`
}

function candidateVTName(candidateIndex: number): string | undefined {
  if (candidateIndex !== 0) return undefined
  // Don't assign a transition name on the last step — it won't be selected
  if (isFinished.value) return undefined
  // The first candidate will become the token at position step+1
  return `token-${step.value + 1}`
}

/** Generate view-transition CSS selectors for all token positions dynamically */
const tokenTransitionCSS = computed(() => {
  const selectors = props.steps
    .slice(1) // skip token-0 — it's always present and never transitions in
    .map((_, i) => {
      const name = `token-${i + 1}`
      return `::view-transition-old(${name}),\n::view-transition-new(${name})`
    })
  if (selectors.length === 0) return ''
  return `${selectors.join(',\n')} {\n  animation-duration: 0.4s;\n  animation-timing-function: ease-in-out;\n}`
})
</script>

<template>
  <div grid="~ cols-2 rows-[1fr]" gap-8 items-start h-full>
    <!-- Left: Token sequence -->
    <div :style="{ viewTransitionName: 'token-sequence' }">
      <h5 mt-2>Input Sequence</h5>
      <div text-sm flex flex-wrap gap-1>
        <Token
          v-for="(token, i) in visibleTokens"
          :key="i"
          :value="token.value"
          :style="token.style"
        />
      </div>
    </div>

    <!-- Right: Next token prediction table.
         Intentionally kept visible on the last step so the audience can still
         see the final candidates (e.g. <|end|>). Do NOT add an isFinished guard here. -->
    <div v-if="currentCandidates.length > 0" self-start>
      <table :style="{ viewTransitionName: 'candidates-table' }">
        <thead>
          <tr>
            <th text-left>Next Token</th>
            <th text-right>Probability</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(candidate, i) in currentCandidates"
            :key="`${step}-${i}`"
            class="candidate-row"
            :style="{ animationDelay: `${500 + i * 80}ms` }"
          >
            <td>
              <Token
                :value="candidate.value"
                :style="candidate.style"
              />
            </td>
            <td text-right tabular-nums>
              {{ candidate.probability.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <component :is="'style'">{{ tokenTransitionCSS }}</component>
</template>

<style>
/* Stagger fade-in for candidate rows */
.candidate-row {
  animation: candidate-fade-in 0.25s ease-out both;
}

@keyframes candidate-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>

