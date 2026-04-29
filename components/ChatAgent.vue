<script setup lang="ts">
</script>

<template>
  <div flex items-start gap="[1ch]">
    <span shrink-0 text="[var(--chat-accent-green)]">●</span>
    <div class="[&_p:first-child]:mt-0 [&_p:last-child]:mb-0" text="[var(--chat-text)]">
      <slot />
    </div>
  </div>
</template>
