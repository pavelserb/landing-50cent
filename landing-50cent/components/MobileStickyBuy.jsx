// // components/MobileStickyBuy.jsx
// 'use client'

// import Button from './Button'
// import { useTranslations } from 'next-intl'

// export default function MobileStickyBuy() {
//   const t = useTranslations()
//   const scrollToTickets = () =>
//     document.getElementById('tickets')?.scrollIntoView({ behavior:'smooth' })

//   return (
//     <div className="fixed bottom-0 inset-x-0 z-40 md:hidden
//                     bg-[#0f0f0f]/90 backdrop-blur-md px-6 py-3">
//       <Button onClick={scrollToTickets} className="w-full text-center py-3">
//         {t('buyButton')}
//       </Button>
//     </div>
//   )
// }

// components/MobileStickyBuy.jsx
'use client'

import Button from './Button'
import { useTranslations } from 'next-intl'

export default function MobileStickyBuy() {
  const t = useTranslations()

  const scrollToTickets = () =>
    document.getElementById('tickets')?.scrollIntoView({ behavior:'smooth' })

  return (
    <div id="mobile-buy-bar"
         className="fixed bottom-0 inset-x-0 z-40 md:hidden
                    bg-[#0f0f0f]/90 backdrop-blur-md px-6 py-3">
      <Button onClick={scrollToTickets} className="w-full py-3 text-center">
        {t('buyButton')}
      </Button>
    </div>
  )
}

