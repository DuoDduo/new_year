// // pages/api/save-letter.ts
// import type { NextApiRequest, NextApiResponse } from "next"
// import { supabase } from "@/lib/supabase"

// type Data = {
//   success: boolean
//   message: string
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method not allowed" })
//   }

//   const { name, email, letter } = req.body

//   if (!name || !email || !letter) {
//     return res.status(400).json({ success: false, message: "Missing required fields" })
//   }

//   try {
//     const { error } = await supabase.from("future_letters").insert([
//       {
//         name,
//         email,
//         letter,
//         scheduled_for: "2026-12-31T09:00:00Z", // UTC time for delivery
//         sent: false,
//       },
//     ])
//     if (error) throw error

//     return res.status(200).json({ success: true, message: "Letter saved successfully!" })
//   } catch (err: any) {
//     console.error("Supabase insert error:", err.message)
//     return res.status(500).json({ success: false, message: "Failed to save letter" })
//   }
// }
