"use client"

import { useState } from "react"

export function AiSurpriseSection() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [interest, setInterest] = useState("")
  const [personalizedMessage, setPersonalizedMessage] = useState("")
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const generateMessage = async () => {
    if (!name || !goal || !interest) {
      alert("Please fill in all fields to get your personalized message!")
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
    } catch (error) {
      console.error("Error generating message:", error)
      alert("Sorry, there was an error generating your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    const text = `${name}, This is Your Year! ✨\n\n${personalizedMessage}\n\n✨ Happy New Year 2026 ✨`
    await navigator.clipboard.writeText(text)
    setShowCopySuccess(true)
    setTimeout(() => setShowCopySuccess(false), 3000)
  }

  const shareMessage = async () => {
    const text = `${name}, This is Your Year! ✨\n\n${personalizedMessage}\n\n✨ Happy New Year 2026 ✨`
    if (navigator.share) await navigator.share({ title: "My 2026 New Year Message", text })
    else copyToClipboard()
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
    <section
      id="surprise"
      className="relative z-10 py-24 px-6 mb-12 bg-gradient-to-b from-transparent via-purple-900 via-opacity-10 to-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden bg-black bg-opacity-40 backdrop-blur-md">
          <div className="absolute top-0 right-0 text-8xl opacity-10">🎁</div>
          <div className="absolute bottom-0 left-0 text-8xl opacity-10">✨</div>

          {showIntro ? (
            <div className="relative z-10">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold text-white">
                🤖 AI-Powered Personalization
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 glow text-white">
                I Have a Surprise For You! 🎉
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get a truly unique, AI-generated message crafted specifically for YOU
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-purple-900 bg-opacity-50 border border-purple-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-300 text-center text-lg"
                />
                <input
                  type="text"
                  placeholder="Your biggest goal for 2026..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-purple-900 bg-opacity-50 border border-purple-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-300 text-center text-lg"
                />
                <input
                  type="text"
                  placeholder="Something you're passionate about..."
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-purple-900 bg-opacity-50 border border-purple-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-300 text-center text-lg"
                />
                <button
                  onClick={generateMessage}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 pulse-glow flex items-center justify-center gap-2"
                >
                  {isLoading && (
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                  <span>{isLoading ? "Crafting your message..." : "✨ Generate My Personalized Message ✨"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-white">
              <div className="text-6xl mb-6 animate-bounce">🌟</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-purple-400">{name}, This is Your Year! ✨</h3>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-left text-white">
                <p className="text-lg md:text-xl leading-relaxed mb-6 whitespace-pre-wrap">{personalizedMessage}</p>
                <p className="text-sm mt-4 opacity-75 text-center">✨ Happy New Year 2026 ✨</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={shareMessage}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  Share Message
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-white bg-opacity-10 text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Copy Text
                </button>
              </div>

              <button
                onClick={reset}
                className="bg-white bg-opacity-10 text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-20 transition-all duration-300"
              >
                Generate Another Message
              </button>

              {showCopySuccess && <div className="mt-4 text-green-400 font-semibold">✓ Copied to clipboard!</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
