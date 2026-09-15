import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

// Image tiles for the home page. Drop photos into /public/img/services/<icon>.jpg
// (tax-advisory uses "calculator.jpg", audit "file-check.jpg", etc.). Missing images fall back to a green gradient.
function Tile({ s, i }) {
  const [img, setImg] = useState(true)
  return (
    <Link
      to="/services"
      className="reveal group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-brand-800 p-6 text-white shadow-card transition-shadow hover:shadow-cardHover sm:aspect-[5/4]"
      style={{ transitionDelay: `${(i % 3) * 70}ms` }}
    >
      {img ? (
        <img
          src={`/img/services/${s.icon}.jpg`}
          alt=""
          onError={() => setImg(false)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950 transition-transform duration-700 ease-out group-hover:scale-110">
          <Icon name={s.icon} className="absolute -right-6 -top-6 h-40 w-40 text-white/10" strokeWidth={1} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent transition-opacity duration-500 group-hover:from-brand-950/95" />
      <div className="relative">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur transition-colors group-hover:bg-brand-500">
          <Icon name={s.icon} className="h-5 w-5" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-brand-50/90 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{s.text}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
          {s.points[0]} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default function ServicesOverview() {
  const { t } = useTranslation()
  const items = t('services.items')
  return (
    <section className="section bg-[#f6f6f6]">
      <div className="container-x">
        <SectionHeading eyebrow={t('home.servicesEyebrow')} title={t('home.servicesTitle')} intro={t('home.servicesIntro')} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(items) && items.map((s, i) => <Tile key={s.title} s={s} i={i} />)}
        </div>
        <div className="reveal mt-12 text-center">
          <Link to="/services" className="btn-primary">{t('home.servicesButton')} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}
