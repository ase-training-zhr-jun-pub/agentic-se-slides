<script setup lang="ts">
import { addMinutes, format, isValid, parse } from 'date-fns'
import { computed } from 'vue'

interface TimetableSlot {
  label: string
  duration: number
  rowClass?: string
}

const props = defineProps<{
  startTime: string
  blocks: TimetableSlot[]
}>()

const rows = computed(() => {
  const reference = parse(props.startTime, 'HH:mm', new Date())

  if (!isValid(reference)) {
    return []
  }

  let current = reference

  return props.blocks.map((slot) => {
    const start = current
    const end = addMinutes(start, slot.duration)

    current = end

    return {
      ...slot,
      timeRange: `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`,
      durationLabel: `(${slot.duration}min)`,
    }
  })
})
</script>

<template>
  <table class="mt-6 max-w-4xl border-collapse bg-transparent">
    <tbody class="bg-transparent">
      <tr
        v-for="(row, index) in rows"
        :key="`${row.label}-${index}`"
        class="border-none bg-transparent leading-tight"
        :class="row.rowClass || 'text-petrol'"
      >
        <td class="border-none bg-transparent px-0 py-2 pr-5 text-left align-baseline text-base font-light tracking-tight whitespace-nowrap tabular-nums">
          {{ row.timeRange }}
        </td>
        <td class="w-full border-none bg-transparent px-0 py-2 text-left align-baseline text-3xl">
            {{ row.label }}
            <small class="text-base">
                {{ row.durationLabel }}
            </small>
        </td>
      </tr>
    </tbody>
  </table>
</template>
