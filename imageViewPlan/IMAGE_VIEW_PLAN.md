# ImageCard Component — UX / Architecture Plan

> Generated with the **UX/Architecture Interface Analyzer** skill.
> Source wireframe: `src/assets/views/ImageView.png`
> Target stack: **Vue 3 `<script setup>` + TypeScript + Vite** (matches this repo), styled with Material Design 3 tokens adapted to the existing `FlipCard.vue` visual language.

---

## 1. Complete UI Description

The wireframe shows a single **card surface** with two stacked regions:

```
┌───────────────────────────────────────────┐
│                                             │
│                  TEXT                       │  ← caption / title (centered)
│                                             │
│        ┌───────────────────────────┐        │
│        │  ◯                        │        │
│        │        ____/\____         │        │  ← image placeholder
│        │   __/          \__/\__    │        │     (sun + mountains glyph)
│        └───────────────────────────┘        │
│                                             │
└───────────────────────────────────────────┘
```

- **Visual structure:** an outer rounded container; a centered text label at the top; a framed image area (16:10-ish) below.
- **Element hierarchy:** Container → Title text → Image frame → (placeholder glyph when no image).
- **Spatial distribution:** vertical stack, content centered horizontally, generous padding around both regions.
- **Functional purpose:** present a karate-related concept as an **image + caption** (e.g. a stance/technique illustration or animal card), with a graceful empty/broken state.

---

## 2. Screen / Component Goal

- **Primary goal:** display one labelled image in a self-contained, reusable card.
- **Expected user actions:** view the image, read the caption; optionally tap/click to open a larger view or flip for more info (consistent with `FlipCard`).
- **Expected outcomes:** the learner associates the visual (mountain/sun glyph placeholder until a real asset loads) with the karate term in the caption.

---

## 3. Navigation Flow

This is a **presentational leaf component**, embedded inside existing views (e.g. a future `ImageView.vue` route or within `DachiView`/`UkeView` grids).

```
HomeView ──▶ [Technique/Animal View] ──▶ renders <ImageCard> (grid/list)
                                   │
                                   ├─ image loads ........ shows image + caption
                                   ├─ image loading ...... shows skeleton
                                   ├─ image fails ........ shows placeholder glyph + caption
                                   └─ (optional) click ... emits "select" → modal / detail
```

- **Entry point:** parent view passes `src` + `caption` props.
- **Exit point:** optional `@select` event bubbles to the parent for navigation/modal.
- **Navigation states:** none owned internally; the card is stateless re: routing.

---

## 4. Reusable Components

| Component | Role | Variations |
|-----------|------|------------|
| `ImageCard` (new) | The full card in the wireframe | `default`, `clickable`, `loading`, `error/empty` |
| `ImagePlaceholder` (new, inline) | The sun+mountain glyph for empty/broken state | `error`, `empty` |
| `CardSurface` (pattern) | Rounded white surface + shadow, already used by `FlipCard` | — |
| Caption text | Centered title above the image | `truncated` (1 line) / `wrapped` |

Relationships: `ImageCard` *composes* `ImagePlaceholder`; both reuse the shared surface/spacing tokens from §6–§8.

---

## 5. Design System

- **Name / version:** *Karate Asker Design Language v1* — a light, card-based system derived from `FlipCard.vue`, aligned to **Material Design 3** principles.
- **Principles:** clarity (single concept per card), consistency (shared tokens), graceful degradation (always a meaningful empty state), accessibility-first.
- **Hierarchy:** Tokens (color/type/spacing) → Primitives (`CardSurface`, `ImagePlaceholder`) → Components (`ImageCard`) → Views.
- **Pattern docs:** card radius `16px`, border `1px #e2e8f0`, shadow `0 4px 6px -1px rgba(0,0,0,.1)` (taken from existing code).

---

## 6. Colors

```json
{
  "palette": {
    "primary": "#334155",
    "secondary": "#64748b",
    "tertiary": "#94a3b8",
    "error": "#dc2626",
    "warning": "#d97706",
    "success": "#16a34a",
    "background": "#f8fafc",
    "surface": "#ffffff",
    "outline": "#e2e8f0"
  },
  "roles": {
    "onPrimary": "#ffffff",
    "onSecondary": "#ffffff",
    "onSurface": "#1e293b",
    "onError": "#ffffff",
    "placeholderStroke": "#334155"
  }
}
```

> Derived from the slate palette already present in `FlipCard.vue` (`#1e293b`, `#64748b`, `#e2e8f0`, `#f8fafc`). The wireframe's dark outline maps to `placeholderStroke: #334155`.

---

## 7. Typography

```json
{
  "fontFamily": "Inter, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "scales": {
    "caption": { "fontSize": "16px", "fontWeight": 500, "lineHeight": "24px" },
    "captionLarge": { "fontSize": "22px", "fontWeight": 500, "lineHeight": "28px" },
    "supporting": { "fontSize": "14px", "fontWeight": 400, "lineHeight": "20px" }
  }
}
```

The "TEXT" label in the wireframe → MD3 `titleLarge` (22px/500) for emphasis, or `titleMedium` (16px/500) in dense grids.

---

## 8. Spacing (8px Grid)

```json
{
  "spacing": { "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px" },
  "padding": { "card": "24px", "imageFrameGap": "16px" },
  "margin": { "captionToImage": "16px" },
  "radius": { "card": "16px", "imageFrame": "12px" }
}
```

---

## 9. Iconography

- **Placeholder glyph:** inline SVG reproducing the wireframe (rectangle frame + circle "sun" + two-peak "mountain" polyline). Stroke-only, `1.5px`, color `placeholderStroke`.
- **Recommended icon set:** Material Symbols (Rounded) for any future actions (`zoom_in`, `broken_image`, `image`).
- **Sizes:** 24px (actions), 48px (in-card glyph small), responsive glyph scales to ~40% of frame.
- **Style:** outline / rounded to match the thin-line wireframe aesthetic.

---

## 10. Component States

| State | Visual |
|-------|--------|
| **Default/Enabled** | Image rendered, caption above, subtle shadow |
| **Hover** (if clickable) | shadow lift + `transform: translateY(-2px)`, cursor pointer |
| **Focused** (keyboard) | 2px `outline` ring `#334155`, offset 2px |
| **Pressed/Active** | shadow reduce + `scale(0.99)` |
| **Disabled** | opacity `.5`, no pointer events |
| **Loading** | shimmer skeleton in the image frame, caption visible |
| **Error/Empty** | placeholder glyph (the wireframe drawing) + caption |
| **Success** | image fades in (250ms) |

---

## 11. Validations

For a presentational component, validation = **prop contracts**:

| Prop | Rule | Timing |
|------|------|--------|
| `caption` | non-empty string; trimmed | on render (dev warning if empty) |
| `src` | optional string URL; falsy → empty state | on render |
| `alt` | required when `src` set (a11y); fallback to `caption` | on render |
| `aspectRatio` | one of `"16/10" \| "1/1" \| "4/3"` | on render |
| `id` | optional; used only as the select payload when `clickable` is true | on interaction |
| `clickable` | optional boolean; enables button-like role, keyboard handlers, hover/focus states, and `select` emission | on render |

Criteria: invalid/missing `src` must **never** throw — it renders the placeholder. If `src` changes, local `loaded`/`errored` state resets before the next image lifecycle.

---

## 12. Error Cases

- **Image fails to load** → `@error` on `<img>` switches to placeholder glyph + optional retry.
- **Slow network** → skeleton loader until `load`/`error`.
- **Empty state** (`src` falsy) → placeholder glyph, no spinner.
- **Missing caption** → dev-only console warning in a future validation layer; render still succeeds.
- **Changing `src` on the same component instance** → reset `loaded` and `errored` before handling the new asset.
- **Recovery action:** optional small "retry" affordance re-assigns `src` with a cache-busting query param.

---

## 13. Animations

```json
{
  "transitions": {
    "short": "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    "standard": "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    "long": "350ms cubic-bezier(0.4, 0, 0.2, 1)"
  },
  "animations": [
    { "name": "imageFadeIn", "duration": "250ms", "easing": "cubic-bezier(0.4, 0, 0.2, 1)" },
    { "name": "hoverLift", "duration": "150ms", "easing": "cubic-bezier(0.4, 0, 0.2, 1)" },
    { "name": "skeletonShimmer", "duration": "1200ms", "easing": "linear", "iteration": "infinite" }
  ]
}
```

> Respect `prefers-reduced-motion`: disable shimmer/lift, keep instant fade.

---

## 14. Accessibility (WCAG 2.1 AA)

- Caption text on white ≥ 4.5:1 (`#1e293b` on `#ffffff` = 15.8:1 ✔).
- `<img>` always has meaningful `alt` (falls back to `caption`).
- Placeholder SVG is decorative because the adjacent caption already conveys the item identity; mark it `aria-hidden="true"`.
- If clickable: keep `<figure>/<figcaption>` semantics and add button-like behavior with `role="button"`, `tabindex="0"`, enter/space handlers, visible focus ring, and min touch target **48×48px**.
- Semantic markup: `<figure>` + `<figcaption>` for image+caption.

---

## 15. Responsive Design

```json
{
  "breakpoints": { "mobile": "0px", "tablet": "600px", "desktop": "1024px", "wide": "1440px" },
  "layouts": {
    "mobile": "single column, card max-width 100%, caption titleMedium",
    "tablet": "2-up grid, gap 16px",
    "desktop": "3-up grid, gap 24px, caption titleLarge",
    "wide": "max-width 1200px container, centered, 4-up grid"
  }
}
```

Card itself uses `aspect-ratio` for the image frame so it scales fluidly (same approach as `FlipCard`'s `aspect-ratio: 1.6/1`).

---

## 16. Data Model

```json
{
  "entities": [
    {
      "name": "ImageCardItem",
      "fields": [
        { "name": "id", "type": "string", "required": true },
        { "name": "caption", "type": "string", "required": true },
        { "name": "src", "type": "string | null", "required": false },
        { "name": "alt", "type": "string", "required": false },
        { "name": "aspectRatio", "type": "'16/10' | '1/1' | '4/3'", "required": false }
      ],
      "relationships": [
        { "to": "TechniqueView", "type": "rendered-in" }
      ]
    }
  ]
}
```

The existing CSV files currently use `position,name,description` and do not yet include image-specific columns. Add image fields before wiring real assets, for example `position,name,description,image,alt`, or derive a stable image id from the existing `name` column and resolve it through a view-level asset map.

---

## 17. Required API

No backend needed — assets are static. Keep `ImageCard` prop-based and resolve actual image URLs in the parent view/composable before passing `src`:

```json
{
  "staticAssetOptions": [
    {
      "location": "public/images/<category>/<id>.webp",
      "runtimeSrc": "/images/<category>/<id>.webp",
      "description": "Best when image paths come directly from CSV/runtime data."
    },
    {
      "location": "src/assets/images/<category>/<id>.webp",
      "resolution": "import.meta.glob('../assets/images/**/*.webp', { eager: true, query: '?url', import: 'default' })",
      "description": "Best when images should be bundled, hashed, and type-checked by Vite."
    }
  ],
  "errorHandling": "missing or invalid URLs trigger <img> @error -> placeholder"
}
```

Avoid treating `/src/assets/...` as a production runtime URL; Vite assets under `src/assets` should be imported or glob-resolved. If images become remote later, add a thin `useImageAsset(id)` composable returning a resolved URL.

---

## 18. Recommended Architecture

- **Pattern:** Component-based / MVVM-lite — presentational component, no business logic.
- **Layer separation:** Views (smart, data-fetching) → `ImageCard` (dumb, props in / events out).
- **State management:** purely local `ref` for `loaded`/`errored`; no Pinia/Vuex needed.
- **Communication:** props down, optional `emit('select', id)` up; i18n captions via existing `vue-i18n`.
- **Error handling:** local `errored` ref toggled by `<img @error>`; `loaded`/`errored` reset when `src` changes.
- **Caching/local storage:** rely on Vite asset hashing + browser HTTP cache.

---

## 19. Material Design 3 Code (Vue 3 + TS)

> **Full code proposal lives in [`ImageCard.vue`](./ImageCard.vue)** (same folder as this plan).
> Copy it to `src/components/ImageCard.vue` to integrate. The full source is reproduced below for reference.

```vue
<template>
  <figure
    class="image-card"
    :class="{ 'is-clickable': clickable }"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleSelect"
    @keydown.enter.prevent="handleSelect"
    @keydown.space.prevent="handleSelect"
  >
    <figcaption class="image-card__caption">{{ caption }}</figcaption>

    <div class="image-card__frame" :style="{ aspectRatio: aspectRatioStyle }">
      <img
        v-if="src && !errored"
        :src="src"
        :alt="alt || caption"
        class="image-card__img"
        :class="{ 'is-loaded': loaded }"
        @load="loaded = true"
        @error="errored = true"
      />
      <div v-if="src && !loaded && !errored" class="image-card__skeleton" aria-hidden="true"></div>
      <svg
        v-if="!src || errored"
        class="image-card__placeholder"
        viewBox="0 0 120 80"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="116" height="76" rx="6" fill="none" stroke="currentColor" stroke-width="2" />
        <circle cx="28" cy="26" r="9" fill="none" stroke="currentColor" stroke-width="2" />
        <polyline
          points="14,66 46,40 60,52 84,28 106,50"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="round" stroke-linecap="round"
        />
      </svg>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type AspectRatio = '16/10' | '1/1' | '4/3'

const props = withDefaults(
  defineProps<{
    id?: string
    caption: string
    src?: string | null
    alt?: string
    aspectRatio?: AspectRatio
    clickable?: boolean
  }>(),
  { id: '', src: null, alt: '', aspectRatio: '16/10', clickable: false },
)

const emit = defineEmits<{ select: [id: string] }>()

const loaded = ref(false)
const errored = ref(false)
const aspectRatioStyle = computed(() => props.aspectRatio.replace('/', ' / '))

watch(
  () => props.src,
  () => {
    loaded.value = false
    errored.value = false
  },
)

const handleSelect = () => {
  if (!props.clickable) {
    return
  }

  emit('select', props.id)
}
</script>

<style scoped>
.image-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  margin: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font: inherit;
}

.image-card.is-clickable {
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.image-card.is-clickable:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,.1); }
.image-card.is-clickable:active { transform: scale(0.99); }
.image-card.is-clickable:focus-visible { outline: 2px solid #334155; outline-offset: 2px; }

.image-card__caption {
  font-size: 1.375rem;
  font-weight: 500;
  color: #1e293b;
  text-align: center;
  margin: 0;
}

.image-card__frame {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  color: #334155;
}

.image-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.image-card__img.is-loaded { opacity: 1; }

.image-card__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 400% 100%;
  animation: image-card-shimmer 1.2s linear infinite;
}

.image-card__placeholder { width: 60%; height: auto; }

@keyframes image-card-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .image-card.is-clickable, .image-card__img { transition: none; }
  .image-card__skeleton { animation: none; }
}
</style>
```

**Example usage** in a view:

```vue
<ImageCard
  v-for="a in animals"
  :key="a.id"
  :id="a.id"
  :caption="t(a.captionKey)"
  :src="a.src"
  clickable
  @select="openDetail"
/>
```

**Minimal test** (`ImageCard.spec.ts`, future work if Vitest is added):

The current project does not define a test script or include Vitest dependencies in `package.json`; add `vitest`, `@vue/test-utils`, and an npm script before adopting these tests.

```ts
import { mount } from '@vue/test-utils'
import ImageCard from '../components/ImageCard.vue'

it('shows placeholder when no src', () => {
  const w = mount(ImageCard, { props: { id: '1', caption: 'Tora' } })
  expect(w.find('.image-card__placeholder').exists()).toBe(true)
})

it('falls back to placeholder on image error', async () => {
  const w = mount(ImageCard, { props: { id: '1', caption: 'Tora', src: '/bad.png' } })
  await w.find('img').trigger('error')
  expect(w.find('.image-card__placeholder').exists()).toBe(true)
})
```

---

## 20. Design Decisions

| Decision | Rationale | Alternatives / Trade-offs |
|----------|-----------|---------------------------|
| Reuse `FlipCard` tokens (radius/shadow/palette) | Visual consistency, zero new design debt | Introduce full MD3 theme — heavier, not justified for this app size |
| Inline SVG placeholder | Pixel-faithful to wireframe, no extra asset, themeable via `currentColor` | `<img>` placeholder asset — adds a network request and is not recolorable |
| `<figure>/<figcaption>` semantics | Best a11y fit for image+caption and avoids invalid `<figcaption>` inside `<button>` | Clickable state uses `role="button"` + keyboard handlers; a native `<button>` would require non-figure caption markup |
| Props-down / events-up, no store | Component is presentational; keeps it portable | Pinia store — unnecessary coupling |
| `id` optional and select-only | Keeps the card usable as a pure display component | Required `id` would unnecessarily couple non-clickable cards to parent data shape |
| `aspect-ratio` over fixed height | Fluid responsive scaling, matches existing `FlipCard` | Fixed px height — breaks on mobile |
| `loaded`/`errored` local refs | Smallest possible state to cover loading/error/empty | External state machine — overkill |
| `prefers-reduced-motion` guard | WCAG compliance, respects user settings | Always animate — accessibility regression |

---

### Implementation Checklist
- [ ] Add `src/components/ImageCard.vue` (code in §19).
- [ ] Decide image asset strategy before wiring data: `public/images/...` for CSV runtime paths, or `src/assets` + `import.meta.glob` for bundled assets.
- [ ] Extend image CSV/data shape with `image`/`alt` fields, or define a stable name-to-image-id mapping.
- [ ] (Optional) Add a route/view `ImageView.vue` consuming a CSV (mirroring existing views).
- [ ] Wire captions through `vue-i18n` (`src/i18n/locales/*.json`).
- [ ] Verify `npm run build` (`vue-tsc -b && vite build`) passes type checks.
- [ ] (Optional) Add Vitest + `@vue/test-utils`, a test script, and the tests in §19.
