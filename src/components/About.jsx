import { useTranslation } from 'react-i18next'
import { ShieldCheck, Target, Handshake, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

const VALUE_ICONS = [ShieldCheck, Target, Handshake, MessageSquare]

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values')
  const team = t('about.team')

  return (
    <section id="about" className="section bg-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} align="left" />
          </div>
          <div className="reveal lg:col-span-7">
            <p className="lead">{t('about.p1')}</p>
            <p className="lead mt-5">{t('about.p2')}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(values) && values.map((v, i) => {
            const Ic = VALUE_ICONS[i % VALUE_ICONS.length]
            return (
              <div key={v.title} className="reveal card" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Ic className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-stone-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{v.text}</p>
              </div>
            )
          })}
        </div>

        {/* Team */}
        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="reveal">
              <span className="eyebrow">{t('about.teamEyebrow')}</span>
              <h3 className="h2 mt-4 !text-3xl lg:!text-4xl">{t('about.teamTitle')}</h3>
              <p className="lead mt-5">{t('about.teamText')}</p>
              <Link to="/careers" className="btn-primary mt-7">
                {t('about.teamNote')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {Array.isArray(team) && team.map((m, i) => (
              <article key={m.name} className="reveal card flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-xl font-semibold tracking-wide text-white shadow-card" aria-hidden="true">
                    {m.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-semibold text-stone-900">{m.name}</h4>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{m.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-stone-600">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
