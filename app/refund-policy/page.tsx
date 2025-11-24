import React from "react";

// Refund & Cancellation Policy Page for DrManpreetAyurveda.com
// Save as: app/refund-policy/page.tsx OR pages/refund-policy.tsx

export default function RefundCancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Refund & Cancellation Policy</h1>
            <p className="text-sm opacity-80">Service & Product Guidelines</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-xl font-semibold">Consultation Services</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li>No refund is issued once a consultation is completed.</li>
          <li>Appointment cancellations must be made at least <strong>12 hours</strong> before the scheduled time.</li>
          <li>If you miss an appointment without prior information, the fee is <strong>non-refundable</strong>.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Products (if applicable)</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li>Products once opened or used cannot be refunded or replaced.</li>
          <li>Return requests must be raised within <strong>48 hours</strong> of delivery only for damaged or incorrect items.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Contact</h2>
        <p className="mt-3 text-slate-700">For refund or cancellation requests, contact us at:</p>
        <p className="mt-1 text-slate-700 font-semibold">contact@drmanpreetayurveda.com</p>

        <footer className="mt-10 border-t pt-6 text-sm text-slate-600">
          <p>This policy applies to all consultations and product orders made through DrManpreetAyurveda.com.</p>
          <p className="mt-2">© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer>
      </section>
    </main>
  );
}