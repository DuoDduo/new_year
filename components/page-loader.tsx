"use client"

import { useState, useEffect } from "react"
import { ShieldCheck, Lock, Sparkles } from "lucide-react"

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0)
  const [status, setStatus] = useState("SECURE_BOOT_INIT")

  useEffect(() => {
    const statuses = [
      "INITIALIZING_ENCRYPTION",
      "ISOLATING_HUMAN_ACCESS",
      "VERIFYING_PRIVACY_MANIFEST",
      "ENVIRONMENT_SECURED"
    ]

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800) 
          return 100
        }
        
        const statusIdx = Math.floor((prev / 100) * statuses.length)
        if (statuses[statusIdx]) setStatus(statuses[statusIdx])
        
        // Organic loading speed: fast start, slows at 80% for "verification", then finishes
        const increment = prev > 80 && prev < 95 ? 0.5 : 1.5
        return Math.min(100, prev + increment)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Minimalist Iconography */}
        <div className="flex justify-center mb-16 relative">
          <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="relative p-6 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md">
            <ShieldCheck size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles size={16} className="text-orange-400 animate-spin" />
          </div>
        </div>

        {/* The "Terminal" Display */}
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-500 italic">
                {status}
              </span>
              <span className="text-4xl font-black text-white italic tabular-nums tracking-tighter">
                {Math.floor(percent)}%
              </span>
            </div>

            {/* Premium Ticker Bar */}
            <div className="relative h-[2px] w-full bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 transition-all duration-100 ease-out shadow-[0_0_20px_rgba(236,72,153,0.6)]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Security Log */}
          <div className="flex justify-between text-[8px] font-bold text-gray-600 uppercase tracking-[0.4em]">
             <div className="flex items-center gap-2">
               <Lock size={10} className="text-orange-500/50" />
               <span>E2E_ENCRYPTED</span>
             </div>
             <span>HUMAN_ACCESS: 0</span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-800 ml-[0.8em]">
          BLESSING JAMES
        </p>
      </div>
    </div>
  )
}