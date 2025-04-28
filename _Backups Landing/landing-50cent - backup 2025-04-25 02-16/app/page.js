// app/page.js

import { useTranslations } from 'next-intl'

import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/en')
}
