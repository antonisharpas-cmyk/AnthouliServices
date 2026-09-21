import Hero from '../components/Hero'
import AboutIntro from '../components/AboutIntro'
import ServicesOverview from '../components/ServicesOverview'
import WhyUs from '../components/WhyUs'
import CtaBand from '../components/CtaBand'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <AboutIntro light />
      <WhyUs />
      <CtaBand />
    </>
  )
}
