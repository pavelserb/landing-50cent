// components/ExclusiveOffers.jsx
'use client'

import { useTranslations } from 'next-intl'
import Button from './Button'

export default function ExclusiveOffers({ title, description, buttonText, link }) {

    // const t = useTranslations()

    return (
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-heading mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <a
          href={link}
          className="mt-4 inline-block bg-accent text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
        >
          {buttonText}
        </a>
      </div>
    )
  }
