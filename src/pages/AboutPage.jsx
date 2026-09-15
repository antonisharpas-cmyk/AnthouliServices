import About from '../components/About'
import WhyUs from '../components/WhyUs'
import CtaBand from '../components/CtaBand'

export default function AboutPage() {
  return (
    <>
      <About />
      <div className="bg-white"><WhyUs /></div>
      <CtaBand />
    </>
  )
}
