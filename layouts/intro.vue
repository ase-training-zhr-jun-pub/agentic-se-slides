<script setup lang="ts">
import Center from 'slidev-theme-innoq/layouts/center.vue'

const props = withDefaults(defineProps<{ background?: string, kicker?: string }>(), {
  background: 'apricot',
})
</script>

<template>
  <Center :background="props.background">
    <div
      :class="[
        'h-full w-full flex flex-col items-center justify-center text-center',
        props.background === 'apricot' && '[&_h3]:text-petrol [&_h3_em]:text-petrol [&_h1]:text-white',
      ]"
    >
      <div v-if="props.kicker || $slots.kicker" class="mb-6">
        <slot name="kicker">
          <div class="font-serif italic text-accent text-2xl tracking-wide">
            {{ props.kicker }}
          </div>
        </slot>
      </div>

      <div class="w-full">
        <slot />
      </div>
    </div>
  </Center>
</template>
