import { sb } from './db'

export async function getContent() {
  const { data, error } = await sb
    .from('content')
    .select('data')
    .eq('id', 'main')
    .single()

//   if (error) throw error
//   return data as any
if (error || !data) throw error || new Error('No content row')

    return data.data      // ← возвращаем вложенный JSON!
}

export async function getTranslations(locale: string) {
  const { data, error } = await sb
    .from('translations')
    .select('data')
    .eq('locale', locale)
    .single()

  if (error) throw error
  return data as any
}
