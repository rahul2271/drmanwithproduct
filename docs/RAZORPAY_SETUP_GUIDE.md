# Razorpay Payment Integration Guide

## Overview
Complete guide to set up Razorpay payment gateway for selling Ayurvedic products on Dr. Manpreet's clinic website.

## Step 1: Create Razorpay Account
1. Visit https://razorpay.com
2. Click "Sign Up" and create your business account
3. Verify your email and mobile number
4. Complete KYC (Know Your Customer) verification

## Step 2: Get API Keys
1. Go to Settings → API Keys
2. Copy your **Key ID** and **Key Secret**
3. Keep the Secret Key safe - never share it publicly

## Step 3: Environment Variables
Add these to your `.env.local` file:

\`\`\`
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here
\`\`\`

**Important:** The `NEXT_PUBLIC_` prefix makes it accessible in the browser. Only non-sensitive data should use this prefix.

## Step 4: Install Razorpay Package
\`\`\`bash
npm install razorpay
\`\`\`

## Step 5: Test Mode
- Razorpay creates test and live modes automatically
- Use test mode keys for development
- Switch to live keys in production

### Test Card Details
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

## Step 6: Payment Flow
1. User clicks "Buy Now"
2. Fills in delivery information
3. System creates order via `/api/orders/create`
4. Razorpay checkout modal opens
5. User completes payment
6. System verifies signature via `/api/payments/verify`
7. Success page shows order details

## Features Implemented
✓ Order creation with Razorpay
✓ Payment verification with signature validation
✓ Delivery information collection
✓ Success/failure handling
✓ Email confirmation (configured in Razorpay)
✓ Track orders with Order ID and Payment ID

## Troubleshooting

### Error: "Missing Razorpay Credentials"
- Check environment variables are set
- Restart dev server: `npm run dev`

### Payment Modal Not Opening
- Verify Razorpay script loads
- Check browser console for errors
- Ensure Key ID is correct

### Signature Verification Failed
- Confirm Secret Key is correct
- Don't expose Secret Key in frontend code
- Verify in backend only

## Deployment to Vercel
1. Go to Vercel Project Settings
2. Environment Variables
3. Add both `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
4. Redeploy project

## Next Steps
- Configure email notifications in Razorpay
- Set up payment webhooks for advanced features
- Add multiple products
- Implement order management system
- Add customer support portal
