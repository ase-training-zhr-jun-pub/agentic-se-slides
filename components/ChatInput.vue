<template>
  <div class="[&:not(:first-child)]:mt-[1.5lh] [&:not(:first-child)]:pt-[0.5lh] [&:not(:first-child)]:border-t [&:not(:first-child)]:border-[var(--chat-border)]" flex items-start gap="[1ch]">
    <span font-bold shrink-0 text="[var(--chat-accent-blue)]">&gt;</span>
    <span text="[var(--chat-text-bright)]">
      <slot /><span class="chat-input-cursor" text="[var(--chat-accent-blue)]">█</span>
    </span>
  </div>
</template>

<style>
.chat-input-cursor {
  animation: chat-cursor-blink 1s step-end infinite;
}

@keyframes chat-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
