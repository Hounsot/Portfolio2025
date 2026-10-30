import { useEffect, useRef, useState } from 'react'
import { Eye, Heart, Pin } from 'lucide-react'
import { reelFrames, type Project } from '@/data/projects'
import Reel from '@/components/Reel'
import { useRouter } from '@/lib/router'
import { compact, useLike } from '@/lib/likes'
import { useLang } from '@/lib/i18n'
import { useMedia } from '@/lib/useMedia'

/** 9:16 case tile: cover at rest, plays the reel on hover. */
export default function ReelTile({ p, pinned }: { p: Project; pinned?: boolean }) {
  const [hover, setHover] = useState(false)
  const { count, liked, views } = useLike(p.slug)
  const { navigate } = useRouter()
  const { t } = useLang()
  const touch = useMedia('(hover: none)')
  const ref = useRef<HTMLDivElement>(null)

  // No hover on touch screens: tiles play while they cross the middle of the viewport.
  useEffect(() => {
    if (!touch || !ref.current) return
    const io = new IntersectionObserver(([e]) => setHover(e.isIntersecting), { rootMargin: '-35% 0px -35% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [touch])
  return (
    <div
      ref={ref}
      role="link"
      tabIndex={0}
      onMouseEnter={() => !touch && setHover(true)}
      onMouseLeave={() => !touch && setHover(false)}
      onClick={() => !p.comingSoon && navigate(`/work/${p.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && !p.comingSoon && navigate(`/work/${p.slug}`)}
      className={`group relative aspect-[9/16] overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-900 ${p.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {hover && !p.comingSoon ? (
        <Reel frames={reelFrames(p)} video={p.reel} duration={1500} inheritRadius className="absolute inset-0 size-full" />
      ) : (
        <img src={p.cover} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {pinned && (
        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-zinc-50 text-zinc-950 text-[11px] font-medium px-2 py-0.5">
          <Pin size={11} /> {t('pinned')}
        </span>
      )}
      {p.comingSoon && (
        <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-[2px]">
          <span className="mono text-[11px] uppercase tracking-widest">{t('comingSoon')}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 sm:p-3.5">
        <div className="text-sm sm:text-base font-medium tracking-tight leading-tight">{p.title}</div>
        {!p.comingSoon && <div className="mt-1.5 flex items-center gap-3 text-xs text-white/80">
          <span className="flex items-center gap-1">
            <Eye size={12} /> {compact(views)}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={12} className={liked ? 'fill-current text-rose-400' : ''} /> {compact(count)}
          </span>
        </div>}
      </div>
    </div>
  )
}
