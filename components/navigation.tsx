"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sparkles } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll listener to change background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#celebration", label: "Celebration" },
    { href: "#countdown", label: "Countdown" },
    { href: "#surprise", label: "AI Surprise" },
    { href: "#coach", label: "AI Coach" },
    { href: "#vision", label: "Vision Letter" },
    { href: "#resolutions", label: "Resolutions" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 md:py-6 pointer-events-none">
      <nav 
        className={`
          max-w-6xl mx-auto flex justify-between items-center px-6 py-3 md:py-4
          rounded-full transition-all duration-500 pointer-events-auto
          ${scrolled 
            ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border border-transparent"}
        `}
      >
        {/* Brand Logo with Gradient */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
             <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
            20<span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent italic">26</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-orange-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          ))}
        </div>

        {/* Call to Action Button (Desktop) */}
        <div className="hidden lg:block pl-4 border-l border-white/10 ml-4">
           <a 
            href="#vision" 
            className="px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
           >
            Start Journey
           </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white hover:text-orange-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`
          fixed inset-0 bg-black/95 backdrop-blur-2xl z-[-1] flex flex-col items-center justify-center space-y-8
          transition-all duration-700 ease-in-out lg:hidden
          ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        `}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className={`
              text-3xl font-black text-white hover:text-orange-400 transition-all
              ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
            `}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {link.label}
          </a>
        ))}
        
        <div className="pt-8 flex flex-col items-center gap-4">
           <div className="h-[1px] w-12 bg-orange-500/50 mb-4" />
           <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">Blessing James © 2026</p>
        </div>
      </div>
    </header>
  )
}