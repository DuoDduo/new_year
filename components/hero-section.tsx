import { StatCard } from "./stat-card"
import { Sparkles, ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-6xl mx-auto">
        
        {/* Main Hero Card */}
        <div className="group relative glass-effect rounded-[2.5rem] p-8 md:p-20 mb-12 overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-orange-500/10">
          
          {/* Animated Background Blobs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-orange-200">
                The Future is Here
              </span>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white italic">
                HAPPY NEW
              </h1>
              <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] glow bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                YEAR 2026
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-12 font-light max-w-xl mx-auto leading-relaxed">
              A blank canvas awaits. Step into a year designed for 
              <span className="text-white font-medium"> growth, resilience, and your boldest dreams.</span>
            </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
        <a
          href="#surprise" // Pointing back to your surprise section
          className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {/* This creates a colorful background that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            ✨ Get Your Surprise
          </span>
        </a>
        
        <a
          href="#countdown"
          className="px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
        >
          View Countdown
        </a>
      </div>

            {/* Refined Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-10 border-t border-white/10">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">365</span>
                <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">New Opportunities</span>
              </div>
              <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
                <span className="text-3xl font-bold text-white">∞</span>
                <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">Limitless Potential</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">01</span>
                <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Epic Journey</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white">Scroll</span>
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
      </div>
    </section>
  )
}