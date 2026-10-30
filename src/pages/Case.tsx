import { useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, ChevronUp, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { projects, reelFrames, type Project } from '@/data/projects'
import Reel from '@/components/Reel'
import ReelOverlay from '@/components/ReelOverlay'
import ActionRail from '@/components/ActionRail'
import ImagePreview from '@/components/ImagePreview'
import { annotate, buildBlocks, MediaView, Reveal } from '@/components/caseBlocks'
import { Link, useRouter } from '@/lib/router'
import { useLike } from '@/lib/likes'
import { useLang } from '@/lib/i18n'
import { useContact } from '@/components/Contact'

/** Desktop case page — centred reel and compact reading column. */
export default function Case({ project: p }: { project: Project }) {
  const backTo = sessionStorage.getItem('mv-from') === '/wall' ? '/wall' : '/'
  const { navigate } = useRouter()
  const { lang, t, loc } = useLang()
  const copy = loc(p)
  const frames = useMemo(() => reelFrames(p), [p])
  const blocks = useMemo(() => annotate(buildBlocks(p.media, lang, t('caption')), frames, t('overview')), [p, frames, lang])
  const scroller = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { like } = useLike(p.slug)
  const { open } = useContact()

  const list = projects.filter((x) => !x.comingSoon)
  const idx = list.findIndex((x) => x.slug === p.slug)
  const next = list[(idx + 1) % list.length]
  const prev = list[(idx - 1 + list.length) % list.length]

  // Wheel anywhere on the page drives the reading column.
  const onWheel = (e: React.WheelEvent) => {
    if (document.querySelector('dialog[open]')) return
    if (!scroller.current?.contains(e.target as Node)) scroller.current?.scrollBy({ top: e.deltaY })
  }

  return (
    <div onWheel={onWheel} className="h-screen overflow-hidden grid grid-cols-[auto_minmax(300px,380px)] justify-center gap-12 px-24" style={focused ? { gridTemplateColumns: 'minmax(0,min(calc((100vh - 160px) * 9 / 16 + 428px),calc(100vw - 320px)))' } : undefined}>
      {/* reel, actions overlaid like on mobile */}
      <div className={focused ? "group fixed top-1/2 -translate-y-1/2 left-6 z-40 w-28 aspect-[9/16] rounded-xl shadow-2xl ring-1 ring-white/15" : "pt-20 pb-20"}>
        <div className={`relative h-full aspect-[9/16] ${focused ? 'rounded-xl' : ''}`}>
          <Reel
            key={p.slug}
            className="size-full"
            frames={frames}
            video={p.reel}
            soundControl
            compactControls={focused}
            inheritRadius={focused}
            onDoubleLike={like}
            overlay={focused ? undefined : <ReelOverlay captionClassName="pr-16" caption={<b>{p.title}</b>} />}
          />
          {!focused && <Link
            to={backTo}
            aria-label={t('close')}
            title={t('close')}
            className="absolute left-3 top-3 z-10 size-10 rounded-full bg-black/35 backdrop-blur-md text-white grid place-items-center hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
          >
            <X size={21} strokeWidth={1.8} aria-hidden="true" />
          </Link>}
          {focused && <button type="button" onClick={() => setFocused(false)} aria-label={t('restoreReel')} title={t('restoreReel')} className="absolute inset-0 z-10 rounded-xl grid place-items-center bg-black/0 hover:bg-black/15 focus-visible:outline-2 focus-visible:outline-white"><PanelLeftOpen size={24} className="text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity drop-shadow" /></button>}
          {!focused && <div className="absolute right-3 bottom-7 z-10">
            <ActionRail overlay slug={p.slug} url={`/work/${p.slug}`} />
          </div>}
        </div>
      </div>

      {/* previous / next case — right edge, vertically centred */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        {[
          { to: prev, I: ChevronUp, label: t('prevCase') },
          { to: next, I: ChevronDown, label: t('nextCase') },
        ].map(({ to, I, label }) => (
          <button
            key={label}
            onClick={() => navigate(`/work/${to.slug}`)}
            title={`${label}: ${to.title}`}
            aria-label={label}
            className="size-12 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition"
          >
            <I size={20} />
          </button>
        ))}
      </div>

      {/* reading column */}
      <div ref={scroller} className="h-screen overflow-y-auto no-scrollbar pt-20 pb-20 min-w-0">
        <section>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-[-0.03em]">{p.title}</h1>
            <button type="button" aria-label={focused ? t('restoreReel') : t('focusCase')} title={focused ? t('restoreReel') : t('focusCase')} aria-pressed={focused} onClick={() => setFocused((value) => !value)} className="shrink-0 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-400 hover:text-zinc-50 hover:bg-white/10 transition-colors">
              {focused ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
              {focused ? t('splitView') : t('focus')}
            </button>
          </div>
          <span className="mt-1 block mono text-[11px] uppercase tracking-widest text-zinc-500">
            {p.year} · {p.roles.join(' · ')}
          </span>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">{copy.summary}</p>

          <dl className="mt-6 text-[13px]">
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
          {blocks.map(({ block: b }, i) => (
            <section key={i}>
              <Reveal>
                {b.type === 'note' ? (
                  <div className="pt-2">
                    <span className="mono text-[11px] uppercase tracking-widest text-zinc-500">{b.kicker}</span>
                    <h3 className="mt-2 text-lg font-medium tracking-tight">{b.title}</h3>
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
              </Reveal>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-5 border-t border-white/[0.06] flex items-center justify-between text-sm">
          <span className="text-zinc-500">{t('ctaQuestion')}</span>
          <button onClick={open} className="group flex items-center gap-1.5 text-zinc-50">
            {t('ctaAction')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
      {preview && <ImagePreview src={preview} project={p} onClose={() => setPreview(null)} />}
    </div>
  )
}
