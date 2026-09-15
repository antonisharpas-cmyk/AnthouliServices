import { useTranslation } from 'react-i18next'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items')

  return (
    <section id="services" className="section bg-[#f6f6f6]">
      <div className="container-x">
        <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} intro={t('services.intro')} />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(items) && items.map((s, i) => (
            <article key={s.title} className="reveal card group flex flex-col" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={s.icon} />
                </div>
                <span className="font-display text-sm font-semibold text-stone-300">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{s.text}</p>
              <ul className="mt-5 space-y-2 border-t border-stone-100 pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="reveal mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl bg-brand-500 px-8 py-8 text-white sm:flex-row">
          <p className="font-display text-xl font-semibold">{t('services.cta')}</p>
          <Link to="/contact" className="btn-light">
            {t('services.ctaButton')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
