import { useTranslation } from 'react-i18next'
import { GraduationCap, Globe2, Users, Sun } from 'lucide-react'
import PageHero from './PageHero'
import Tilt from './Tilt'
import CareersForm from './CareersForm'

const PERK_ICONS = [GraduationCap, Globe2, Users, Sun]

export default function Careers() {
  const { t } = useTranslation()
  const perks = t('careers.perks')
  const openings = t('careers.openings')

  return (
    <>
      <PageHero eyebrow={t('careers.eyebrow')} title={t('careers.title')} intro={t('careers.intro')} />

      <section id="careers" className="section relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora-2 absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full bg-brand-100/70 blur-3xl" />
        </div>
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h3 className="reveal-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-450">{t('careers.perksTitle')}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Array.isArray(perks) && perks.map((p, i) => {
                const Ic = PERK_ICONS[i % PERK_ICONS.length]
                return (
                  <Tilt key={p.title} className="reveal-scale ring-glow card group !p-6" style={{ transitionDelay: `${i * 90}ms` }}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand-500 group-hover:text-white">
                      <Ic className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h4 className="mt-4 font-display text-base font-semibold text-stone-900">{p.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{p.text}</p>
                  </Tilt>
                )
              })}
            </div>
            <div className="reveal-left mt-10 rounded-3xl bg-brand-950 p-8 text-white" style={{ transitionDelay: '200ms' }}>
              <img src="/logo-mark.png" alt="" className="mb-5 w-14 opacity-90" />
              <p className="font-display text-2xl font-semibold leading-snug">{t('about.teamTitle')}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-100/80">{t('about.teamText')}</p>
            </div>
          </div>

          <div className="reveal-right lg:col-span-6">
            <CareersForm openings={Array.isArray(openings) ? openings : []} />
          </div>
        </div>
      </section>
    </>
  )
}
