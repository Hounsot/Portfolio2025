import { useEffect, useState } from 'react'

const KEY = 'mv-likes'
export const readLikes = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

/** Base counts are decorative; liking adds one locally. */
export const baseLikes = (slug: string) => 120 + ([...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 380)
const read = readLikes
const base = baseLikes

export function useLike(slug: string) {
  const [liked, setLiked] = useState(() => !!read()[slug])
  useEffect(() => setLiked(!!read()[slug]), [slug])
  const set = (v: boolean) => {
    const all = read()
    all[slug] = v
    localStorage.setItem(KEY, JSON.stringify(all))
    setLiked(v)
  }
  return { liked, count: base(slug) + (liked ? 1 : 0), toggle: () => set(!liked), like: () => set(true) }
}

/** Decorative view counter shown on reel tiles. */
export const baseViews = (slug: string) => baseLikes(slug) * 37 + slug.length * 211
export const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n))
