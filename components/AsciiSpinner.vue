<script setup lang="ts">
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
</script>

<template>
  <span inline-block w="[1ch]" align-baseline class="[clip-path:inset(0)]">
    <span class="ascii-spinner-track">
      <span v-for="(frame, i) in frames" :key="i" inline-block w="[1ch]" text-center>{{ frame }}</span>
    </span>
  </span>
</template>

<style>
.ascii-spinner-track {
  display: inline-flex;
  animation-duration: 800ms;
  animation-name: ascii-spinner-scroll;
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
}

@keyframes ascii-spinner-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
</style>
