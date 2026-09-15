// Small round flag icons drawn inline (no external images).
const Round = ({ children, title, size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="block shrink-0 overflow-hidden rounded-full" role="img" aria-label={title}>
    {children}
  </svg>
)

export function FlagUK({ size }) {
  return (
    <Round title="United Kingdom" size={size}>
      <rect width="24" height="24" fill="#012169" />
      <path d="M-2 -2L26 26M26 -2L-2 26" stroke="#fff" strokeWidth="4.2" />
      <path d="M-2 -2L26 26M26 -2L-2 26" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 -1V25M-1 12H25" stroke="#fff" strokeWidth="6.5" />
      <path d="M12 -1V25M-1 12H25" stroke="#C8102E" strokeWidth="3.6" />
    </Round>
  )
}

export function FlagGreece({ size }) {
  return (
    <Round title="Greece" size={size}>
      <rect width="24" height="24" fill="#0D5EAF" />
      {[1, 3, 5, 7].map((i) => <rect key={i} y={i * 2.67} width="24" height="2.67" fill="#fff" />)}
      <rect width="13.3" height="13.3" fill="#0D5EAF" />
      <rect x="5.3" width="2.67" height="13.3" fill="#fff" />
      <rect y="5.3" width="13.3" height="2.67" fill="#fff" />
    </Round>
  )
}

export function FlagRussia({ size }) {
  return (
    <Round title="Russia" size={size}>
      <rect width="24" height="8" fill="#fff" />
      <rect y="8" width="24" height="8" fill="#0039A6" />
      <rect y="16" width="24" height="8" fill="#D52B1E" />
    </Round>
  )
}

export const FLAGS = { en: FlagUK, el: FlagGreece, ru: FlagRussia }
