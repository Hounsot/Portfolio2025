import { LayoutDashboard, SquarePlay } from 'lucide-react'
import { useRouter } from '@/lib/router'
import { useLang, type Key } from '@/lib/i18n'
import { useContact } from './Contact'
import { useScrollCompact } from '@/lib/useScrollCompact'
import { useEffect, useState } from 'react'

/** Phone navigation — a wide glass tab bar (Threads / iOS style) with icon-only tabs. */
export default function MobileTabBar() {
  const { path, navigate } = useRouter()
  const { t } = useLang()
  const { open } = useContact()
  // a single soft ring on first load hints that the avatar opens contacts
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setPulse(true), 1400)
    const t2 = setTimeout(() => setPulse(false), 3000)
    return () => (clearTimeout(t1), clearTimeout(t2))
  }, [])
  const inCase = path.startsWith('/work')
  const scrolledDown = useScrollCompact(path)
  // watching a reel: get out of the way straight away
  const compact = inCase || scrolledDown
  const from = path.startsWith('/work') ? sessionStorage.getItem('mv-from') || '/' : path
  const active = from === '/wall' ? 1 : 0

  const tabs: { label: Key; I: typeof SquarePlay; onClick: () => void }[] = [
    { label: 'cases', I: SquarePlay, onClick: () => navigate('/') },
    { label: 'wall', I: LayoutDashboard, onClick: () => navigate('/wall') },
  ]

  return (
    <nav
      className={`sm:hidden fixed z-[80] flex p-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(.3,1.2,.5,1)] ${compact ? 'h-12 left-16 right-16' : 'h-16 left-4 right-4'} bg-zinc-900/65 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.55)]`}
      style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      {/* sliding highlight under the active view */}
      <span
        aria-hidden
        className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc((100%-12px)/3)] rounded-full bg-white/[0.12] transition-transform duration-500 ease-[cubic-bezier(.3,1.3,.5,1)]"
        style={{ transform: `translateX(${active * 100}%)` }}
      />
      {tabs.map(({ label, I, onClick }, i) => {
        const on = i === active
        return (
          <button
            key={label}
            onClick={onClick}
            aria-label={t(label)}
            aria-current={on ? 'page' : undefined}
            className={`relative flex-1 grid place-items-center rounded-full transition-colors active:scale-90 ${on ? 'text-zinc-50' : 'text-zinc-400'}`}
          >
            <I size={24} strokeWidth={on ? 2.3 : 1.8} className={`transition-transform duration-500 ${compact ? 'scale-[0.8]' : 'scale-100'}`} />
          </button>
        )
      })}
      {/* contacts live behind the avatar */}
      <button onClick={open} aria-label={t('contactAria')} className="relative flex-1 grid place-items-center rounded-full active:scale-90 transition">
        <span className="relative">
          {pulse && <span aria-hidden className="island-ring absolute inset-0 rounded-full border border-white/60" />}
          <img
            src="/me-avatar.jpg"
            alt=""
            className={`rounded-full object-cover ring-1 ring-white/25 transition-all duration-500 ${compact ? 'size-7' : 'size-8'}`}
          />
          <span className="absolute -bottom-px -right-px size-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
        </span>
      </button>
    </nav>
  )
}
