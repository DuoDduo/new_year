// lib/supabase_client.ts
import { createClient } from '@supabase/supabase-js'

// Client-side: Use anon key
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabaseClient
