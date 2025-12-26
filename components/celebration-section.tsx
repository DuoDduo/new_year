import { Eye, Infinity, Users, PartyPopper, Sparkles, Heart } from "lucide-react"

export function CelebrationSection() {
  const features = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Fresh Perspectives",
      description: "See the world with renewed vision.",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      animate: ""
    },
    {
      icon: <Infinity className="w-5 h-5" />,
      title: "Endless Possibilities",
      description: "365 days of opportunity.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      animate: ""
    },
    {
      icon: <Heart className="w-5 h-5" />, // Swapped to Heart for the live effect
      title: "Unity & Joy",
      description: "Celebrate together as one.",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      animate: "animate-pulse" // The live pulsing effect
    },
  ]

  return (
    <section id="celebration" className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Editorial Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">
              <Sparkles className="w-3 h-3" />
              Manifesting 2026
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
              WHY WE <br />
              <span className="glow bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                CELEBRATE
              </span>
            </h2>

            <div className="space-y-6 max-w-lg">
              <p className="text-xl text-gray-200 font-light leading-relaxed">
                Every new year is a <span className="text-white font-medium">blank canvas</span>. It&apos;s a rare global moment where we all pause to acknowledge our growth.
              </p>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Together, we welcome 2026 with open hearts and the collective energy of millions starting anew. This platform is your companion in making those first steps intentional.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-[1px] w-12 bg-orange-500/50" />
              <p className="text-sm italic text-gray-500 tracking-wide">Built for the dreamers of today.</p>
            </div>
          </div>

          {/* Right Side: Interactive Features Card */}
          <div className="relative">
            {/* Soft Glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-[3.5rem] blur-xl opacity-50" />
            
            <div className="relative glass-effect rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl bg-black/40">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/20">
                    <PartyPopper className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">2026 Spirit</h4>
                </div>
                {/* Live Indicator */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live</span>
                </div>
              </div>

              <div className="space-y-10">
                {features.map((feature) => (
                  <div key={feature.title} className="group flex items-start gap-6">
                    <div className={`shrink-0 p-3.5 rounded-2xl ${feature.bg} ${feature.color} border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${feature.animate}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                        {feature.title}
                      </h5>
                      <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
                <div className="px-6 py-2 rounded-full bg-white/[0.03] text-[9px] uppercase tracking-[0.5em] text-gray-500 font-black">
                  Global Countdown Active
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}