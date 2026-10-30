import { useEffect, useSyncExternalStore } from 'react'
import { ensureVisitor, supabase } from './supabase'

type Stats = { views: number | null; count: number | null; liked: boolean; pending: boolean; error: boolean }
const empty: Stats = { views: null, count: null, liked: false, pending: false, error: false }
const records = new Map<string, Stats>()
const listeners = new Set<() => void>()
const revisions = new Map<string, number>()
const changed = (slug: string) => revisions.set(slug, (revisions.get(slug) ?? 0) + 1)
let refreshing: Promise<void> | null = null
let stop: (() => void) | undefined
const read = (slug: string) => records.get(slug) ?? empty
const update = (slug: string, value: Partial<Stats>) => {
  records.set(slug, { ...read(slug), ...value })
  listeners.forEach((notify) => notify())
}

async function refresh() {
  if (!supabase || refreshing) return refreshing
  refreshing = (async () => {
    const started = new Map(revisions)
    try {
      const { data, error } = await supabase!.from('case_counters').select('slug,views,likes')
      if (error) throw error
      const { data: session } = await supabase!.auth.getSession()
      let own: Set<string> | undefined
      if (session.session) {
        const { data: likes, error } = await supabase!.from('case_likes').select('project_slug')
        if (!error) own = new Set(likes?.map((row) => row.project_slug))
      }
      for (const row of data ?? []) {
        if (!read(row.slug).pending && started.get(row.slug) === revisions.get(row.slug)) update(row.slug, {
          views: Math.max(read(row.slug).views ?? 0, Number(row.views)), count: Number(row.likes),
          ...(own ? { liked: own.has(row.slug) } : {}),
        })
      }
    } catch {
      // Keep the last confirmed totals. Never replace a failed request with fake counts.
    }
  })().finally(() => { refreshing = null })
  return refreshing
}

function subscribe(notify: () => void) {
  listeners.add(notify)
  if (listeners.size === 1 && supabase) {
    void refresh()
    const visibleRefresh = () => { if (document.visibilityState === 'visible') void refresh() }
    const timer = window.setInterval(visibleRefresh, 30_000)
    window.addEventListener('focus', visibleRefresh)
    document.addEventListener('visibilitychange', visibleRefresh)
    stop = () => {
      clearInterval(timer)
      window.removeEventListener('focus', visibleRefresh)
      document.removeEventListener('visibilitychange', visibleRefresh)
    }
  }
  return () => {
    listeners.delete(notify)
    if (!listeners.size) { stop?.(); stop = undefined }
  }
}

async function setLike(slug: string, liked: boolean) {
  if (!supabase || read(slug).pending) return
  const previous = read(slug)
  changed(slug)
  update(slug, { liked, pending: true, error: false, count: previous.count === null ? null : Math.max(0, previous.count + Number(liked) - Number(previous.liked)) })
  try {
    await ensureVisitor()
    const { data, error } = await supabase.rpc('set_case_like', { p_slug: slug, p_liked: liked })
    if (error || !data?.[0]) throw error ?? new Error('Missing counters')
    const row = data[0]
    changed(slug)
    update(slug, { views: Math.max(read(slug).views ?? 0, Number(row.views)), count: Number(row.likes), liked: row.liked, pending: false })
  } catch {
    changed(slug)
    update(slug, { count: previous.count, liked: previous.liked, pending: false, error: true })
  }
}

export function useLike(slug: string) {
  const stats = useSyncExternalStore(subscribe, () => read(slug))
  return { ...stats, available: !!supabase, toggle: () => void setLike(slug, !read(slug).liked), like: () => void setLike(slug, true) }
}

export function useCaseView(slug: string, active = true) {
  useEffect(() => {
    if (!active || !supabase) return
    let timer: number | undefined
    let cancelled = false
    const track = async () => {
      try {
        await ensureVisitor()
        if (cancelled) return
        const { data, error } = await supabase!.rpc('record_case_view', { p_slug: slug })
        if (!error && data?.[0]) {
          const row = data[0]
          update(slug, { views: Math.max(read(slug).views ?? 0, Number(row.views)) })
        }
      } catch { /* Analytics failures must not interrupt a case. */ }
    }
    const schedule = () => {
      clearTimeout(timer)
      if (document.visibilityState === 'visible') timer = window.setTimeout(() => void track(), 1500)
    }
    schedule()
    document.addEventListener('visibilitychange', schedule)
    return () => { cancelled = true; clearTimeout(timer); document.removeEventListener('visibilitychange', schedule) }
  }, [slug, active])
}

export const compact = (n: number | null) => n === null ? '—' : n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n)
