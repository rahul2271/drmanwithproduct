import React from "react";

// Shipping & Delivery Policy Page for DrManpreetAyurveda.com
// Save as: app/shipping-policy/page.tsx OR pages/shipping-policy.tsx

export default function ShippingDeliveryPolicyPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#F6EFE6] text-slate-900 py-12 px-6 md:px-20 lg:px-32">
      <header className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-semibold">DM</div> */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Shipping & Delivery Policy</h1>
            <p className="text-sm opacity-80">Order Processing • Shipping • Delivery</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">Last Updated: <strong>24-11-2025</strong></p>
      </header>

      <section className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <p className="mb-6 text-slate-700">This Shipping & Delivery Policy explains how orders for products (herbs, medicines, supplements) are processed, shipped, and delivered by DrManpreetAyurveda.com. If you do not sell products, this policy can be used as a reference for future sales.</p>

        <h2 className="text-xl font-semibold mt-6">1. Order Processing</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li>Orders are processed within <strong>24–48 hours</strong> of receiving payment and confirmation (excluding weekends and public holidays).</li>
          <li>Processing may take longer if prescription verification or manual review is required.</li>
          <li>You will receive an order confirmation email or SMS after placing your order.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">2. Shipping Charges</h2>
        <p className="mt-3 text-slate-700">Shipping charges, if any, will be displayed at checkout based on weight, destination, and chosen courier service. Free shipping offers, if available, will be explicitly mentioned.</p>

        <h2 className="text-xl font-semibold mt-6">3. Delivery Timeframes</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li>Domestic delivery within India typically takes <strong>3–7 business days</strong>, depending on the destination.</li>
          <li>Remote or rural areas might take longer.</li>
          <li>International shipping timelines vary by country and customs processing times.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">4. Tracking Your Order</h2>
        <p className="mt-3 text-slate-700">Once your order is shipped, we will provide a tracking number via email or SMS. Use the tracking number on the courier's website to monitor delivery status.</p>

        <h2 className="text-xl font-semibold mt-6">5. Damaged, Incorrect, or Missing Items</h2>
        <ul className="list-disc list-inside text-slate-700 mt-3 space-y-2">
          <li>Inspect your package upon delivery and report any damage or incorrect items within <strong>48 hours</strong> of receipt.</li>
          <li>For damaged items, retain the original packaging and photos for claims or returns.</li>
          <li>Contact our support team immediately for resolution. Refunds or replacements will be considered on a case-by-case basis.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">6. Returns &amp; Refunds</h2>
        <p className="mt-3 text-slate-700">Open or used products are not eligible for return. For unopened, damaged, or incorrect items, please raise a request within <strong>48 hours</strong> of delivery. See our Refund &amp; Cancellation Policy for more details.</p>

        <h2 className="text-xl font-semibold mt-6">7. Customs, Duties &amp; Taxes (International Orders)</h2>
        <p className="mt-3 text-slate-700">International orders may be subject to customs duties, taxes, or import restrictions. These charges are the responsibility of the recipient and may cause delivery delays.</p>

        <h2 className="text-xl font-semibold mt-6">8. Contact</h2>
        <p className="mt-3 text-slate-700">For shipping inquiries, tracking issues, or claims, contact us at:</p>
        <p className="mt-3 text-slate-700">Email: <strong>contact@drmanpreetayurveda.com</strong></p>
        <p className="text-slate-700">Phone: <strong>+91 8264333880</strong></p>

        <footer className="mt-10 border-t pt-6 text-sm text-slate-600">
          <p>This policy applies to all product orders placed through DrManpreetAyurveda.com.</p>
          <p className="mt-2">© {new Date().getFullYear()} DrManpreetAyurveda.com</p>
        </footer>
      </section>
    </main>
  );
}
