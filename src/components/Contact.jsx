import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { SITE, mailto } from '../data/site'

export default function Contact() {
  const { t } = useTranslation()
  const services = t('services.items')
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', service: '', message: '' })
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const subject = `${t('contact.form.subject')}${form.service ? `: ${form.service}` : ''} | ${form.name}`
    const body = [
      `${t('contact.form.name')}: ${form.name}`,
      `${t('contact.form.company')}: ${form.company}`,
      `${t('contact.form.email')}: ${form.email}`,
      `${t('contact.form.phone')}: ${form.phone}`,
      `${t('contact.form.service')}: ${form.service}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = mailto(SITE.email, subject, body)
  }

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
          <div className="reveal space-y-7 lg:col-span-5">
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

          <form onSubmit={submit} className="reveal rounded-3xl border border-stone-200/80 bg-white p-7 shadow-card sm:p-9 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required className="input" placeholder={t('contact.form.name')} value={form.name} onChange={update('name')} autoComplete="name" aria-label={t('contact.form.name')} />
              <input type="tel" className="input" placeholder={t('contact.form.phone')} value={form.phone} onChange={update('phone')} autoComplete="tel" aria-label={t('contact.form.phone')} />
              <input required type="email" className="input" placeholder={t('contact.form.email')} value={form.email} onChange={update('email')} autoComplete="email" aria-label={t('contact.form.email')} />
              <input className="input" placeholder={t('contact.form.company')} value={form.company} onChange={update('company')} autoComplete="organization" aria-label={t('contact.form.company')} />
              <select className="input sm:col-span-2" value={form.service} onChange={update('service')} aria-label={t('contact.form.service')}>
                <option value="">{t('contact.form.servicePlaceholder')}</option>
                {Array.isArray(services) && services.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
              </select>
              <textarea required rows={6} className="input resize-y sm:col-span-2" placeholder={t('contact.form.message')} value={form.message} onChange={update('message')} aria-label={t('contact.form.message')} />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-stone-500">{t('contact.form.note')}</p>
              <button type="submit" className="btn-primary shrink-0">
                {t('contact.form.submit')} <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
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
