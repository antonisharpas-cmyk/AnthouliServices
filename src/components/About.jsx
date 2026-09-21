import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, Target, Handshake, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import AboutIntro from './AboutIntro'
import Tilt from './Tilt'
import Marquee from './Marquee'

const VALUE_ICONS = [ShieldCheck, Target, Handshake, MessageSquare]

// Portraits are matched to the team list by position. Drop a file in and it is used;
// if the file is missing the card falls back to the member's initials.
const TEAM_PHOTOS = ['/img/team/constantina.jpg', '/img/team/gabriel.jpg']

function TeamCard({ m, i }) {
  const [photo, setPhoto] = useState(Boolean(TEAM_PHOTOS[i]))
  const initials = m.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')

  return (
    <Tilt as="article" className="reveal-scale ring-glow card group flex flex-col overflow-hidden !p-0" style={{ transitionDelay: `${i * 120}ms` }}>
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-100 sm:aspect-[5/6]">
        {photo ? (
          <img
            src={TEAM_PHOTOS[i]}
            alt={m.name}
            onError={() => setPhoto(false)}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800 transition-transform duration-[900ms] ease-out group-hover:scale-105">
            <span className="font-display text-7xl font-semibold tracking-wide text-white/90" aria-hidden="true">{initials}</span>
            <img src="/logo-mark.png" alt="" className="absolute -bottom-10 -right-8 w-44 opacity-[0.12]" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 via-brand-950/35 to-transparent p-5 pt-16 text-white">
          <h4 className="font-display text-xl font-semibold">{m.name}</h4>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">{m.role}</p>
        </div>
      </div>
      <p className="p-7 text-sm leading-relaxed text-stone-600">{m.bio}</p>
    </Tilt>
  )
}

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values')
  const team = t('about.team')
  const services = t('services.items')

  return (
    <>
      {/* same split band as the home page, with the full story */}
      <AboutIntro title={false} button={false} topPad pillars paragraphs={['about.p1', 'about.p2']} />

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
            <div className="reveal-left lg:sticky lg:top-28">
              <span className="eyebrow">{t('about.teamEyebrow')}</span>
              <h3 className="h2 mt-4 !text-3xl lg:!text-4xl">{t('about.teamTitle')}</h3>
              <p className="lead mt-5">{t('about.teamText')}</p>
              <Link to="/careers" className="btn-primary mt-7 hidden lg:inline-flex">
                {t('about.teamNote')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {Array.isArray(team) && team.map((m, i) => <TeamCard key={m.name} m={m} i={i} />)}
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
