import { StatCard } from "./stat-card"

export function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-5xl mx-auto">
        <div className="glass-effect rounded-3xl p-8 md:p-16 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10">
            <div className="float mb-8">
              <div className="inline-block mb-4">
                <span className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-sm font-semibold">
                  🎊 Welcome to 2026 🎊
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 glow leading-tight bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                HAPPY NEW
                <br />
                YEAR 2026
              </h1>
            </div>
            <p className="text-lg md:text-2xl text-gray-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Step into a new chapter filled with endless possibilities, dreams, and celebrations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="#surprise"
                className="pulse-glow bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                ✨ Get Your Surprise
              </a>
              <a
                href="#countdown"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 border-2 border-white border-opacity-30"
              >
                View Countdown
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 pt-8 border-t border-white border-opacity-20">
              <StatCard value="365" label="Days to Shine" color="text-orange-400" />
              <StatCard value="∞" label="Possibilities" color="text-pink-400" />
              <StatCard value="1" label="Amazing You" color="text-purple-400" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
