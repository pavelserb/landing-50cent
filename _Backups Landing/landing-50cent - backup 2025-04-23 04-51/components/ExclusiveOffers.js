// components/ExclusiveOffers.js
'use client'
import { useTranslations } from 'next-intl'

export default function ExclusiveOffers({ meetGreet, others }) {
  const t = useTranslations()
  const mg = meetGreet || t('exclusiveOffers.meetGreet', { returnObjects: true })
  const list = others || t('exclusiveOffers.others', { returnObjects: true })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-danger text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-heading mb-2">{mg.title}</h3>
        <p className="font-body">{mg.desc}</p>
      </div>
      {list.map((o, i) => (
        <div key={i} className="bg-white text-black p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-heading mb-2">{o.title}</h3>
          <p className="font-body text-darkGray mb-4">{o.desc}</p>
          <button className="w-full py-2 bg-danger text-white font-heading rounded">
            {o.buttonText}
          </button>
        </div>
      ))}
    </div>
  )
}