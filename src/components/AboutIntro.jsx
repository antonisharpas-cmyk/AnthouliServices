import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Split band: photo on the left, brand green panel on the right.
// Home page uses the heading and a link through to /about; the About page
// runs the full story with the three core service pillars underneath.
export default function AboutIntro({
  eyebrow = true,
  title = true,
  button = true,
  topPad = false,
  pillars = false,
  light = false,
  paragraphs = ['about.p1'],
}) {
  const { t } = useTranslation()
  const [img, setImg] = useState(true)
  const services = t('services.items')
  const core = Array.isArray(services) ? services.slice(0, 3) : []

  return (
    <section className={`bg-white ${topPad ? 'pt-20' : ''}`}>
      <div className="grid lg:grid-cols-2">
        {/* photo */}
        <div className="reveal-left relative min-h-[320px] overflow-hidden bg-brand-900 lg:min-h-[680px]">
          {img ? (
            <img
              src="/img/about.jpg"
              alt=""
              onError={() => setImg(false)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-950" />
          )}
          <div className={`absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-r from-transparent lg:block ${light ? 'to-white' : 'to-brand-600/90'}`} />
        </div>

        {/* green panel */}
        <div className={`reveal-right relative flex items-center overflow-hidden px-7 py-16 sm:px-12 lg:px-16 lg:py-24 xl:px-20 ${light ? 'bg-white text-stone-800' : 'bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 text-white'}`}>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className={`aurora absolute -right-28 -top-28 h-[30rem] w-[30rem] rounded-full blur-3xl ${light ? 'bg-brand-100/70' : 'bg-brand-300/20'}`} />
            <img src="/logo-mark.png" alt="" className={`absolute -bottom-20 -right-12 w-72 animate-floatY ${light ? 'opacity-[0.05]' : 'opacity-[0.07]'}`} />
          </div>

          <div className="relative w-full max-w-xl">
            {eyebrow && (
              <span className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] ${light ? 'text-brand-600' : 'text-brand-100'}`}>
                <span className={`block h-px w-10 ${light ? 'bg-brand-400' : 'bg-brand-200/70'}`} />
                {t('about.eyebrow')}
              </span>
            )}

            {title && (
              <h2 className={`mt-6 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[2.7rem] ${light ? 'text-stone-900' : ''}`}>
                {t('about.title')}
              </h2>
            )}

            {paragraphs.map((key, i) => (
              <p
                key={key}
                className={
                  i === 0
                    ? `font-display text-[1.32rem] font-light leading-[1.55] tracking-[-0.01em] sm:text-[1.45rem] ${light ? 'text-stone-700' : 'text-white'} ${title ? 'mt-7' : eyebrow ? 'mt-8' : ''}`
                    : `mt-6 text-[0.98rem] leading-[1.75] sm:text-base ${light ? 'text-stone-600' : 'text-brand-50/80'}`
                }
              >
                {t(key)}
              </p>
            ))}

            {pillars && core.length > 0 && (
              <div className="mt-10">
                <span className={`block h-px w-full bg-gradient-to-r to-transparent ${light ? 'from-stone-300' : 'from-brand-200/45'}`} />
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2.5">
                  {core.map((s, i) => (
                    <li key={s.title}>
                      <Link
                        to="/services"
                        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8rem] font-medium tracking-wide backdrop-blur transition-all duration-300 ${light ? 'border-stone-200 bg-stone-50 text-stone-700 hover:border-brand-400 hover:bg-white' : 'border-white/25 bg-white/[0.07] hover:border-white/70 hover:bg-white/15'}`}
                      >
                        <span className={`font-display text-[0.7rem] font-semibold ${light ? 'text-brand-600' : 'text-brand-200'}`}>0{i + 1}</span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {button && (
              <Link
                to="/about"
                className={light ? 'btn-primary mt-9' : 'btn mt-9 border border-white/40 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white hover:text-brand-800'}
              >
                {t('home.aboutButton')} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
