
// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, phone, subject, message, form_type } = body;

//     const { data, error } = await supabase
//       .from("contact_form")
//       .insert([{ name, email, phone, subject, message, form_type }]);

//     if (error) {
//       console.error("❌ Supabase error:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     console.log("✅ Data inserted:", data);
//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (err: any) {
//     console.error("🔥 API error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ POST method for contact form submissions
export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    const { name, email, phone, subject, message, form_type } = body;

    // ✅ Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // ✅ Insert record into Supabase
    const { data, error } = await supabase
      .from("contact_form")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          form_type: form_type || "general",
        },
      ])
      .select(); // ensures Supabase returns inserted data

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ✅ Success
    console.log("✅ Contact form saved:", data);
    return NextResponse.json(
      { success: true, message: "Form submitted successfully.", data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("🔥 Unexpected API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
