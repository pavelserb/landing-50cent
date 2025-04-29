// lib/getTranslationsFromDb.ts
import { createClient } from '@/lib/supabase'

export async function getTranslationsFromDb (locale: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('translations')
    .select('data')
    .eq('locale', locale)
    .single()

  if (error) throw new Error('Supabase translations error: ' + error.message)
  return data?.data ?? {}
}
