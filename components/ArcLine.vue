<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { computed, ref } from 'vue'
import {
  buildArcGeometry,
  buildMarkerShape,
  commonLineDefaults,
  STROKE_SCALE,
  getMarkerTrim,
  parsePoint,
  parseRadius,
  resolveDashArray,
  resolveLineJoin,
  resolveStrokeColor,
  useOwnerSvgSize,
  type BaseLineProps,
  type PointValue,
  type RadiusValue,
} from './line-utils'

interface ArcLineProps extends BaseLineProps {
  center: PointValue
  radius: RadiusValue
  startAngle: number
  endAngle: number
  clockwise?: boolean
}

const props = withDefaults(defineProps<ArcLineProps>(), {
  ...commonLineDefaults,
  clockwise: false,
})

const rootPathRef = ref<SVGPathElement | null>(null)
const { width, height, unitScale } = useOwnerSvgSize(rootPathRef)

const geometry = computed(() => {
  const center = parsePoint(props.center, width.value, height.value, 'ArcLine.center')
  const radius = parseRadius(props.radius, width.value, height.value, 'ArcLine.radius')

  return buildArcGeometry(
    center,
    radius,
    props.startAngle,
    props.endAngle,
    props.clockwise,
    getMarkerTrim(props.tail, strokeWidth.value, props.lineCap),
    getMarkerTrim(props.head, strokeWidth.value, props.lineCap),
  )
})

const strokeWidth = computed(() => props.strokeWidth * STROKE_SCALE * unitScale.value)
const strokeColor = computed(() => resolveStrokeColor(props.color))
const dashArray = computed(() => resolveDashArray(strokeWidth.value, props.dashed))
const lineJoin = computed(() => resolveLineJoin(props.lineCap, props.lineJoin))
const tailMarker = computed(() => buildMarkerShape(
  props.tail,
  geometry.value.startPoint,
  geometry.value.startTangentAngle,
  strokeWidth.value,
  'tail',
))
const headMarker = computed(() => buildMarkerShape(
  props.head,
  geometry.value.endPoint,
  geometry.value.endTangentAngle,
  strokeWidth.value,
  'head',
))
</script>

<template>
  <path
    ref="rootPathRef"
    :d="geometry.path"
    :stroke="strokeColor"
    :stroke-width="strokeWidth"
    :stroke-dasharray="dashArray"
    :stroke-linecap="props.lineCap"
    :stroke-linejoin="lineJoin"
    fill="none"
  />
  <path
    v-if="tailMarker"
    :d="tailMarker.path"
    :fill="tailMarker.mode === 'fill' ? strokeColor : 'none'"
    :stroke="tailMarker.mode === 'stroke' ? strokeColor : 'none'"
    :stroke-width="tailMarker.strokeWidth"
    :stroke-linecap="props.lineCap"
    :stroke-linejoin="lineJoin"
  />
  <path
    v-if="headMarker"
    :d="headMarker.path"
    :fill="headMarker.mode === 'fill' ? strokeColor : 'none'"
    :stroke="headMarker.mode === 'stroke' ? strokeColor : 'none'"
    :stroke-width="headMarker.strokeWidth"
    :stroke-linecap="props.lineCap"
    :stroke-linejoin="lineJoin"
  />
</template>
