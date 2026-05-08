# Drawing Components

Components for drawing connectors and annotations directly on slides. They are useful for arrows,
paths, and scene-like visual explanations where the slide content needs lightweight SVG overlays.

The `Line`, `ArcLine`, and `CurveLine` components render SVG lines, arcs, and curves as absolutely
positioned overlays. All three share a common set of styling props and delegate rendering to the
internal `BaseLine` component.

Coordinates are specified as percentage strings relative to the **parent container** (e.g.,
`"50% 30%"`). The parent must have `position: relative` (or `absolute`/`fixed`) so the SVG overlay
positions correctly. The components track the parent's size via `ResizeObserver` and recompute
pixel positions on resize.

## Shared styling props

Available on `Line`, `ArcLine`, and `CurveLine`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `head` | `Marker` | `'none'` | Marker shape at the end of the line |
| `tail` | `Marker` | `'none'` | Marker shape at the start of the line |
| `color` | `StrokeColor` | `'currentColor'` | Stroke and marker color |
| `strokeWidth` | `number` | `1` | Relative stroke width (scaled x4 internally) |
| `dashed` | `boolean` | `false` | Render as a dashed line |
| `lineCap` | `LineCap` | `'round'` | SVG `stroke-linecap` value |
| `lineJoin` | `LineJoin` | *(auto)* | SVG `stroke-linejoin`; defaults to `'round'` when `lineCap` is `'round'`, otherwise `'miter'` |

**Marker types** (`Marker`): `'none'`, `'arrow'` (open chevron), `'triangle'` (filled), `'dot'`
(filled circle), `'diamond'` (filled rhombus).

**Color values** (`StrokeColor`): `'currentColor'`, `'petrol'`, `'apricot'`, `'teal'`,
`'lightGray'`, `'white'`, `'black'`.

## `Line`

Straight line between two points.

**Props** (in addition to shared styling props above):

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `start` | `PointValue` | yes | Start point as `"x% y%"` |
| `end` | `PointValue` | yes | End point as `"x% y%"` |

**Usage:**

```markdown
<div class="relative w-full h-full">
  <Line start="20% 30%" end="80% 70%" color="apricot" head="triangle" :stroke-width="1.5" />
</div>
```

## `ArcLine`

Circular arc between two angles around a center point.

**Props** (in addition to shared styling props above):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `PointValue` | *(required)* | Center of the arc as `"x% y%"` |
| `radius` | `RadiusValue` | *(required)* | Radius as `"n%"` relative to the smaller parent dimension |
| `startAngle` | `number` | *(required)* | Start angle in degrees (0deg = right, 90deg = down) |
| `endAngle` | `number` | *(required)* | End angle in degrees |
| `clockwise` | `boolean` | `false` | Draw the arc clockwise instead of counter-clockwise |

**Usage:**

```markdown
<div class="relative w-full h-full">
  <ArcLine
    center="50% 50%" radius="20%"
    :start-angle="0" :end-angle="270"
    :clockwise="true"
    head="arrow" color="teal"
  />
</div>
```

## `CurveLine`

Smooth curve that passes through an intermediate point. The curve is constructed as two cubic
Bezier segments that meet at `via`, producing a smooth S-shaped or C-shaped path depending on the
relative positions of the three points.

**Props** (in addition to shared styling props above):

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `start` | `PointValue` | yes | Start point as `"x% y%"` |
| `end` | `PointValue` | yes | End point as `"x% y%"` |
| `via` | `PointValue` | yes | Intermediate through-point as `"x% y%"` |

**Usage:**

```markdown
<div class="relative w-full h-full">
  <CurveLine
    start="10% 50%" via="50% 20%" end="90% 50%"
    head="triangle" tail="dot" color="petrol" :stroke-width="1.5"
  />
</div>
```
