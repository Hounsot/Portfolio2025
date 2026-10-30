import { useMemo, useState } from 'react'
import { ZoomIn, Shuffle } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import { useRouter } from '@/lib/router'
import { useLang } from '@/lib/i18n'
import ImagePreview from '@/components/ImagePreview'

const aspects = ['aspect-[3/4]', 'aspect-square', 'aspect-video', 'aspect-[9/16]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[2/3]']

// Small seeded PRNG so a given shuffle is stable across re-renders.
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

type Pin = { src: string; p: Project; aspect: string }

function buildPins(seed: number): Pin[] {
  const r = rng(seed)
  const all: Pin[] = projects
    .filter((p) => !p.comingSoon)
    .flatMap((p) => [p.cover, ...p.media.filter((m) => m.kind === 'image').map((m) => m.src)].map((src) => ({ src, p, aspect: '' })))
  const unique = [...new Map(all.map((x) => [x.src, x])).values()]
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[unique[i], unique[j]] = [unique[j], unique[i]]
  }
  return unique.map((x) => ({ ...x, aspect: aspects[Math.floor(r() * aspects.length)] }))
}

/** Wall — preview an image first, then optionally open its case from the beginning. */
export default function Wall() {
  const [seed, setSeed] = useState(7)
  const [selected, setSelected] = useState<Pin | null>(null)
  const pins = useMemo(() => buildPins(seed), [seed])
  const { navigate } = useRouter()
  const { t, loc } = useLang()
  const cases = new Set(pins.map((x) => x.p.slug)).size

  const openPin = (pin: Pin) => {
    sessionStorage.setItem('mv-from', '/wall')
    sessionStorage.removeItem('mv-focus-src')
    navigate(`/work/${pin.p.slug}`)
  }

  return (
    <div className="px-2 sm:px-6 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-24 pb-28">
      <div className="flex items-center justify-between mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4 px-1">
        <span>
          {t('wallCount', { n: pins.length, m: cases })}
        </span>
        <button onClick={() => setSeed((s) => s + 1)} className="group flex items-center gap-2 hover:text-zinc-50 transition-colors">
          <Shuffle size={13} className="transition-transform duration-500 group-hover:rotate-180" /> {t('shuffle')}
        </button>
      </div>
      <div key={seed} className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-3 fade-in">
        {pins.map((pin) => (
          <button
            key={pin.src}
            onClick={() => setSelected(pin)}
            className="group relative mb-2 sm:mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-900 text-left"
          >
            <div className={pin.aspect}>
              <img
                src={pin.src}
                alt={pin.p.title}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-zinc-50 text-zinc-950 text-[11px] font-medium px-2.5 py-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {t('previewImage')} <ZoomIn size={12} />
            </span>
            <span className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 max-sm:p-2 max-sm:[&>span:last-child]:hidden transition-opacity duration-300">
              <span className="block text-sm font-medium">{pin.p.title}</span>
              <span className="block text-[11px] text-white/60">
                {loc(pin.p).short} · {pin.p.year}
              </span>
            </span>
          </button>
        ))}
      </div>
      {selected && <ImagePreview src={selected.src} project={selected.p} onClose={() => setSelected(null)} onRead={() => openPin(selected)} />}
    </div>
  )
}
