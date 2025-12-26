"use client"

import { useState } from "react"
import { Share2, Check, Sparkles, Send } from "lucide-react"

export function JoinSection() {
  const [name, setName] = useState("")
  const [resolution, setResolution] = useState("")
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const shareResolution = async () => {
    if (!name || !resolution) return

    const text = `${name}'s 2026 Resolution:\n\n"${resolution}"\n\n✨ Shared via 2026 Vision ✨`

    if (navigator.share) {
      try {
        await navigator.share({ title: "My 2026 Resolution", text })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      await navigator.clipboard.writeText(text)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 3000)
    }
  }

  return (
    <section id="resolutions" className="relative z-10 py-24 px-6 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-orange-400 mb-4">
            <Sparkles className="w-3 h-3" />
            Public Commitment
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Share Your <span className="glow bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Resolution</span>
          </h2>
          <p className="text-gray-300 font-light text-lg">
            Make it real by putting it into words. What are you conquering in 2026?
          </p>
        </div>

        <div className="relative group">
          {/* Main Form Container */}
          <div className="relative glass-effect rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 bg-white/5">
            <div className="space-y-10">
              
              {/* Name Input */}
              <div className="relative">
                <label className="text-[10px] uppercase tracking-[0.3em] text-orange-400 font-bold mb-2 block">The Dreamer</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // Changed placeholder color to gray-400 and text to white for high contrast
                  className="w-full px-0 py-2 bg-transparent border-b border-white/20 focus:border-orange-500 focus:outline-none text-white placeholder-gray-400 text-2xl font-medium transition-all"
                />
              </div>

              {/* Resolution Textarea */}
              <div className="relative">
                <label className="text-[10px] uppercase tracking-[0.3em] text-pink-400 font-bold mb-2 block">The Resolution</label>
                <textarea
                  placeholder="I will achieve..."
                  rows={3}
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  // Higher contrast for the text area
                  className="w-full px-0 py-2 bg-transparent border-b border-white/20 focus:border-pink-500 focus:outline-none text-white placeholder-gray-400 resize-none text-xl font-light leading-relaxed transition-all"
                />
              </div>

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    {resolution.length > 0 ? `${resolution.length} characters of intent` : "Words have power"}
                  </p>
                </div>

                <button
                  onClick={shareResolution}
                  disabled={!name || !resolution}
                  className={`
                    group relative flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300
                    ${!name || !resolution 
                      ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5" 
                      : "bg-white text-black hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20"}
                  `}
                >
                  {showCopySuccess ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                      <span>Share My Goal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative Corner Badge */}
          <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-orange-500 to-pink-500 p-4 rounded-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
            <Send className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}