// // components/CountdownTimer.jsx
// 'use client'

// // import { useState, useEffect } from 'react'
// import { useState, useEffect, useRef } from 'react'
// import { useTranslations } from 'next-intl'
// import { motion } from 'framer-motion'

// export default function CountdownTimer({ targetDate }) {
//   const t = useTranslations('CountdownTimer')
//   const firstRef = useRef(null)   // ссыль на "days"
//   const lastRef  = useRef(null)   // ссыль на "seconds"
//   const [timeLeft, setTimeLeft] = useState(/* ваш calculate… */)
//   const [shift, setShift] = useState(0)

//   const calculateTimeLeft = () => {
//     const diff = new Date(targetDate) - new Date()
//     if (diff <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 }
//     }
//     return {
//       days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((diff / (1000 * 60)) % 60),
//       seconds: Math.floor((diff / 1000) % 60),
//     }
//   }

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setTimeLeft(calculateTimeLeft())
//     }, 1000)
//     return () => clearInterval(timerId)
//   }, [targetDate])

//   const pad = (n) => n.toString().padStart(2, '0')

//   const items = [
//     { value: timeLeft.days,   label: t('days')   },
//     { value: pad(timeLeft.hours),   label: t('hours')   },
//     { value: pad(timeLeft.minutes), label: t('minutes') },
//     { value: pad(timeLeft.seconds), label: t('seconds') },
//   ]

//   return (
//     // <div className="flex space-x-6 text-white text-2xl font-bold uppercase">
//     //   <div className="flex flex-col items-center">
//     //     <span className="font-bebas text-5xl">{timeLeft.days}</span>
//     //     <small className="font-robotocond font-light text-xs">{t('days')}</small>
//     //   </div>
//     //   <div className="flex flex-col items-center">
//     //     <span className="font-bebas text-5xl">{timeLeft.hours.toString().padStart(2, '0')}</span>
//     //     <small className="font-robotocond font-light text-xs">{t('hours')}</small>
//     //   </div>
//     //   <div className="flex flex-col items-center">
//     //     <span className="font-bebas text-5xl">{timeLeft.minutes.toString().padStart(2, '0')}</span>
//     //     <small className="font-robotocond font-light text-xs">{t('minutes')}</small>
//     //   </div>
//     //   <div className="flex flex-col items-center">
//     //     <span className="font-bebas text-5xl">{timeLeft.seconds.toString().padStart(2, '0')}</span>
//     //     <small className="font-robotocond font-light text-xs">{t('seconds')}</small>
//     //   </div>
//     // </div>
//     <motion.div
//       role="timer"
//       aria-live="polite"
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="flex space-x-6 text-white text-2xl font-bold uppercase"
//     >
//       {items.map((it, i) => (
//         <div
//           key={i}
//           className={`
//             flex flex-col items-center
//             ${i < items.length - 1 ? 'border-r border-gray-400 pr-4' : ''}
//           `}
//         >
//           <span className="text-4xl md:text-5xl font-bebas">{it.value}</span>
//           <small className="font-robotocond font-light text-xs uppercase">{it.label}</small>
//         </div>
//       ))}
//     </motion.div>
//   )
// }

// // components/CountdownTimer.jsx
// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { useTranslations } from 'next-intl'
// import { motion } from 'framer-motion'

// export default function CountdownTimer({ targetDate }) {
//   const t = useTranslations('CountdownTimer')
//   const firstRef = useRef(null)
//   const lastRef  = useRef(null)

//   // расчёт оставшегося времени
//   const calculateTimeLeft = () => {
//     const diff = Date.parse(targetDate) - Date.now()
//     if (diff <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 }
//     }
//     return {
//       days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((diff / (1000 * 60)) % 60),
//       seconds: Math.floor((diff / 1000) % 60),
//     }
//   }

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
//   const [shift, setShift]       = useState(0)

//   // обновляем время каждую секунду
//   useEffect(() => {
//     const id = setInterval(() => {
//       setTimeLeft(calculateTimeLeft())
//     }, 1000)
//     return () => clearInterval(id)
//   }, [targetDate])

//   // пересчитываем сдвиг при изменении timeLeft и при ресайзе
//   useEffect(() => {
//     function updateShift() {
//       if (firstRef.current && lastRef.current) {
//         const wFirst = firstRef.current.offsetWidth
//         const wLast  = lastRef.current.offsetWidth
//         // setShift((wFirst - wLast) / 2)
//         setShift((wLast - wFirst) / 2)
//       }
//     }
//     updateShift()
//     window.addEventListener('resize', updateShift)
//     return () => window.removeEventListener('resize', updateShift)
//   }, [timeLeft])

//   const pad = (n) => n.toString().padStart(2, '0')
//   const items = [
//     { val: timeLeft.days,    lab: t('days'),    ref: firstRef },
//     { val: pad(timeLeft.hours),   lab: t('hours')    },
//     { val: pad(timeLeft.minutes), lab: t('minutes')  },
//     { val: pad(timeLeft.seconds), lab: t('seconds'), ref: lastRef },
//   ]

//   return (
//     <div
//       className="relative"
//       style={{
//         left: '50%',
//         transform: `translateX(calc(-50% + ${shift}px))`,
//       }}
//     >
//       <motion.div
//         role="timer"
//         aria-live="polite"
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: 'spring', stiffness: 300 }}
//         className="flex items-center space-x-6 text-white text-2xl font-bold uppercase"
//       >
//         {items.map((it, i) => (
//           <div
//             key={i}
//             ref={it.ref}
//             className={`
//               flex flex-col items-center
//               ${i < items.length - 1 ? 'border-r border-gray-400 pr-4' : ''}
//             `}
//           >
//             <span className="text-4xl md:text-5xl font-bebas">{it.val}</span>
//             <small className="font-robotocond font-light text-xs">{it.lab}</small>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   )
// }

// components/CountdownTimer.jsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { useTranslations } from 'next-intl'
// import { motion } from 'framer-motion'

// export default function CountdownTimer({ targetDate }) {
//   const t = useTranslations('CountdownTimer')

//   // ─────── расчёт оставшегося времени ───────
//   const calc = () => {
//     const diff = Date.parse(targetDate) - Date.now()
//     if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
//     return {
//       d: Math.floor(diff / 86_400_000),
//       h: Math.floor((diff / 3_600_000) % 24),
//       m: Math.floor((diff / 60_000) % 60),
//       s: Math.floor((diff / 1_000) % 60),
//     }
//   }

//   const [time, setTime] = useState(calc())

//   useEffect(() => {
//     const id = setInterval(() => setTime(calc()), 1_000)
//     return () => clearInterval(id)
//   }, [targetDate])

//   const pad = (n) => n.toString().padStart(2, '0')

//   // ─────── блок-утилита для цифры + лейбла ───────
//   const Cell = ({ value, label }) => (
//     <div className="flex flex-col items-center min-w-[4rem]">
//       <span className="text-4xl md:text-5xl font-bebas text-white">{value}</span>
//       <small className="text-xs uppercase text-gray-300 font-robotocond">{label}</small>
//     </div>
//   )

//   return (
//     <div className="relative left-1/2 -translate-x-1/2">
//       {/* grid: [ левый auto | 1 px линия | правый auto ] */}
//       <motion.div
//         role="timer"
//         aria-live="polite"
//         className="
//           grid grid-cols-[max-content_1px_max-content] items-center gap-6
//           text-2xl font-bold uppercase
//         "
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: 'spring', stiffness: 300 }}
//       >
//         {/* левая половина  ──────────────────────────*/}
//         <div className="flex space-x-6 justify-end">
//           <Cell value={time.d}        label={t('days')} />
//           <Cell value={pad(time.h)}   label={t('hours')} />
//         </div>

//         {/* центральный разделитель  ───────────────*/}
//         <div className="h-full bg-gray-400" />

//         {/* правая половина ─────────────────────────*/}
//         <div className="flex space-x-6 justify-start">
//           <Cell value={pad(time.m)}   label={t('minutes')} />
//           <Cell value={pad(time.s)}   label={t('seconds')} />
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// components/CountdownTimer.jsx
'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function CountdownTimer({ targetDate }) {
  const t = useTranslations('CountdownTimer')

  const calc = () => {
    const diff = Date.parse(targetDate) - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff / 3_600_000) % 24),
      m: Math.floor((diff / 60_000) % 60),
      s: Math.floor((diff / 1_000) % 60),
    }
  }

  const [time, setTime] = useState(calc())
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000)
    return () => clearInterval(id)
  }, [targetDate])

  const pad = (n) => n.toString().padStart(2, '0')

  const left  = [
    { v: time.d,      l: t('days')  },
    { v: pad(time.h), l: t('hours') },
  ]
  const right = [
    { v: pad(time.m), l: t('minutes') },
    { v: pad(time.s), l: t('seconds') },
  ]

  return (
    <div className="relative flex justify-center items-center">
      {/* центральная линия */}
      <span className="absolute left-1/2 -translate-x-1/2 h-full border-l border-gray-500" />

      {/* левый блок */}
      <motion.div
        role="timer" aria-live="polite"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-[50%] flex space-x-6 pr-6 text-white text-2xl font-bold uppercase justify-end"
      >
        {left.map(({ v, l }, idx) => (
          <div
            key={l}
            className={`
              flex flex-col items-center
              ${idx === 0 ? 'border-r border-gray-500 pr-6' : ''}
            `}
          >
            <span className="text-4xl md:text-5xl font-bebas">{v}</span>
            <small className="font-robotocond font-light text-xs">{l}</small>
          </div>
        ))}
      </motion.div>

      {/* правый блок */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-[50%] flex space-x-6 pl-6 text-white text-2xl font-bold uppercase justify-start"
      >
        {right.map(({ v, l }, idx) => (
          <div
            key={l}
            className={`
              flex flex-col items-center
              ${idx === 0 ? 'border-r border-gray-500 pr-6' : ''}
            `}
          >
            <span className="text-4xl md:text-5xl font-bebas">{v}</span>
            <small className="font-robotocond font-light text-xs">{l}</small>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

