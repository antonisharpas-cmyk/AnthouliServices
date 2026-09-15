import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import WhyCyprus from './components/WhyCyprus'
import Careers from './components/Careers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'

export default function App() {
  const { i18n } = useTranslation()
  useReveal([i18n.language])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <WhyCyprus />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
