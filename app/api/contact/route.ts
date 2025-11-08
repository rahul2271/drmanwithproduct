import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase credentials");
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    console.log("📩 Request body:", body);

    const {
      name,
      email,
      phone,
      subject,
      message,
      form_type,
      preferred_date,
      preferred_time,
      treatment,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Use treatment as subject if booking form
    const finalSubject = form_type === "booking" ? treatment : subject;

    // ✅ Select correct table
    const tableName = form_type === "booking" ? "appointment_form" : "contact_form";

    // ✅ Insert unified data
    const { data, error } = await supabase
      .from(tableName)
      .insert([
        {
          name,
          email,
          phone,
          subject: finalSubject, // unified field
          message,
          form_type,
          preferred_date,
          preferred_time,
          treatment,
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Data inserted successfully:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("🔥 Server error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
