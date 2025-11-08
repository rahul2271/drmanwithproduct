"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Package, Truck, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const orderId = searchParams.get("orderId")
  const paymentId = searchParams.get("paymentId")

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-accent/10 to-primary/10">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <Card className="p-8 border-2 border-accent bg-card text-center mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-accent animate-bounce" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Payment Successful!</h1>

          <p className="text-lg text-muted-foreground mb-8">
            Your order has been confirmed. You will receive your healing kit soon.
          </p>

          <div className="bg-background p-6 rounded-lg border border-border mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border text-left">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">ORDER ID</p>
                <p className="font-mono text-foreground">{orderId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">PAYMENT ID</p>
                <p className="font-mono text-foreground">{paymentId}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your registered email address with all the details.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-foreground text-lg mb-4">What Happens Next?</h3>
            {[
              { icon: Package, title: "Order Confirmed", desc: "Your order is being prepared" },
              { icon: Truck, title: "Dispatched Soon", desc: "We will ship within 24-48 hours" },
              { icon: MessageSquare, title: "Updates", desc: "Track your delivery in real-time" },
            ].map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flex items-start gap-4 text-left bg-accent/5 p-4 rounded-lg">
                  <Icon size={24} className="text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </Card>

        {/* Additional Info */}
        <Card className="p-6 border-2 border-border">
          <h3 className="font-bold text-foreground mb-4">Important Information</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>✓ Your product is 100% authentic and certified</li>
            <li>✓ Follow the dosage instructions provided with the kit</li>
            <li>✓ For best results, consult Dr. Manpreet for personalized guidance</li>
            <li>✓ All products come with a 30-day money-back guarantee</li>
            <li>✓ Free delivery across India</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
