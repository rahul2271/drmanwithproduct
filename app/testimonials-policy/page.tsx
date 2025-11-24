import React from "react";

// Testimonial & Review Policy Page for DrManpreetAyurveda.com
// Save as: app/testimonials-policy/page.tsx OR pages/testimonials-policy.tsx

export default function TestimonialReviewPolicyPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Testimonial &amp; Review Policy</h1>
            <p className="text-sm opacity-80">Authenticity • Consent • Transparency</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <p className="mb-4 text-slate-700">At DrManpreetAyurveda.com, we value transparency and authenticity. This policy explains how we collect, verify, and display patient testimonials.</p>

        <h2 className="text-xl font-semibold mt-6">1. Authenticity of Testimonials</h2>
        <p className="mt-3 text-slate-700">All testimonials published on our website and social media platforms are from <strong>real patients</strong> who have used our consultation services, treatments, or medicines.</p>

        <h2 className="text-xl font-semibold mt-6">2. Editing &amp; Clarity</h2>
        <p className="mt-3 text-slate-700">Testimonials may be edited only for grammar, spelling, or clarity. We do <strong>not</strong> modify or alter the meaning, experience, or outcome shared by the patient.</p>

        <h2 className="text-xl font-semibold mt-6">3. Patient Consent</h2>
        <p className="mt-3 text-slate-700">We publish testimonials <strong>only after receiving explicit consent</strong> from the patient. Patients may request removal of their testimonial at any time by contacting us.</p>

        <h2 className="text-xl font-semibold mt-6">4. Results Disclaimer</h2>
        <p className="mt-3 text-slate-700">Testimonials represent individual patient experiences. <strong>Results vary</strong> based on body type, health condition, lifestyle, and other factors. The outcomes shown should <strong>not</strong> be considered guaranteed for every individual.</p>

        <h2 className="text-xl font-semibold mt-6">5. Contact for Submissions &amp; Removal</h2>
        <p className="mt-3 text-slate-700">If you wish to submit a testimonial or request removal, please contact us at:</p>
        <p className="mt-3 text-slate-700">Email: <strong>contact@drmanpreetayurveda.com</strong></p>
        <p className="text-slate-700">Phone: <strong>+91 8264333880</strong></p>

        <footer className="mt-8 border-t pt-6 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer>
      </section>
    </main>
  );
}
