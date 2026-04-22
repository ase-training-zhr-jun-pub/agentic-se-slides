<script setup>
import VisualCenter from 'slidev-theme-innoq/components/VisualCenter.vue'

defineProps({
  name: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <VisualCenter text-center gap-4>
    <slot />
    <template #bottom>
      <div class="font-bold text-xl whitespace-nowrap">{{ name }}</div>
      <div v-if="subtitle" class="text-sm opacity-60 whitespace-nowrap">{{ subtitle }}</div>
    </template>
  </VisualCenter>
</template>
