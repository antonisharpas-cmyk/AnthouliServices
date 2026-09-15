import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'
import ContactForm from './ContactForm'
import { SITE } from '../data/site'

export default function Contact() {
  const { t } = useTranslation()

  const Row = ({ icon: Ic, label, children }) => (
    <div className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Ic className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-450">{label}</div>
        <div className="mt-1 text-base text-stone-800">{children}</div>
      </div>
    </div>
  )

  return (
    <section id="contact" className="section bg-[#f6f6f6]">
      <div className="container-x">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} intro={t('contact.intro')} />

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="reveal order-2 space-y-7 lg:order-1 lg:col-span-5">
            <Row icon={MapPin} label={t('contact.address')}>
              {t('contact.addressValue')}
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-1.5 flex w-fit items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
                {t('contact.directions')} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Row>
            <Row icon={Phone} label={t('contact.phone')}>
              <a href={`tel:${SITE.phone}`} className="hover:text-brand-700">T: {SITE.phoneDisplay}</a>
              <br />
              <a href={`tel:${SITE.mobile}`} className="hover:text-brand-700">M: {SITE.mobileDisplay}</a>
            </Row>
            <Row icon={Mail} label={t('contact.email')}>
              <a href={`mailto:${SITE.email}`} className="hover:text-brand-700">{SITE.email}</a>
            </Row>
            <Row icon={Clock} label={t('contact.hours')}>
              {t('contact.hoursValue')}
              <br />
              <span className="text-sm text-stone-500">{t('contact.hoursClosed')}</span>
            </Row>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-450">{t('contact.follow')}</div>
              <div className="mt-3 flex gap-3">
                <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 transition-colors hover:border-brand-500 hover:text-brand-700">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 transition-colors hover:border-brand-500 hover:text-brand-700">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="reveal mt-10 overflow-hidden rounded-3xl border border-stone-200/80 shadow-card">
          <iframe
            title="C. Anthouli Ltd office location"
            src={SITE.mapsEmbed}
            className="h-[380px] w-full grayscale-[35%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
