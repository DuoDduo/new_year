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

    // ---------------------------
    // SYSTEM PROMPT — INDUSTRY STANDARD
    // ---------------------------
    const systemPrompt = `
You are a calm, supportive, and highly effective 2026 Goal Coach.
Avoid pressure, guilt, hustle culture, or extreme productivity language.

Role:
- Help users clarify what they truly want to achieve in 2026
- Turn vague goals into clear, realistic next steps
- Offer practical guidance that feels doable, not overwhelming
- Reflect the user's words back so they feel understood
- Ask at most ONE thoughtful follow-up question when needed
- Keep responses concise (2–3 short sentences)
- Be warm, honest, and encouraging — never preachy

Conversation flow rules:
- Always respond; never leave the user without a message
- If the user provides a short or single-word goal (like "AI Engineer"), acknowledge it immediately
- Provide a concrete next step or a guiding question to expand on the goal
- Do NOT respond with emojis, placeholders, or vague text like "✨"
- Ask ONE clarifying question only if needed to narrow focus
- Each response must either clarify, narrow, or suggest a concrete next step

Response style:
- Be straightforward, clear, and calm
- Prefer simple language over motivational clichés
- Limit actionable steps to 2–3 concrete items
- Use minimal, soft emojis (🤍✨) only to add warmth
- Never respond with empty messages or placeholders

Fallback examples for very short goals:
- "Becoming an AI Engineer sounds great! To get started, which area excites you most — machine learning, NLP, or data engineering?"
- "That’s okay, sometimes a goal appears before the details do 🤍 Let’s start small: what resources or skills do you already have?"
`.trim()

    // ---------------------------
    // FILTER OUT EMPTY OR PLACEHOLDER MESSAGES
    // ---------------------------
    const filteredMessages = messages.filter(
      msg => msg.content.trim() && msg.content.trim() !== "✨"
    )

    // ---------------------------
    // HANDLE SINGLE-WORD OR VERY SHORT INPUTS
    // ---------------------------
    if (
      filteredMessages.length === 1 &&
      filteredMessages[0].role === "user" &&
      filteredMessages[0].content.trim().split(" ").length <= 3
    ) {
      filteredMessages[0].content = `My goal is: ${filteredMessages[0].content.trim()}`
    }

    // ---------------------------
    // FORMAT MESSAGES FOR GEMINI
    // ---------------------------
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...filteredMessages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ]

    // ---------------------------
    // GEMINI API CALL
    // ---------------------------
    const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.5, // calm but creative
            maxOutputTokens: 3000,
            topP: 0.9,
            candidateCount: 1,
          },
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
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I couldn’t generate a response right now."

    return Response.json({ message: text })
  } catch (error) {
    console.error("Coach chat error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
