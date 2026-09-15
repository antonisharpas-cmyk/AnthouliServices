import { useRef } from 'react'

// 3D tilt + moving highlight that follows the cursor. Falls back to a plain wrapper on touch / reduced motion.
export default function Tilt({ children, className = '', max = 8, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const el = ref.current
    if (!el || reduce || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt ${className}`} {...rest}>
      {children}
      <span className="tilt-shine" aria-hidden="true" />
    </Tag>
  )
}
