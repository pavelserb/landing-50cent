// components/LanguageSwitcher.js
'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const LOCALES = ['en', 'pl']  // список ваших локалей

export default function LanguageSwitcher() {
  const params = useParams()
  const currentLocale = params.locale || 'en'
  const pathname = usePathname() || '/'

  // убираем из пути префикс /[locale]
  const [, , ...restSegments] = pathname.split('/')
  const restPath = restSegments.length > 0 ? `/${restSegments.join('/')}` : ''

  return (
    <div className="flex space-x-4">
      {LOCALES.map((loc) => {
        const href = `/${loc}${restPath}`
        const isActive = loc === currentLocale

        return (
          <Link
            key={loc}
            href={href}
            className={isActive ? 'font-semibold underline' : 'opacity-60 hover:opacity-100'}
          >
            {loc.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
