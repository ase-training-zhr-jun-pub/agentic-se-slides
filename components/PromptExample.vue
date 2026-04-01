<script setup lang="ts">
defineProps<{
  label: string
  prompt: string
}>()
</script>

<template>
  <div>
    <p class="font-semibold">{{ label }}</p>
    <div class="mt-4 inline-block rounded-lg bg-lightGray px-5 py-3 font-mono text-primary leading-snug text-left">
      {{ prompt }}
    </div>
  </div>
</template>
