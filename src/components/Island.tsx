import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Home, LayoutDashboard, Mail, Send } from 'lucide-react'
import { useContact } from '@/components/Contact'
import { useLang, type Key } from '@/lib/i18n'
import { Link, useRouter } from '@/lib/router'

const hints: { I: typeof Send; label: Key }[] = [
  { I: Send, label: 'telegram' },
  { I: Mail, label: 'email' },
  { I: ArrowUpRight, label: 'sayHi' },
]

/**
 * Floating identity island, pinned top-centre; opens contacts.
 * It "peeks" — briefly unfolds and cycles through the channels inside — shortly after load and
 * again after a period of idling, so visitors learn the contacts live here.
 */
export default function Island() {
  const { open } = useContact()
  const { t } = useLang()
  const { path } = useRouter()
  const from = path.startsWith('/work') ? sessionStorage.getItem('mv-from') || '/' : path
  const onWall = from === '/wall'
  const navCircle = 'absolute top-1/2 -translate-y-1/2 h-full aspect-square rounded-full border border-white/[0.08] backdrop-blur-xl backdrop-saturate-150 grid place-items-center shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState(false)
  const [peek, setPeek] = useState(false)
  const [pulse, setPulse] = useState(0)
  const [hint, setHint] = useState(0)
  const expanded = peek || hover
  const timers = useRef<number[]>([])

  // The previous page may have scrolled an inner case column while window.scrollY
  // stayed at zero, so a route change does not necessarily fire a window scroll.
  useLayoutEffect(() => {
    setScrolled(window.scrollY > 40)
  }, [path])

  useEffect(() => {
    // capture: also hear scrolls of inner containers (the case column)
    const onScroll = (e: Event) => {
      const t = e.target as HTMLElement | Document
      setScrolled((t instanceof Document ? window.scrollY : t.scrollTop) > 40)
    }
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [])

  // Peek on load, then every 40s.
  useEffect(() => {
    const doPeek = () => {
      setHint(0)
      setPulse((n) => n + 1)
      setPeek(true)
      timers.current.push(window.setTimeout(() => setPeek(false), 3600))
    }
    timers.current.push(window.setTimeout(doPeek, 1400))
    const every = window.setInterval(doPeek, 40000)
    return () => {
      timers.current.forEach(clearTimeout)
      clearInterval(every)
    }
  }, [])

  // Cycle channels while unfolded.
  useEffect(() => {
    if (!expanded) return
    const t = window.setInterval(() => setHint((h) => (h + 1) % hints.length), 1100)
    return () => clearInterval(t)
  }, [expanded])

  return (
    <div className="max-sm:hidden fixed top-[max(1rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[70]">
      <Link
        to="/"
        aria-label={t('cases')}
        title={t('cases')}
        aria-current={!onWall ? 'page' : undefined}
        className={`${navCircle} right-full mr-3 ${!onWall ? 'bg-zinc-800/80 text-zinc-50' : 'bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-50'}`}
      >
        <Home size={scrolled ? 17 : 19} strokeWidth={1.8} className="transition-[width,height] duration-300" aria-hidden="true" />
      </Link>
      {pulse > 0 && <span key={pulse} aria-hidden className="island-ring absolute inset-0 rounded-full border border-white/40" />}
      <button
        onClick={open}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={t('contactAria')}
        className={`relative flex items-center gap-3 rounded-full bg-zinc-950/60 backdrop-blur-xl backdrop-saturate-150 border pl-1 py-1 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${expanded ? 'border-white/20 bg-zinc-900/80' : 'border-white/[0.08]'} ${scrolled ? 'pr-2' : 'pr-2.5'}`}
      >
        <span className="relative shrink-0">
          <img src="/me-avatar.webp" alt="" className={`rounded-full object-cover transition-all duration-300 ${scrolled ? 'size-7' : 'size-8'}`} />
          <span className="absolute -bottom-px -right-px size-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-sm">{t('name')}</span>
          <span className={`max-sm:hidden block text-[11px] text-zinc-500 overflow-hidden transition-all duration-300 ${scrolled ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100'}`}>
            {t('role')}
          </span>
        </span>

        {/* contact affordance: a small chip that unfolds into a rolling list of channels */}
        <span
          className={`relative flex items-center h-7 rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(.3,1.2,.5,1)] ${expanded ? 'w-[116px] bg-zinc-50 text-zinc-950' : 'w-7 bg-white/[0.08] text-zinc-300'}`}
        >
          {expanded ? (
            <span className="relative h-full w-full">
              {hints.map(({ I, label }, i) => (
                <span
                  key={label}
                  className={`absolute inset-0 flex items-center justify-center gap-1.5 text-xs font-medium transition-all duration-500 ${i === hint ? 'opacity-100 translate-y-0' : i === (hint + hints.length - 1) % hints.length ? 'opacity-0 -translate-y-3' : 'opacity-0 translate-y-3'}`}
                >
                  <I size={12} /> {t(label)}
                </span>
              ))}
            </span>
          ) : (
            <Mail size={13} className="mx-auto" />
          )}
        </span>
      </button>
      <Link
        to="/wall"
        aria-label={t('wall')}
        title={t('wall')}
        aria-current={onWall ? 'page' : undefined}
        className={`${navCircle} left-full ml-3 ${onWall ? 'bg-zinc-800/80 text-zinc-50' : 'bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-50'}`}
      >
        <LayoutDashboard size={scrolled ? 17 : 19} strokeWidth={1.8} className="transition-[width,height] duration-300" aria-hidden="true" />
      </Link>
    </div>
  )
}
