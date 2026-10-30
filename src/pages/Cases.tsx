import { projects } from '@/data/projects'
import ReelTile from '@/components/ReelTile'
import { useLang } from '@/lib/i18n'

/** Cases — the reel grid. */
export default function Cases() {
  const { t } = useLang()
  return (
    <div className="max-w-[1320px] mx-auto px-3 sm:px-10 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-24 pb-28">
      <div className="flex items-baseline justify-between mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3 sm:mb-4 px-1 sm:px-0">
        <span>{t('casesCount', { n: projects.filter((p) => !p.comingSoon).length })}</span>
        <span className="max-sm:hidden">{t('hoverHint')}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2" onClickCapture={() => sessionStorage.setItem('mv-from', '/')}>
        {projects.map((p, i) => (
          <ReelTile key={p.slug} p={p} pinned={i === 0} />
        ))}
      </div>
    </div>
  )
}
