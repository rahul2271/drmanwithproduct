import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Securely access environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { data, error } = await supabase
      .from("contact_form") // 👈 your Supabase table name
      .insert([
        {
          name: body.name || "",
          email: body.email || "",
          phone: body.phone || "",
          subject: body.subject || "",
          message: body.message || "",
          form_type: body.type || "contact",
          created_at: new Date().toISOString(),
        },
      ])

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
