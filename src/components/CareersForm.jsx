import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Upload, FileText, X, Loader2 } from 'lucide-react'
import Select from './Select'
import Field from './Field'
import FormStatus from './FormStatus'
import { postForm, isEmail, isPhone } from '../lib/api'
import { SITE } from '../data/site'

const MAX_MB = 5
const ACCEPT = '.pdf,.doc,.docx,.odt,.rtf,.txt'

export default function CareersForm({ openings }) {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [drag, setDrag] = useState(false)
  const fileInput = useRef(null)

  const update = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })) }

  const pickFile = (f) => {
    if (!f) return
    if (f.size > MAX_MB * 1024 * 1024) { setErrors((er) => ({ ...er, cv: t('form.cvHint') })); return }
    if (!/\.(pdf|doc|docx|odt|rtf|txt)$/i.test(f.name)) { setErrors((er) => ({ ...er, cv: t('form.cvHint') })); return }
    setFile(f); setErrors((er) => ({ ...er, cv: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = t('form.required')
    if (!isEmail(form.email)) er.email = t('form.required')
    if (!isPhone(form.phone)) er.phone = t('form.required')
    if (!form.position) er.position = t('form.required')
    if (!file) er.cv = t('form.cvRequired')
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) { setStatus('error'); setStatusMsg(t('form.fixFields')); return }
    setStatus('sending'); setStatusMsg('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('lang', i18n.language)
      fd.append('cv', file)
      await postForm('/api/apply', fd)
      setStatus('success'); setStatusMsg(t('form.successApply'))
      setForm({ name: '', email: '', phone: '', position: '', message: '' }); setFile(null)
    } catch (err) {
      setStatus('error'); setStatusMsg(t('form.error', { email: SITE.email }))
    }
  }

  const complete = form.name.trim() && isEmail(form.email) && isPhone(form.phone) && form.position && file

  return (
    <form onSubmit={submit} noValidate className="reveal rounded-3xl border border-stone-200/80 bg-[#f6f6f6] p-7 shadow-card sm:p-9">
      <h3 className="font-display text-2xl font-semibold text-stone-900">{t('careers.formTitle')}</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={t('careers.form.name')} required error={errors.name} className="sm:col-span-2">
          <input className={`input ${errors.name ? 'border-red-400' : ''}`} value={form.name} onChange={update('name')} autoComplete="name" />
        </Field>
        <Field label={t('careers.form.email')} required error={errors.email}>
          <input type="email" className={`input ${errors.email ? 'border-red-400' : ''}`} value={form.email} onChange={update('email')} autoComplete="email" />
        </Field>
        <Field label={t('careers.form.phone')} required error={errors.phone}>
          <input type="tel" className={`input ${errors.phone ? 'border-red-400' : ''}`} value={form.phone} onChange={update('phone')} autoComplete="tel" />
        </Field>
        <Field label={t('careers.form.position')} required error={errors.position} className="sm:col-span-2">
          <Select
            value={form.position}
            onChange={(v) => { setForm((f) => ({ ...f, position: v })); setErrors((er) => ({ ...er, position: undefined })) }}
            options={openings}
            placeholder={t('careers.form.positionPlaceholder')}
            invalid={!!errors.position}
            label={t('careers.form.position')}
            required
          />
        </Field>

        {/* CV upload */}
        <Field label={t('form.cv')} required error={errors.cv} className="sm:col-span-2">
          <input ref={fileInput} type="file" accept={ACCEPT} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
          {file ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-300 bg-brand-50 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-5 w-5 shrink-0 text-brand-600" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-stone-800">{file.name}</div>
                  <div className="text-xs text-stone-500">{t('form.cvChosen')} · {(file.size / 1024).toFixed(0)} KB</div>
                </div>
              </div>
              <button type="button" onClick={() => setFile(null)} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-white hover:text-red-600">
                <X className="h-3.5 w-3.5" /> {t('form.cvRemove')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]) }}
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${
                errors.cv ? 'border-red-300 bg-red-50/40' : drag ? 'border-brand-500 bg-brand-50' : 'border-stone-300 bg-white hover:border-brand-400 hover:bg-brand-50/50'
              }`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Upload className="h-5 w-5" /></span>
              <span className="text-sm font-semibold text-stone-800">{t('form.cv')}</span>
              <span className="text-xs text-stone-500">{t('form.cvHint')}</span>
            </button>
          )}
        </Field>

        <Field label={t('careers.form.message')} className="sm:col-span-2">
          <textarea rows={5} className="input resize-y" placeholder={t('careers.form.messagePlaceholder')} value={form.message} onChange={update('message')} />
        </Field>
      </div>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={status === 'sending' || !complete} className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50">
          {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> {t('form.sending')}</> : <>{t('careers.form.submit')} <Send className="h-4 w-4" /></>}
        </button>
      </div>
      <FormStatus status={status} message={statusMsg} />
    </form>
  )
}
