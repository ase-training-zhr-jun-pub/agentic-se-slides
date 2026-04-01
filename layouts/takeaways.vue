<script setup lang="ts">
import Center from 'slidev-theme-innoq/layouts/center.vue'
import VisualCenter from 'slidev-theme-innoq/components/VisualCenter.vue'

const props = withDefaults(defineProps<{
  background?: string
  chapter: number | string
  title?: string
}>(), {
  background: 'petrol',
  title: 'Key Takeaways',
})
</script>

<template>
  <Center :background="props.background">
    <div class="h-full w-full grid grid-rows-[1fr_auto] text-center">
      <VisualCenter>
        <template #top>
          <h3 class="[&_em]:text-apricot">
            <em>Chapter {{ props.chapter }}</em>
          </h3>
        </template>
        <h1 class="text-white !mb-0">{{ props.title }}</h1>
      </VisualCenter>

      <div class="w-full flex items-center justify-center mb-16">
        <div class="[&_ol]:inline-block [&_ol]:max-w-3xl [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:text-left [&_ol]:text-2xl [&_ol]:leading-snug [&_ol]:space-y-3 [&_ol>li::marker]:text-accent">
          <slot />
        </div>
      </div>
    </div>
  </Center>
</template>
