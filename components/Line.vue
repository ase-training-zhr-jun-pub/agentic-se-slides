<script setup lang="ts">
import BaseLine, {
  type PointValue,
  parsePoint,
  computeBoundingBox,
  shiftPoint,
  buildLineGeometry,
} from './BaseLine.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  start: PointValue
  end: PointValue
}>()

function pathBuilder(parentWidth: number, parentHeight: number, tailTrim: number, headTrim: number) {
  const start = parsePoint(props.start, parentWidth, parentHeight, 'Line.start')
  const end = parsePoint(props.end, parentWidth, parentHeight, 'Line.end')
  const bbox = computeBoundingBox([start, end])
  const geometry = buildLineGeometry(
    shiftPoint(start, bbox),
    shiftPoint(end, bbox),
    tailTrim,
    headTrim,
  )
  return { geometry, bbox }
}
</script>

<template>
  <BaseLine v-bind="$attrs" :path-builder="pathBuilder" />
</template>
