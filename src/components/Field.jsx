// Label + required/optional tag wrapper for form controls.
export default function Field({ label, required = false, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
        {label}{required && <span className="ml-1 text-brand-600">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}
