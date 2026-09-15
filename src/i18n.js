import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import el from './locales/el.json'
import ru from './locales/ru.json'

export const LANGUAGES = ['en', 'el', 'ru']

function detectLanguage() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved && LANGUAGES.includes(saved)) return saved
  } catch (e) { /* storage unavailable */ }
  return 'en'
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, el: { translation: el }, ru: { translation: ru } },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

function applyMeta(lng) {
  document.documentElement.lang = lng
  const t = i18n.getFixedT(lng)
  document.title = t('meta.title')
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', t('meta.description'))
  try { localStorage.setItem('lang', lng) } catch (e) { /* ignore */ }
}

i18n.on('languageChanged', applyMeta)
applyMeta(i18n.language)

export default i18n
