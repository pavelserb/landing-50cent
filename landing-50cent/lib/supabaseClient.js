// lib/supabaseClient.js
// import { createClient } from '@supabase/supabase-js'

// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

// function getEnv(name) {
//   const v = process.env[name]
//   if (!v) throw new Error(`${name} is required for client Supabase`)
//   return v
// }

// export const supabaseBrowser = createClient(
//   getEnv('NEXT_PUBLIC_SUPABASE_URL'),
//   getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
//   { auth: { persistSession: false } }
// )

import { createClient } from '@supabase/supabase-js';

export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
