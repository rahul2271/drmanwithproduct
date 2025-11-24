import React from "react";

/**
 * PrivacyPolicy page for DrManpreetAyurveda.com
 * - Tailwind CSS utility classes used
 * - Save this file as `app/privacy/page.tsx` (Next.js App Router) or `pages/privacy.tsx` (Pages Router)
 * - Replace the placeholders (e.g. [Date], [your clinic email], [your number], [Clinic Address]) with real values
 */

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm opacity-80">(DPDP Act Compliant — India)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <p className="mb-6">DrManpreetAyurveda.com ("we", "our", "us") is committed to protecting your personal data in accordance with the Digital Personal Data Protection Act (DPDP Act), 2023 - India. This Privacy Policy explains how we collect, use, store, and safeguard your data.</p>

        <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
        <p className="mt-3 text-slate-700">We may collect the following personal information:</p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">A. Personal Information</h3>
            <ul className="list-disc list-inside text-sm mt-2 text-slate-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address (if provided)</li>
              <li>Appointment details</li>
              <li>Feedback or inquiry information</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">B. Sensitive Personal Data</h3>
            <p className="text-sm mt-2 text-slate-700">(optional if you submit)</p>
            <ul className="list-disc list-inside text-sm mt-2 text-slate-700">
              <li>Health concerns</li>
              <li>Medical history</li>
              <li>Symptoms shared during consultation or through forms</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">C. Automatically Collected Data</h3>
            <ul className="list-disc list-inside text-sm mt-2 text-slate-700">
              <li>IP address</li>
              <li>Browser information</li>
              <li>Device type</li>
              <li>Cookies & analytics data</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
        <p className="mt-3 text-slate-700">Your data is used to:</p>
        <ul className="list-decimal list-inside text-slate-700 mt-3 space-y-1">
          <li>Schedule appointments</li>
          <li>Provide Ayurvedic consultation and services</li>
          <li>Respond to inquiries</li>
          <li>Improve our website and services</li>
          <li>Send health or service-related updates (only with consent)</li>
          <li>Maintain records as per medical practice requirements</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">3. Sharing of Information</h2>
        <p className="mt-3 text-slate-700">We DO NOT sell your data.</p>
        <p className="mt-2 text-slate-700">We may share your data only with:</p>
        <ul className="list-disc list-inside text-slate-700 mt-2">
          <li>Verified service providers (e.g., hosting, SMS/email services)</li>
          <li>Legal authorities (only if required by law)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">4. Data Storage &amp; Security</h2>
        <p className="mt-3 text-slate-700">We use industry-standard security measures to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.</p>

        <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
        <p className="mt-3 text-slate-700">Under the DPDP Act, you may:</p>
        <ul className="list-disc list-inside text-slate-700 mt-2">
          <li>Request access to your data</li>
          <li>Request correction of your data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent</li>
        </ul>
        <p className="mt-3 text-sm text-slate-700">To exercise any of these rights, email us at: <strong>[your clinic email]</strong></p>

        <h2 className="text-xl font-semibold mt-6">6. Cookies</h2>
        <p className="mt-3 text-slate-700">We use cookies for:</p>
        <ul className="list-disc list-inside text-slate-700 mt-2">
          <li>Analytics</li>
          <li>Performance</li>
          <li>Improving user experience</li>
        </ul>
        <p className="mt-2 text-slate-700 text-sm">You may disable cookies in your browser settings. Disabling certain cookies may affect how the site functions.</p>

        <h2 className="text-xl font-semibold mt-6">7. Changes to Privacy Policy</h2>
        <p className="mt-3 text-slate-700">We may update this Policy anytime. Changes will be posted on this page with an updated "Last Updated" date.</p>

        <h2 className="text-xl font-semibold mt-6">8. Contact Information</h2>
        <p className="mt-3 text-slate-700">Email: <strong>contact@drmanpreetayurveda.com</strong></p>
        <p className="text-slate-700">Phone: <strong>+91 8264333880</strong></p>
        {/* <p className="text-slate-700">Address: <strong>[Clinic Address]</strong></p> */}

        {/* <footer className="mt-8 border-t pt-6 text-sm text-slate-600">
          <p>For any privacy-related questions or requests, please contact our Data Protection Officer at the email above.</p>
          <p className="mt-2">© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer> */}
      </section>
    </main>
  );
}
