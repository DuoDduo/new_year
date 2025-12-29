"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sparkles, ArrowUp } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowBackToTop(window.scrollY > 500)

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "celebration", label: "Celebration" },
    { href: "countdown", label: "Countdown" },
    { href: "surprise", label: "AI Surprise" },
    { href: "coach", label: "AI Coach" },
    { href: "vision", label: "Vision Letter" },
    { href: "resolutions", label: "Resolutions" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
        {/* PROGRESS BAR (Ultra-thin Premium) */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="px-6 py-4 md:py-6">
          <nav className={`
            max-w-6xl mx-auto flex justify-between items-center px-8 py-4
            rounded-full transition-all duration-500 pointer-events-auto
            ${scrolled 
              ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]" 
              : "bg-transparent border border-transparent"}
          `}>
            {/* BRAND LOGO */}
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 transition-transform group-hover:scale-110">
                 <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                20<span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">26</span>
              </span>
            </div>

            {/* DESKTOP NAV: Restored Underline Hover Effect */}
            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-orange-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              ))}
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden p-2 text-white pointer-events-auto relative z-[110]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
        </div>

        {/* MOBILE OVERLAY: Enhanced with Pulse */}
        <div className={`
          fixed inset-0 bg-black z-[-1] flex flex-col items-center justify-center
          transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden pointer-events-auto
          ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        `}>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className={`
              text-[45vw] font-black italic text-white/[0.02] leading-none tracking-tighter
              ${isMenuOpen ? "animate-[pulse_4s_easeInOut_infinite]" : "opacity-0"}
            `}>
              2026
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4 w-full px-4">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  relative px-6 py-2 text-4xl font-black uppercase tracking-tighter italic transition-all active:scale-95 text-center
                  ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                `}
                style={{ transitionDelay: `${isMenuOpen ? i * 70 : 0}ms`, whiteSpace: 'nowrap' }}
              >
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent block drop-shadow-[0_0_15px_rgba(251,146,60,0.2)]">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          <div className="absolute bottom-12 flex flex-col items-center gap-4">
             <div className="h-[1px] w-12 bg-gradient-to-r from-orange-500 to-pink-500" />
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-800">Blessing James</p>
          </div>
        </div>
      </header>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full 
          bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.2)]
          transition-all duration-500 hover:scale-110 active:scale-90
          ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}
        `}
      >
        <ArrowUp size={20} strokeWidth={3} />
      </button>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.01; transform: scale(1); }
          50% { opacity: 0.04; transform: scale(1.05); }
        }
      `}</style>
    </>
  )
}