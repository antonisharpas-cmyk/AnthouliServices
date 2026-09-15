import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import useReveal from './hooks/useReveal'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import WhyCyprusPage from './pages/WhyCyprusPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import LinkPage from './pages/LinkPage'
import NotFound from './pages/NotFound'

function SiteLayout() {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  useReveal([i18n.language, pathname])
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/link" element={<LinkPage />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-cyprus" element={<WhyCyprusPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
