import { useEffect } from 'react'
import { RouterProvider, useRouter } from '@/lib/router'
import { ContactProvider } from '@/components/Contact'
import { LangProvider, useLang } from '@/lib/i18n'
import Island from '@/components/Island'
import MobileTabBar from '@/components/MobileTabBar'
import Cases from '@/pages/Cases'
import Wall from '@/pages/Wall'
import Case from '@/pages/Case'
import CaseMobile from '@/pages/CaseMobile'
import { useMedia } from '@/lib/useMedia'
import { projects } from '@/data/projects'

function Routes() {
  const { path } = useRouter()
  const { t } = useLang()
  const compact = useMedia('(max-width: 1023px)')
  const slug = path.match(/^\/work\/([^/]+)/)?.[1]
  const project = projects.find((p) => p.slug === slug && !p.comingSoon)

  useEffect(() => {
    document.title = project ? `${project.title} — ${t('name')}` : t('docTitle')
  }, [project, t])

  if (project) return compact ? <CaseMobile key={project.slug} project={project} /> : <Case key={project.slug} project={project} />
  if (path === '/wall') return <Wall />
  return <Cases />
}

export default function App() {
  return (
    <RouterProvider>
      <LangProvider>
      <ContactProvider>
        <Routes />
        <Island />
        <MobileTabBar />
      </ContactProvider>
      </LangProvider>
    </RouterProvider>
  )
}
