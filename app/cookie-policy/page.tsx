import React from "react";

// Cookie Policy Page for DrManpreetAyurveda.com
// Save as: app/cookie-policy/page.tsx OR pages/cookie-policy.tsx

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Cookie Policy</h1>
            <p className="text-sm opacity-80">How We Use Cookies</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <p className="mb-6 text-slate-700">We use cookies to improve user experience and website performance.</p>

        <h2 className="text-xl font-semibold mt-6">What Cookies We Use</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li><strong>Essential Cookies</strong> – Needed for core site functionality.</li>
          <li><strong>Analytics Cookies</strong> – Google Analytics cookies to understand traffic.</li>
          <li><strong>Performance Cookies</strong> – Improve overall speed and usability.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Managing Cookies</h2>
        <p className="mt-3 text-slate-700">You can disable or manage cookies through your browser settings at any time.</p>

        <footer className="mt-8 border-t pt-6 text-sm text-slate-600">
          <p>This Cookie Policy applies to all users visiting our website.</p>
          <p className="mt-2">© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer>
      </section>
    </main>
  );
}