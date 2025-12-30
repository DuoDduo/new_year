export const runtime = "nodejs"; // Specify Node.js runtime for the API route

/**
 * Attempt to generate the vision letter using Groq first.
 * Groq is primary, free, and has a high daily usage limit.
 */
async function tryGroq(prompt: string) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Use API key from environment variables
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant", // Model choice
      messages: [
        { role: "system", content: "You are a warm, reflective letter writer." }, // System instruction
        { role: "user", content: prompt } // User's prompt
      ],
      temperature: 0.8, // Creativity level
      max_tokens: 3000, // Max token length
    }),
  });

  if (!response.ok) throw new Error(`Groq failed: ${response.status}`); // Throw error if API fails
  const data = await response.json();
  return data.choices[0].message.content; // Return generated letter content
}

/**
 * Fallback function using Gemini.
 * Called only if Groq fails.
 */
async function tryGemini(prompt: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }], // Format for Gemini API
        generationConfig: { temperature: 0.8, maxOutputTokens: 3000 },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini failed: ${response.status}`); // Throw error if API fails
  const data = await response.json();
  // Return the first text part from the response
  return data?.candidates?.[0]?.content?.parts?.[0]?.text;
}

/**
 * Main POST handler for generating the vision letter
 */
export async function POST(req: Request) {
  try {
    // Extract user's name and goals from request body
    const { name, goals } = await req.json();

    // Validate required fields
    if (!name || !goals) {
      return new Response(
        JSON.stringify({ error: "Please share your name and intentions first 🤍" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Construct the prompt to send to AI
    const prompt = `
You are ${name}, writing a private letter to your past self from December 31, 2026.

This is not a motivational speech.
This is a quiet, honest, deeply personal letter.

Tone & voice:
- Warm, grounded, reflective
- Gentle pride, not bragging
- Emotionally calm, not dramatic
- Sound human, not inspirational or AI-like
- Avoid clichés and hype

Perspective:
- You are writing to ${name} as they were in January 2026
- You remember their doubts, hopes, and uncertainty
- You speak with kindness, gratitude, and understanding

Content guidance:
- Reflect on how life unfolded around these intentions: "${goals}"
- Acknowledge effort, growth, and resilience — not perfection
- Mention moments of learning, patience, or quiet progress
- Express gratitude for staying, trying, and becoming
- Do NOT exaggerate success or claim everything was easy

Structure:
1. Begin with: "Dear ${name} of January 2026,"
2. Flow naturally like a real letter — no headings, no bullet points
3. End with a calm, reassuring closing
4. Sign exactly as:

${name}
December 31, 2026

Length:
- 250–300 words

Important:
This letter should feel like something someone would save, reread, and feel seen by.
`;

    let letter = "";

    try {
      // Attempt primary AI (Groq)
      letter = await tryGroq(prompt);
    } catch (groqError) {
      console.warn("Groq failed, falling back to Gemini...", groqError);

      try {
        // Fallback to Gemini if Groq fails
        letter = await tryGemini(prompt);
      } catch (geminiError) {
        console.error("Both Groq and Gemini failed:", geminiError);

        // Friendly neutral error response returned to UI
        return new Response(
          JSON.stringify({ error: "Oops! Something went wrong. Please try again in a moment 🤍" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Return the successfully generated letter
    return new Response(JSON.stringify({ letter }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Vision letter API error:", error);

    // Friendly neutral error response for unexpected failures
    return new Response(
      JSON.stringify({ error: "Oops! Something went wrong. Please try again in a moment 🤍" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
