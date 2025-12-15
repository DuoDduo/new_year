"use client"

import { useState } from "react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#celebration", label: "Celebration" },
    { href: "#countdown", label: "Countdown" },
    { href: "#surprise", label: "AI Surprise" },
    { href: "#coach", label: "AI Coach" },
    { href: "#vision", label: "Vision Letter" },
    { href: "#resolutions", label: "Resolutions" },
  ]

  return (
    <nav className="relative z-10 px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold glow">2026</div>
        <div className="hidden md:flex space-x-8 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-orange-400 transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
