export default function SectionHeading({ eyebrow, title, intro, align = 'center', light = false }) {
  const center = align === 'center'
  return (
    <div className={`reveal ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <span className={`eyebrow ${center ? 'justify-center' : ''} ${light ? 'text-brand-200' : ''}`}>{eyebrow}</span>
      <h2 className={`h2 mt-4 ${light ? 'text-white' : ''}`}>{title}</h2>
      {intro && <p className={`lead mt-5 ${light ? 'text-brand-100' : ''}`}>{intro}</p>}
    </div>
  )
}
