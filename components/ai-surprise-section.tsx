"use client"

import { useState, useRef } from "react"
import { Sparkles, Share2, Copy, RotateCcw, Check, Wand2 } from "lucide-react"

export function AiSurpriseSection() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [interest, setInterest] = useState("")
  const [personalizedMessage, setPersonalizedMessage] = useState("")
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const resultRef = useRef<HTMLDivElement | null>(null)

  const generateMessage = async () => {
    if (!name || !goal || !interest) {
      alert("Please fill in all fields — this helps the message feel truly personal 🤍")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/surprise-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, goal, interest }),
      })

      if (!response.ok) throw new Error("Failed to generate message")

      const { message } = await response.json()
      setPersonalizedMessage(message)
      setShowIntro(false)

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again in a moment 💜")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    const text = `${name}, This is Your Year ✨\n\n${personalizedMessage}\n\nHappy New Year 2026`
    await navigator.clipboard.writeText(text)
    setShowCopySuccess(true)
    setTimeout(() => setShowCopySuccess(false), 3000)
  }

  const shareMessage = async () => {
    const text = `${name}, This is Your Year ✨\n\n${personalizedMessage}`
    if (navigator.share) {
      await navigator.share({ title: "My 2026 Message", text })
    } else {
      copyToClipboard()
    }
  }

  const reset = () => {
    setShowIntro(true)
    setName("")
    setGoal("")
    setInterest("")
    setPersonalizedMessage("")
    setShowCopySuccess(false)
  }

  return (
    <section id="surprise" className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-black">
      {/* Updated Background Glows to Orange/Pink Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[600px] bg-gradient-to-r from-orange-600/20 via-pink-500/10 to-orange-500/20 blur-[120px] rounded-full opacity-60 animate-pulse -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border border-white/20 shadow-2xl overflow-hidden bg-white/[0.03] backdrop-blur-2xl transition-all duration-700">
          
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_8s_infinite] pointer-events-none" />

          {showIntro ? (
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/80">
                    A Personal Gift
                  </span>
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
                  Start with <br />
                  <span className="glow bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent italic">
                    Intention
                  </span>
                </h2>
                <p className="text-gray-300 font-light text-base md:text-lg max-w-xl mx-auto opacity-80 leading-relaxed px-2">
                  Tell us a bit about yourself, and we&apos;ll craft a unique message 
                  for your 2026 journey.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-8">
                <div className="space-y-6">
                  {[
                    { label: "Your Name", val: name, set: setName, color: "from-orange-400 to-pink-500", focus: "orange", ph: "Who are we celebrating?" },
                    { label: "Your 2026 Goal", val: goal, set: setGoal, color: "from-pink-400 to-orange-400", focus: "pink", ph: "What is your biggest dream?" },
                    { label: "Your Passion", val: interest, set: setInterest, color: "from-orange-500 to-pink-500", focus: "orange", ph: "What makes you come alive?" }
                  ].map((field) => (
                    <div key={field.label} className="group relative">
                      <label className={`text-[10px] uppercase tracking-widest font-bold mb-1 block bg-gradient-to-r ${field.color} bg-clip-text text-transparent`}>
                        {field.label}
                      </label>
                      <input
                        value={field.val}
                        onChange={(e) => field.set(e.target.value)}
                        placeholder={field.ph}
                        className={`w-full bg-transparent border-b border-white/20 py-3 text-lg md:text-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={generateMessage}
                  disabled={isLoading}
                  className="group w-full relative py-4 md:py-5 rounded-full bg-white text-black font-black text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                    {isLoading ? <Wand2 className="w-5 h-5 animate-spin" /> : "✨ Generate My Message"}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Result View */
            <div ref={resultRef} className="text-center animate-in fade-in zoom-in duration-700">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-8 tracking-tighter px-2 leading-tight">
                {name}, <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">This Is Your Year.</span>
              </h3>

              <div className="relative group p-[1px] rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-orange-400/40 via-pink-500/40 to-orange-400/40 shadow-2xl">
                <div className="bg-black/40 backdrop-blur-3xl rounded-[1.4rem] md:rounded-[2.4rem] p-6 md:p-12 text-left relative overflow-hidden border border-white/10">
                  <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10">
                    <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-orange-400" />
                  </div>
                  <p className="text-base md:text-xl text-white/90 leading-relaxed font-light whitespace-pre-wrap italic">
                    {personalizedMessage}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:flex sm:justify-center gap-4">
                <button
                  onClick={shareMessage}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition shadow-lg w-full sm:w-auto"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition backdrop-blur-md w-full sm:w-auto"
                >
                  {showCopySuccess ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-orange-400" />}
                  {showCopySuccess ? "Copied" : "Copy Message"}
                </button>
              </div>

              <button
                onClick={reset}
                className="mt-10 flex items-center gap-2 mx-auto text-[10px] text-gray-500 hover:text-orange-400 transition-colors uppercase tracking-[0.4em] font-black"
              >
                <RotateCcw className="w-3 h-3" />
                New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}