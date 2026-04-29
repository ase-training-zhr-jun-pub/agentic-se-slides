<script setup lang="ts">
import { ref, watch, useSlots } from 'vue'
import AsciiSpinner from './AsciiSpinner.vue'

const props = withDefaults(defineProps<{
  agent?: string
  description: string
  collapsed?: boolean
  status?: 'running' | 'completed' | 'failed'
}>(), {
  agent: '',
  collapsed: false,
  status: 'completed',
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

const statusIcon: Record<string, string> = {
  completed: '●',
  failed: '✕',
}

const statusColorClass: Record<string, string> = {
  running: 'text-[var(--chat-accent-blue)]',
  completed: 'text-[var(--chat-accent-green)]',
  failed: 'text-[var(--chat-accent-red)]',
}
</script>

<template>
  <div
    select-none
    :class="{ 'cursor-pointer': hasContent() }"
    @click="toggle"
  >
    <!-- Task header -->
    <div flex items-center gap="[1ch]">
      <AsciiSpinner v-if="status === 'running'" :class="statusColorClass[status]" shrink-0 />
      <span v-else :class="statusColorClass[status]" shrink-0>{{ statusIcon[status] }}</span>
      <span :class="status === 'failed' ? 'text-[var(--chat-accent-red)]' : 'text-[var(--chat-accent-purple)]'">Task</span>
      <span v-if="agent" :class="status === 'failed' ? 'text-[var(--chat-accent-red)]' : 'text-[var(--chat-accent-purple)]'" font-bold>{{ agent }}</span>
      <span text="[var(--chat-text-dim)]">·</span>
      <span truncate text="[var(--chat-text)]">{{ description }}</span>
      <span
        v-if="hasContent()"
        ml-auto shrink-0 text="[var(--chat-text-dim)]"
      >{{ isCollapsed ? 'click to expand' : 'click to collapse' }}</span>
    </div>

    <!-- Task result content -->
    <div
      v-if="hasContent()"
      v-show="!isCollapsed"
      class="[&_pre]:m-0 [&_pre]:whitespace-pre [&_pre]:text-inherit [&_pre]:bg-transparent [&_code]:text-inherit [&_code]:bg-transparent [&_code]:p-0"
      pl="[2ch]" overflow-x-auto mb-2 text="[var(--chat-text)]"
    >
      <slot />
    </div>
  </div>
</template>
