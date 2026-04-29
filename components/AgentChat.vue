<script setup lang="ts">
import { provide } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  variant?: 'terminal' | 'ide'
  hideTitle?: boolean
}>(), {
  title: 'Coding Agent',
  variant: 'terminal',
  hideTitle: false,
})

provide('agentChatVariant', props.variant)
</script>

<template>
  <div
    class="[--chat-bg:#1a1b26] [--chat-bg-titlebar:#13131e] [--chat-border:#414868] [--chat-text:#a9b1d6] [--chat-text-bright:#dde4fc] [--chat-text-dim:#565f89] [--chat-accent-blue:#7aa2f7] [--chat-accent-cyan:#7dcfff] [--chat-accent-green:#9ece6a] [--chat-accent-purple:#bb9af7] [--chat-accent-red:#f7768e] [--chat-accent-yellow:#e0af68] [&_p]:m-0 [&_p]:text-inherit [&_ul]:text-inherit [&_ol]:text-inherit [&_ul>li::before]:hidden [&_em]:text-[var(--chat-text-bright)] [&_em]:italic [&_strong]:text-[var(--chat-accent-yellow)] [&_strong]:font-semibold"
    font-mono leading-relaxed flex flex-col bg="[var(--chat-bg)]" text="[var(--chat-text)]" border="1 [var(--chat-border)] rounded-lg" overflow-hidden
  >
    <!-- Title bar -->
    <div v-if="!hideTitle" flex items-center gap-1.5 px-3 py-1.5 bg="[var(--chat-bg-titlebar)]" border="b 1 [var(--chat-border)]">
      <span w-2 h-2 rounded-full bg="[var(--chat-border)]" />
      <span w-2 h-2 rounded-full bg="[var(--chat-border)]" />
      <span w-2 h-2 rounded-full bg="[var(--chat-border)]" />
      <span ml-2 tracking-wide text="[var(--chat-text-dim)] [0.65em]">{{ title }}</span>
    </div>

    <!-- Conversation body -->
    <div
      class="agent-chat-body [scrollbar-width:thin] [scrollbar-color:var(--chat-border)_transparent]"
      text="0.7em" px-5 py-4 overflow-y-auto flex-1 min-h-0
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.agent-chat-body::-webkit-scrollbar {
  width: 0.375rem;
}

.agent-chat-body::-webkit-scrollbar-track {
  background-color: transparent;
}

.agent-chat-body::-webkit-scrollbar-thumb {
  background-color: var(--chat-border);
  border-radius: 999px;
}
</style>
