import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Full width dark call to action before the footer.
export default function CtaBand() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-600/40 blur-3xl" />
        <div className="aurora-2 absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand-400/25 blur-3xl" />
        <img src="/logo-mark.png" alt="" className="absolute -right-10 -top-10 w-[22rem] opacity-[0.06] lg:w-[30rem]" />
      </div>
      <div className="container-x relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="reveal max-w-3xl">
          <span className="eyebrow text-brand-200">{t('cta.eyebrow')}</span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{t('cta.title')}</h2>
        </div>
        <Link to="/contact" className="reveal btn-light shrink-0 !px-8 !py-4 text-base" style={{ transitionDelay: '120ms' }}>
          {t('cta.button')} <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
