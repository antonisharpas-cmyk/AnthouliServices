import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()
  const stats = t('hero.stats')

  return (
    <section id="top" className="relative overflow-hidden bg-[#f6f6f6] pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* soft background composition */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-brand-100/70 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(104,137,72,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(104,137,72,0.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          }}
        />
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="eyebrow animate-fadeUp">{t('hero.eyebrow')}</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl xl:text-[5.5rem] animate-fadeUp [animation-delay:80ms]">
            {t('hero.title1')}
            <br />
            <span className="text-brand-500">{t('hero.title2')}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl animate-fadeUp [animation-delay:160ms]">
            {t('hero.subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fadeUp [animation-delay:240ms]">
            <a href="#services" className="btn-primary">
              {t('hero.ctaPrimary')} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-outline">{t('hero.ctaSecondary')}</a>
          </div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-card ring-1 ring-stone-200/70" />
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-brand-50 to-white" />
            <img
              src="/logo-mark.png"
              alt=""
              className="absolute inset-0 m-auto w-[62%] drop-shadow-[0_24px_40px_rgba(104,137,72,0.25)] animate-fadeUp [animation-delay:200ms]"
            />
            <div className="absolute -bottom-6 -left-8 rounded-2xl bg-white px-5 py-4 shadow-cardHover ring-1 ring-stone-200/70 animate-fadeUp [animation-delay:400ms]">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-450">Larnaca · Cyprus</div>
              <div className="mt-1 font-display text-lg font-semibold text-stone-900">Tax · Audit · Advisory</div>
            </div>
          </div>
        </div>
      </div>

      {/* stat strip */}
      <div className="container-x relative mt-16 lg:mt-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-stone-200/80 ring-1 ring-stone-200/80 md:grid-cols-4">
          {Array.isArray(stats) && stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-6">
              <dd className="font-display text-3xl font-semibold text-brand-600">{s.value}</dd>
              <dt className="mt-1 text-sm text-stone-500">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <a href="#about" className="mt-12 hidden items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-400 hover:text-brand-600 lg:flex">
        {t('hero.scroll')} <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
