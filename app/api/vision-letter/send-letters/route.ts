// import { NextRequest } from "next/server"
// import supabaseAdmin from "@/lib/supabase_admin"

// import nodemailer from "nodemailer"

// export const runtime = "nodejs"

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const testEmail = body?.testEmail?.trim()

//     // 1️⃣ Configure Nodemailer (Outlook)
//     const transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.OUTLOOK_EMAIL,
//         pass: process.env.OUTLOOK_PASSWORD,
//       },
//     })

//     /* ======================================================
//        🧪 TEST MODE — Send ONE letter immediately
//     ====================================================== */
//     if (testEmail) {
//       const { data: letters, error } = await supabaseAdmin
//         .from("future_letters")
//         .select("*")
//         .eq("email", testEmail)
//         .order("created_at", { ascending: false })
//         .maybeSingle()

//       if (error) {
//         console.error("Supabase fetch error:", error.message)
//         return new Response(
//           JSON.stringify({ message: "Failed to fetch test letter" }),
//           { status: 500 }
//         )
//       }

//       if (!letters) {
//         return new Response(
//           JSON.stringify({ message: "No letter found for this email" }),
//           { status: 404 }
//         )
//       }

// try {
//     await transporter.sendMail({
//       from: `"Your Future Self" <${process.env.OUTLOOK_EMAIL}>`,
//       to: testEmail,
//       subject: "🧪 Test: Letter From Your Future Self",
//       html: `
//         <p><em>This is a test email. Your real letter will arrive on December 31, 2026.</em></p>
//         <hr/>
//         <p>${letters.letter.replace(/\n/g, "<br/>")}</p>
//       `,
//     })
//   } catch (sendError: any) {
//     console.error("SendMail error:", sendError)
//     return new Response(
//       JSON.stringify({ message: "Failed to send test email" }),
//       { status: 500 }
//     )
//   }

//   return new Response(
//     JSON.stringify({ message: "✅ Test email sent successfully" }),
//     { status: 200 }
//   )
// }

//     /* ======================================================
//        🚀 PRODUCTION MODE — Send scheduled letters
//     ====================================================== */

//     const { data: letters, error } = await supabaseAdmin
//       .from("future_letters")
//       .select("*")
//       .eq("sent", false)
//       .lte("scheduled_for", new Date().toISOString())

//     if (error) throw error

//     if (!letters || letters.length === 0) {
//       return new Response(
//         JSON.stringify({ message: "No letters to send" }),
//         { status: 200 }
//       )
//     }
//     // filter out null/undefined rows
//     const validLetters = letters.filter((l) => l && l.letter)
//     for (const letter of validLetters) {
//       try {
//         await transporter.sendMail({
//           from: `"Your Future Self" <${process.env.OUTLOOK_EMAIL}>`,
//           to: letter.email,
//           subject: "Your 2026 Vision Letter ✨",
//           html: `<p>${letter.letter.replace(/\n/g, "<br/>")}</p>`,
//         })

//         await supabaseAdmin
//           .from("future_letters")
//           .update({ sent: true })
//           .eq("id", letter.id)
//       } catch (sendError: any) {
//         console.error(`Failed to send to ${letter.email}:`, sendError.message)
//       }
//     }

//     return new Response(
//       JSON.stringify({ message: "Scheduled letters sent successfully!" }),
//       { status: 200 }
//     )
//   } catch (err: any) {
//     console.error("Send letters error:", err.message)
//     return new Response(
//       JSON.stringify({ error: "Failed to send letters" }),
//       { status: 500 }
//     )
//   }
// }
