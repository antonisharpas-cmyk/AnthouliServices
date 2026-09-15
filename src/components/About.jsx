import { useTranslation } from 'react-i18next'
import { ShieldCheck, Target, Handshake, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import Tilt from './Tilt'
import Marquee from './Marquee'
import CountUp from './CountUp'

const VALUE_ICONS = [ShieldCheck, Target, Handshake, MessageSquare]

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values')
  const team = t('about.team')
  const services = t('services.items')
  const stats = t('hero.stats')

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')}>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <p className="lead text-brand-50/90 animate-fadeUp [animation-delay:500ms]">{t('about.p1')}</p>
          <p className="lead text-brand-50/90 animate-fadeUp [animation-delay:620ms]">{t('about.p2')}</p>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4 animate-fadeUp [animation-delay:760ms]">
          {Array.isArray(stats) && stats.map((s) => (
            <div key={s.label} className="bg-brand-950/40 px-6 py-5">
              <dd className="font-display text-3xl font-semibold text-white"><CountUp value={s.value} /></dd>
              <dt className="mt-1 text-sm text-brand-100/80">{s.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Marquee items={Array.isArray(services) ? services.map((s) => s.title) : []} />

      {/* values */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(values) && values.map((v, i) => {
              const Ic = VALUE_ICONS[i % VALUE_ICONS.length]
              return (
                <Tilt key={v.title} className="reveal-scale ring-glow card group" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-brand-500 group-hover:text-white">
                    <Ic className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-stone-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{v.text}</p>
                  <span className="mt-5 block h-px w-8 bg-brand-500 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                </Tilt>
              )
            })}
          </div>
        </div>
      </section>

      {/* team */}
      <section id="team" className="section relative overflow-hidden bg-[#f6f6f6]">
        <img src="/logo-mark.png" alt="" className="pointer-events-none absolute -left-24 top-10 w-[22rem] opacity-[0.05] animate-floatY" aria-hidden="true" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="reveal-left">
              <span className="eyebrow">{t('about.teamEyebrow')}</span>
              <h3 className="h2 mt-4 !text-3xl lg:!text-4xl">{t('about.teamTitle')}</h3>
              <p className="lead mt-5">{t('about.teamText')}</p>
              <Link to="/careers" className="btn-primary mt-7 hidden lg:inline-flex">
                {t('about.teamNote')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {Array.isArray(team) && team.map((m, i) => (
              <Tilt as="article" key={m.name} className="reveal-right ring-glow card group flex flex-col" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-xl font-semibold tracking-wide text-white shadow-card transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" aria-hidden="true">
                    {m.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-semibold text-stone-900">{m.name}</h4>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{m.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-stone-600">{m.bio}</p>
              </Tilt>
            ))}
          </div>
          <div className="reveal lg:hidden">
            <Link to="/careers" className="btn-primary w-full text-center">
              {t('about.teamNote')} <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
