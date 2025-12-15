export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = body?.name?.trim()
    const goals = body?.goals?.trim()

    if (!name || !goals) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name and goals" }),
        { status: 400 }
      )
    }

    const prompt = `
Write a touching and inspiring letter from ${name}'s future self, dated December 31, 2026, reflecting on achieving these goals: "${goals}"

The letter should:
- Be written from ${name}'s perspective one year in the future
- Celebrate specific accomplishments related to these goals
- Mention challenges overcome during 2026
- Express pride and gratitude for the journey
- Be genuine, personal, and emotionally resonant
- Be around 250–300 words
- Start with "Dear ${name} of January 2026,"
- End with the signature:

${name}
(December 31, 2026)

Make it feel like a real letter from someone who has genuinely grown and achieved their dreams.
`

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
            temperature: 0.8,
            maxOutputTokens: 3000, 
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      return new Response(
        JSON.stringify({ error: "Failed to generate vision letter" }),
        { status: 500 }
      )
    }

    const data = await response.json()

    // Combine all parts if there are multiple
    const letter =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join(" ") || "Sorry, could not generate the letter."

    return new Response(JSON.stringify({ letter }), { status: 200 })
  } catch (error) {
    console.error("Vision letter generation error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to generate vision letter" }),
      { status: 500 }
    )
  }
}
