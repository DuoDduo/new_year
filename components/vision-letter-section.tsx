"use client"

import { useState } from "react"
import jsPDF from "jspdf"

export function VisionLetterSection() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [goals, setGoals] = useState("")
  const [visionLetter, setVisionLetter] = useState("")
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const generateLetter = async () => {
    if (!name || !goals) {
      alert("Please fill in both fields to generate your vision letter!")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/vision-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, goals }),
      })

      if (!response.ok) throw new Error("Failed to generate letter")
      const { letter } = await response.json()
      setVisionLetter(letter)
      setShowIntro(false)
    } catch (error) {
      console.error("Error generating letter:", error)
      alert("Sorry, there was an error generating your letter. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(visionLetter)
    setShowCopySuccess(true)
    setTimeout(() => setShowCopySuccess(false), 3000)
  }

  const reset = () => {
    setShowIntro(true)
    setName("")
    setGoals("")
    setVisionLetter("")
    setShowCopySuccess(false)
  }

  const downloadPDF = () => {
    if (!visionLetter) return

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 40
    const maxLineWidth = pageWidth - margin * 2
    let y = 60

    // Header
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(120, 50, 200)
    doc.text("Letter From Your Future Self", pageWidth / 2, y, { align: "center" })
    y += 40

    // Greeting
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0)
    doc.text(`Dear ${name},`, margin, y)
    y += 30

    // Body
    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0)
    const lines = doc.splitTextToSize(visionLetter, maxLineWidth)
    for (let i = 0; i < lines.length; i++) {
      doc.text(lines[i], margin, y)
      y += 20
      if (y > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage()
        y = 60
      }
    }

    doc.save(`${name || "My"}_Vision_Letter_2026.pdf`)
  }

  return (
    <section
      id="vision"
      className="relative z-10 py-24 px-6 mb-12 bg-gradient-to-b from-transparent via-purple-900 via-opacity-10 to-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden bg-black bg-opacity-40 backdrop-blur-md">
          <div className="absolute top-0 right-0 text-8xl opacity-10">📜</div>
          <div className="absolute bottom-0 left-0 text-8xl opacity-10">💫</div>

          {showIntro ? (
            <div className="relative z-10">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold text-white">
                🔮 Future Vision Generator
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 glow text-white">
                Letter From Your Future Self
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Imagine it&apos;s December 31, 2026. AI will write a letter from future you, describing all the amazing
                things you&apos;ve accomplished this year!
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-purple-900 bg-opacity-50 border border-purple-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-300 text-center text-lg"
                />
                <textarea
                  placeholder="What do you hope to achieve in 2026? (Be specific!)"
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-purple-900 bg-opacity-50 border border-purple-700 focus:border-pink-500 focus:outline-none text-white placeholder-gray-300 resize-none text-lg"
                />
                <button
                  onClick={generateLetter}
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
                  <span>{isLoading ? "Writing your future letter..." : "🔮 Generate My Future Letter 🔮"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-white">
              <div className="text-6xl mb-6">📜</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">
                Letter From Future You - Dec 31, 2026
              </h3>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-left text-white">
                <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">{visionLetter}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={copyToClipboard}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Copy Letter
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Download PDF
                </button>
              </div>

              <button
                onClick={reset}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Create Another Letter
              </button>

              {showCopySuccess && (
                <div className="mt-4 font-semibold text-white bg-purple-700 bg-opacity-30 px-4 py-2 rounded-lg inline-block">
                  ✓ Copied to clipboard!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
