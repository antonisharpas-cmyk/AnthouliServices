// ErgonSite wordmark, rebuilt as vector to match the original:
// a rounded bracket shaped "E" (stem + top and bottom arms) with a detached blue middle bar, followed by "rgonSite".
export default function ErgonSiteMark({ className = 'text-lg' }) {
  return (
    <span className={`inline-flex items-baseline ${className}`} aria-label="ErgonSite" role="img">
      <svg viewBox="0 0 26 24" className="h-[0.74em] w-auto self-center" aria-hidden="true">
        <path d="M4 0H26V6H6V18H26V24H4C1.8 24 0 22.2 0 20V4C0 1.8 1.8 0 4 0Z" fill="currentColor" />
        <rect x="9" y="9" width="14" height="6" rx="1.5" fill="#2F52D6" />
      </svg>
      <span className="ml-[0.06em] font-[Manrope,'Plus_Jakarta_Sans',sans-serif] font-extrabold leading-none tracking-[-0.02em]">rgonSite</span>
    </span>
  )
}
