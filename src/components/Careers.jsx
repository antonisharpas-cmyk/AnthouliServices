import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GraduationCap, Globe2, Users, Sun, Send, Paperclip } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { SITE, mailto } from '../data/site'

const PERK_ICONS = [GraduationCap, Globe2, Users, Sun]

export default function Careers() {
  const { t } = useTranslation()
  const perks = t('careers.perks')
  const openings = t('careers.openings')
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const subject = `${t('careers.form.subject')}: ${form.position || ''} | ${form.name}`.trim()
    const body = [
      `${t('careers.form.name')}: ${form.name}`,
      `${t('careers.form.email')}: ${form.email}`,
      `${t('careers.form.phone')}: ${form.phone}`,
      `${t('careers.form.position')}: ${form.position}`,
      '',
      form.message,
      '',
      `(${t('careers.form.note')})`,
    ].join('\n')
    window.location.href = mailto(SITE.email, subject, body)
  }

  return (
    <section id="careers" className="section bg-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={t('careers.eyebrow')} title={t('careers.title')} intro={t('careers.intro')} align="left" />

            <h3 className="reveal mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-stone-450">{t('careers.perksTitle')}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Array.isArray(perks) && perks.map((p, i) => {
                const Ic = PERK_ICONS[i % PERK_ICONS.length]
                return (
                  <div key={p.title} className="reveal flex gap-3" style={{ transitionDelay: `${i * 60}ms` }}>
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Ic className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h4 className="font-display text-base font-semibold text-stone-900">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{p.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <h3 className="reveal mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-stone-450">{t('careers.openingsTitle')}</h3>
            <ul className="reveal mt-4 flex flex-wrap gap-2">
              {Array.isArray(openings) && openings.map((o) => (
                <li key={o} className="rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800">{o}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={submit} className="reveal rounded-3xl border border-stone-200/80 bg-[#f6f6f6] p-7 shadow-card sm:p-9">
              <h3 className="font-display text-2xl font-semibold text-stone-900">{t('careers.formTitle')}</h3>
              <p className="mt-2 text-sm text-stone-600">{t('careers.formIntro')}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="sr-only">{t('careers.form.name')}</span>
                  <input required className="input" placeholder={t('careers.form.name')} value={form.name} onChange={update('name')} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="sr-only">{t('careers.form.email')}</span>
                  <input required type="email" className="input" placeholder={t('careers.form.email')} value={form.email} onChange={update('email')} autoComplete="email" />
                </label>
                <label className="block">
                  <span className="sr-only">{t('careers.form.phone')}</span>
                  <input type="tel" className="input" placeholder={t('careers.form.phone')} value={form.phone} onChange={update('phone')} autoComplete="tel" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="sr-only">{t('careers.form.position')}</span>
                  <select required className="input" value={form.position} onChange={update('position')}>
                    <option value="" disabled>{t('careers.form.positionPlaceholder')}</option>
                    {Array.isArray(openings) && openings.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="sr-only">{t('careers.form.message')}</span>
                  <textarea required rows={5} className="input resize-y" placeholder={t('careers.form.messagePlaceholder')} value={form.message} onChange={update('message')} />
                </label>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-xs text-stone-500"><Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0" />{t('careers.form.note')}</p>
                <button type="submit" className="btn-primary shrink-0">
                  {t('careers.form.submit')} <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
