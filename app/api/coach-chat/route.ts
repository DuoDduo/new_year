export const runtime = "nodejs"

type ClientMessage = {
  role: "user" | "assistant"
  content: string
}

// ---------------------------
// Groq Helper
// ---------------------------
async function tryGroq(messages: ClientMessage[]) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map(msg => ({ role: msg.role, content: msg.content }))
      ],
      temperature: 0.5,
      max_tokens: 1000,
    }),
  })

  if (!response.ok) throw new Error(`Groq failed: ${response.status}`)
  const data = await response.json()
  return data.choices[0].message.content
}

// ---------------------------
// Gemini Helper
// ---------------------------
async function tryGemini(messages: ClientMessage[]) {
  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    ...messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
  ]

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 3000, topP: 0.9, candidateCount: 1 },
      }),
    }
  )

  if (!response.ok) throw new Error(`Gemini failed: ${response.status}`)
  const data = await response.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text
}

// ---------------------------
// SYSTEM PROMPT - ACTION-ORIENTED
// ---------------------------
const SYSTEM_PROMPT = `
You are a calm, supportive, and highly effective 2026 Goal Coach.
Avoid asking too many questions. Prioritize giving actionable steps.

Role:
- Help users clarify and achieve goals by suggesting practical next steps
- Reflect the user's input briefly before giving guidance
- Ask at most ONE clarifying question only if absolutely necessary
- Responses should be concise, warm, and encouraging
- Avoid vague responses or placeholders
- Suggest concrete first steps, resources, or exercises

Tone:
- Calm, motivational, supportive
- Limit each response to 3–5 sentences maximum
- Include gentle encouragement
- Avoid emojis unless very minimal
`.trim()

// ---------------------------
// API Handler
// ---------------------------
export async function POST(req: Request) {
  try {
    const { messages }: { messages: ClientMessage[] } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages array is required" }, { status: 400 })
    }

    // Try Groq first
    let aiMessage = ""
    try {
      aiMessage = await tryGroq(messages)
    } catch (groqError) {
      console.warn("Groq failed, falling back to Gemini:", groqError)
      try {
        aiMessage = await tryGemini(messages)
      } catch (geminiError) {
        console.error("Both AI providers failed:", geminiError)
        return Response.json(
          { error: "AI servers are busy. Please try again in a few seconds." },
          { status: 429 }
        )
      }
    }

    return Response.json({ message: aiMessage })
  } catch (error) {
    console.error("AI Coach API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
