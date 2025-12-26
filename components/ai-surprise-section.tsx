"use client"

import { useState, useRef } from "react"

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
    <section id="surprise" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-black/50 backdrop-blur-xl p-6 md:p-12 text-center shadow-2xl">

          {showIntro ? (
            <>
              <span className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                ✨ Something special, just for you
              </span>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Let’s start your 2026 with intention 🤍
              </h2>

              <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">
                Tell us a little about you, and we’ll craft a message that speaks
                to your dreams, your heart, and the year ahead.
              </p>

              <div className="space-y-4 max-w-md mx-auto">
                {[
                  { value: name, set: setName, placeholder: "Your name" },
                  { value: goal, set: setGoal, placeholder: "Your biggest goal for 2026" },
                  { value: interest, set: setInterest, placeholder: "Something you care about" },
                ].map((field, i) => (
                  <input
                    key={i}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-5 py-4 rounded-xl bg-purple-900/40 border border-purple-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                ))}

                <button
                  onClick={generateMessage}
                  disabled={isLoading}
                  className="w-full mt-4 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg active:scale-95 transition"
                >
                  {isLoading ? "Crafting something meaningful…" : "✨ Generate My Message"}
                </button>
              </div>
            </>
          ) : (
            <div ref={resultRef} className="text-white">
              <h3 className="text-3xl font-bold mb-6 text-purple-300">
                {name}, this is for you 🌱
              </h3>

              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 shadow-xl">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {personalizedMessage}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={shareMessage}
                  className="px-8 py-3 rounded-full bg-emerald-500 text-white font-semibold shadow hover:scale-105 transition"
                >
                  📤 Share
                </button>

                <button
                  onClick={copyToClipboard}
                  className="px-8 py-3 rounded-full bg-purple-800 text-white font-semibold shadow hover:scale-105 transition"
                >
                  📋 Copy
                </button>
              </div>

              {showCopySuccess && (
                <p className="mt-4 text-green-400 font-medium">
                  ✓ Copied successfully
                </p>
              )}

              <button
                onClick={reset}
                className="mt-6 text-sm text-gray-300 underline hover:text-white"
              >
                Generate another message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
