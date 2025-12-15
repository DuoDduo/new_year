"use client"

import { useState } from "react"

export function JoinSection() {
  const [name, setName] = useState("")
  const [resolution, setResolution] = useState("")
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const shareResolution = async () => {
    if (!name || !resolution) {
      alert("Please fill in both fields to share your resolution!")
      return
    }

    const text = `${name}'s 2026 Resolution:\n\n${resolution}\n\n✨ Let's make this year amazing! ✨`

    if (navigator.share) {
      // For mobile/modern browsers
      try {
        await navigator.share({ title: "My 2026 Resolution", text })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(text)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 3000)
    }
  }

  return (
    <section id="join" className="relative z-10 py-24 px-6 mb-24">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl p-12 text-center bg-black bg-opacity-40 backdrop-blur-md">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow text-white">Share Your Resolution</h2>
          <p className="text-xl text-gray-300 mb-8">
            What&apos;s your biggest goal for 2026? Share it with the world
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-gray-800 bg-opacity-80 border border-gray-600 focus:border-orange-400 focus:outline-none text-white placeholder-gray-400 text-lg"
            />
            <textarea
              placeholder="My 2026 resolution is..."
              rows={4}
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-gray-800 bg-opacity-80 border border-gray-600 focus:border-orange-400 focus:outline-none text-white placeholder-gray-400 resize-none text-lg"
            />
            <button
              onClick={shareResolution}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 pulse-glow"
            >
              Share My Resolution
            </button>

            {showCopySuccess && (
              <div className="mt-2 font-semibold text-white bg-orange-700 bg-opacity-30 px-4 py-2 rounded-lg inline-block">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
