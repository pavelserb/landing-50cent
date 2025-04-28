// components/Advantages.js
'use client'
import { useTranslations } from 'next-intl'

export default function Advantages({ items }) {
  const t = useTranslations()
  const list = items || t('advantages', { returnObjects: true })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {list.map((item, idx) => (
        <div key={idx} className="flex items-start space-x-4">
          <span className="text-accent text-2xl font-bebas">›</span>
          <div className="flex flex-col">
            <span className="text-2xl font-bebas text-primary mb-2">
              {item.title}
            </span>
            <span className="font-robotocond font-light text-darkGray">
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}