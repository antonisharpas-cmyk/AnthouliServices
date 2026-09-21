import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Optional media: drop /public/media/hero.mp4 (and /public/img/hero.jpg as poster) to get a video hero.
// When neither exists the animated green background is shown instead.
const VIDEO_SRC = '/media/hero.mp4'
const POSTER_SRC = '/img/hero.jpg'

export default function Hero() {
  const { t } = useTranslation()
  const [video, setVideo] = useState(true)
  const [poster, setPoster] = useState(true)
  const [offset, setOffset] = useState(0)

  // light parallax on the background layers
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => setOffset(Math.min(window.scrollY, 800))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="top" className="relative isolate overflow-hidden bg-brand-950 text-white">
      {/* media layer */}
      <div className="absolute inset-x-0 bottom-0 top-20 -z-10 sm:top-0" aria-hidden="true" style={{ transform: `translateY(${offset * 0.25}px)` }}>
        {poster && (
          <picture className="block h-full w-full">
            {/* portrait framing for phones so she is never cropped at the edge */}
            <source media="(max-width: 639px)" srcSet="/img/hero-mobile.jpg" />
            <img
              src={POSTER_SRC}
              alt=""
              onError={() => setPoster(false)}
              className="h-full w-full object-cover object-center sm:object-[68%_top] lg:object-[65%_top] animate-kenburns"
            />
          </picture>
        )}
        {video && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay muted loop playsInline
            onError={() => setVideo(false)}
          />
        )}
        {/* animated fallback / underlay */}
        <div className="absolute inset-0">
          <div className="aurora absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-brand-500/45 blur-3xl" />
          <div className="aurora-2 absolute right-[-10%] top-[20%] h-[36rem] w-[36rem] rounded-full bg-brand-300/25 blur-3xl" />
          <div className="aurora-3 absolute bottom-[-20%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-brand-700/60 blur-3xl" />
          <div
            className="absolute inset-0 opacity-30 animate-gridDrift"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse at 60% 40%, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 60% 40%, black 30%, transparent 75%)',
            }}
          />
        </div>
        {/* darkening overlay so text stays readable over video or image */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/45 to-brand-950/20 sm:from-brand-950/90 sm:via-brand-950/60 sm:to-brand-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-brand-950/15 sm:to-brand-950/45" />
      </div>

      <div className="container-x relative flex min-h-[78vh] items-center pt-32 pb-20 sm:min-h-[86vh] sm:pt-36 sm:pb-24 lg:min-h-[92vh] lg:pt-44 lg:pb-32">
        <div className="max-w-3xl">
          <span className="eyebrow text-brand-200 animate-fadeUp">{t('hero.eyebrow')}</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem] animate-fadeUp [animation-delay:80ms]">
            {t('hero.title1')}
            <br />
            <span className="text-brand-300">{t('hero.title2')}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-50/90 sm:text-xl animate-fadeUp [animation-delay:160ms]">
            {t('hero.subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fadeUp [animation-delay:240ms]">
            <Link to="/services" className="btn-light">
              {t('hero.ctaPrimary')} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn border border-white/30 text-white hover:border-white hover:bg-white/10">{t('hero.ctaSecondary')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
