import { useEffect, useState } from 'react'

/**
 * true while the user scrolls down, false when scrolling up or near the top.
 * Listens in the capture phase so inner scroll containers (the case page) count too.
 */
export function useScrollCompact(resetKey?: unknown, threshold = 8) {
  const [compact, setCompact] = useState(false)
  // a new page starts expanded
  useEffect(() => setCompact(false), [resetKey])
  useEffect(() => {
    const last = new WeakMap<object, number>()
    const onScroll = (e: Event) => {
      const t = e.target
      const el = t instanceof Document ? document.scrollingElement : (t as HTMLElement)
      if (!el) return
      // ignore horizontal strips (chapter chips)
      if (el.scrollWidth > el.clientWidth && el.scrollHeight <= el.clientHeight) return
      const top = el.scrollTop
      const prev = last.get(el) ?? top
      last.set(el, top)
      if (top < 40) return setCompact(false)
      if (top - prev > threshold) setCompact(true)
      else if (prev - top > threshold) setCompact(false)
    }
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [threshold])
  return compact
}
