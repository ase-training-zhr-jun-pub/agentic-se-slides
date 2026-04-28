<script setup lang="ts">
import BaseLine, {
  type PointValue,
  parsePoint,
  computeBoundingBox,
  shiftPoint,
  buildCurveGeometry,
} from './BaseLine.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  start: PointValue
  end: PointValue
  via: PointValue
}>()

function pathBuilder(parentWidth: number, parentHeight: number, tailTrim: number, headTrim: number) {
  const start = parsePoint(props.start, parentWidth, parentHeight, 'CurveLine.start')
  const via = parsePoint(props.via, parentWidth, parentHeight, 'CurveLine.via')
  const end = parsePoint(props.end, parentWidth, parentHeight, 'CurveLine.end')
  const bbox = computeBoundingBox([start, via, end])
  const geometry = buildCurveGeometry(
    shiftPoint(start, bbox),
    shiftPoint(via, bbox),
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
