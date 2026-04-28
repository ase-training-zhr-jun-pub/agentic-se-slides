<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { computed, ref } from 'vue'
import {
  buildCurveGeometry,
  buildMarkerShape,
  commonLineDefaults,
  STROKE_SCALE,
  getMarkerTrim,
  parsePoint,
  resolveDashArray,
  resolveLineJoin,
  resolveStrokeColor,
  useOwnerSvgSize,
  type BaseLineProps,
  type PointValue,
} from './line-utils'

interface CurveLineProps extends BaseLineProps {
  start: PointValue
  end: PointValue
  via: PointValue
}

const props = withDefaults(defineProps<CurveLineProps>(), commonLineDefaults)

const rootPathRef = ref<SVGPathElement | null>(null)
const { width, height, unitScale } = useOwnerSvgSize(rootPathRef)

const geometry = computed(() => {
  const start = parsePoint(props.start, width.value, height.value, 'CurveLine.start')
  const via = parsePoint(props.via, width.value, height.value, 'CurveLine.via')
  const end = parsePoint(props.end, width.value, height.value, 'CurveLine.end')

  return buildCurveGeometry(
    start,
    via,
    end,
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
