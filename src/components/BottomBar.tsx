import { useRouter } from '@/lib/router'
import { useLang } from '@/lib/i18n'

/** Cases ⇄ Wall segmented control. On a case page it keeps the view you came from. */
export default function BottomBar() {
  const { path, navigate } = useRouter()
  const { t } = useLang()
  const from = path.startsWith('/work') ? sessionStorage.getItem('mv-from') || '/' : path
  const onWall = from === '/wall'
  const tabs = [
    { label: t('cases'), to: '/', active: !onWall },
    { label: t('wall'), to: '/wall', active: onWall },
  ]
  return (
    <nav className="max-sm:hidden fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[80] flex rounded-full bg-zinc-900/70 backdrop-blur-xl backdrop-saturate-150 border border-white/[0.08] p-[3px] text-xs">
      <span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] left-[3px] w-[84px] rounded-full bg-white/[0.12] transition-transform duration-500 ease-[cubic-bezier(.3,1.3,.5,1)]"
        style={{ transform: `translateX(${onWall ? '100%' : '0'})` }}
      />
      {tabs.map((t) => (
        <button
          key={t.label}
          onClick={() => navigate(t.to)}
          aria-current={t.active ? 'page' : undefined}
          className={`relative w-[84px] py-1.5 rounded-full transition-colors ${t.active ? 'text-zinc-50' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}
