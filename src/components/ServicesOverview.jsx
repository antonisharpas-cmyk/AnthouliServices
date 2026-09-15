import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

// Compact services grid for the home page. Full breakdown lives on /services.
export default function ServicesOverview() {
  const { t } = useTranslation()
  const items = t('services.items')
  return (
    <section className="section bg-[#f6f6f6]">
      <div className="container-x">
        <SectionHeading eyebrow={t('home.servicesEyebrow')} title={t('home.servicesTitle')} intro={t('home.servicesIntro')} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(items) && items.map((s, i) => (
            <Link key={s.title} to="/services" className="reveal group flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white px-5 py-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardHover" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-semibold text-stone-900">{s.title}</span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
            </Link>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <Link to="/services" className="btn-primary">{t('home.servicesButton')} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}
