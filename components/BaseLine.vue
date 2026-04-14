<script lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue'

// ─── Exported types ──────────────────────────────────────────────────

export type Marker = 'none' | 'arrow' | 'triangle' | 'dot' | 'diamond'
export type LineCap = 'butt' | 'round' | 'square'
export type LineJoin = 'miter' | 'round' | 'bevel'
export type PointValue = `${number}% ${number}%`
export type RadiusValue = `${number}%`

export interface Point {
  x: number
  y: number
}

export interface BoundingBox {
  minX: number
  minY: number
  width: number
  height: number
}

export interface PathGeometry {
  path: string
  startPoint: Point
  endPoint: Point
  startTangentAngle: number
  endTangentAngle: number
}

export type PathBuilderFn = (
  parentWidth: number,
  parentHeight: number,
  tailTrim: number,
  headTrim: number,
) => { geometry: PathGeometry; bbox: BoundingBox }

// ─── Exported geometry functions (used by wrapper components) ────────

export function parsePoint(value: string, width: number, height: number, label: string): Point {
  const match = value.match(POINT_PATTERN)
  if (!match) {
    throw new Error(`[${label}] Expected point as "x% y%", received "${value}".`)
  }

  const [, x, y] = match
  return {
    x: width * Number(x) / 100,
    y: height * Number(y) / 100,
  }
}

export function parseRadius(value: string, width: number, height: number, label: string): number {
  const match = value.match(RADIUS_PATTERN)
  if (!match) {
    throw new Error(`[${label}] Expected radius as "n%", received "${value}".`)
  }

  return Math.min(width, height) * Number(match[1]) / 100
}

export function computeBoundingBox(points: Point[]): BoundingBox {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const point of points) {
    if (point.x < minX) minX = point.x
    if (point.y < minY) minY = point.y
    if (point.x > maxX) maxX = point.x
    if (point.y > maxY) maxY = point.y
  }

  return {
    minX,
    minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}

export function shiftPoint(point: Point, bbox: BoundingBox): Point {
  return {
    x: point.x - bbox.minX,
    y: point.y - bbox.minY,
  }
}

export function polarToPoint(center: Point, radius: number, angle: number): Point {
  const radians = angle * Math.PI / 180

  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians),
  }
}

export function buildLineGeometry(start: Point, end: Point, startTrim = 0, endTrim = 0): PathGeometry {
  const tangentAngle = angleBetween(start, end)
  const trimmedStart = movePoint(start, tangentAngle, startTrim)
  const trimmedEnd = movePoint(end, tangentAngle, -endTrim)

  return {
    path: `M ${formatPoint(trimmedStart)} L ${formatPoint(trimmedEnd)}`,
    startPoint: start,
    endPoint: end,
    startTangentAngle: tangentAngle,
    endTangentAngle: tangentAngle,
  }
}

export function buildArcGeometry(
  center: Point,
  radius: number,
  startAngle: number,
  endAngle: number,
  clockwise: boolean,
  startTrim = 0,
  endTrim = 0,
): PathGeometry {
  const start = polarToPoint(center, radius, startAngle)
  const end = polarToPoint(center, radius, endAngle)
  const startTrimAngle = radius > 0 ? radiansToDegrees(startTrim / radius) : 0
  const endTrimAngle = radius > 0 ? radiansToDegrees(endTrim / radius) : 0
  const trimmedStartAngle = startAngle + (clockwise ? startTrimAngle : -startTrimAngle)
  const trimmedEndAngle = endAngle + (clockwise ? -endTrimAngle : endTrimAngle)
  const trimmedStart = polarToPoint(center, radius, trimmedStartAngle)
  const trimmedEnd = polarToPoint(center, radius, trimmedEndAngle)
  const sweepFlag = clockwise ? 1 : 0
  const delta = clockwise
    ? normalizedSweep(trimmedEndAngle - trimmedStartAngle)
    : normalizedSweep(trimmedStartAngle - trimmedEndAngle)
  const largeArcFlag = delta > 180 ? 1 : 0
  const tangentOffset = clockwise ? 90 : -90

  return {
    path: [
      `M ${formatPoint(trimmedStart)}`,
      `A ${formatNumber(radius)} ${formatNumber(radius)} 0 ${largeArcFlag} ${sweepFlag} ${formatPoint(trimmedEnd)}`,
    ].join(' '),
    startPoint: start,
    endPoint: end,
    startTangentAngle: startAngle + tangentOffset,
    endTangentAngle: endAngle + tangentOffset,
  }
}

export function buildCurveGeometry(start: Point, via: Point, end: Point, startTrim = 0, endTrim = 0): PathGeometry {
  const firstControl = {
    x: start.x + (via.x - start.x) / 6,
    y: start.y + (via.y - start.y) / 6,
  }
  const secondControl = {
    x: via.x - (end.x - start.x) / 6,
    y: via.y - (end.y - start.y) / 6,
  }
  const thirdControl = {
    x: via.x + (end.x - start.x) / 6,
    y: via.y + (end.y - start.y) / 6,
  }
  const fourthControl = {
    x: end.x - (end.x - via.x) / 6,
    y: end.y - (end.y - via.y) / 6,
  }
  const startTangentAngle = angleBetween(start, firstControl)
  const endTangentAngle = angleBetween(fourthControl, end)
  const startOffset = vectorFromAngle(startTangentAngle)
  const endOffset = vectorFromAngle(endTangentAngle)
  const trimmedStart = movePoint(start, startTangentAngle, startTrim)
  const trimmedFirstControl = {
    x: firstControl.x + startOffset.x * startTrim,
    y: firstControl.y + startOffset.y * startTrim,
  }
  const trimmedEnd = movePoint(end, endTangentAngle, -endTrim)
  const trimmedFourthControl = {
    x: fourthControl.x - endOffset.x * endTrim,
    y: fourthControl.y - endOffset.y * endTrim,
  }

  return {
    path: [
      `M ${formatPoint(trimmedStart)}`,
      `C ${formatPoint(trimmedFirstControl)} ${formatPoint(secondControl)} ${formatPoint(via)}`,
      `C ${formatPoint(thirdControl)} ${formatPoint(trimmedFourthControl)} ${formatPoint(trimmedEnd)}`,
    ].join(' '),
    startPoint: start,
    endPoint: end,
    startTangentAngle,
    endTangentAngle,
  }
}

// ─── Internal constants ──────────────────────────────────────────────

const POINT_PATTERN = /^\s*(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%\s*$/
const RADIUS_PATTERN = /^\s*(-?\d+(?:\.\d+)?)%\s*$/

const STROKE_SCALE = 4

// ─── Internal rendering helpers ──────────────────────────────────────

interface MarkerShape {
  path: string
  mode: 'fill' | 'stroke'
  strokeWidth?: number
}

function resolveDashArray(strokeWidth: number, dashed: boolean): string | undefined {
  if (!dashed)
    return undefined

  return `${formatNumber(strokeWidth * 2.5)} ${formatNumber(strokeWidth * 2)}`
}

function resolveLineJoin(lineCap: LineCap, lineJoin?: LineJoin): LineJoin {
  if (lineJoin)
    return lineJoin

  return lineCap === 'round' ? 'round' : 'miter'
}

function getMarkerTrim(marker: Marker, strokeWidth: number, lineCap: LineCap = 'round'): number {
  const capOverhang = lineCap === 'butt' ? 0 : strokeWidth * 0.5

  if (marker === 'none')
    return 0

  if (marker === 'dot')
    return getDotRadius(strokeWidth) * 0.35 + capOverhang

  if (marker === 'diamond')
    return capOverhang

  if (marker === 'arrow')
    return capOverhang

  return getArrowLength(strokeWidth) - strokeWidth * 0.35
}

function buildMarkerShape(
  marker: Marker,
  point: Point,
  tangentAngle: number,
  strokeWidth: number,
  position: 'head' | 'tail',
): MarkerShape | undefined {
  if (marker === 'none')
    return undefined

  if (marker === 'dot')
    return {
      path: buildDotPath(point, strokeWidth),
      mode: 'fill',
    }

  if (marker === 'diamond')
    return {
      path: buildDiamondPath(point, tangentAngle, strokeWidth),
      mode: 'fill',
    }

  const tipAngle = position === 'head' ? tangentAngle : tangentAngle + 180
  if (marker === 'arrow') {
    return {
      path: buildOpenArrowPath(point, tipAngle, strokeWidth),
      mode: 'stroke',
      strokeWidth: strokeWidth * 0.85,
    }
  }

  return {
    path: buildArrowPath(point, tipAngle, strokeWidth),
    mode: 'fill',
  }
}

// ─── Composable ──────────────────────────────────────────────────────

function useParentSize(target: Ref<Element | null>) {
  const width = ref(100)
  const height = ref(100)
  let observer: ResizeObserver | null = null

  function updateSize() {
    const parent = target.value?.parentElement
    if (!parent)
      return

    const rect = parent.getBoundingClientRect()
    width.value = rect.width || 100
    height.value = rect.height || 100
  }

  onMounted(() => {
    updateSize()

    const parent = target.value?.parentElement
    if (typeof ResizeObserver === 'undefined' || !parent)
      return

    observer = new ResizeObserver(() => {
      updateSize()
    })
    observer.observe(parent)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { width, height }
}

// ─── Private geometry helpers ────────────────────────────────────────

function normalizedSweep(angle: number): number {
  return ((angle % 360) + 360) % 360
}

function angleBetween(start: Point, end: Point): number {
  return Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI
}

function vectorFromAngle(angle: number): Point {
  const radians = angle * Math.PI / 180

  return {
    x: Math.cos(radians),
    y: Math.sin(radians),
  }
}

function movePoint(point: Point, angle: number, distance: number): Point {
  const vector = vectorFromAngle(angle)

  return {
    x: point.x + vector.x * distance,
    y: point.y + vector.y * distance,
  }
}

function radiansToDegrees(value: number): number {
  return value * 180 / Math.PI
}

function getArrowLength(strokeWidth: number): number {
  return strokeWidth * 6
}

function getArrowWidth(strokeWidth: number): number {
  return strokeWidth * 4.5
}

function getOpenArrowLength(strokeWidth: number): number {
  return strokeWidth * 3.1
}

function getOpenArrowWidth(strokeWidth: number): number {
  return getOpenArrowLength(strokeWidth) * 1.5
}

function getDotRadius(strokeWidth: number): number {
  return strokeWidth * 1.8
}

function getDiamondLength(strokeWidth: number): number {
  return getDotRadius(strokeWidth) * 2.4
}

function getDiamondWidth(strokeWidth: number): number {
  return getDotRadius(strokeWidth) * 2
}

function buildArrowPath(tip: Point, angle: number, strokeWidth: number): string {
  const length = getArrowLength(strokeWidth)
  const width = getArrowWidth(strokeWidth)
  const direction = vectorFromAngle(angle)
  const perpendicular = vectorFromAngle(angle + 90)
  const baseCenter = {
    x: tip.x - direction.x * length,
    y: tip.y - direction.y * length,
  }
  const left = {
    x: baseCenter.x + perpendicular.x * width / 2,
    y: baseCenter.y + perpendicular.y * width / 2,
  }
  const right = {
    x: baseCenter.x - perpendicular.x * width / 2,
    y: baseCenter.y - perpendicular.y * width / 2,
  }

  return `M ${formatPoint(tip)} L ${formatPoint(left)} L ${formatPoint(right)} Z`
}

function buildOpenArrowPath(tip: Point, angle: number, strokeWidth: number): string {
  const length = getOpenArrowLength(strokeWidth)
  const width = getOpenArrowWidth(strokeWidth)
  const direction = vectorFromAngle(angle)
  const perpendicular = vectorFromAngle(angle + 90)
  const baseCenter = {
    x: tip.x - direction.x * length,
    y: tip.y - direction.y * length,
  }
  const left = {
    x: baseCenter.x + perpendicular.x * width / 2,
    y: baseCenter.y + perpendicular.y * width / 2,
  }
  const right = {
    x: baseCenter.x - perpendicular.x * width / 2,
    y: baseCenter.y - perpendicular.y * width / 2,
  }

  return `M ${formatPoint(left)} L ${formatPoint(tip)} L ${formatPoint(right)}`
}

function buildDotPath(center: Point, strokeWidth: number): string {
  const radius = getDotRadius(strokeWidth)
  const diameter = formatNumber(radius * 2)

  return [
    `M ${formatNumber(center.x - radius)} ${formatNumber(center.y)}`,
    `a ${formatNumber(radius)} ${formatNumber(radius)} 0 1 0 ${diameter} 0`,
    `a ${formatNumber(radius)} ${formatNumber(radius)} 0 1 0 ${-diameter} 0`,
  ].join(' ')
}

function buildDiamondPath(center: Point, tangentAngle: number, strokeWidth: number): string {
  const length = getDiamondLength(strokeWidth)
  const width = getDiamondWidth(strokeWidth)
  const direction = vectorFromAngle(tangentAngle)
  const perpendicular = vectorFromAngle(tangentAngle + 90)

  const front = {
    x: center.x + direction.x * length / 2,
    y: center.y + direction.y * length / 2,
  }
  const back = {
    x: center.x - direction.x * length / 2,
    y: center.y - direction.y * length / 2,
  }
  const left = {
    x: center.x + perpendicular.x * width / 2,
    y: center.y + perpendicular.y * width / 2,
  }
  const right = {
    x: center.x - perpendicular.x * width / 2,
    y: center.y - perpendicular.y * width / 2,
  }

  return `M ${formatPoint(front)} L ${formatPoint(left)} L ${formatPoint(back)} L ${formatPoint(right)} Z`
}

function formatPoint(point: Point): string {
  return `${formatNumber(point.x)} ${formatNumber(point.y)}`
}

function formatNumber(value: number): number {
  return Number(value.toFixed(3))
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  head?: Marker
  tail?: Marker
  strokeWidth?: number
  dashed?: boolean
  lineCap?: LineCap
  lineJoin?: LineJoin
  pathBuilder: PathBuilderFn
}>(), {
  head: 'none',
  tail: 'none',
  strokeWidth: 1,
  dashed: false,
  lineCap: 'round',
})

const svgRef = ref<SVGSVGElement | null>(null)
const { width: parentWidth, height: parentHeight } = useParentSize(svgRef)

const strokeWidth = computed(() => props.strokeWidth * STROKE_SCALE)
const tailTrim = computed(() => getMarkerTrim(props.tail, strokeWidth.value, props.lineCap))
const headTrim = computed(() => getMarkerTrim(props.head, strokeWidth.value, props.lineCap))

const result = computed(() =>
  props.pathBuilder(parentWidth.value, parentHeight.value, tailTrim.value, headTrim.value),
)
const geometry = computed(() => result.value.geometry)
const bbox = computed(() => result.value.bbox)

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
      stroke="currentColor"
      :stroke-width="strokeWidth"
      :stroke-dasharray="dashArray"
      :stroke-linecap="props.lineCap"
      :stroke-linejoin="lineJoin"
    />
    <path
      v-if="tailMarker"
      :d="tailMarker.path"
      :fill="tailMarker.mode === 'fill' ? 'currentColor' : 'none'"
      :stroke="tailMarker.mode === 'stroke' ? 'currentColor' : 'none'"
      :stroke-width="tailMarker.strokeWidth"
      :stroke-linecap="props.lineCap"
      :stroke-linejoin="lineJoin"
    />
    <path
      v-if="headMarker"
      :d="headMarker.path"
      :fill="headMarker.mode === 'fill' ? 'currentColor' : 'none'"
      :stroke="headMarker.mode === 'stroke' ? 'currentColor' : 'none'"
      :stroke-width="headMarker.strokeWidth"
      :stroke-linecap="props.lineCap"
      :stroke-linejoin="lineJoin"
    />
  </svg>
</template>
