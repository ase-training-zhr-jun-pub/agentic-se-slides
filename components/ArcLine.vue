<script setup lang="ts">
import BaseLine, {
  type PointValue,
  type RadiusValue,
  parsePoint,
  parseRadius,
  polarToPoint,
  computeBoundingBox,
  shiftPoint,
  buildArcGeometry,
} from './BaseLine.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  center: PointValue
  radius: RadiusValue
  startAngle: number
  endAngle: number
  clockwise?: boolean
}>(), {
  clockwise: false,
})

function pathBuilder(parentWidth: number, parentHeight: number, tailTrim: number, headTrim: number) {
  const center = parsePoint(props.center, parentWidth, parentHeight, 'ArcLine.center')
  const radius = parseRadius(props.radius, parentWidth, parentHeight, 'ArcLine.radius')
  const bbox = computeBoundingBox([
    polarToPoint(center, radius, props.startAngle),
    polarToPoint(center, radius, props.endAngle),
  ])
  const geometry = buildArcGeometry(
    shiftPoint(center, bbox),
    radius,
    props.startAngle,
    props.endAngle,
    props.clockwise,
    tailTrim,
    headTrim,
  )
  return { geometry, bbox }
}
</script>

<template>
  <BaseLine v-bind="$attrs" :path-builder="pathBuilder" />
</template>
