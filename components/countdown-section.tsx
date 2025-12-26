"use client"

import { useEffect, useState } from "react"
import { Timer, Zap, Rocket } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  progress: number // Percentage of the year completed
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 0,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const startOfYear = new Date("2026-01-01T00:00:00")
      const endOfYear = new Date("2027-01-01T00:00:00")
      
      const totalYearTime = endOfYear.getTime() - startOfYear.getTime()
      const elapsedYearTime = now.getTime() - startOfYear.getTime()
      const diff = endOfYear.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft(prev => ({ ...prev, progress: 100 }));
        return;
      }

      // Calculate progress percentage
      const progress = Math.min(100, (elapsedYearTime / totalYearTime) * 100)

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        progress,
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { label: "Days", value: timeLeft.days, color: "text-orange-400" },
    { label: "Hours", value: timeLeft.hours.toString().padStart(2, "0"), color: "text-pink-400" },
    { label: "Minutes", value: timeLeft.minutes.toString().padStart(2, "0"), color: "text-orange-400" },
    { label: "Seconds", value: timeLeft.seconds.toString().padStart(2, "0"), color: "text-pink-400" },
  ]

  return (
    <section id="countdown" className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-orange-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <Timer className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-200">
                The Final Stretch
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight">
              JOURNEY TO <br />
              <span className="glow bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent italic">
                2027
              </span>
            </h2>
          </div>
          
          {/* Year Progress Bar - Desktop Only Side Detail */}
          <div className="hidden lg:flex flex-col items-end gap-3 w-64">
             <div className="flex justify-between w-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>2026 Progress</span>
                <span className="text-white">{timeLeft.progress.toFixed(2)}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  style={{ width: `${timeLeft.progress}%` }}
                />
             </div>
          </div>
        </div>

        {/* Massive Countdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16">
          {timeUnits.map((unit) => (
            <div 
              key={unit.label}
              className="group relative flex flex-col items-center justify-center p-10 md:p-16 rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-orange-500/30 hover:bg-white/[0.05]"
            >
              <div className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 transition-transform group-hover:scale-110 duration-500">
                 <span className={`${unit.color} drop-shadow-[0_0_15px_rgba(251,146,60,0.2)]`}>
                   {unit.value}
                 </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-4 bg-white/20" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 group-hover:text-white transition-colors">
                  {unit.label}
                </span>
                <div className="h-[1px] w-4 bg-white/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Progress Bar */}
        <div className="lg:hidden w-full max-w-md mx-auto mb-12 px-4">
             <div className="flex justify-between w-full text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                <span>Year Completion</span>
                <span className="text-white">{timeLeft.progress.toFixed(2)}%</span>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                  style={{ width: `${timeLeft.progress}%` }}
                />
             </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-500 text-sm tracking-widest uppercase font-bold flex items-center justify-center gap-3">
            <Rocket className="w-4 h-4 text-orange-500/50" />
            Approaching the next evolution
          </p>
        </div>
      </div>
    </section>
  )
}