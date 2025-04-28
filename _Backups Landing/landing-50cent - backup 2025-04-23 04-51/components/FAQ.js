// components/FAQ.js
'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function FAQ({ items }) {
  const t = useTranslations()
  const faqs = items || t('faq', { returnObjects: true })
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="border rounded-lg">
          <button
            className="w-full text-left px-4 py-3 font-heading flex justify-between items-center"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {f.question}
            <span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-4 py-2 font-body text-darkGray">
              {f.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}