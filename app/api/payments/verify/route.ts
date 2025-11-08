import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import razorpay from "@/lib/razorpay"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    console.log("[v0] Verifying payment:", { razorpay_order_id, razorpay_payment_id })

    // Verify signature
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = shasum.digest("hex")

    if (digest !== razorpay_signature) {
      console.error("[v0] Invalid payment signature")
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }

    // Get payment details
    const payment = await razorpay.payments.fetch(razorpay_payment_id)

    console.log("[v0] Payment verified successfully:", payment.id)

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      amount: payment.amount,
      status: payment.status,
    })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}
