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
          <span className="text-accent text-3xl">›</span>
          <div>
            <h3 className="text-2xl font-heading text-primary mb-2">
              {item.title}
            </h3>
            <p className="font-body text-darkGray">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}