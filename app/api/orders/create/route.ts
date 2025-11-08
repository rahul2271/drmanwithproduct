import { type NextRequest, NextResponse } from "next/server"
import razorpay from "@/lib/razorpay"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, customerName, customerEmail, customerPhone } = body

    console.log("[v0] Creating Razorpay order:", { amount, customerName })

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      customer_notify: 1,
      notes: {
        customerName,
        customerEmail,
        customerPhone,
      },
    }

    const order = await razorpay.orders.create(options)

    console.log("[v0] Razorpay order created:", order.id)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("[v0] Order creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
