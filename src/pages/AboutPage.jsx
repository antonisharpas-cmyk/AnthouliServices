import About from '../components/About'
import WhyUs from '../components/WhyUs'
import PageShell from '../components/PageShell'

export default function AboutPage() {
  return (
    <PageShell>
      <About />
      <div className="bg-[#f6f6f6]"><WhyUs /></div>
    </PageShell>
  )
}
