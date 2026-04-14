import { useNav } from '@slidev/client'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

export interface SlidePalette {
  backgroundColor: string
  backgroundImage: string
  textPrimary: string
  textAccent: string
}

interface SlideMetaWithFrontmatter {
  frontmatter: Record<string, unknown>
  revision?: string
}

const defaultPalette: SlidePalette = {
  backgroundColor: 'white',
  backgroundImage: 'none',
  textPrimary: 'var(--innoq-petrol)',
  textAccent: 'var(--innoq-apricot)',
}

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

function readCssVar(style: CSSStyleDeclaration, name: string) {
  return style.getPropertyValue(name).trim()
}

function hasSlideFrontmatter(slide: unknown): slide is SlideMetaWithFrontmatter {
  return typeof slide === 'object' && slide !== null && 'frontmatter' in slide
}

export function useSlidePalette() {
  const nav = useNav()
  const palette = ref<SlidePalette>({ ...defaultPalette })
  let syncFrame = 0
  let stopWatching: (() => void) | undefined

  function getCurrentSlideChangeKey() {
    const slide = nav.currentSlideRoute.value?.meta?.slide

    if (!hasSlideFrontmatter(slide))
      return undefined

    return slide.revision ?? JSON.stringify(slide.frontmatter)
  }

  function syncPalette() {
    if (!isBrowser)
      return

    const slideLayout = document.querySelector<HTMLElement>(`[data-slidev-no="${nav.currentSlideNo.value}"] .slidev-layout`)

    if (!slideLayout) {
      palette.value = { ...defaultPalette }
      return
    }

    const style = getComputedStyle(slideLayout)
    palette.value = {
      backgroundColor: style.backgroundColor || defaultPalette.backgroundColor,
      backgroundImage: style.backgroundImage || defaultPalette.backgroundImage,
      textPrimary: readCssVar(style, '--innoq-text-primary') || defaultPalette.textPrimary,
      textAccent: readCssVar(style, '--innoq-text-accent') || defaultPalette.textAccent,
    }
  }

  async function schedulePaletteSync() {
    if (!isBrowser)
      return

    await nextTick()

    cancelAnimationFrame(syncFrame)
    syncFrame = requestAnimationFrame(() => {
      syncPalette()
    })
  }

  onMounted(() => {
    stopWatching = watch(() => [nav.currentSlideNo.value, nav.currentLayout.value, getCurrentSlideChangeKey()], schedulePaletteSync, {
      deep: true,
      immediate: true,
    })
  })

  onUnmounted(() => {
    stopWatching?.()

    if (!isBrowser)
      return

    cancelAnimationFrame(syncFrame)
  })

  return {
    palette,
    syncPalette: schedulePaletteSync,
  }
}
