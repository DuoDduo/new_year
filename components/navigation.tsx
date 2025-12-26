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
    <nav className="relative z-50 px-6 py-6 bg-black/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-400 glow">2026</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative hover:text-orange-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-orange-400 before:transition-all before:duration-300 hover:before:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 py-6 px-6 flex flex-col space-y-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-lg font-medium text-white hover:text-orange-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
