import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n'

export default function LanguageSwitcher({ dark = false }) {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.slice(0, 2) || 'en'
  return (
    <div
      className={`inline-flex items-center rounded-full border p-1 backdrop-blur ${dark ? 'border-white/15 bg-white/5' : 'border-stone-200 bg-white/80'}`}
      role="group"
      aria-label={t('lang.label')}
    >
      {LANGUAGES.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={active}
            title={t(`lang.${lng}`)}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active ? 'bg-brand-500 text-white' : dark ? 'text-brand-200 hover:text-white' : 'text-stone-500 hover:text-brand-700'
            }`}
          >
            {lng.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
