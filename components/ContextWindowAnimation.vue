<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { onSlideEnter, onSlideLeave } from '@slidev/client'

const props = withDefaults(defineProps<{
  tokens: string[]
  /** Tokens added per second */
  speed?: number
  /** Number of tokens to pre-fill the container with */
  prefill?: number
  /** Minimum number of tokens to keep from the end before pruning */
  keepMinimum?: number
}>(), {
  speed: 10,
  prefill: 500,
  keepMinimum: 400,
})

// Reactive token buffer: append-only, periodically pruned from the front
const tokenBuffer = ref<Array<{ value: string; key: number }>>([])

// Global key counter to ensure unique keys
let nextKey = 0

// Template ref
const tokenFlowRef = ref<HTMLElement | null>(null)

// Pre-fill on init
function initBuffer() {
  const len = props.tokens.length
  const buf: Array<{ value: string; key: number }> = []
  for (let i = 0; i < props.prefill; i++) {
    buf.push({
      value: props.tokens[i % len],
      key: nextKey++,
    })
  }
  tokenBuffer.value = buf
}

/**
 * Remove whole rows of tokens that have overflowed above the container.
 *
 * Starting from the keepMinimum-th token (counted from the end), we
 * walk backwards. When a token's offsetLeft is smaller than its
 * successor's, that token is at the start of a wrapped row. We cut
 * everything before that row start.
 *
 * Because we always cut at row boundaries the flex-wrap layout of all
 * remaining tokens stays identical → no visual jitter.
 */
function pruneOffscreen() {
  const flow = tokenFlowRef.value
  if (!flow) return

  const children = flow.children
  const total = children.length
  if (total <= props.keepMinimum) return

  // Start scanning backwards from the keepMinimum boundary
  const scanFrom = total - props.keepMinimum

  // Walk backwards to find the nearest row start at or before scanFrom.
  // A row start is where offsetLeft drops (is smaller than the next token's).
  let cutIndex = 0
  for (let i = scanFrom; i > 0; i--) {
    const curr = (children[i] as HTMLElement).offsetLeft
    const prev = (children[i - 1] as HTMLElement).offsetLeft
    if (curr <= prev) {
      // Token at index i is the first token of a new row
      cutIndex = i
      break
    }
  }

  if (cutIndex > 0) {
    tokenBuffer.value = tokenBuffer.value.slice(cutIndex)
  }
}

let animationId: number | null = null
let lastTimestamp = 0
let fractionalTokens = 0

function animate(timestamp: number) {
  if (lastTimestamp === 0) lastTimestamp = timestamp
  const delta = (timestamp - lastTimestamp) / 1000
  lastTimestamp = timestamp

  fractionalTokens += delta * props.speed
  const newTokens = Math.floor(fractionalTokens)
  if (newTokens > 0) {
    fractionalTokens -= newTokens
    const len = props.tokens.length
    for (let i = 0; i < newTokens; i++) {
      tokenBuffer.value.push({
        value: props.tokens[nextKey % len],
        key: nextKey++,
      })
    }

    // Prune after Vue renders, but only when buffer is significantly
    // over the minimum (avoids running every single frame)
    if (tokenBuffer.value.length > props.keepMinimum + 50) {
      nextTick(pruneOffscreen)
    }
  }

  animationId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (animationId !== null) return
  lastTimestamp = 0
  fractionalTokens = 0
  animationId = requestAnimationFrame(animate)
}

function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function handleVisibility() {
  if (document.hidden) stopAnimation()
  else startAnimation()
}

onSlideEnter(() => {
  startAnimation()
})

onSlideLeave(() => {
  stopAnimation()
})

onMounted(() => {
  initBuffer()
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  stopAnimation()
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <div relative overflow-hidden>
    <!-- Token flow: bottom-aligned, wrapping upward -->
    <div ref="tokenFlowRef" absolute bottom-0 left-0 right-0 min-h-full flex flex-wrap content-end gap="3px" p-3>
      <Token
        v-for="tok in tokenBuffer"
        :key="tok.key"
        :value="tok.value"
      />
    </div>

    <!-- Overlay: grayscale + fade at top, context window border below -->
    <div absolute inset-0 flex flex-col pointer-events-none>
      <!-- Grayscale zone: desaturates tokens above the context window, fades out at bottom -->
      <div class="cw-grayscale" h="146px" relative>
        <div absolute inset-0 bg-gradient-to-b from-white to-transparent />
        <div absolute inset-0 bg-gradient-to-b from-white to-transparent />
      </div>
      <!-- Active context window with teal border -->
      <div flex-1 border-3 border-petrol />
    </div>
  </div>
</template>

<style scoped>
.cw-grayscale {
  backdrop-filter: grayscale(1);
  -webkit-backdrop-filter: grayscale(1);
}
</style>
