import { Target, Zap, Sun, ArrowUpRight } from "lucide-react"

export function ResolutionsSection() {
  const resolutions = [
    {
      icon: <Target className="w-8 h-8 text-orange-400" />,
      title: "Set Goals",
      description: "Define clear, achievable objectives that will guide your journey through 2026.",
      number: "01"
    },
    {
      icon: <Zap className="w-8 h-8 text-pink-400" />,
      title: "Stay Strong",
      description: "Build resilience and maintain momentum throughout the year with determination.",
      number: "02"
    },
    {
      icon: <Sun className="w-8 h-8 text-purple-400" />,
      title: "Shine Bright",
      description: "Embrace opportunities and let your authentic self illuminate every moment.",
      number: "03"
    },
  ]

  return (
    <section id="resolutions-list" className="relative z-10 py-24 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-4">
              MAKE 2026 <br />
              <span className="glow bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
                COUNT
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Set your intentions and make this year your best one yet.
            </p>
          </div>
          <div className="hidden md:block text-[10rem] font-black text-white/5 select-none leading-none">
            26
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resolutions.map((res) => (
            <div 
              key={res.title}
              className="group relative glass-effect p-10 rounded-[2.5rem] border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden"
            >
              {/* Card Number Background */}
              <span className="absolute top-6 right-8 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                {res.number}
              </span>

              <div className="relative z-10">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {res.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  {res.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-orange-400" />
                </h3>
                
                <p className="text-gray-400 leading-relaxed font-light">
                  {res.description}
                </p>
              </div>

              {/* Subtle bottom glow on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}