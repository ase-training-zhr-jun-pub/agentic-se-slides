<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  buildMarkerShape,
  buildLineGeometry,
  commonLineDefaults,
  computeBoundingBox,
  shiftPoint,
  STROKE_SCALE,
  getMarkerTrim,
  parsePoint,
  resolveDashArray,
  resolveLineJoin,
  resolveStrokeColor,
  useParentSize,
  type BaseLineProps,
  type PointValue,
} from './line-utils'

interface LineProps extends BaseLineProps {
  start: PointValue
  end: PointValue
}

const props = withDefaults(defineProps<LineProps>(), commonLineDefaults)

const svgRef = ref<SVGSVGElement | null>(null)
const { width: parentWidth, height: parentHeight } = useParentSize(svgRef)

const strokeWidth = computed(() => props.strokeWidth * STROKE_SCALE)

const keyPoints = computed(() => {
  const start = parsePoint(props.start, parentWidth.value, parentHeight.value, 'Line.start')
  const end = parsePoint(props.end, parentWidth.value, parentHeight.value, 'Line.end')
  return { start, end }
})

const bbox = computed(() => computeBoundingBox([keyPoints.value.start, keyPoints.value.end]))

const geometry = computed(() => {
  const { start, end } = keyPoints.value
  const localStart = shiftPoint(start, bbox.value)
  const localEnd = shiftPoint(end, bbox.value)

  return buildLineGeometry(
    localStart,
    localEnd,
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
