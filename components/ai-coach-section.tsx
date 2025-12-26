"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Bot, User, Loader2, Target } from "lucide-react"

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

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

      let currentText = ""
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])
      
      for (let i = 0; i < fullText.length; i++) {
        currentText += fullText[i]
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1].content = currentText
          return newMessages
        })
        await new Promise((res) => setTimeout(res, 12))
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, my signal faded for a moment. Could you repeat that?" },
      ])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  return (
    <section id="coach" className="relative z-10 py-24 px-6 overflow-hidden">
      {/* Background Glow - Swapped to Orange/Pink */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-200">
              Interactive Guidance
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Your Personal <br />
            <span className="glow bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent italic">
              2026 Coach
            </span>
          </h2>
        </div>

        {/* Chat Interface Container */}
        <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] md:h-[700px]">
          
          {/* Subtle shimmer sweep */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_10s_infinite] pointer-events-none" />

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar Icon */}
                <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg ${
                  message.role === "user" 
                    ? "bg-gradient-to-br from-orange-500 to-pink-500" 
                    : "bg-white/5 text-pink-400"
                }`}>
                  {message.role === "user" ? <User size={18} className="text-white" /> : <Bot size={20} />}
                </div>

                {/* Message Bubble */}
                <div className={`relative max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-[1.5rem] text-base leading-relaxed ${
                  message.role === "user"
                    ? "bg-white text-black font-medium rounded-tr-none"
                    : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none italic font-light"
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 text-pink-400 opacity-50 italic text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Coach is reflecting...</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-10 bg-black/20 border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask your coach anything..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-3 rounded-full bg-white text-black hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-xl"
              >
                <Send size={18} className={isLoading ? "animate-pulse" : ""} />
              </button>
            </div>
            <p className="text-center mt-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Powered by AI Clarity
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}