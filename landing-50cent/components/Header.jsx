// 'use client'

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { useTranslations } from 'next-intl'
// import LanguageSwitcher from './LanguageSwitcher'
// import Button from './Button'
// import { usePathname } from 'next/navigation'
// import { Menu } from 'lucide-react'   // иконка-гамбургер из lucide

// export default function Header() {
//   const t = useTranslations()
//   const pathname = usePathname()

//   // shrink on scroll
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [menuOpen, setMenuOpen]   = useState(false)

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 10)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   const onCtaClick = () => {
//     const el = document.getElementById('tickets')
//     if (el) el.scrollIntoView({ behavior: 'smooth' })
//     setMenuOpen(false)
//   }

//   return (
//     <header
//       role="banner"
//       className="
//         ${isScrolled ? 'py-2 shadow-xl' : 'py-4'} 
//         sticky top-0 inset-x-0 z-50
//         px-6 py-4 md:px-10
//         bg-[#0f0f0f] backdrop-blur-md shadow-md transition-all duration-300
//         text-white
//         flex justify-between gap-[2rem]
//         items-center
//         relative
//       "
//     >
//       {/* ─── ЛЕВАЯ КОЛОНКА: заголовок и дата ─── */}
//       {/* <div className="flex flex-col text-white">
//         <span className="font-bebas font-black text-3xl md:text-4xl">
//           {t('siteTitle')}
//         </span>
//         <span className="font-robotocond text-white text-red-400 font-semibold text-base md:text-lg">
//           {t('eventDate')}
//         </span>
//       </div> */}
//       <div className="flex flex-col text-white">
//         <span className="font-bebas font-black text-3xl md:text-4xl text-nowrap">
//           {t('siteTitle')}
//         </span>
//         <span className="font-robotocond text-white font-semibold text-base md:text-lg text-nowrap">
//           {t('eventDate')}
//         </span>
//       </div>

//       {/* ─── ПРАВАЯ КОЛОНКА: переключатель языков ─── */}
//       {/* <div className="flex justify-end ml-auto">
//         <LanguageSwitcher
//           className="space-x-4 text-gray-200"
//           activeClass="underline decoration-white/80"
//           key={pathname}
//         />
//       </div> */}

//       {/* ─── ЦЕНТРАЛЬНАЯ КОЛОНКА: кнопка ─── */}
//       {/* <div className="flex justify-end"> */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//         >
//           <Button onClick={onCtaClick}>
//             {t('buyButton')}
//           </Button>
//         </motion.div> */}
//         {/* <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//             >
//                 <Button
//                 onClick={onCtaClick}
//                 aria-label={t('buyButton')}
//                 className="
//                     px-5 py-2  
//                     bg-red-600 hover:bg-white hover:text-red-600
//                     text-white font-semibold rounded-lg
//                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
//                     transition-colors duration-200
//                 "
//                 >
//                 {t('buyButton')}
//                 </Button>
//             </motion.div> */}
// {/* Правый: на md+ — меню + кнопка, на sm — гамбургер */}
// <div className="flex items-center space-x-4 gap-[2rem]">
//         <button
//           className="md:hidden p-2 text-gray-200"
//           onClick={() => setMenuOpen(prev => !prev)}
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? <X size={24}/> : <Menu size={24}/>}
//         </button>

//         {/* выпадающий мобильный блок */}
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="absolute right-6 top-full mt-2 bg-[#1a1a1a] p-4 rounded-lg shadow-xl md:hidden"
//           >
//             <LanguageSwitcher
//               className="flex flex-col space-y-2 text-gray-200"
//               activeClass="underline"
//               key={pathname}
//             />
//             <Button onClick={onCtaClick} className="mt-4 w-full">
//               {t('buyButton')}
//             </Button>
//           </motion.div>
//         )}

//         {/* desktop */}
//         <LanguageSwitcher
//           className="hidden md:flex space-x-4 text-gray-200"
//           activeClass="underline"
//           key={pathname}
//         />
//         <Button
//           onClick={onCtaClick}
//           className="hidden md:inline-block px-5 py-2 bg-red-600 hover:bg-white hover:text-red-600 transition-colors rounded-lg text-white cursor-pointer"
//         >
//           {t('buyButton')}
//         </Button>
//       </div>
//       {/* </div> */}

      
//     </header>
//   )
// }

// components/Header.jsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { useTranslations } from 'next-intl'
// import Button from './Button'
// import LanguageSwitcher from './LanguageSwitcher'
// import { Menu, X } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function Header() {
//   const t = useTranslations()

//   /* shrink-эффект */
//   const [scrolled, setScrolled] = useState(false)
//   useEffect(() => {
//     const h = () => setScrolled(window.scrollY > 10)
//     h(); window.addEventListener('scroll', h)
//     return () => window.removeEventListener('scroll', h)
//   }, [])

//   /* mobile-бургер */
//   const [open, setOpen] = useState(false)

//   return (
//     <>
//       {/* ─── Top bar ─── */}
//       <header
//         className={`
//           sticky top-0 inset-x-0 z-50
//           flex items-center justify-between
//           bg-[#0f0f0f] backdrop-blur-md transition-all duration-200
//           px-6 sm:px-8 md:px-10 ${scrolled ? 'py-2' : 'py-4'}
//         `}
//       >
//         {/* бургер (mobile) */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2 text-gray-200"
//           aria-label="Toggle menu"
//         >
//           {open ? <X size={26}/> : <Menu size={26}/>}
//         </button>

//         {/* заголовок + дата */}
//         <div className="flex flex-col text-left mx-auto md:mx-0 select-none">
//           <span className={scrolled ? 'font-bebas text-white text-3xl md:text-4xl text-nowrap' : 'font-bebas text-white text-3xl md:text-4xl text-nowrap'}>
//             {t('siteTitle')}
//           </span>
//           <span className={scrolled ? 'font-robotocond text-white font-semibold text-base md:text-lg text-nowrap' : 'font-robotocond text-white font-semibold text-base md:text-lg text-nowrap'}>
//             {t('eventDate')}
//           </span>
//         </div>

//         {/* блок справа (desktop) */}
//         <div className="hidden md:flex items-center space-x-4">
//           <LanguageSwitcher className="space-x-4 text-gray-200" activeClass="underline"/>
//           <Button className="px-5 py-2">{t('buyButton')}</Button>
//         </div>
//       </header>

//       {/* ─── mobile-dropdown: только языки ─── */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity:0, height:0 }}
//             animate={{ opacity:1, height:'auto' }}
//             exit={{ opacity:0, height:0 }}
//             className="md:hidden bg-[#1a1a1a]/90 backdrop-blur-md shadow-xl
//                        px-6 py-4 space-y-4 z-40"
//           >
//             <LanguageSwitcher
//               className="flex flex-col space-y-2 text-gray-200"
//               activeClass="underline"
//               onSelect={() => setOpen(false)}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// components/Header.jsx
'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import Button           from './Button'
import { Menu, X }      from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const t = useTranslations()

  /* shrink on scroll */
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    h(); window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  /* mobile menu */
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      {/* ─── top-bar ─── */}
      <header
        className={`
          sticky top-0 inset-x-0 z-50
          flex items-center justify-between
          bg-[#0f0f0f] backdrop-blur-md
          px-6 sm:px-8 md:px-10 ${scrolled ? 'py-2' : 'py-4'}
          transition-all duration-200
        `}
      >
        {/* левый: заголовок + дата */}
        <div className="flex flex-col select-none">
          <span className="font-bebas text-white text-3xl md:text-4xl text-nowrap leading-none">
            {t('siteTitle')}
          </span>
          <span className="font-robotocond text-white font-semibold text-base md:text-lg text-nowrap leading-none">
            {t('eventDate')}
          </span>
        </div>

        {/* правый: (md+) языки+BUY  |  (<md) бургер */}
        <div className="flex items-center space-x-4">
          {/* desktop */}
          <div className="hidden md:flex text-white gap-[2rem] items-center">
            {/* <LanguageSwitcher className="hidden md:flex space-x-4 text-gray-200" activeClass="underline"/> */}
            <LanguageSwitcher className="space-x-4 text-gray-200" activeClass="underline"/>
            {/* <Button className="hidden md:inline-block px-5 py-2"> */}
            <Button className="px-5 py-2">
                {t('buyButton')}
            </Button>
          </div>
          {/* mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X size={26}/> : <Menu size={26}/>}
          </button>
        </div>
      </header>

      {/* ─── mobile dropdown поверх всего ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            className="fixed inset-0 z-50 md:hidden bg-black/60"
            onClick={close}
          >
            <motion.div
              initial={{ y:-20, opacity:0 }}
              animate={{ y:0,  opacity:1 }}
              exit={{ y:-20, opacity:0 }}
              transition={{ type:'spring', stiffness:320, damping:30 }}
              className="absolute right-4 top-4 w-48 bg-[#1a1a1a] p-4 rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <LanguageSwitcher
                className="flex flex-col space-y-3 text-gray-200"
                activeClass="underline"
                onSelect={close}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



