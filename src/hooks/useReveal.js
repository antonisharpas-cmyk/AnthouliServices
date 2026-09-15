import { useEffect } from 'react'

// Adds .is-visible to every .reveal element once it scrolls into view.
export default function useReveal(deps = []) {
  useEffect(() => {
    let io
    const raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll('.reveal:not(.is-visible)')
      if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-visible')); return }
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
      }, { threshold: 0.08 })
      els.forEach((el) => io.observe(el))
    })
    return () => { cancelAnimationFrame(raf); io && io.disconnect() }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
