<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  delay?: number
}>(), { speed: 50, delay: 0 })

const el = ref<HTMLElement>()
const displayed = ref('')
const nav = useNav()
const { $page } = useSlideContext()
let timeouts: ReturnType<typeof setTimeout>[] = []
let observer: MutationObserver | undefined
let stopWatchingSlide: (() => void) | undefined

function isClickVisible() {
  return !el.value?.closest('.slidev-vclick-hidden')
}

function shouldPlay() {
  return nav.currentSlideNo.value === $page.value && isClickVisible()
}

function type() {
  stop()
  let time = props.delay
  for (let i = 0; i < props.text.length; i++) {
    const char = props.text[i]
    let charDelay = props.speed * (0.7 + Math.random() * 0.6)
    if (',;:'.includes(char)) charDelay += props.speed * 3
    else if ('.!?'.includes(char)) charDelay += props.speed * 5
    else if (char === ' ') charDelay += props.speed * 0.5
    time += charDelay
    timeouts.push(setTimeout(() => {
      displayed.value = props.text.slice(0, i + 1)
    }, time))
  }
}

function stop() {
  timeouts.forEach(clearTimeout)
  timeouts = []
  displayed.value = ''
}

onMounted(() => {
  let wasPlayable = shouldPlay()

  observer = new MutationObserver(() => {
    const playable = shouldPlay()
    if (playable === wasPlayable) return
    wasPlayable = playable
    playable ? type() : stop()
  })

  let node: HTMLElement | null = el.value ?? null
  while (node) {
    observer.observe(node, { attributes: true, attributeFilter: ['class'] })
    node = node.parentElement
  }

  stopWatchingSlide = watch(nav.currentSlideNo, () => {
    const playable = shouldPlay()
    if (playable === wasPlayable) return
    wasPlayable = playable
    playable ? type() : stop()
  })

  if (wasPlayable) type()
})

onUnmounted(() => {
  stop()
  observer?.disconnect()
  stopWatchingSlide?.()
})
</script>

<template>
  <span ref="el" class="typewriter">{{ displayed }}</span>
</template>
