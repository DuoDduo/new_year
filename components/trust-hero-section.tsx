"use client"

import { ShieldCheck, EyeOff, Lock, Sparkles, Fingerprint, ChevronDown } from "lucide-react"

export function TrustHeroSection() {
  const scrollToHero = () => {
    const heroSection = document.getElementById("celebration");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center z-[60] pt-32 pb-12 px-6 overflow-hidden bg-black">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
          
          {/* Left Side: The Promise */}
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400 mb-8">
              <ShieldCheck className="w-3 h-3" />
              Verified Private Environment
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              YOUR VISION <br />
              <span className="glow bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent italic">
                STAYS YOURS
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-xl mb-12">
              Every goal you set and every letter you write is encrypted. <span className="text-white font-medium underline decoration-orange-500/50 underline-offset-8">No human eyes</span> including the developer can ever access your responses.
            </p>

            {/* <button 
              onClick={scrollToHero}
              className="group flex items-center gap-4 text-white hover:text-orange-400 transition-all"
            >
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                  <ChevronDown className="w-5 h-5 animate-bounce" />
               </div>
               <span className="text-xs font-black uppercase tracking-[0.4em]">Enter the Sanctuary</span>
            </button> */}
          </div>

          {/* Right Side: Trust Architecture Card */}
          <div className="w-full lg:max-w-md">
            <div className="relative glass-effect rounded-[3rem] p-10 border border-white/10 bg-white/[0.03] shadow-2xl overflow-hidden">
              
              <div className="space-y-10 relative z-10">
                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-white/5 flex items-center justify-center">
                    <EyeOff size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Automated Processing</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      All data is handled by secured AI pipelines. There is no admin panel or database accessible by humans.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 border border-white/5 flex items-center justify-center">
                    <Lock size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">End-to-End Privacy</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      Your inputs are transient. We prioritize the sanctity of your thoughts over data collection.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-white/5 flex items-center justify-center">
                    <Fingerprint size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Zero Tracking</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      We do not link your resolutions to your identity. You are a guest in a space that forgets you exist.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 text-center">
                 <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-600 italic">
                   Safety Manifesto • 2026 Edition
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}