export const runtime = "nodejs"

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

Format it as a heartfelt letter starting with "Dear ${name}," and ending with a celebratory message about the new year.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
            maxOutputTokens: 3000, // increased to allow full message
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      return Response.json(
        { error: "Failed to generate personalized message" },
        { status: 500 }
      )
    }

    const data = await response.json()

    // Safely extract generated text
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join(" ") || "Sorry, could not generate the message."

    return Response.json({ message: text })
  } catch (error) {
    console.error("Surprise message generation error:", error)
    return Response.json(
      { error: "Failed to generate personalized message" },
      { status: 500 }
    )
  }
}
