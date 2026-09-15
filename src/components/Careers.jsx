import { useTranslation } from 'react-i18next'
import { GraduationCap, Globe2, Users, Sun } from 'lucide-react'
import SectionHeading from './SectionHeading'
import CareersForm from './CareersForm'

const PERK_ICONS = [GraduationCap, Globe2, Users, Sun]

export default function Careers() {
  const { t } = useTranslation()
  const perks = t('careers.perks')
  const openings = t('careers.openings')

  return (
    <section id="careers" className="section bg-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={t('careers.eyebrow')} title={t('careers.title')} intro={t('careers.intro')} align="left" />

            <h3 className="reveal mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-stone-450">{t('careers.perksTitle')}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Array.isArray(perks) && perks.map((p, i) => {
                const Ic = PERK_ICONS[i % PERK_ICONS.length]
                return (
                  <div key={p.title} className="reveal flex gap-3" style={{ transitionDelay: `${i * 60}ms` }}>
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Ic className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="font-display text-base font-semibold text-stone-900">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{p.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

          <div className="lg:col-span-6">
            <CareersForm openings={Array.isArray(openings) ? openings : []} />
          </div>
        </div>
      </div>
    </section>
  )
}
