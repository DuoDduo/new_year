import { serve } from "https://deno.land/std@0.203.0/http/server.ts"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
import Resend from "https://cdn.jsdelivr.net/npm/resend/+esm"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
const resend = new Resend(RESEND_API_KEY)

serve(async (_req) => {
  try {
    // 1. Fetch unsent letters that are due
    const { data: letters, error } = await supabase
      .from("future_letters")
      .select("*")
      .lte("scheduled_for", new Date().toISOString())
      .eq("sent", false)

    if (error) throw error
    if (!letters || letters.length === 0) return new Response("No letters to send", { status: 200 })

    for (const letter of letters) {
      // 2. Send email via Resend
      await resend.emails.send({
        from: "Your Future Self <no-reply@yourdomain.com>",
        to: letter.email,
        subject: "Your 2026 Vision Letter ✨",
        html: `
          <p>Dear ${letter.name},</p>
          <p>${letter.letter.replace(/\n/g, "<br>")}</p>
          <p>— Your Future Self</p>
        `,
      })

      // 3. Mark letter as sent
      const { error: updateError } = await supabase
        .from("future_letters")
        .update({ sent: true })
        .eq("id", letter.id)

      if (updateError) console.error("Failed to mark letter as sent:", updateError)
    }

    return new Response("Letters sent successfully!", { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response("Error sending letters", { status: 500 })
  }
})
