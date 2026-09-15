import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Loader2 } from 'lucide-react'
import Select from './Select'
import Field from './Field'
import FormStatus from './FormStatus'
import { postForm, isEmail, isPhone } from '../lib/api'
import { SITE } from '../data/site'

export default function ContactForm() {
  const { t, i18n } = useTranslation()
  const services = t('services.items')
  const options = Array.isArray(services) ? services.map((s) => s.title) : []
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [statusMsg, setStatusMsg] = useState('')

  const update = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })) }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = t('form.required')
    if (!isEmail(form.email)) er.email = t('form.required')
    if (!isPhone(form.phone)) er.phone = t('form.required')
    if (!form.message.trim()) er.message = t('form.required')
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) { setStatus('error'); setStatusMsg(t('form.fixFields')); return }
    setStatus('sending'); setStatusMsg('')
    try {
      await postForm('/api/contact', { ...form, lang: i18n.language })
      setStatus('success'); setStatusMsg(t('form.success'))
      setForm({ name: '', phone: '', email: '', company: '', service: '', message: '' })
    } catch (err) {
      setStatus('error'); setStatusMsg(t('form.error', { email: SITE.email }))
    }
  }

  const complete = form.name.trim() && isEmail(form.email) && isPhone(form.phone) && form.message.trim()

  return (
    <form onSubmit={submit} noValidate className="reveal order-1 rounded-3xl border border-stone-200/80 bg-white p-7 shadow-card sm:p-9 lg:order-2 lg:col-span-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('contact.form.name')} required error={errors.name}>
          <input className={`input ${errors.name ? 'border-red-400' : ''}`} value={form.name} onChange={update('name')} autoComplete="name" />
        </Field>
        <Field label={t('contact.form.phone')} required error={errors.phone}>
          <input type="tel" className={`input ${errors.phone ? 'border-red-400' : ''}`} value={form.phone} onChange={update('phone')} autoComplete="tel" />
        </Field>
        <Field label={t('contact.form.email')} required error={errors.email}>
          <input type="email" className={`input ${errors.email ? 'border-red-400' : ''}`} value={form.email} onChange={update('email')} autoComplete="email" />
        </Field>
        <Field label={t('contact.form.company')}>
          <input className="input" value={form.company} onChange={update('company')} autoComplete="organization" />
        </Field>
        <Field label={t('contact.form.service')} className="sm:col-span-2">
          <Select
            value={form.service}
            onChange={(v) => setForm((f) => ({ ...f, service: v }))}
            options={options}
            placeholder={t('contact.form.servicePlaceholder')}
            label={t('contact.form.service')}
          />
        </Field>
        <Field label={t('contact.form.message')} required error={errors.message} className="sm:col-span-2">
          <textarea rows={6} className={`input resize-y ${errors.message ? 'border-red-400' : ''}`} value={form.message} onChange={update('message')} />
        </Field>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={status === 'sending' || !complete} className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50">
          {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> {t('form.sending')}</> : <>{t('contact.form.submit')} <Send className="h-4 w-4" /></>}
        </button>
      </div>
      <FormStatus status={status} message={statusMsg} />
    </form>
  )
}
