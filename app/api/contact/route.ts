import { supabase } from "@/lib/supabaseClient"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (data.type === "contact") {
      const { name, email, phone, subject, message } = data
      const { error } = await supabase.from("contacts").insert([
        { name, email, phone, subject, message },
      ])
      if (error) throw error
    } else if (data.type === "booking") {
      const {
        name,
        email,
        phone,
        condition,
        preferredDate,
        preferredTime,
        consultationType,
        notes,
      } = data
      const { error } = await supabase.from("bookings").insert([
        {
          name,
          email,
          phone,
          condition,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          consultation_type: consultationType,
          notes,
        },
      ])
      if (error) throw error
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error("Error saving contact:", err)
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    })
  }
}
