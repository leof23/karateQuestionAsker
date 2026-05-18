import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

export type AppLocale = 'en' | 'es'

const STORAGE_KEY = 'app.locale'

const isAppLocale = (value: string | null): value is AppLocale => value === 'en' || value === 'es'

const getInitialLocale = (): AppLocale => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isAppLocale(stored)) {
    return stored
  }

  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})

export const setLocale = (locale: AppLocale) => {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}
