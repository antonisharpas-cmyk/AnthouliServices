import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV, SITE } from '../data/site'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkCls = ({ isActive }) => `nav-link whitespace-nowrap ${isActive ? 'text-brand-700' : ''}`

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label={SITE.name}>
          <img src="/logo.png" alt={SITE.name} className="h-10 w-auto sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.key} to={n.path} end={n.path === '/'} className={linkCls}>
              {t(`nav.${n.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link to="/contact" className="btn-primary whitespace-nowrap !px-5 !py-2.5">{t('nav.cta')}</Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? t('nav.close') : t('nav.menu')}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${open ? 'block' : 'hidden'} border-t border-stone-100 bg-white`}>
        <div className="container-x flex flex-col gap-1 py-4">
          {NAV.map((n) => (
            <NavLink
              key={n.key}
              to={n.path}
              end={n.path === '/'}
              className={({ isActive }) => `rounded-xl px-3 py-3 text-base font-medium hover:bg-brand-50 hover:text-brand-700 ${isActive ? 'text-brand-700' : 'text-stone-800'}`}
            >
              {t(`nav.${n.key}`)}
            </NavLink>
          ))}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <LanguageSwitcher />
            <a href={`tel:${SITE.phone}`} className="btn-outline !py-2.5">
              <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
