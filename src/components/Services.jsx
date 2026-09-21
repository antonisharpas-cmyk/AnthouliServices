import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import Tilt from './Tilt'
import Icon from './Icon'

// Same photo tile language as the home page, plus the full bullet breakdown under each tile.
function ServiceCard({ s, i }) {
  const [img, setImg] = useState(true)
  return (
    <Tilt as="article" className="reveal-scale group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-card hover:shadow-cardHover" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-800 text-white">
        {img ? (
          <img src={`/img/services/${s.icon}.jpg`} alt="" onError={() => setImg(false)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950 transition-transform duration-700 ease-out group-hover:scale-110">
            <Icon name={s.icon} className="absolute -right-6 -top-6 h-40 w-40 text-white/10" strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
        <span className="absolute right-5 top-5 font-display text-sm font-semibold text-white/50">{String(i + 1).padStart(2, '0')}</span>
        <div className="absolute inset-x-6 bottom-5 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur transition-colors group-hover:bg-brand-500">
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
          <h3 className="font-display text-xl font-semibold leading-tight">{s.title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-stone-600">{s.text}</p>
        <ul className="mt-5 space-y-2 border-t border-stone-100 pt-5">
          {s.points.map((p, j) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-stone-700 transition-transform duration-300 group-hover:translate-x-1" style={{ transitionDelay: `${j * 40}ms` }}>
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Tilt>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items')

  return (
    <>
      <PageHero eyebrow={t('services.eyebrow')} title={t('services.title')} intro={t('services.intro')} image="/img/services-hero.jpg" />
      <section id="services" className="section bg-[#f6f6f6]">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(items) && items.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
          </div>

          <div className="reveal mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl bg-brand-500 px-8 py-8 text-white sm:flex-row">
            <p className="font-display text-xl font-semibold">{t('services.cta')}</p>
            <Link to="/contact" className="btn-light">
              {t('services.ctaButton')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
