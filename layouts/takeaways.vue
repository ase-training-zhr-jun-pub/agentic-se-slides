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
      <div class="[&_ol]:inline-block [&_ol]:max-w-3xl [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:text-left [&_ol]:text-2xl [&_ol]:leading-snug [&_ol]:space-y-3 [&_ol>li::marker]:text-accent">
        <h3 class="mb-0 [&+h1,h2,h3,h4,h5,h6]:mb-10">
            <em>Chapter {{ props.chapter }}</em>
        </h3>
        <h1>{{ props.title }}</h1>
        <slot />
    </div>
  </Center>
</template>
