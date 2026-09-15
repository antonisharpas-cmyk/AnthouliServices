import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function FormStatus({ status, message }) {
  if (!status || status === 'sending') return null
  const ok = status === 'success'
  return (
    <div role="status" className={`mt-5 flex items-start gap-3 rounded-xl px-4 py-3 text-sm ${ok ? 'bg-brand-50 text-brand-800' : 'bg-red-50 text-red-700'}`}>
      {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
      <span>{message}</span>
    </div>
  )
}
