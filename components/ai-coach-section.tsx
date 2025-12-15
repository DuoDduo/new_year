"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AiCoachSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your 2026 Goal Coach. I'm here to help you set meaningful resolutions and create an action plan. What's something you'd like to achieve this year?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/coach-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) throw new Error("Failed to get response")
      const data = await response.json()
      const fullText: string = data.message

      // Simulate typing
      let currentText = ""
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])
      for (let i = 0; i < fullText.length; i++) {
        currentText += fullText[i]
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1].content = currentText
          return newMessages
        })
        await new Promise((res) => setTimeout(res, 20)) // typing speed
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) sendMessage()
  }

    return (
    <section id="coach" className="relative z-10 py-24 px-6 mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl p-12 relative overflow-hidden bg-black bg-opacity-40 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-sm font-semibold text-white">
              🎯 AI Goal Setting Coach
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white glow">
              Your Personal 2026 Coach
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Chat with AI to craft meaningful resolutions and get personalized advice for achieving your goals
            </p>
          </div>

          <div
            ref={chatContainerRef}
            className="bg-black bg-opacity-60 rounded-2xl p-6 mb-6 max-h-96 overflow-y-auto space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white">
                    🤖
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 max-w-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white">
                    👤
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-6 py-4 rounded-full bg-black bg-opacity-50 border border-white border-opacity-20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading && (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              )}
              <span>{isLoading ? "..." : "Send"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}