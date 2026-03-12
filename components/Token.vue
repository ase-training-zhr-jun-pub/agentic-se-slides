<script setup lang="ts">
import { computed } from 'vue'

const COLORS = [
  "bg-sky-200",
  "bg-amber-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-orange-200",
  "bg-cyan-200",
  "bg-gray-200",
  "bg-purple-200",
  "bg-indigo-200",
  "bg-lime-200",
  "bg-rose-200",
  "bg-violet-200",
  "bg-yellow-200",
  "bg-emerald-200",
  "bg-zinc-200",
  "bg-red-200",
  "bg-fuchsia-200",
  "bg-pink-200",
  "bg-slate-200",
]

const props = defineProps<{ value: string }>()

function hashToIndex(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % COLORS.length
}

const isSpecialToken = computed(() => /^<\|.*\|>$/.test(props.value))

const colorClass = computed(() => COLORS[hashToIndex(props.value)])

const segments = computed(() => {
  // Special tokens like <|endoftext|> are rendered entirely dimmed
  if (isSpecialToken.value) {
    return [{ text: props.value, dimmed: true }]
  }

  const result: Array<{ text: string; dimmed: boolean }> = []
  let current = ''
  let currentDimmed = false

  for (const char of props.value) {
    const isWhitespace = char === ' ' || char === '\t' || char === '\n'
    if (current.length > 0 && isWhitespace !== currentDimmed) {
      result.push({ text: current, dimmed: currentDimmed })
      current = ''
    }
    currentDimmed = isWhitespace
    const mapped = char === ' ' ? '\u00B7' : char === '\t' ? '\u2192' : char === '\n' ? '\\n' : char
    current += mapped
  }
  if (current.length > 0) {
    result.push({ text: current, dimmed: currentDimmed })
  }
  return result
})
</script>

<template>
  <span
    :class="colorClass"
    inline-block font-mono px-1.5 py-0.5 text-gray-800 whitespace-pre
  >
    <template v-for="(seg, i) in segments" :key="i">
      <span v-if="seg.dimmed" opacity-40>{{ seg.text }}</span>
      <span v-else>{{ seg.text }}</span>
    </template>
  </span>
</template>
