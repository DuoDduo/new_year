"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AiCoachSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi 🤍 I’m your 2026 Goal Coach. This is a calm space to think clearly and move gently toward what matters. What's something you'd like to achieve this year?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/coach-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) throw new Error("Failed to get response")
      const data = await response.json()
      const fullText: string = data.message

      // Typing animation
      let currentText = ""
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])
      for (let i = 0; i < fullText.length; i++) {
        currentText += fullText[i]
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1].content = currentText
          return newMessages
        })
        await new Promise((res) => setTimeout(res, 15))
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) sendMessage()
  }

  return (
    <section id="coach" className="relative z-10 py-20 px-4 sm:px-6 mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl p-6 sm:p-12 relative overflow-hidden bg-black bg-opacity-40 backdrop-blur-md">
          <div className="text-center mb-4 sm:mb-8">
            <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs sm:text-sm font-semibold text-white">
              🎯 AI Goal Setting Coach
            </div>
            <h2 className="text-2xl sm:text-5xl font-bold mb-2 text-white glow">
              Your Personal 2026 Coach
            </h2>
            <p className="text-sm sm:text-lg text-gray-300 max-w-xl mx-auto">
              Chat with AI to craft meaningful resolutions and get personalized advice for achieving your goals
            </p>
          </div>

          <div
            ref={chatContainerRef}
            className="bg-black bg-opacity-60 rounded-2xl p-3 sm:p-6 mb-3 sm:mb-6 max-h-80 sm:max-h-96 overflow-y-auto space-y-2 sm:space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white">
                    🤖
                  </div>
                )}
                <div
                  className={`rounded-2xl p-2 sm:p-4 max-w-[60%] sm:max-w-lg break-words text-sm sm:text-base ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white">
                    👤
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white animate-pulse">
                  🤖
                </div>
                <div className="bg-gray-800 text-gray-100 rounded-2xl px-2 py-1 max-w-[60%]">
                  <div className="flex gap-1">
                    <span className="dot animate-bounce">.</span>
                    <span className="dot animate-bounce delay-200">.</span>
                    <span className="dot animate-bounce delay-400">.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-black bg-opacity-50 border border-white border-opacity-20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
