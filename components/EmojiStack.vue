<script setup lang="ts">
import { get } from 'node-emoji'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name?: string
  emoji?: string
  size?: 'md' | 'lg'
}>(), {
  size: 'md',
})

const resolvedEmoji = computed(() => props.emoji || (props.name ? get(props.name) : undefined) || '?')
const emojiClass = computed(() => props.size === 'lg' ? 'text-4xl' : 'text-2xl')
</script>

<template>
  <div class="flex flex-col items-center text-center gap-1">
    <div aria-hidden="true" :class="[emojiClass, 'leading-none']">{{ resolvedEmoji }}</div>
    <div class="text-center [&>:first-child]:mt-0 [&>:last-child]:mb-0">
      <slot />
    </div>
  </div>
</template>
