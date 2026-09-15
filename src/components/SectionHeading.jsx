// Section heading. With `words` the title reveals word by word with a small stagger.
export default function SectionHeading({ eyebrow, title, intro, align = 'center', light = false, words = false }) {
  const center = align === 'center'
  const renderTitle = () => {
    if (!words) return title
    return String(title).split(' ').map((w, i) => (
      <span key={i}><span className="word-wrap"><span className="word" style={{ animationDelay: `${120 + i * 60}ms` }}>{w}</span></span>{' '}</span>
    ))
  }
  return (
    <div className={`reveal ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <span className={`eyebrow ${center ? 'justify-center' : ''} ${light ? 'text-brand-200' : ''}`}>{eyebrow}</span>
      <h2 className={`h2 mt-4 ${light ? 'text-white' : ''} ${words ? 'lg:!text-6xl' : ''}`}>{renderTitle()}</h2>
      {intro && <p className={`lead mt-5 ${light ? 'text-brand-100/90' : ''} ${words ? 'animate-fadeUp [animation-delay:500ms]' : ''}`}>{intro}</p>}
    </div>
  )
}
