import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Missing Supabase credentials" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    console.log("📩 Received body:", body);

    const { name, email, phone, subject, message, form_type, preferred_date, preferred_time, treatment } = body;

    const table =
      form_type === "booking" || form_type === "appointment"
        ? "appointment_form"
        : "contact_form";

    const insertData =
      table === "appointment_form"
        ? { name, email, phone, subject, preferred_date, preferred_time, treatment, message, form_type }
        : { name, email, phone, subject, message, form_type };

    console.log(`🧾 Inserting into ${table}:`, insertData);

    const { data, error } = await supabase.from(table).insert([insertData]).select();

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`✅ Insert successful into ${table}:`, data);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("🔥 API error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
