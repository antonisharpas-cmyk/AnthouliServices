import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

// Accessible custom dropdown (listbox) styled to match the inputs.
export default function Select({ value, onChange, options, placeholder, required = false, invalid = false, label }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(-1)
  const ref = useRef(null)
  const id = useId()

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHover((h) => Math.min(h + 1, options.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHover((h) => Math.max(h - 1, 0)) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (open && hover >= 0) { onChange(options[hover]); setOpen(false) } else setOpen((o) => !o) }
    else if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        aria-required={required}
        aria-invalid={invalid}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        className={`input flex items-center justify-between gap-3 text-left ${invalid ? 'border-red-400 ring-2 ring-red-100' : ''} ${open ? 'border-brand-500 ring-2 ring-brand-200' : ''}`}
      >
        <span className={value ? 'text-stone-800' : 'text-stone-400'}>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          onClick={(e) => e.preventDefault()}
          className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-stone-200 bg-white p-1.5 shadow-cardHover animate-fadeUp [animation-duration:180ms]"
        >
          {options.map((opt, i) => {
            const selected = opt === value
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHover(i)}
                onClick={(e) => { e.preventDefault(); onChange(opt); setOpen(false) }}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  selected ? 'bg-brand-50 font-semibold text-brand-800' : hover === i ? 'bg-stone-50 text-stone-900' : 'text-stone-700'
                }`}
              >
                <span>{opt}</span>
                {selected && <Check className="h-4 w-4 text-brand-600" strokeWidth={2.5} />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
