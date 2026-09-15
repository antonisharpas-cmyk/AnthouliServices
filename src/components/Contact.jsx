import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react'
import PageHero from './PageHero'
import Tilt from './Tilt'
import ContactForm from './ContactForm'
import { SITE } from '../data/site'

export default function Contact() {
  const { t } = useTranslation()

  const Card = ({ icon: Ic, label, children, delay = 0 }) => (
    <Tilt className="reveal-left ring-glow group flex gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-card hover:shadow-cardHover" style={{ transitionDelay: `${delay}ms` }}>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white">
        <Ic className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-450">{label}</div>
        <div className="mt-1 text-base text-stone-800">{children}</div>
      </div>
    </Tilt>
  )

  return (
    <>
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} intro={t('contact.intro')} />

      <section id="contact" className="section bg-[#f6f6f6]">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="order-2 space-y-4 lg:order-1 lg:col-span-5">
              <Card icon={MapPin} label={t('contact.address')}>
                {t('contact.addressValue')}
                <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-1.5 flex w-fit items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
                  {t('contact.directions')} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Card>
              <Card icon={Phone} label={t('contact.phone')} delay={80}>
                <a href={`tel:${SITE.phone}`} className="hover:text-brand-700">T: {SITE.phoneDisplay}</a>
                <br />
                <a href={`tel:${SITE.mobile}`} className="hover:text-brand-700">M: {SITE.mobileDisplay}</a>
              </Card>
              <Card icon={Mail} label={t('contact.email')} delay={160}>
                <a href={`mailto:${SITE.email}`} className="hover:text-brand-700">{SITE.email}</a>
              </Card>
              <Card icon={Clock} label={t('contact.hours')} delay={240}>
                {t('contact.hoursValue')}
                <br />
                <span className="text-sm text-stone-500">{t('contact.hoursClosed')}</span>
              </Card>
              <div className="reveal-left flex items-center justify-between rounded-2xl bg-brand-950 px-5 py-4 text-white" style={{ transitionDelay: '320ms' }}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">{t('contact.follow')}</div>
                <div className="flex gap-2">
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-brand-500">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-brand-500">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="clip-reveal mt-10 overflow-hidden rounded-3xl border border-stone-200/80 shadow-card">
            <iframe
              title="C. Anthouli Ltd office location"
              src={SITE.mapsEmbed}
              className="h-[420px] w-full grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}
