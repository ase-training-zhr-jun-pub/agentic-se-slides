<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  buildArcGeometry,
  buildMarkerShape,
  commonLineDefaults,
  computeBoundingBox,
  shiftPoint,
  STROKE_SCALE,
  getMarkerTrim,
  parsePoint,
  parseRadius,
  resolveDashArray,
  resolveLineJoin,
  resolveStrokeColor,
  useParentSize,
  type BaseLineProps,
  type Point,
  polarToPoint,
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

const svgRef = ref<SVGSVGElement | null>(null)
const { width: parentWidth, height: parentHeight } = useParentSize(svgRef)

const strokeWidth = computed(() => props.strokeWidth * STROKE_SCALE)

const keyPoints = computed(() => {
  const center = parsePoint(props.center, parentWidth.value, parentHeight.value, 'ArcLine.center')
  const radius = parseRadius(props.radius, parentWidth.value, parentHeight.value, 'ArcLine.radius')
  const arcStart = polarToPoint(center, radius, props.startAngle)
  const arcEnd = polarToPoint(center, radius, props.endAngle)
  return { center, radius, arcStart, arcEnd }
})

const bbox = computed(() => computeBoundingBox([keyPoints.value.arcStart, keyPoints.value.arcEnd]))

const geometry = computed(() => {
  const { center, radius } = keyPoints.value
  const localCenter = shiftPoint(center, bbox.value)

  return buildArcGeometry(
    localCenter,
    radius,
    props.startAngle,
    props.endAngle,
    props.clockwise,
    getMarkerTrim(props.tail, strokeWidth.value, props.lineCap),
    getMarkerTrim(props.head, strokeWidth.value, props.lineCap),
  )
})

const strokeColor = computed(() => resolveStrokeColor(props.color))
const dashArray = computed(() => resolveDashArray(strokeWidth.value, props.dashed))
const lineJoin = computed(() => resolveLineJoin(props.lineCap, props.lineJoin))

const tailMarker = computed(() => buildMarkerShape(
  props.tail, geometry.value.startPoint, geometry.value.startTangentAngle, strokeWidth.value, 'tail',
))
const headMarker = computed(() => buildMarkerShape(
  props.head, geometry.value.endPoint, geometry.value.endTangentAngle, strokeWidth.value, 'head',
))

const svgStyle = computed(() => ({
  position: 'absolute' as const,
  left: `${bbox.value.minX / parentWidth.value * 100}%`,
  top: `${bbox.value.minY / parentHeight.value * 100}%`,
  width: `${bbox.value.width / parentWidth.value * 100}%`,
  height: `${bbox.value.height / parentHeight.value * 100}%`,
}))
</script>

<template>
  <svg
    ref="svgRef"
    :style="svgStyle"
    :viewBox="`0 0 ${bbox.width} ${bbox.height}`"
    overflow="visible"
    pointer-events="none"
    aria-hidden="true"
    fill="none"
  >
    <path
      :d="geometry.path"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      :stroke-dasharray="dashArray"
      :stroke-linecap="props.lineCap"
      :stroke-linejoin="lineJoin"
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
  </svg>
</template>
