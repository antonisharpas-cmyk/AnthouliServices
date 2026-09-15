import SectionHeading from './SectionHeading'

// Dark intro band for inner pages, with slow moving light and staggered word reveal.
export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pt-36 pb-20 text-white lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora absolute -left-32 -top-24 h-[36rem] w-[36rem] rounded-full bg-brand-500/40 blur-3xl" />
        <div className="aurora-2 absolute right-[-10%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-brand-300/20 blur-3xl" />
        <img src="/logo-mark.png" alt="" className="absolute -bottom-24 right-[-4rem] w-[26rem] opacity-[0.07] lg:w-[34rem] animate-floatY" />
        <div className="absolute inset-0 opacity-25 animate-gridDrift" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%)' }} />
      </div>
      <div className="container-x relative">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align="left" light words />
        {children}
      </div>
    </section>
  )
}
