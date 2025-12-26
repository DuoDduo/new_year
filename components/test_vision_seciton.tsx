"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import supabaseClient from "@/lib/supabase_client"
import toast from "react-hot-toast"

export function VisionLetterSection() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [goals, setGoals] = useState("")
  const [visionLetter, setVisionLetter] = useState("")
  const [animatedLetter, setAnimatedLetter] = useState<string[]>([])
  const [letterScheduled, setLetterScheduled] = useState(false)
  const [isTestSending, setIsTestSending] = useState(false)

  const generateLetter = async () => {
    if (!name.trim() || !goals.trim() || !email.trim()) {
      toast.error("Please fill in all fields to generate your vision letter!")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/vision-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, goals }),
      })
      if (!response.ok) throw new Error("Failed to generate letter")
      const { letter } = await response.json()
      setVisionLetter(letter)
      setShowIntro(false)

      // Animate teaser lines
      const lines = letter.split("\n").filter(Boolean)
      setAnimatedLetter([])
      const teaserLines = lines.slice(0, 3)
      for (let i = 0; i < teaserLines.length; i++) {
        await new Promise((res) => setTimeout(res, 150))
        setAnimatedLetter((prev) => [...prev, teaserLines[i]])
      }

      // Save to Supabase
      const { error } = await supabaseClient.from("future_letters").insert([
        {
          name,
          email,
          letter,
          scheduled_for: "2026-12-31T09:00:00Z",
          sent: false,
        },
      ])
      if (error) console.error("Supabase insert error:", error.message)

      setLetterScheduled(true)
      toast.success("Your vision letter has been generated and saved!")
    } catch (error) {
      console.error(error)
      toast.error("Error generating letter. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const sendTestEmail = async () => {
    if (!email.trim() || !visionLetter.trim()) {
      toast.error("Generate your letter first before testing!")
      return
    }
    setIsTestSending(true)
    try {
      const response = await fetch("/api/vision-letter/send-letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testEmail: email }),
      })
      const data = await response.json()
      toast.success(data.message || "Test email sent!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to send test email")
    } finally {
      setIsTestSending(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(visionLetter)
    toast.success("✓ Copied to clipboard!")
  }

  const reset = () => {
    setShowIntro(true)
    setName("")
    setEmail("")
    setGoals("")
    setVisionLetter("")
    setAnimatedLetter([])
    setLetterScheduled(false)
  }

  const downloadPDF = () => {
    if (!visionLetter) return
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 40
    let y = 60

    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(120, 50, 200)
    doc.text("Letter From Your Future Self", pageWidth / 2, y, { align: "center" })
    y += 40

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0)
    doc.text(`Dear ${name},`, margin, y)
    y += 30

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0)
    const lines = doc.splitTextToSize(visionLetter, pageWidth - margin * 2)
    lines.forEach((line) => {
      if (y > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage()
        y = 60
      }
      doc.text(line, margin, y)
      y += 20
    })

    doc.save(`${name || "My"}_Vision_Letter_2026.pdf`)
  }

  return (
    <section className="py-20 px-4 sm:px-6 mb-12">
      <div className="max-w-3xl mx-auto bg-black bg-opacity-40 backdrop-blur-md rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden glass-effect">
        {showIntro ? (
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold glow text-white">Letter From Your Future Self</h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
              Close your eyes… it’s December 31, 2026. You feel proud, stronger, and wiser.  
              A magical letter will capture your growth, courage, and dreams ✨
            </p>
            <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full px-5 py-3 rounded-full bg-purple-900 bg-opacity-50 border border-purple-700 text-white text-center"/>
            <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-5 py-3 rounded-full bg-purple-900 bg-opacity-50 border border-purple-700 text-white text-center"/>
            <textarea placeholder="What do you hope to achieve?" rows={3} value={goals} onChange={e => setGoals(e.target.value)} className="w-full px-5 py-3 rounded-2xl bg-purple-900 bg-opacity-50 border border-purple-700 text-white resize-none"/>
            <button onClick={generateLetter} disabled={isLoading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-semibold">
              {isLoading ? "Writing your future letter…" : "🔮 Generate My Future Letter 🔮"}
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-400">Letter From Future You</h3>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-left">
              {animatedLetter.map((line, idx) => (
                <p key={idx} className="opacity-0 animate-fadeIn" style={{ animationDelay: `${idx*150}ms`, animationFillMode: 'forwards' }}>{line}</p>
              ))}
              {visionLetter.split("\n").length > 3 && <p className="text-gray-300 mt-2">…and much more will arrive in your inbox ✨</p>}
            </div>

            {letterScheduled && (
              <div className="mt-4 bg-purple-700 bg-opacity-30 px-4 py-2 rounded-lg inline-block text-white font-semibold animate-fadeIn">
                🎉 Your full vision letter is saved! It will be sent to <span className="underline">{email}</span> on <strong>December 31, 2026</strong> ✨  
                Get ready to be amazed by all the growth and achievements waiting for you!
              </div>
            )}

            {/* ✅ Test send button */}
            <button 
              onClick={sendTestEmail} 
              disabled={isTestSending} 
              className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full">
              {isTestSending ? "Sending Test Email…" : "Send Test Email Now"}
            </button>

            <div className="flex gap-4 justify-center mt-4">
              <button onClick={copyToClipboard} className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full">Copy Letter</button>
              <button onClick={downloadPDF} className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full">Download PDF</button>
            </div>
            <button onClick={reset} className="mt-4 bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-full">Create Another Letter</button>
          </div>
        )}
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(5px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation-name: fadeIn; animation-duration: 0.5s; animation-timing-function: ease-out; }
        `}</style>
      </div>
    </section>
  )
}
