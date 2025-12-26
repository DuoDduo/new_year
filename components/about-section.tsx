import { Heart, Sparkles, MapPin, Quote, Github, Linkedin, Instagram } from "lucide-react"

export function AboutSection() {
  const socials = [
    { name: "GitHub", href: "https://github.com/DuoDduo", icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/blessing-james-6b541829b", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Instagram", href: "](https://instagram.com/d_blessing_james", icon: <Instagram className="w-5 h-5" /> },
  ]

  return (
    <section id="builder" className="relative z-10 py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side - Organic shape */}
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-80 md:w-80 md:h-[450px]">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-600/30 to-purple-600/30 blur-3xl rounded-full animate-pulse" />
              
              {/* The Photo Container */}
              <div className="relative w-full h-full rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-gray-900">
                <img 
                  src="/blessing-james.jpeg" 
                  alt="Blessing James"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass-effect p-4 rounded-2xl border border-white/20 shadow-xl hidden md:block animate-bounce [animation-duration:4s]">
                <Sparkles className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="w-full md:w-1/2 text-left">
            <Quote className="w-10 h-10 text-orange-500/20 mb-4" />
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
              A Note from <br />
              <span className="glow bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                The Builder
              </span>
            </h2>

            <div className="space-y-6 text-gray-300">
              <p className="text-xl font-light italic text-white/90">
                "I built this space for you."
              </p>
              
              <p className="text-lg leading-relaxed font-light">
                In the rush of every new year, we often lose sight of our own growth. I created <span className="text-white font-medium">2026</span> because I believe everyone deserves a moment of quiet reflection—a place to speak to their future self and see their potential through a different lens.
              </p>

              <p className="text-lg leading-relaxed font-light">
                Whether you're here to use the AI Coach or write your vision letter, my goal was to build a tool that makes your 2026 feel a little more intentional and a lot more inspired.
              </p>
            </div>

            {/* Signature & Socials Area */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-transparent" />
                    <p className="text-white font-bold text-xl tracking-tight">Blessing James</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <MapPin className="w-3 h-3 text-orange-500/60" />
                    <span>Ogun State, Nigeria</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[10px] font-bold uppercase tracking-widest">
                <Heart className="w-3 h-3 fill-orange-400/20" />
                <span>Dedicated to your 2026 journey</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}