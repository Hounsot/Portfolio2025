import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects, reelFrames, type Project } from '@/data/projects'
import Reel from '@/components/Reel'
import ReelOverlay from '@/components/ReelOverlay'
import ActionRail from '@/components/ActionRail'
import { useRouter } from '@/lib/router'
import { useCaseView, useLike } from '@/lib/likes'
import { useLang } from '@/lib/i18n'
import { useMedia } from '@/lib/useMedia'
import CaseInfoMobile from './CaseInfoMobile'

const list = projects.filter((x) => !x.comingSoon)
const top = 'max(0.75rem,env(safe-area-inset-top))'
const bottom = 'max(0.75rem,env(safe-area-inset-bottom))'

function FeedItem({
  p,
  active,
  near,
  onRead,
  onBack,
  phone,
}: {
  p: Project
  active: boolean
  near: boolean
  onRead: () => void
  onBack: () => void
  phone: boolean
}) {
  const { t } = useLang()
  const { like } = useLike(p.slug)
  useCaseView(p.slug, active)
  return (
    <section
      data-slug={p.slug}
      className="relative h-[100dvh] snap-start snap-always px-2"
      style={{ paddingTop: phone ? top : `calc(${top} + 52px)`, paddingBottom: `calc(${bottom} + ${phone ? 64 : 60}px)` }}
    >
      <div className="relative size-full mx-auto max-w-[calc((100dvh-96px)*0.5625)] rounded-xl overflow-hidden bg-zinc-900">
        {near ? (
          <Reel
            className="size-full aspect-auto! rounded-xl!"
            frames={reelFrames(p)}
            video={p.reel}
            soundControl
            paused={!active}
            onDoubleLike={like}
            overlay={
              <ReelOverlay captionClassName="pr-16" caption={<b>{p.title}</b>}>
                <button
                  onClick={onRead}
                  className="w-full rounded-lg bg-white/15 backdrop-blur-md py-2.5 text-sm flex items-center justify-center gap-1.5 active:bg-white/25"
                >
                  {t('readCase')} <ArrowRight size={16} />
                </button>
              </ReelOverlay>
            }
          />
        ) : (
          <img src={p.cover} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
        )}
        <button
          onClick={onBack}
          aria-label={t('back')}
          className="absolute top-3 left-3 z-10 size-9 rounded-full bg-black/30 backdrop-blur-md grid place-items-center active:scale-90 transition"
        >
          <ArrowLeft size={18} />
        </button>
        {near && (
          <div className="absolute right-2.5 bottom-[84px] z-10">
            <ActionRail overlay slug={p.slug} url={`/work/${p.slug}`} />
          </div>
        )}
      </div>
    </section>
  )
}

/** Mobile case viewer — a vertical reel feed: swipe up for the next case, "Read the case" for the details. */
export default function CaseMobile({ project }: { project: Project }) {
  const backTo = sessionStorage.getItem('mv-from') || '/'
  const { navigate } = useRouter()
  const { t } = useLang()
  const phone = useMedia('(max-width: 639px)')
  const [active, setActive] = useState(() => Math.max(0, list.findIndex((x) => x.slug === project.slug)))
  const [reading, setReading] = useState<{ p: Project; focus?: string } | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  // Always open the requested case at the start of its reel.
  useEffect(() => {
    const el = scroller.current?.querySelector<HTMLElement>(`[data-slug="${project.slug}"]`)
    if (el) scroller.current!.scrollTop = el.offsetTop

  }, [project])

  // Track the reel in view; keep the URL and title in step without remounting the page.
  useEffect(() => {
    const root = scroller.current!
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return
          const slug = (e.target as HTMLElement).dataset.slug!
          const i = list.findIndex((x) => x.slug === slug)
          setActive(i)
          window.history.replaceState({}, '', `/work/${slug}`)
          document.title = `${list[i].title} — ${t('name')}`
        }),
      { root, threshold: 0.6 },
    )
    root.querySelectorAll('[data-slug]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [t])

  return (
    <>
      <div ref={scroller} className="h-[100dvh] overflow-y-auto no-scrollbar snap-y snap-mandatory overscroll-contain">
        {list.map((p, i) => (
          <FeedItem
            key={p.slug}
            p={p}
            phone={phone}
            active={i === active && !reading}
            near={Math.abs(i - active) <= 1}
            onRead={() => setReading({ p })}
            onBack={() => navigate(backTo)}
          />
        ))}
      </div>
      {reading && <CaseInfoMobile key={reading.p.slug} project={reading.p} focusSrc={reading.focus} onClose={() => setReading(null)} />}
    </>
  )
}
