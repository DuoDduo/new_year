export const runtime = "nodejs"

type ClientMessage = {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ClientMessage[] } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages array is required" }, { status: 400 })
    }

    const systemPrompt = `
You are an enthusiastic and supportive 2026 Goal Coach.

Your role:
- Help users set meaningful, achievable resolutions for 2026
- Break down big goals into actionable steps
- Provide encouragement and motivation
- Ask thoughtful clarifying questions
- Keep responses concise (2–3 sentences)
- Be positive, energetic, and inspiring
`.trim()

    // Format messages for Gemini
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 3000 },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      return Response.json({ error: "Gemini request failed" }, { status: 500 })
    }

    const data = await response.json()

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn’t generate a response right now."

    return Response.json({ message: text })
  } catch (error) {
    console.error("Coach chat error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
