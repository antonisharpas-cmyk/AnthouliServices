import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n'
import { FLAGS } from './Flags'

// Segmented control: flag + code side by side, the active language filled in brand green.
export default function LanguageSwitcher({ dark = false, compact = false }) {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.slice(0, 2) || 'en'
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-1 ${dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-stone-100 ring-1 ring-stone-200/70'}`}
      role="group"
      aria-label={t('lang.label')}
    >
      {LANGUAGES.map((lng) => {
        const active = current === lng
        const Flag = FLAGS[lng]
        return (
          <button
            key={lng}
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={active}
            aria-label={t(`lang.${lng}`)}
            title={t(`lang.${lng}`)}
            className={`inline-flex h-8 items-center gap-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 ${compact && !active ? 'px-1.5' : 'pl-1.5 pr-2.5'} ${
              active
                ? 'bg-brand-500 text-white shadow-[0_2px_8px_rgba(104,137,72,0.35)]'
                : dark ? 'text-brand-100 hover:bg-white/10' : 'text-stone-500 hover:bg-white hover:text-stone-800'
            }`}
          >
            <span className={`inline-flex rounded-full ${active ? 'ring-2 ring-white/70' : ''}`}><Flag size={18} /></span>
            {(!compact || active) && <span>{lng.toUpperCase()}</span>}
          </button>
        )
      })}
    </div>
  )
}
