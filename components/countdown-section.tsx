"use client"

import { useEffect, useState } from "react"
import { CountdownCard } from "./countdown-card"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const newYear = new Date("2027-01-01T00:00:00")
      const diff = newYear.getTime() - now.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="countdown" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 glow">Time Until 2027</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <CountdownCard value={timeLeft.days} label="Days" color="text-orange-400" />
          <CountdownCard value={timeLeft.hours.toString().padStart(2, "0")} label="Hours" color="text-pink-400" />
          <CountdownCard value={timeLeft.minutes.toString().padStart(2, "0")} label="Minutes" color="text-purple-400" />
          <CountdownCard value={timeLeft.seconds.toString().padStart(2, "0")} label="Seconds" color="text-blue-400" />
        </div>
      </div>
    </section>
  )
}
