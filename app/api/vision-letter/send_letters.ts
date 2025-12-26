// import type { NextApiRequest, NextApiResponse } from "next";
// import supabaseClient from "@/lib/supabase_client";
// import nodemailer from "nodemailer";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     // Fetch letters that haven't been sent yet
//     const { data: letters, error } = await supabaseClient
//       .from("future_letters")
//       .select("*")
//       .eq("sent", false);

//     if (error) throw error;
//     if (!letters || letters.length === 0) return res.status(200).json({ message: "No letters to send" });

//     // Configure Nodemailer with Outlook
//     const transporter = nodemailer.createTransport({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.OUTLOOK_EMAIL,
//         pass: process.env.OUTLOOK_PASSWORD,
//       },
//     });

//     // -----------------------------
//     // Test send (uncomment to use)
//     // -----------------------------
    
//     if (letters.length > 0) {
//       const testLetter = letters[0];
//       await transporter.sendMail({
//         from: `"Your Future Self" <${process.env.OUTLOOK_EMAIL}>`,
//         to: process.env.OUTLOOK_TEST_EMAIL, // your test email
//         subject: "Your 2026 Vision Letter (Test) ✨",
//         text: testLetter.letter,
//         html: `<p>${testLetter.letter.replace(/\n/g, "<br/>")}</p>`,
//       });
//       return res.status(200).json({ message: "Test letter sent successfully!" });
//     }
    

//     // Send each scheduled letter
//     for (const letter of letters) {
//       await transporter.sendMail({
//         from: `"Your Future Self" <${process.env.OUTLOOK_EMAIL}>`,
//         to: letter.email,
//         subject: "Your 2026 Vision Letter ✨",
//         text: letter.letter,
//         html: `<p>${letter.letter.replace(/\n/g, "<br/>")}</p>`,
//       });

//       // Mark as sent
//       await supabaseClient
//         .from("future_letters")
//         .update({ sent: true })
//         .eq("id", letter.id);
//     }

//     return res.status(200).json({ message: "Letters sent successfully!" });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({ error: "Failed to send letters" });
//   }
// }
