import { useEffect, useRef, useState } from 'react'
import type { Media } from '@/data/projects'
import { notesByLang, useLang, type Lang } from '@/lib/i18n'

export type Block =
  | { type: 'full' | 'offset'; items: Media[]; caption: string }
  | { type: 'pair'; items: Media[]; caption: string }
  | { type: 'note'; kicker: string; title: string; text: string }

export function buildBlocks(media: Media[], lang: Lang = 'en', captionTpl = 'Fig. {n}'): Block[] {
  const notes = notesByLang[lang]
  const blocks: Block[] = []
  const pattern: Block['type'][] = ['full', 'pair', 'offset', 'full', 'pair']
  let i = 0
  let step = 0
  let fig = 1
  const third = Math.max(2, Math.ceil(media.length / 3))
  const cap = (n: number) => captionTpl.replace('{n}', String(n).padStart(2, '0'))
  while (i < media.length) {
    if (i === 1) blocks.push({ type: 'note', ...notes[0] })
    if (i > 1 && blocks.filter((b) => b.type === 'note').length === 1 && i >= third) blocks.push({ type: 'note', ...notes[1] })
    if (i > 1 && blocks.filter((b) => b.type === 'note').length === 2 && i >= third * 2) blocks.push({ type: 'note', ...notes[2] })
    const m = media[i]
    let type = i === 0 ? 'full' : pattern[step++ % pattern.length]
    if (m.kind !== 'image') type = 'full'
    if (type === 'pair' && (media[i + 1]?.kind !== 'image' || !media[i + 1])) type = 'offset'
    const items = type === 'pair' ? [m, media[i + 1]] : [m]
    blocks.push({ type, items, caption: cap(fig) } as Block)
    fig += items.length
    i += items.length
  }
  return blocks
}

export function MediaView({ m, onHover, onPreview }: { m: Media; onHover?: () => void; onPreview?: (src: string) => void }) {
  const { t } = useLang()
  if (m.kind === 'embed')
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900">
        <iframe src={m.src} loading="lazy" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" className="absolute inset-0 size-full" />
      </div>
    )
  if (m.kind === 'video')
    return <video src={m.src} className="w-full rounded-2xl" autoPlay muted loop playsInline onMouseEnter={onHover} />
  const Container = onPreview ? 'button' : 'div'
  return (
    <Container type={onPreview ? 'button' : undefined} onClick={onPreview ? () => onPreview(m.src) : undefined} aria-label={onPreview ? t('previewImage') : undefined} data-src={m.src} className={`group relative block w-full overflow-hidden rounded-xl bg-zinc-900 aspect-video ${onPreview ? 'cursor-zoom-in focus-visible:outline-2 focus-visible:outline-white' : ''}`} onMouseEnter={onHover}>
      <img src={m.src} alt="" loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]" />
    </Container>
  )
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 })
    ref.current && io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  )
}


export type MediaBlock = Exclude<Block, { type: 'note' }>

/** Frame index inside the reel for a media item (images only). */
export const frameOf = (frames: string[], m?: Media) => (m && m.kind === 'image' ? frames.indexOf(m.src) : -1)

/** Attaches the active chapter and the reel frame each block should scrub to. */
export function annotate(blocks: Block[], frames: string[], overview = 'Overview') {
  let chapter = overview
  return blocks.map((b, i) => {
    if (b.type === 'note') chapter = b.kicker
    const target = b.type === 'note' ? (blocks[i + 1] as MediaBlock | undefined)?.items?.[0] : b.items[0]
    return { block: b, chapter, frame: frameOf(frames, target) }
  })
}
