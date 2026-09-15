import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Facebook, Instagram, Mail, PhoneCall, MapPin, Smartphone, Building2 } from 'lucide-react'
import { SITE } from '../data/site'
import LanguageSwitcher from '../components/LanguageSwitcher'

// Hidden "link in bio" page at /link. Not in the navigation.
export default function LinkPage() {
  const { t } = useTranslation()
  const [showCall, setShowCall] = useState(false)

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#1a2314'
    return () => { document.body.style.background = prev }
  }, [])

  const links = [
    { icon: Globe, label: t('link.website'), href: SITE.website },
    { icon: Facebook, label: t('link.facebook'), href: SITE.facebook },
    { icon: Instagram, label: t('link.instagram'), href: SITE.instagram },
    { icon: Mail, label: t('link.email'), href: `mailto:${SITE.email}` },
    { icon: PhoneCall, label: t('link.call'), action: () => setShowCall((v) => !v) },
    { icon: MapPin, label: t('link.directions'), href: SITE.mapsUrl },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-950 text-white">
      {/* halftone wave background */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 1000">
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="2.2" fill="#b4c2a2" />
          </pattern>
          <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="m1"><rect width="1600" height="1000" fill="url(#fade)" /></mask>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0" stopColor="#688948" stopOpacity="0.55" />
            <stop offset="1" stopColor="#688948" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="1000" fill="#1a2314" />
        <ellipse cx="800" cy="520" rx="900" ry="420" fill="url(#glow)" />
        <g mask="url(#m1)" opacity="0.5">
          <path d="M-100 380 C 300 200, 600 600, 900 420 S 1500 250, 1750 380 L 1750 480 C 1450 380, 1200 560, 900 520 S 300 320, -100 480 Z" fill="url(#dots)" />
          <path d="M-100 760 C 350 600, 650 900, 1000 740 S 1500 620, 1750 760 L 1750 830 C 1450 740, 1200 900, 1000 820 S 350 700, -100 830 Z" fill="url(#dots)" opacity="0.7" />
          <path d="M-100 120 C 400 40, 700 260, 1100 140 S 1500 60, 1750 140 L 1750 190 C 1450 130, 1200 300, 1100 200 S 400 120, -100 190 Z" fill="url(#dots)" opacity="0.45" />
        </g>
      </svg>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 py-14 sm:py-20">
        <img src="/logo-white.png" alt={SITE.name} className="h-14 w-auto sm:h-16 animate-fadeUp" />
        <p className="mt-5 text-center text-base tracking-wide text-brand-200 animate-fadeUp [animation-delay:80ms]">{t('link.tagline')}</p>

        <ul className="mt-10 w-full space-y-3.5">
          {links.map((l, i) => {
            const Ic = l.icon
            const external = l.href?.startsWith('http')
            const cls = 'group flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300/70 hover:bg-white/[0.12] hover:shadow-[0_12px_30px_rgba(104,137,72,0.35)]'
            return (
              <li key={l.label} className="animate-fadeUp" style={{ animationDelay: `${140 + i * 70}ms` }}>
                {l.action ? (
                  <>
                    <button type="button" onClick={l.action} aria-expanded={showCall} className={`${cls} ${showCall ? 'border-brand-300/70 bg-white/[0.12]' : ''}`}>
                      <Ic className="h-5 w-5 text-brand-200 transition-colors group-hover:text-white" strokeWidth={1.75} />
                      {l.label}
                    </button>
                    {showCall && (
                      <div className="mt-3 grid gap-2.5 rounded-3xl border border-white/10 bg-white/[0.04] p-3 animate-fadeUp [animation-duration:220ms]">
                        <p className="px-2 pt-1 text-center text-[11px] uppercase tracking-[0.18em] text-brand-200/80">{t('link.callChoose')}</p>
                        <a href={`tel:${SITE.phone}`} className="flex items-center justify-between gap-3 rounded-full bg-brand-500 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400">
                          <span className="flex items-center gap-2.5"><Building2 className="h-4 w-4" strokeWidth={1.75} /> {t('link.callOffice')}</span>
                          <span className="tabular-nums tracking-wide">{SITE.phoneDisplay}</span>
                        </a>
                        <a href={`tel:${SITE.mobile}`} className="flex items-center justify-between gap-3 rounded-full bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                          <span className="flex items-center gap-2.5"><Smartphone className="h-4 w-4" strokeWidth={1.75} /> {t('link.callMobile')}</span>
                          <span className="tabular-nums tracking-wide">{SITE.mobileDisplay}</span>
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <a href={l.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cls}>
                    <Ic className="h-5 w-5 text-brand-200 transition-colors group-hover:text-white" strokeWidth={1.75} />
                    {l.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-10 animate-fadeUp [animation-delay:600ms]">
          <LanguageSwitcher dark />
        </div>
        <p className="mt-8 text-center text-xs text-brand-200/60">© {new Date().getFullYear()} {SITE.name}</p>
      </div>
    </main>
  )
}
