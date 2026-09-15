import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import SectionHeading from './SectionHeading'

export default function WhyUs() {
  const { t } = useTranslation()
  const items = t('whyUs.items')

  return (
    <section id="why-us" className="section">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={t('whyUs.eyebrow')} title={t('whyUs.title')} align="left" />
            <div className="reveal mt-8 hidden lg:block">
              <img src="/logo-mark.png" alt="" className="w-40 opacity-90" />
            </div>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {Array.isArray(items) && items.map((it, i) => (
              <div key={it.title} className="reveal flex gap-4" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-stone-900">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
