// components/Footer.js
'use client'

export default function Footer({ contacts }) {
  return (
    <footer className="mt-auto py-6 bg-white text-lightGray">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-2 mb-4 md:mb-0 text-center md:text-left">
          {contacts
            .filter(c => c.type === 'Email' || c.type === 'Phone')
            .map((c, i) => (
              <a
                key={i}
                href={c.link}
                className="block hover:underline font-body"
              >
                {c.type}: {c.value}
              </a>
            ))}
        </div>
        <div className="flex space-x-6">
          {contacts
            .filter(c => c.type === 'Instagram' || c.type === 'TikTok')
            .map((c, i) => (
              <a
                key={i}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
              >
                {c.value}
              </a>
            ))}
        </div>
      </div>
    </footer>
  )
}
