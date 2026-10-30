import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || 'https://cyejpqkcqbwxbenxcyua.supabase.co'
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_diPYmPfvwqzWzh_poAbgMg_5UxiSNTN'
// Only the publishable key belongs in the browser, never a service-role key.
export const supabase = url && key ? createClient(url, key) : null

let identity: Promise<void> | null = null
export function ensureVisitor() {
  if (!supabase) return Promise.reject(new Error('Counters unavailable'))
  if (!identity) {
    identity = (async () => {
      const { data, error } = await supabase!.auth.getSession()
      if (error) throw error
      if (!data.session) {
        const { error } = await supabase!.auth.signInAnonymously()
        if (error) throw error
      }
    })().finally(() => { identity = null })
  }
  return identity
}
