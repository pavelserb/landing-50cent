// // components/FAQ.js
// 'use client'

// import { useState } from 'react'
// import { useTranslations } from 'next-intl'

// export default function FAQ({ items }) {
//   const t = useTranslations()

//   // источник: либо props.items, либо переводы
//   const source = Array.isArray(items)
//     ? items
//     : t('faq', { returnObjects: true })

//   // если source — объект, превращаем его в массив значений
//   const faqs = Array.isArray(source)
//     ? source
//     : Object.values(source)

//   const [openIndex, setOpenIndex] = useState(null)

//   return (
//     <div className="space-y-4">
//       {faqs.map((f, i) => (
//         <div key={i} className="border rounded-lg overflow-hidden">
//           <button
//             className="w-full text-left px-4 py-3 font-heading flex justify-between items-center"
//             onClick={() => setOpenIndex(openIndex === i ? null : i)}
//           >
//             {f.question}
//             <span className="text-2xl leading-none">
//               {openIndex === i ? '−' : '+'}
//             </span>
//           </button>
//           {openIndex === i && (
//             <div className="px-4 py-2 font-body text-darkGray">
//               {f.answer}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

// components/FAQ.js
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function FAQ({ items }) {
  const t = useTranslations()

  /* –– данные –– */
  const source = Array.isArray(items)
    ? items
    : t('faq', { returnObjects: true })

  const faqs = Array.isArray(source) ? source : Object.values(source)
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="space-y-6">
      {/* заголовок секции */}
      <h2 className="text-center text-4xl md:text-6xl font-heading mb-4">
        {t('faqTitle')}
      </h2>

      {/* список вопросов */}
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-4 py-3 flex justify-between items-center text-left font-heading"
            >
              {f.question}
              <span className="text-2xl leading-none">
                {openIndex === i ? '−' : '+'}
              </span>
            </button>

            {openIndex === i && (
              <div className="px-4 py-2 font-body text-darkGray">
                {f.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
