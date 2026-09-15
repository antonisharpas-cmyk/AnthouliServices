import { useTranslation } from 'react-i18next'
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NAV, SITE } from '../data/site'

export default function Footer() {
  const { t } = useTranslation()
  const services = t('services.items')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src="/logo-white.png" alt={SITE.name} className="h-12 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone-400">{t('footer.tagline')}</p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-700 text-stone-300 transition-colors hover:border-brand-300 hover:text-brand-300">
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-700 text-stone-300 transition-colors hover:border-brand-300 hover:text-brand-300">
              <Facebook className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{t('footer.quickLinks')}</h4>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.key}><Link to={n.path} className="hover:text-brand-300">{t(`nav.${n.key}`)}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{t('footer.servicesTitle')}</h4>
          <ul className="mt-5 space-y-2.5 text-sm">
            {Array.isArray(services) && services.slice(0, 7).map((s) => (
              <li key={s.title}><Link to="/services" className="hover:text-brand-300">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{t('footer.contactTitle')}</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />{t('contact.addressValue')}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /><a href={`tel:${SITE.phone}`} className="hover:text-brand-300">{SITE.phoneDisplay}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /><a href={`mailto:${SITE.email}`} className="hover:text-brand-300">{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container-x py-6 text-xs text-stone-500">
          <div>
            <p>© {year} {SITE.name}. {t('footer.rights')}</p>
            <p className="mt-1">{t('footer.regulated')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
