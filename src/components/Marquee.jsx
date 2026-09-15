// Infinite horizontal ticker of short phrases, pauses on hover.
export default function Marquee({ items = [], dark = false }) {
  const list = [...items, ...items]
  return (
    <div className={`relative overflow-hidden border-y ${dark ? 'border-white/10 bg-brand-950 text-brand-100' : 'border-stone-200 bg-white text-stone-700'}`}>
      <div className="marquee flex w-max gap-10 py-5 hover:[animation-play-state:paused]">
        {list.map((it, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-semibold tracking-tight">
            {it}
            <span className="inline-block h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
