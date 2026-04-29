<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div flex items-center gap="[1ch]">
    <span shrink-0 text="[var(--chat-text-dim)]">⚡</span>
    <span text="[var(--chat-text-dim)]">Loaded skill</span>
    <span font-bold text="[var(--chat-text-dim)]">{{ name }}</span>
  </div>
</template>
