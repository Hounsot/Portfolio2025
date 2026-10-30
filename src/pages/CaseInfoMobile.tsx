import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { reelFrames, type Project } from '@/data/projects'
import { annotate, buildBlocks, MediaView } from '@/components/caseBlocks'
import { useLang } from '@/lib/i18n'
import { useContact } from '@/components/Contact'
import ImagePreview from '@/components/ImagePreview'

const top = 'max(0.75rem,env(safe-area-inset-top))'

/** Full-screen case study that slides in from the right over the reel feed. */
export default function CaseInfoMobile({ project: p, onClose, focusSrc }: { project: Project; onClose: () => void; focusSrc?: string }) {
  const { lang, t, loc } = useLang()
  const { open } = useContact()
  const copy = loc(p)
  const frames = useMemo(() => reelFrames(p), [p])
  const blocks = useMemo(() => annotate(buildBlocks(p.media, lang, t('caption')), frames, t('overview')), [p, frames, lang])
  const chapters = [t('overview'), ...blocks.filter((b) => b.block.type === 'note').map((b) => b.chapter)]
  const [chapter, setChapter] = useState(t('overview'))
  const [closing, setClosing] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const chips = useRef<HTMLDivElement>(null)

  const close = () => {
    setClosing(true)
    setTimeout(onClose, 260)
  }

  useEffect(() => {
    const root = scroller.current!
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setChapter((e.target as HTMLElement).dataset.chapter!)),
      { root, rootMargin: '-45% 0px -45% 0px' },
    )
    root.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [blocks])

  useEffect(() => {
    const chip = chips.current?.querySelector<HTMLElement>(`[data-chip="${chapter}"]`)
    if (chip && chips.current) chips.current.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
  }, [chapter])

  useEffect(() => {
    if (focusSrc) requestAnimationFrame(() => scroller.current?.querySelector(`[data-src="${focusSrc}"]`)?.scrollIntoView({ block: 'center' }))
  }, [focusSrc])

  const jump = (c: string) => scroller.current?.querySelector(`[data-chapter="${c}"]`)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div
      ref={scroller}
      role="dialog"
      aria-label={p.title}
      className={`fixed inset-0 z-[85] bg-[#0a0a0a] overflow-y-auto no-scrollbar overscroll-contain ${closing ? 'panel-out' : 'panel-in'}`}
    >
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.06]" style={{ paddingTop: top }}>
        <div className="flex items-center gap-3 px-3 pb-2">
          <button onClick={close} aria-label={t('back')} className="size-9 rounded-full bg-white/[0.06] grid place-items-center active:scale-90 transition">
            <ArrowLeft size={18} />
          </button>
          <span className="text-sm font-medium truncate">{p.title}</span>
        </div>
        <div ref={chips} className="relative flex gap-1.5 overflow-x-auto no-scrollbar px-4 pb-2.5">
          {chapters.map((c) => (
            <button
              key={c}
              data-chip={c}
              onClick={() => jump(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${c === chapter ? 'bg-zinc-50 text-zinc-950' : 'bg-white/[0.06] text-zinc-400'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6 pb-32 max-w-[600px] mx-auto">
        <section data-chapter={t('overview')} className="scroll-mt-28">
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">{p.title}</h1>
          <span className="mt-1 block mono text-[11px] uppercase tracking-widest text-zinc-500">
            {p.year} · {p.roles.join(' · ')}
          </span>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-300">{copy.summary}</p>
          <dl className="mt-6 text-sm">
            {copy.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 py-2 border-t border-white/[0.06]">
                <dt className="text-zinc-500">{f.label}</dt>
                <dd className="text-zinc-200 text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
          {copy.metrics.length > 0 && (
            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-4">
              {copy.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-xl font-medium tracking-tight tabular-nums">{m.value}</div>
                  <div className="mt-1 text-[11px] text-zinc-500 leading-snug">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-12 flex flex-col gap-10">
          {blocks.map(({ block: b, chapter: c }, i) => (
            <section key={i} data-chapter={c} className="scroll-mt-28">
              {b.type === 'note' ? (
                <div className="pt-2">
                  <span className="mono text-[11px] uppercase tracking-widest text-zinc-500">{b.kicker}</span>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{b.text}</p>
                </div>
              ) : (
                <figure className="flex flex-col gap-2">
                  {b.items.map((m) => (
                    <MediaView key={m.src} m={m} onPreview={setPreview} />
                  ))}
                  <figcaption className="text-xs text-zinc-600">{b.caption}</figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between text-sm">
          <span className="text-zinc-500">{t('ctaQuestion')}</span>
          <button onClick={open} className="flex items-center gap-1.5 text-zinc-50">
            {t('ctaAction')} <ArrowRight size={14} />
          </button>
        </div>
      </div>
      {preview && <ImagePreview src={preview} project={p} onClose={() => setPreview(null)} />}
    </div>
  )
}
