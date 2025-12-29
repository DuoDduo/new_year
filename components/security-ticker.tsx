"use client"

import { Sparkles } from "lucide-react"

export function SecurityTicker() {
  const securityClaims = [
    "PRIVATE & ENCRYPTED ENVIRONMENT",
    "NO HUMAN ACCESS GUARANTEED",
    "ZERO DATA TRACKING",
    "SACRED SILENT SPACE",
    "AI-ONLY PROCESSING",
    "DEVELOPER ACCESS: RESTRICTED",
  ]

  // Duplicate for seamless looping
  const duplicatedClaims = [...securityClaims, ...securityClaims, ...securityClaims]

  return (
    <div className="relative z-20 py-8 bg-black/10 backdrop-blur-md border-y border-white/[0.03] overflow-hidden whitespace-nowrap">
      {/* The Glow Streamer */}
      <div className="flex animate-[marquee_40s_linear_infinite] items-center gap-16">
        {duplicatedClaims.map((claim, index) => (
          <div key={index} className="flex items-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 hover:text-white/60 transition-colors duration-500 cursor-default italic">
              {claim}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
              <Sparkles size={10} className="text-pink-500/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Gradient Masks (Edges) */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  )
}