export const runtime = "nodejs"

/**
 * Primary provider — Groq
 */
async function tryGroq(prompt: string) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a warm, motivational letter writer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Groq failed with status ${response.status}`)
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content

  if (!content) {
    throw new Error("Groq returned empty content")
  }

  return content
}

/**
 * Fallback provider — Gemini
 */
async function tryGemini(prompt: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 3000,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`Gemini failed with status ${response.status}`)
  }

  const data = await response.json()
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p.text)
      .join(" ")

  if (!text) {
    throw new Error("Gemini returned empty content")
  }

  return text
}

/**
 * Utility: Replace any leftover placeholders with your name
 */
function sanitizeSignature(text: string) {
  return text.replace(/\[Your Name\]/g, "Blessing James")
}

export async function POST(req: Request) {
  try {
    const { name, goal, interest } = await req.json()

    if (!name || !goal || !interest) {
      return Response.json(
        { error: "Missing required fields: name, goal, and interest" },
        { status: 400 }
      )
    }

    const prompt = `Create a personalized, motivational New Year 2026 message for ${name} who wants to achieve "${goal}" and is passionate about ${interest}. 

Make it:
- Genuinely inspiring and unique
- Personal and specific to their goal
- Encouraging about their passion
- Around 150-200 words
- End with a positive note about 2026

Format it as a heartfelt letter starting with "Dear ${name}," and ending with a celebratory message about the new year. Sign the letter as "With love and encouragement, Blessing James."`

    let message = ""

    try {
      // 1️⃣ Try Groq first
      message = await tryGroq(prompt)
    } catch (groqError) {
      console.warn("Groq failed, falling back to Gemini...")

      try {
        // 2️⃣ Fallback to Gemini
        message = await tryGemini(prompt)
      } catch (geminiError) {
        console.error("Both providers failed:", geminiError)

        return Response.json(
          {
            error:
              "A lot of people are generating messages right now. Please wait a moment and try again.",
          },
          { status: 429 }
        )
      }
    }

    // 🔧 Sanitize the signature to ensure your name appears correctly
    message = sanitizeSignature(message)

    return Response.json({ message })
  } catch (error) {
    console.error("Surprise message generation error:", error)

    return Response.json(
      {
        error:
          "Something went wrong while creating your message. Please refresh and try again.",
      },
      { status: 500 }
    )
  }
}
