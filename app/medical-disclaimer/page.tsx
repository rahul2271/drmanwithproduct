import React from "react";

// Medical / Health Disclaimer Page for DrManpreetAyurveda.com
// Save as: app/disclaimer/page.tsx OR pages/disclaimer.tsx

export default function MedicalDisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Medical / Health Disclaimer</h1>
            <p className="text-sm opacity-80">General Health & Safety Notice</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <p className="mb-6 text-slate-700">The content on DrManpreetAyurveda.com is intended for general informational and educational purposes only.</p>

        <h2 className="text-xl font-semibold mt-6">Important Points</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li>It is <strong>NOT</strong> a substitute for professional medical advice.</li>
          <li>Do <strong>NOT</strong> ignore medical advice because of something you read online.</li>
          <li>Ayurvedic medicines should <strong>NOT</strong> be self-prescribed.</li>
          <li>Herbs, bhasmas, and supplements can have side effects if used incorrectly.</li>
          <li>Always consult your doctor for diagnosis, tests, or treatment plans.</li>
          <li>Results vary depending on age, health condition, body type, and lifestyle.</li>
          <li>For emergencies, please contact your nearest hospital immediately.</li>
        </ul>

        <footer className="mt-8 border-t pt-6 text-sm text-slate-600">
          <p>This disclaimer applies to all website pages, blog posts, videos, and consultation content.</p>
          <p className="mt-2">© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer>
      </section>
    </main>
  );
}
