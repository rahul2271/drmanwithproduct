import React from "react";

// Terms & Conditions Page for DrManpreetAyurveda.com
// Save as: app/terms/page.tsx (Next.js App Router) or pages/terms.tsx (Pages Router)

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
            <p className="text-sm opacity-80">(Terms of Use)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <p className="mb-6">Welcome to DrManpreetAyurveda.com. By using this website, you agree to the following Terms and Conditions.</p>

        <h2 className="text-xl font-semibold mt-6">1. Purpose of Website</h2>
        <p className="mt-3 text-slate-700">The content provided is for general Ayurvedic awareness and educational purposes only and must NOT be considered a substitute for medical diagnosis or emergency treatment.</p>

        <h2 className="text-xl font-semibold mt-6">2. User Responsibilities</h2>
        <p className="mt-3 text-slate-700">You agree not to:</p>
        <ul className="list-disc list-inside text-slate-700 mt-2">
          <li>Misuse the website</li>
          <li>Spread misinformation</li>
          <li>Upload harmful files</li>
          <li>Copy or duplicate website content without permission</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">3. Medical Information Disclaimer</h2>
        <p className="mt-3 text-slate-700">All health information on this website is general advice, not personalized treatment.</p>
        <p className="mt-2 text-slate-700">Always consult a qualified Ayurveda doctor before starting any treatment.</p>
        <p className="mt-2 text-slate-700">Results vary from person to person.</p>

        <h2 className="text-xl font-semibold mt-6">4. Appointments & Services</h2>
        <p className="mt-3 text-slate-700">By booking an appointment, you agree that:</p>
        <ul className="list-disc list-inside text-slate-700 mt-2">
          <li>You provide accurate information</li>
          <li>You will follow consultation instructions responsibly</li>
          <li>You understand consultations are based on information provided by you</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">5. Intellectual Property</h2>
        <p className="mt-3 text-slate-700">All content, images, text, videos, logos, and designs are the property of DrManpreetAyurveda.com. Unauthorized use is strictly prohibited.</p>

        <h2 className="text-xl font-semibold mt-6">6. Limitation of Liability</h2>
        <p className="mt-3 text-slate-700">We are not liable for:</p>
        <ul className="list-disc list-inside text-slate-700 mt-2">
          <li>Misuse of website content</li>
          <li>Self-medication or self-diagnosis</li>
          <li>Any loss, side-effect, or damage caused by incorrect use of Ayurvedic medicines</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">7. External Links</h2>
        <p className="mt-3 text-slate-700">Our website may contain links to third-party sites. We are not responsible for their content, accuracy, or policies.</p>

        <h2 className="text-xl font-semibold mt-6">8. Governing Law</h2>
        <p className="mt-3 text-slate-700">These terms are governed by the laws of India.</p>

        {/* <footer className="mt-8 border-t pt-6 text-sm text-slate-600">
          <p>By using our website, you agree to abide by these Terms & Conditions.</p>
          <p className="mt-2">© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer> */}
      </section>
    </main>
  );
}
