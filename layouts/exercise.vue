<script setup lang="ts">
import Center from 'slidev-theme-innoq/layouts/center.vue'
import VisualCenter from 'slidev-theme-innoq/components/VisualCenter.vue'

const props = withDefaults(defineProps<{
  background?: string
  chapter: number | string
  exercise: number | string
  task?: string
  command?: string
}>(), {
  background: 'petrol',
})
</script>

<template>
  <Center :background="props.background">
    <div class="h-full w-full grid grid-rows-[1fr_auto]">
        <VisualCenter>
            <template #top>
                <h3>
                    <em>
                        Chapter {{ props.chapter }}
                    </em>
                </h3>
            </template>
            <h1 text-6xl>
                Exercise {{ props.exercise }}
            </h1>
        </VisualCenter>


      <div v-if="props.task || props.command" class="space-y-4 mb-16">
        <div v-if="props.task" class="text-gray text-4xl leading-tight">
          {{ props.task }}
        </div>

        <p v-if="props.command" class="inline-block self-center rounded-lg bg-lightGray/80 px-5 py-3 font-mono text-petrol">
          $ {{ props.command }}
        </p>
      </div>
    </div>
  </Center>
</template>
