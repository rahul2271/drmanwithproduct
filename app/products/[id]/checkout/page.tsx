"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

// Product data
const products: Record<string, any> = {
  "psoriasis-kit-1": {
    id: "psoriasis-kit-1",
    name: "Complete Psoriasis Healing Kit",
    price: 4999,
    description: "Advanced Ayurvedic formulation for psoriasis treatment",
  },
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = products[productId]

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!product) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle size={48} className="text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.customerName.trim()) return "Name is required"
    if (!formData.customerEmail.trim()) return "Email is required"
    if (!formData.customerPhone.trim()) return "Phone is required"
    if (!formData.street.trim()) return "Street address is required"
    if (!formData.city.trim()) return "City is required"
    if (!formData.state.trim()) return "State is required"
    if (!formData.postalCode.trim()) return "Postal code is required"
    return ""
  }

  const handlePayment = async () => {
    try {
      setError("")
      const validationError = validateForm()
      if (validationError) {
        setError(validationError)
        return
      }

      setLoading(true)
      console.log("[v0] Creating payment order...")

      // Create order
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
        }),
      })

      if (!orderRes.ok) throw new Error("Failed to create order")
      const { orderId } = await orderRes.json()

      console.log("[v0] Order created:", orderId)

      // Load Razorpay script
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true

      script.onload = () => {
        console.log("[v0] Razorpay script loaded")

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: orderId,
          amount: product.price * 100,
          currency: "INR",
          name: "Dr. Manpreet Ayurveda",
          description: product.name,
          customer_id: formData.customerEmail,
          prefill: {
            name: formData.customerName,
            email: formData.customerEmail,
            contact: formData.customerPhone,
          },
          handler: async (response: any) => {
            console.log("[v0] Payment successful:", response.razorpay_payment_id)

            // Verify payment
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            if (!verifyRes.ok) throw new Error("Payment verification failed")
            const verifyData = await verifyRes.json()

            console.log("[v0] Payment verified:", verifyData)

            // Redirect to success page
            router.push(
              `/products/${productId}/success?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}`,
            )
          },
          modal: {
            ondismiss: () => {
              console.log("[v0] Payment modal closed")
              setLoading(false)
            },
          },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
        setLoading(false)
      }

      document.body.appendChild(script)
    } catch (err) {
      console.error("[v0] Payment error:", err)
      setError(err instanceof Error ? err.message : "Payment failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Products
          </Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="md:col-span-2">
            <Card className="p-8 border-2 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Delivery Information</h2>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Full Name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      name="customerEmail"
                      placeholder="Email Address"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <input
                      type="tel"
                      name="customerPhone"
                      placeholder="Phone Number (10 digits)"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      maxLength={10}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Delivery Address</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-2 border-accent bg-accent/5 sticky top-20">
              <h3 className="font-bold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Product</p>
                  <p className="font-semibold text-foreground">{product.name}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Price</span>
                  <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Delivery</span>
                  <span className="font-semibold text-accent">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 hover-scale"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">Secured by Razorpay • 100% Safe & Secure</p>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="text-accent" /> Authentic Products
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="text-accent" /> Money Back Guarantee
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="text-accent" /> Free Delivery India
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
