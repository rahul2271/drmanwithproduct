export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  benefits: string[]
  ingredients: string[]
  dosage: string
  duration: string
  suitableFor: string[]
}

export interface Order {
  id: string
  productId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  amount: number
  razorpayOrderId: string
  razorpayPaymentId?: string
  status: "pending" | "completed" | "failed"
  createdAt: Date
}

export interface PaymentData {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
