# Plan: Dojokun View

## Goal
Create a new view that displays the **Dojo Kun** (道場訓) — the dojo oath — as a list of phrases read from `dojokun.txt`. The list is presented inside a decorated, sober border with subtle Japanese aesthetic, befitting an oath: traditional reds/blacks/off-white, restrained ornamentation (corner accents and a thin double border), seriffed/serif-leaning typography.

## Scope
- **New** `src/views/DojokunView.vue` — reads `dojokun.txt`, parses lines, renders the decorated card.
- **Modify** `src/router/index.ts` — add `/dojokun` route.
- **Modify** `src/views/HomeView.vue` — add a "Dojo Kun" category card linking to `/dojokun`.
- **Modify** `src/vite-env.d.ts` (if needed) — declare `*.txt?raw` module type (vite already supplies it via `import.meta`, but an explicit shim avoids TS warnings, consistent with project style).
- The source file `dojokun.txt` already exists at the repo root; no changes to it.

## Source File
`dojokun.txt` content (already present):
```
Ser Humilde
Tener gran sentido de Justicia
Ser modestos en sus palabras y acciones
Respetar a los demás
Karate Do es un estudio de por vida
```
- The file has a UTF‑8 BOM on the first line and leading whitespace per line — the parser must strip both.
- `dojokun.txt` is the single source of truth for phrase content. Do not duplicate or translate phrase lines in code or locale JSON.

## Parsing Strategy
Reuse the project convention seen in `DachiView`, `ZukiView`, etc.:
```ts
import dojokunRaw from '../../dojokun.txt?raw'
```
Then:
```ts
const phrases = dojokunRaw
  .replace(/^\uFEFF/, '')           // strip BOM
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0)
```

## Visual Design (sober, Japanese-leaning)
- **Palette**:
  - Background of card: parchment / washi off-white `#f8f4ec`.
  - Border accent (deep ink): `#1a1a1a`.
  - Secondary accent (sumi red / hanko): `#8b2e2a`.
  - Text: `#1a1a1a` primary, `#3f3a33` for ordinals.
- **Border**:
  - Outer frame: 2 px solid `#1a1a1a`.
  - Inner frame: 1 px solid `#1a1a1a` with 6 px gap (double-line effect) using `outline` or a nested `<div>`.
  - Four small corner accents (8×8 px squares in `#8b2e2a`) absolutely positioned at the corners.
- **Header inside the card**:
  - Kanji 「道場訓」large and centered, color `#1a1a1a`, letter-spacing `0.2em`.
  - Romaji "DŌJŌ KUN" small, uppercase, tracked, in `#8b2e2a`.
  - Thin horizontal hairline divider beneath the header.
- **List**:
  - Ordered look with traditional Japanese counter `一、 二、 三、 …` rendered as a left-side gutter span (hand-written feel via `serif`/Hiragino-like stack).
  - Phrase typography: `font-family: 'Cormorant Garamond', 'Noto Serif JP', Georgia, serif;` (system serif fallback — no font install required).
  - Line height `1.8`, generous vertical spacing between items, faint hairline divider between items.
- **Page**:
  - Background subtle off-white `#faf7f1` to echo washi, with the card centered, `max-width: 720px`.
  - No interactive elements other than the standard back button (matches other views).

> The design avoids cliché flourishes (no sakura/dragons). It relies on negative space, double-line borders, hanko red accents, and serif type — classic Japanese print/scroll aesthetic.

## Files to Add / Modify

### 1. NEW — `src/views/DojokunView.vue`
```vue
<template>
  <div class="dojokun-view">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back
      </button>
    </div>

    <article class="scroll">
      <span class="corner corner-tl" aria-hidden="true"></span>
      <span class="corner corner-tr" aria-hidden="true"></span>
      <span class="corner corner-bl" aria-hidden="true"></span>
      <span class="corner corner-br" aria-hidden="true"></span>

      <div class="inner">
        <header class="oath-header">
          <h1 class="kanji">道場訓</h1>
          <p class="romaji">DŌJŌ KUN</p>
          <span class="hairline" aria-hidden="true"></span>
        </header>

        <ol class="phrases">
          <li v-for="(phrase, idx) in phrases" :key="idx" class="phrase">
            <span class="counter">{{ counters[idx] }}</span>
            <span class="text">{{ phrase }}</span>
          </li>
        </ol>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import dojokunRaw from '../../dojokun.txt?raw'

const router = useRouter()

const phrases = computed<string[]>(() =>
  dojokunRaw
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0),
)

const counters = ['一、', '二、', '三、', '四、', '五、', '六、', '七、', '八、', '九、', '十、']
</script>

<style scoped>
.dojokun-view {
  min-height: 100vh;
  background-color: #faf7f1;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  max-width: 720px;
  margin-bottom: 2rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  padding: 0.4rem 0.9rem;
  border-radius: 2px;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: Georgia, 'Noto Serif JP', serif;
}
.back-btn:hover { background: #1a1a1a; color: #faf7f1; }

.scroll {
  position: relative;
  width: 100%;
  max-width: 720px;
  background-color: #f8f4ec;
  border: 2px solid #1a1a1a;
  padding: 2.5rem 2rem;
  box-shadow: 0 1px 0 #1a1a1a, 0 2px 12px rgba(0, 0, 0, 0.06);
}

.scroll .inner {
  border: 1px solid #1a1a1a;
  padding: 2.25rem 2rem;
}

.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #8b2e2a;
}
.corner-tl { top: -6px; left: -6px; }
.corner-tr { top: -6px; right: -6px; }
.corner-bl { bottom: -6px; left: -6px; }
.corner-br { bottom: -6px; right: -6px; }

.oath-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.kanji {
  font-family: 'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.4em;
  margin: 0 0 0.5rem 0;
}

.romaji {
  font-family: Georgia, 'Noto Serif JP', serif;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #8b2e2a;
  margin: 0 0 1.25rem 0;
}

.hairline {
  display: block;
  width: 60px;
  height: 1px;
  background-color: #1a1a1a;
  margin: 0 auto;
  opacity: 0.5;
}

.phrases {
  list-style: none;
  margin: 0;
  padding: 0;
}

.phrase {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.12);
  font-family: 'Cormorant Garamond', 'Noto Serif JP', Georgia, serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #1a1a1a;
}
.phrase:last-child { border-bottom: none; }

.counter {
  font-family: 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
  color: #8b2e2a;
  font-size: 1rem;
  letter-spacing: 0.05em;
}

.text { font-style: italic; }

@media (max-width: 540px) {
  .scroll { padding: 1.5rem 1rem; }
  .scroll .inner { padding: 1.5rem 1rem; }
  .kanji { font-size: 2rem; letter-spacing: 0.3em; }
  .phrase { grid-template-columns: 2rem 1fr; font-size: 1rem; }
}
</style>
```

### 2. MODIFY — `src/router/index.ts`
Add the import and route:
```ts
import DojokunView from '../views/DojokunView.vue'
// ...
routes: [
  // ...existing routes
  { path: '/dojokun', component: DojokunView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
],
```

### 3. MODIFY — `src/views/HomeView.vue`
Add a new card in `.grid`:
```vue
<button class="category-card" @click="router.push('/dojokun')">
  <span class="card-title">Dojo Kun</span>
  <span class="card-desc">The Dojo Oath</span>
</button>
```

### 4. (Optional) MODIFY — `src/vite-env.d.ts`
Vite already types `?raw` imports for arbitrary files. If TypeScript complains for `.txt?raw`, add:
```ts
declare module '*.txt?raw' {
  const content: string
  export default content
}
```

## Verification Checklist
- [ ] `npm run build` passes (vue-tsc + vite); no TS errors on the `?raw` import.
- [ ] `/dojokun` renders 5 phrases from `dojokun.txt`, each prefixed with `一、 二、 三、 四、 五、`.
- [ ] Card has double border with red hanko-style corner accents; header shows 「道場訓」 + "DŌJŌ KUN".
- [ ] BOM and indentation in the source file are stripped (no leading whitespace shown).
- [ ] Back button returns to Home.
- [ ] Layout is readable on a 360 px-wide viewport.

## Open Questions
- Should the phrases also be shown in Japanese (kanji + furigana) alongside Spanish? Current plan: Spanish only (as the file contains).
- Should we add the traditional 「ひとつ、」 (hitotsu — "one,") prefix used in real dojo recital instead of `一、 二、 三、…`? Easy swap — change the `counters` array to `['一つ、','一つ、','一つ、','一つ、','一つ、']`.
- Display a vertical (top-to-bottom, right-to-left) layout for a more authentic scroll feel? Current plan: horizontal Western layout for readability.
