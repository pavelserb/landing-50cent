// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY   // server-side only
// )


// lib/supabase.ts
// import { createClient as createSupabaseClient } from '@supabase/supabase-js'
// import { createClient as _createClient } from '@supabase/supabase-js'

// const SUPABASE_URL = process.env.SUPABASE_URL
// const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY     // service-role **или** anon

// /* ── единичный клиент «на всякий случай» ── */
// export const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, {
//   auth: { persistSession: false }
// })

// /* ── фабрика (для server actions / route-handlers) ── */
// export function createClient () {
//   return createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, {
//     auth: { persistSession: false }
//   })
// }

// export function createStorageClient() {
//     return _createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//     )
//   }

// lib/supabase.js
// import { createClient as _create } from '@supabase/supabase-js'

// // Серверный клиент (service role)
// export const supabase = _create(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
//   { auth: { persistSession: false } }
// )

// // Анонимный для браузера и файлов
// export const supabaseBrowser = _create(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

// // (опционально) фасад для Storage
// export const supabaseStorage = supabaseBrowser.storage

// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Серверный (Service Role) – { auth: { persistSession: false } } по желанию
export const supabaseServer = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
})

// Клиентский (Anon Key) для браузера
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
})
