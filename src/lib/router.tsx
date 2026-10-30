import { createContext, useContext, useEffect, useState, type ReactNode, type MouseEvent } from 'react'

type Nav = (to: string, opts?: { scroll?: boolean }) => void

const RouterCtx = createContext<{ path: string; navigate: Nav }>({
  path: '/',
  navigate: () => {},
})

export function RouterProvider({ children }: { children: ReactNode }) {
  const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/'
  const [path, setPath] = useState(currentPath)
  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate: Nav = (to, opts) => {
    if (to === window.location.pathname) return
    window.history.pushState({}, '', to)
    setPath(to)
    if (opts?.scroll !== false) window.scrollTo(0, 0)
  }
  return <RouterCtx.Provider value={{ path, navigate }}>{children}</RouterCtx.Provider>
}

export const useRouter = () => useContext(RouterCtx)

export function Link({
  to,
  className,
  children,
  ...rest
}: { to: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { navigate } = useRouter()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}
