// lib/supabaseServer.js
import { createClient } from '@supabase/supabase-js'

console.log(process.env.SUPABASE_URL)

function getEnv(name) {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is required for server Supabase`)
  return v
}

export const supabaseServer = createClient(
  getEnv('SUPABASE_URL'),
  getEnv('SUPABASE_SERVICE_ROLE_KEY'),
  { auth: { persistSession: false } }
)
