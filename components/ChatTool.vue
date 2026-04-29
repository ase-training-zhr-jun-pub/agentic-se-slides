<script setup lang="ts">
import { ref, watch, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  args?: string
  collapsed?: boolean
}>(), {
  args: '',
  collapsed: false,
})

const slots = useSlots()
const hasContent = () => !!slots.default

const isCollapsed = ref(props.collapsed)

watch(() => props.collapsed, (val) => {
  isCollapsed.value = val
})

function toggle() {
  if (hasContent()) {
    isCollapsed.value = !isCollapsed.value
  }
}
</script>

<template>
  <div
    select-none
    :class="{ 'cursor-pointer': hasContent() }"
    @click="toggle"
  >
    <!-- Tool header -->
    <div
      flex items-center gap="[1ch]"
    >
      <span shrink-0 text="[var(--chat-text-dim)]">→</span>
      <span font-bold text="[var(--chat-accent-cyan)]">{{ name }}</span>
      <span v-if="args" opacity-60 truncate text="[var(--chat-text)]">{{ args }}</span>
      <span
        v-if="hasContent()"
        ml-auto shrink-0 text="[var(--chat-text-dim)]"
      >{{ isCollapsed ? 'click to expand' : 'click to collapse' }}</span>
    </div>

    <!-- Tool result content -->
    <div
      v-if="hasContent()"
      v-show="!isCollapsed"
      class="[&_pre]:m-0 [&_pre]:whitespace-pre [&_pre]:text-inherit [&_pre]:bg-transparent [&_code]:text-inherit [&_code]:bg-transparent [&_code]:p-0"
      pl="[2ch]" overflow-x-auto mb-2 text="[var(--chat-text-dim)]"
    >
      <slot />
    </div>
  </div>
</template>
