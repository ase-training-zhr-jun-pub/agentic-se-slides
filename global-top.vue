<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useSlidePalette } from './composables/useSlidePalette'

const nav = useNav()
const hiddenLayouts = ['cover', 'chapter']

const currentFrontmatter = computed(() => nav.currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})
const { palette } = useSlidePalette()

function resolveFooterTextColor(footerTextColor: unknown) {
  const fallback = palette.value.textPrimary

  if (typeof footerTextColor !== 'string')
    return fallback

  switch (footerTextColor.toLowerCase()) {
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

const footerLinks = computed(() => {
  const { footerLink } = currentFrontmatter.value

  if (typeof footerLink === 'string')
    return footerLink.trim() ? [footerLink.trim()] : []

  if (!Array.isArray(footerLink))
    return []

  return footerLink.filter((link): link is string => typeof link === 'string' && link.trim().length > 0).map(link => link.trim())
})

const hasSlideNumber = computed(() => currentFrontmatter.value.slideNumber !== false)

const isReversed = computed(() => {
  const { footerDir } = currentFrontmatter.value
  return typeof footerDir === 'string' && footerDir.toLowerCase() === 'reverse'
})

const isFooterVisible = computed(() => {
  if (hiddenLayouts.includes(nav.currentLayout.value))
    return false

  return hasSlideNumber.value || footerLinks.value.length > 0
})

const footerLinkColor = computed(() => {
  return resolveFooterTextColor(currentFrontmatter.value.footerLinkColor)
})

const slideNumberColor = computed(() => {
  return resolveFooterTextColor(currentFrontmatter.value.slideNumberColor)
})
</script>

<template>
  <footer
    v-if="isFooterVisible"
    class="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-8 px-10 py-8 text-sm opacity-60"
  >
    <div
      v-if="footerLinks.length > 0"
      class="flex flex-col font-serif font-italic"
      :class="{
        'order-1 mr-auto text-left': !isReversed,
        'order-2 ml-auto text-right': isReversed,
      }"
      :style="{ color: footerLinkColor }"
    >
      <a
        v-for="link in footerLinks"
        :key="link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link }}
      </a>
    </div>

    <div
      v-if="hasSlideNumber"
      class="tabular-nums"
      :class="{
        'order-1 mr-auto text-left': isReversed,
        'order-2 ml-auto text-right': !isReversed,
      }"
      :style="{ color: slideNumberColor }"
    >
      {{ nav.currentPage }}
    </div>
  </footer>
</template>
