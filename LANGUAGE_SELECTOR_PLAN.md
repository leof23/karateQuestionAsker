# Plan: Language Selector & i18n (English / Spanish)

## Goal
Add a language selector on the Home view so users can switch UI language between English and Spanish. Add translation files and language persistence. This document is plan-only and does not include implementation.

## Locked Decisions
- i18n library: `vue-i18n@^11`
- API mode: Composition API (`legacy: false`)
- Selector location: Home view only
- Locales: `en` and `es`
- Persistence: `localStorage` key `app.locale`
- Fallback locale: `en`

## Scope Split

### Phase 1 (requested scope)
- Configure app-level i18n.
- Add `en.json` and `es.json` translation files.
- Add a language selector on Home.
- Translate Home UI strings only.

### Phase 2 (optional follow-up)
- Migrate strings in inner technique views.
- Add missing-key tooling and optional message pre-compilation plugin.
- Add additional locales if needed.

## File Plan (Phase 1)
```
src/
  i18n/
    index.ts
    locales/
      en.json
      es.json
  components/
    LanguageSelector.vue
  views/
    HomeView.vue
  main.ts
```

## Translation Schema
Use nested JSON objects, accessed via dot paths such as `t('home.title')`.

### `src/i18n/locales/en.json` (shape)
```json
{
  "common": {
    "language": "Language"
  },
  "home": {
    "title": "Karate Knowledge",
    "subtitle": "Select a category to practice",
    "cards": {
      "vocabulary":   { "title": "Vocabulary",     "desc": "Karate Vocabulary" },
      "karatedowasa": { "title": "Karate Do Wasa", "desc": "Technique Categories" },
      "zuki":         { "title": "Zuki Wasa",      "desc": "Punching Techniques" },
      "uke":          { "title": "Uke Wasa",       "desc": "Blocking Techniques" },
      "geri":         { "title": "Geri Wasa",      "desc": "Kicking Techniques" },
      "ibukiwasa":    { "title": "Ibuki Wasa",     "desc": "Breathing Techniques" },
      "kumitewasa":   { "title": "Kumite Wasa",    "desc": "Sparring Techniques" },
      "dachi":        { "title": "Dachi Wasa",     "desc": "Stances" },
      "unsoku":       { "title": "Unsoku",         "desc": "Footwork Concepts" }
    }
  }
}
```

### `src/i18n/locales/es.json` (shape)
Mirror the same keys from `en.json` with Spanish values.
- Example: `home.title` → `"Conocimientos de Karate"`
- Example: `home.subtitle` → `"Selecciona una categoría para practicar"`

Note: Technique names (Zuki, Uke, Geri, etc.) stay unchanged; only UI labels/descriptions are localized.

## Technical Design (Phase 1)

### 1) i18n module
Create `src/i18n/index.ts`:
- import `en.json` and `es.json`
- detect initial locale in this order:
  1. `localStorage.getItem('app.locale')`
  2. browser language prefix (`es` => `es`, otherwise `en`)
- create i18n instance with:
  - `legacy: false`
  - `locale: initial`
  - `fallbackLocale: 'en'`
  - `messages: { en, es }`
- expose helper `setLocale(locale)` to update i18n and persist to localStorage

### 2) App registration
Update `src/main.ts` to register i18n before mounting:
- `app.use(i18n)`

### 3) Language selector component
Create `src/components/LanguageSelector.vue`:
- compact `<select>` with options `English` and `Español`
- current value bound to global locale
- on change, call `setLocale(...)`

### 4) Home view integration
Update `src/views/HomeView.vue`:
- render `<LanguageSelector />` near the top of the page
- replace hard-coded strings with `t(...)` keys:
  - `home.title`
  - `home.subtitle`
  - `home.cards.*.title`
  - `home.cards.*.desc`

## Implementation Order (Phase 1)
1. Install `vue-i18n@^11`.
2. Add `en.json` and `es.json` locale files.
3. Add `src/i18n/index.ts` and locale persistence helper.
4. Register i18n in `src/main.ts`.
5. Create `src/components/LanguageSelector.vue`.
6. Integrate selector and `t(...)` calls in `HomeView.vue`.
7. Run build and smoke test.

## Acceptance Criteria (Phase 1)
- Home shows a language selector.
- Home strings switch instantly between English and Spanish.
- Selected language persists after page reload.
- Missing Spanish keys fall back to English without crashes.
- `npm run build` passes.

## Out of Scope for This Task
- Translating CSV data content.
- Moving selector to non-Home views.
- Full migration of all view strings.
- Additional locales beyond English and Spanish.