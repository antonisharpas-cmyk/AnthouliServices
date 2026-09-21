import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react'
import Tilt from './Tilt'
import ContactForm from './ContactForm'
import { SITE } from '../data/site'

export default function Contact() {
  const { t } = useTranslation()
  const [photo, setPhoto] = useState(true)

  const Card = ({ icon: Ic, label, children, delay = 0 }) => (
    <Tilt className="reveal-scale ring-glow group flex gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-card hover:shadow-cardHover" style={{ transitionDelay: `${delay}ms` }}>
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
      {/* title over the photo on the left, form on the right */}
      <section id="contact" className="grid lg:grid-cols-2">
        <div className="relative isolate flex min-h-[360px] items-center overflow-hidden bg-brand-950 px-7 pb-14 pt-32 text-white sm:px-12 lg:min-h-[780px] lg:px-16 lg:pb-24 lg:pt-44 xl:px-20">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            {photo && (
              <img
                src="/img/contact.jpg"
                alt=""
                onError={() => setPhoto(false)}
                className="absolute inset-0 h-full w-full object-cover animate-kenburns"
              />
            )}
            <div className="absolute inset-0 bg-brand-950/72" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/65" />
            <div className="aurora absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-brand-500/35 blur-3xl" />
          </div>
          <div className="relative max-w-xl">
            <span className="eyebrow text-brand-200">{t('contact.eyebrow')}</span>
            <h1 className="h2 mt-5 text-white lg:!text-6xl">
              {String(t('contact.title')).split(' ').map((w, i) => (
                <span key={i}><span className="word-wrap"><span className="word" style={{ animationDelay: `${120 + i * 60}ms` }}>{w}</span></span>{' '}</span>
              ))}
            </h1>
          </div>
        </div>

        <div className="flex items-center bg-[#f6f6f6] px-5 py-14 sm:px-10 lg:px-14 lg:py-24 lg:pt-44 xl:px-16">
          <ContactForm className="reveal-right w-full rounded-3xl border border-stone-200/80 bg-white p-7 shadow-card sm:p-9" />
        </div>
      </section>

      {/* details */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          </div>

          <div className="reveal mt-4 flex items-center justify-between rounded-2xl bg-brand-950 px-5 py-4 text-white">
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

          {/* map */}
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
