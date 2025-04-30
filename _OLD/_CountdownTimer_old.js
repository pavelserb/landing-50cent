// components/CountdownTimer.js
'use client'               // ← обязательно первой строкой

import { useEffect, useState } from 'react'

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    function updateTimer() {
      const diff = +new Date(targetDate) - +new Date()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    updateTimer()
    const timerId = setInterval(updateTimer, 1000)
    return () => clearInterval(timerId)
  }, [targetDate])

  return (
    <div className="flex space-x-4 text-white mt-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-sm">{unit}</span>
        </div>
      ))}
    </div>
  )
}
