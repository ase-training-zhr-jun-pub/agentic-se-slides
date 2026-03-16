<script setup lang="ts">
import Center from 'slidev-theme-innoq/layouts/center.vue'

const props = withDefaults(defineProps<{ background?: string, kicker?: string, link?: string }>(), {
  background: 'apricot',
  kicker: 'Demo',
})
</script>

<template>
  <Center :background="props.background">
    <div class="h-full w-full flex flex-col items-center justify-center text-center">
      <div class="font-serif italic text-accent text-2xl tracking-wide">{{ props.kicker }}</div>
      <div class="text-8xl mt-10">💻</div>
      <div v-if="props.link" class="font-serif italic text-accent text-2xl mt-20">{{ props.link }}</div>
      <slot />
    </div>
  </Center>
</template>
