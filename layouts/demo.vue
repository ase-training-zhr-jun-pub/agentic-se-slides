<script setup lang="ts">
import Center from 'slidev-theme-innoq/layouts/center.vue'
import VisualCenter from 'slidev-theme-innoq/components/VisualCenter.vue'

const props = withDefaults(defineProps<{ background?: string, kicker?: string, link?: string }>(), {
  background: 'apricot',
  kicker: 'Demo',
})
</script>

<template>
  <Center :background="props.background">
    <div class="h-full w-full grid grid-rows-[1fr_auto] text-center [&_a]:text-white [&_a]:border-none [&_a:hover]:text-white">
      <VisualCenter>
        <template #top>
          <h3>
            <em>{{ props.kicker }}</em>
          </h3>
        </template>
        <div class="text-6xl leading-none">
          💻
        </div>
      </VisualCenter>
      <div class="mb-16 flex flex-col items-center gap-2 text-2xl">
        <div v-if="props.link" class="font-serif italic">
          <a :href="props.link">{{ props.link }}</a>
        </div>
        <slot />
      </div>
    </div>
  </Center>
</template>
