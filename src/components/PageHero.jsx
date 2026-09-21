import { useState } from 'react'
import SectionHeading from './SectionHeading'

// Dark intro band for inner pages, with slow moving light and staggered word reveal.
// Pass `image` to use a photo as the background instead of the plain green field.
export default function PageHero({ eyebrow, title, intro, image, children }) {
  const [photo, setPhoto] = useState(Boolean(image))

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pt-36 pb-20 text-white lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {image && photo && (
          <>
            <img
              src={image}
              alt=""
              onError={() => setPhoto(false)}
              className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center animate-kenburns"
            />
            <div className="absolute inset-0 bg-brand-950/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-brand-950/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-brand-950/35" />
          </>
        )}
        <div className="aurora absolute -left-32 -top-24 h-[36rem] w-[36rem] rounded-full bg-brand-500/40 blur-3xl" />
        <div className="aurora-2 absolute right-[-10%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-brand-300/20 blur-3xl" />
        {!image && (
          <img src="/logo-mark.png" alt="" className="absolute -bottom-24 right-[-4rem] w-[26rem] opacity-[0.07] lg:w-[34rem] animate-floatY" />
        )}
        <div className="absolute inset-0 opacity-25 animate-gridDrift" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%)' }} />
      </div>
      <div className="container-x relative">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align="left" light words />
        {children}
      </div>
    </section>
  )
}
