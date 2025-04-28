// components/NewsCard.jsx
'use client'
import Button from './Button'

export default function NewsCard({ title, description, buttonText, link }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
      <h3 className="text-xl font-heading mb-2">{title}</h3>
      <p className="text-gray-700 flex-1 mb-4">{description}</p>
      {buttonText && (
        <Button as="a" href={link ?? '#'} className="self-start px-5 py-2">
          {buttonText}
        </Button>
      )}
    </article>
  )
}
