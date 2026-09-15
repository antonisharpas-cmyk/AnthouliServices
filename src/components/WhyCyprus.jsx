import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

export default function WhyCyprus() {
  const { t } = useTranslation()
  const figures = t('whyCyprus.figures')
  const categories = t('whyCyprus.categories')
  const [activeIdx, setActiveIdx] = useState(0)
  const active = Array.isArray(categories) ? categories[activeIdx] || categories[0] : null

  return (
    <section id="why-cyprus" className="section relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 top-10 h-[36rem] w-[36rem] rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-500/20 blur-3xl" />
      </div>

      <div className="container-x relative">
        <SectionHeading eyebrow={t('whyCyprus.eyebrow')} title={t('whyCyprus.title')} intro={t('whyCyprus.intro')} light />

        {/* key figures */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {Array.isArray(figures) && figures.map((f, i) => (
            <div key={f.label} className="reveal rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="font-display text-3xl font-semibold text-brand-200">{f.value}</div>
              <div className="mt-2 text-xs leading-snug text-brand-100/90">{f.label}</div>
            </div>
          ))}
        </div>

        {/* categories: tabs on desktop, stacked cards on mobile */}
        <div className="reveal mt-16 hidden lg:block">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ul className="space-y-2">
                {categories.map((c, i) => (
                  <li key={c.title}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      aria-pressed={i === activeIdx}
                      className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all ${
                        i === activeIdx ? 'bg-white text-brand-900 shadow-cardHover' : 'bg-white/5 text-brand-50 hover:bg-white/10'
                      }`}
                    >
                      <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${i === activeIdx ? 'bg-brand-500 text-white' : 'bg-white/10 text-brand-200'}`}>
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <span className="font-display text-base font-semibold">{c.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              {active && (
                <div key={active.title} className="h-full rounded-3xl bg-white p-8 text-stone-800 shadow-cardHover lg:p-10 animate-fadeUp">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name={active.icon} />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-stone-900">{active.title}</h3>
                  </div>
                  <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                    {active.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 rounded-xl bg-[#f6f6f6] px-4 py-3 text-sm leading-relaxed text-stone-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* mobile: scrollable category chips + one panel */}
        <div className="reveal mt-12 lg:hidden">
          <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8">
            <div className="flex w-max gap-2">
              {Array.isArray(categories) && categories.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-pressed={i === activeIdx}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    i === activeIdx ? 'bg-white text-brand-900 shadow-cardHover' : 'bg-white/10 text-brand-50 hover:bg-white/15'
                  }`}
                >
                  <Icon name={c.icon} className="h-4 w-4" />
                  {c.title}
                </button>
              ))}
            </div>
          </div>
          {active && (
            <div key={active.title} className="mt-4 rounded-3xl bg-white p-6 text-stone-800 shadow-cardHover animate-fadeUp">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={active.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-stone-900">{active.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {active.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 rounded-xl bg-[#f6f6f6] px-4 py-3 text-sm leading-relaxed text-stone-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="reveal mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-brand-200/80">{t('whyCyprus.disclaimer')}</p>

        <div className="reveal mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 px-8 py-8 sm:flex-row">
          <p className="font-display text-xl font-semibold">{t('whyCyprus.cta')}</p>
          <Link to="/contact" className="btn-light">
            {t('whyCyprus.ctaButton')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
