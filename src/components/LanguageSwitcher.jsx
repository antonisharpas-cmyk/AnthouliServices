import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n'

export default function LanguageSwitcher({ compact = false }) {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.slice(0, 2) || 'en'
  return (
    <div className="inline-flex items-center rounded-full border border-stone-200 bg-white/80 p-1 backdrop-blur" role="group" aria-label={t('lang.label')}>
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
            current === lng ? 'bg-brand-500 text-white' : 'text-stone-500 hover:text-brand-700'
          }`}
          title={t(`lang.${lng}`)}
        >
          {compact ? lng.toUpperCase() : lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
