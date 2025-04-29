// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY   // server-side only
// )


// lib/supabase.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY     // service-role **или** anon

/* ── единичный клиент «на всякий случай» ── */
export const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
})

/* ── фабрика (для server actions / route-handlers) ── */
export function createClient () {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false }
  })
}
