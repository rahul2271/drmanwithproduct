
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, form_type } = body;

    const { data, error } = await supabase
      .from("contact_form")
      .insert([{ name, email, phone, subject, message, form_type }]);

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Data inserted:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("🔥 API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
