# Plan: Numbers 1–20 Card Grid Component (Reviewed)

## Goal
Add a new static Numbers page that shows Japanese numbers 1–20 in a card grid.

Each card shows:
- Arabic numeral
- Kanji
- Romaji

No quiz behavior, no card flip, no random/list modes.

## Review Changes Applied (Suggestions)
1. Integrate with existing i18n setup (`vue-i18n`) instead of hardcoded Home/View text.
2. Add a back button on `NumbersView` for navigation consistency with other views.
3. Keep requested Home order intact and append Numbers as the new last card.
4. Use semantic list markup (`ul/li`) for better accessibility.
5. Keep desktop at 5 columns and use 2 columns on small screens for readability.

## Scope
- NEW `src/components/NumbersGrid.vue`
- NEW `src/views/NumbersView.vue`
- MODIFY `src/router/index.ts` (add `/numbers` route)
- MODIFY `src/views/HomeView.vue` (add Numbers card)
- MODIFY `src/i18n/locales/en.json`
- MODIFY `src/i18n/locales/es.json`

## Out of Scope
- Audio pronunciation
- Alternate reading toggles
- Hiragana line
- Quiz/interactive behavior

## Data (Static in NumbersGrid)
Primary dojo-friendly readings:

| # | Kanji | Romaji |
|---|---|---|
| 1 | 一 | ichi |
| 2 | 二 | ni |
| 3 | 三 | san |
| 4 | 四 | shi |
| 5 | 五 | go |
| 6 | 六 | roku |
| 7 | 七 | shichi |
| 8 | 八 | hachi |
| 9 | 九 | kyuu |
| 10 | 十 | juu |
| 11 | 十一 | juu-ichi |
| 12 | 十二 | juu-ni |
| 13 | 十三 | juu-san |
| 14 | 十四 | juu-shi |
| 15 | 十五 | juu-go |
| 16 | 十六 | juu-roku |
| 17 | 十七 | juu-shichi |
| 18 | 十八 | juu-hachi |
| 19 | 十九 | juu-kyuu |
| 20 | 二十 | ni-juu |

## Implementation Plan

### 1) NEW — `src/components/NumbersGrid.vue`
- Keep it presentational and self-contained.
- Define static `NumberItem[]` inline.
- Render with `ul.numbers-grid > li.number-card`.
- Grid layout:
  - Desktop/tablet: `repeat(5, 1fr)`
  - `<640px`: `repeat(2, 1fr)`

### 2) NEW — `src/views/NumbersView.vue`
- Thin wrapper around `NumbersGrid`.
- Use global i18n scope:
  - `t('numbers.title')`
  - `t('numbers.subtitle')`
  - `t('common.back')`
- Include back button to `/` for consistency.

### 3) MODIFY — `src/i18n/locales/en.json`
Add:
- `home.cards.numbers.title`: `"Numbers"`
- `home.cards.numbers.desc`: `"Japanese Numbers 1–20"`
- `numbers.title`: `"Numbers"`
- `numbers.subtitle`: `"Japanese numbers 1 to 20"`

### 4) MODIFY — `src/i18n/locales/es.json`
Add:
- `home.cards.numbers.title`: `"Números"`
- `home.cards.numbers.desc`: `"Números japoneses 1–20"`
- `numbers.title`: `"Números"`
- `numbers.subtitle`: `"Números japoneses del 1 al 20"`

### 5) MODIFY — `src/router/index.ts`
- Import `NumbersView`
- Add route: `{ path: '/numbers', component: NumbersView }`
- Keep catch-all route last.

### 6) MODIFY — `src/views/HomeView.vue`
- Add category card button linking to `/numbers`.
- Use i18n keys:
  - `t('home.cards.numbers.title')`
  - `t('home.cards.numbers.desc')`
- Placement: after `Unsoku` (as the new final card).

## Visual + UX Details
- Card style should match existing app cards:
  - white background
  - soft border
  - radius `12px`
  - subtle shadow
- Typography:
  - numeral: large + bold
  - kanji: medium-large
  - romaji: smaller muted text
- Equal heights for clean grid alignment (`min-height: 120px`).

## Verification Checklist
- [ ] `npm run build` passes without type errors.
- [ ] `/numbers` renders exactly 20 cards.
- [ ] Desktop shows 4 rows × 5 columns.
- [ ] Mobile shows 2 columns.
- [ ] Home card navigates to `/numbers`.
- [ ] EN/ES switch updates Numbers labels and Home card text.
- [ ] No console warnings.

## Optional Follow-up (Not in Phase 1)
- Add alternate readings (e.g., `shi/yon`, `shichi/nana`, `kyuu/ku`) as a secondary line.
- Add hiragana display toggle.
- Add audio pronunciation per card.
