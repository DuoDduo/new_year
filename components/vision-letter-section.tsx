"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import toast from "react-hot-toast"
import { ScrollText, Download, RotateCcw, Sparkles, Wand2, PenTool } from "lucide-react"

export function VisionLetterSection() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [goals, setGoals] = useState("")
  const [visionLetter, setVisionLetter] = useState("")

  const generateLetter = async () => {
    if (!name.trim() || !goals.trim()) {
      toast.error("Please share your name and intentions first 🤍")
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
      toast.success("Your future has been written.")
    } catch (error) {
      console.error(error)
      toast.error("The vision is blurry. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setShowIntro(true)
    setName("")
    setGoals("")
    setVisionLetter("")
  }

  const downloadPDF = () => {
    if (!visionLetter) return
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 50
    let y = 80

    // PDF Styling
    doc.setFont("times", "italic")
    doc.setFontSize(10)
    doc.setTextColor(150)
    doc.text("A message from December 31, 2026", pageWidth / 2, 40, { align: "center" })

    doc.setFont("times", "bold")
    doc.setFontSize(28)
    doc.setTextColor(40, 40, 40)
    doc.text("Vision Letter", pageWidth / 2, y, { align: "center" })
    y += 60

    doc.setFont("times", "normal")
    doc.setFontSize(14)
    doc.setTextColor(60, 60, 60)
    const lines = doc.splitTextToSize(visionLetter, pageWidth - margin * 2)
    
    lines.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage()
        y = 60
      }
      doc.text(line, margin, y)
      y += 22
    })

    doc.save(`${name}_Vision_2026.pdf`)
  }

  return (
    <section id="vision" className="relative z-10 py-32 px-4 md:px-6">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="relative glass-effect rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 border border-white/10 shadow-2xl overflow-hidden bg-white/[0.02]">
          
          {/* Decorative Corner Icon */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ScrollText size={120} className="text-white" />
          </div>

          {showIntro ? (
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 mb-8">
                <PenTool className="w-3 h-3" />
                The Time Capsule
              </div>

              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
                Letter From <br />
                <span className="glow bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent italic">
                  Future You
                </span>
              </h2>

              <p className="text-gray-400 font-light text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                Close your eyes… it’s December 31, 2026. You’ve grown, you’ve endured, and you’ve thrived. Describe your intentions, and we will manifest them into a letter from your future self.
              </p>

              <div className="w-full max-w-md space-y-8">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1 block text-left">Your Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dear..."
                    className="w-full bg-transparent border-b border-white/10 py-3 text-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all text-center"
                  />
                </div>

                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-widest text-pink-400 font-bold mb-1 block text-left">Your 2026 Intentions</label>
                  <textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="What did you achieve? How do you feel?"
                    rows={3}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 transition-all resize-none text-center font-light"
                  />
                </div>

                <button
                  onClick={generateLetter}
                  disabled={isLoading}
                  className="w-full group relative py-5 rounded-full bg-white text-black font-black text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                    {isLoading ? (
                      <Wand2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>🔮 Write My Future</>
                    )}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Result View - The actual Letter */
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl uppercase tracking-[0.4em] font-black text-white opacity-50">
                  December 31, 2026
                </h3>
              </div>

              {/* Letter Styling */}
              <div className="relative bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-16 shadow-inner">
                <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
                <p className="text-xl md:text-2xl font-serif leading-[1.8] text-gray-200 italic whitespace-pre-wrap">
                  {visionLetter}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition shadow-2xl"
                >
                  <Download className="w-5 h-5" /> Download for 2026
                </button>

                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-black"
                >
                  <RotateCcw className="w-4 h-4" /> Rewrite the Vision
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}