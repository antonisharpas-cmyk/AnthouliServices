import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to its value when scrolled into view. Non numeric text (e.g. "IFRS") renders as is.
export default function CountUp({ value, duration = 1400, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)
  const match = String(value).match(/^([^\d]*)(\d[\d.,]*)(.*)$/)

  useEffect(() => {
    if (!match) return
    const target = parseFloat(match[2].replace(/,/g, ''))
    if (target >= 1900 && target <= 2100 && !match[1] && !match[3]) return // looks like a year, leave it
    const decimals = (match[2].split('.')[1] || '').length
    const prefix = match[1], suffix = match[3]
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) { setDisplay(value); return }
    setDisplay(`${prefix}0${suffix}`)
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} className={`tabular-nums ${className}`}>{display}</span>
}
