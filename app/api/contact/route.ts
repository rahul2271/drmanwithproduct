import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, form_type, preferred_date, preferred_time, treatment } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let table = "contact_form";

    // choose which table to insert into
    if (form_type === "booking" || form_type === "appointment") {
      table = "appointment_form";
    }

    const insertData =
      table === "appointment_form"
        ? { name, email, phone, subject, preferred_date, preferred_time, treatment, message, form_type }
        : { name, email, phone, subject, message, form_type };

    const { data, error } = await supabase.from(table).insert([insertData]).select();

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`✅ Data inserted into ${table}:`, data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("🔥 API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
