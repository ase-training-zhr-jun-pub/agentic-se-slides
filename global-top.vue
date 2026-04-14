<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useSlidePalette } from './composables/useSlidePalette'

const nav = useNav()
const hiddenLayouts = ['cover', 'chapter']

const currentFrontmatter = computed(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})
const { palette } = useSlidePalette()

const isVisible = computed(() => {
  if (hiddenLayouts.includes(nav.currentLayout.value))
    return false

  return currentFrontmatter.value.slideNumber !== false
})

function resolveSlideNumberColor(slideNumber: unknown) {
  const fallback = palette.value.textPrimary

  if (typeof slideNumber !== 'string')
    return fallback

  switch (slideNumber.toLowerCase()) {
    case 'primary':
      return palette.value.textPrimary
    case 'accent':
      return palette.value.textAccent
    case 'petrol':
      return 'var(--innoq-petrol)'
    case 'apricot':
      return 'var(--innoq-apricot)'
    case 'white':
      return 'white'
    case 'black':
      return 'black'
    default:
      return fallback
  }
}

const pageNumberColor = computed(() => {
  return resolveSlideNumberColor(currentFrontmatter.value.slideNumber)
})
</script>

<template>
  <footer
    v-if="isVisible"
    class="absolute bottom-0 left-0 right-0 px-10 py-8 text-right text-sm tabular-nums opacity-60"
    :style="{ color: pageNumberColor }"
  >
    {{ nav.currentPage }}
  </footer>
</template>
