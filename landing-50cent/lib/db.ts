// lib/db.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.SUPABASE_URL!
const supabaseKey  = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const sb = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }      // на сервере сессия не нужна
})
