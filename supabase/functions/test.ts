import supabaseClient from "@/lib/supabase_client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body?.name?.trim();
    const goals = body?.goals?.trim();
    const email = body?.email?.trim(); // Added email

    if (!name || !goals || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, or goals" }),
        { status: 400 }
      );
    }

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

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: prompt }] },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 3000,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate vision letter" }),
        { status: 500 }
      );
    }

    const data = await response.json();

    // Combine all parts
    const letter =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join(" ") ||
      "Sorry, could not generate the letter.";

    // --- Save letter to Supabase ---
    const { error: supabaseError } = await supabaseClient.from("future_letters").insert([
      {
        name,
        email,
        letter,
        scheduled_for: "2026-12-31T09:00:00Z",
        sent: false,
      },
    ]);

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError.message);
      return new Response(
        JSON.stringify({ error: "Failed to save vision letter" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ letter, message: "Letter generated and saved!" }), { status: 200 });
  } catch (error) {
    console.error("Vision letter generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate vision letter" }),
      { status: 500 }
    );
  }
}
