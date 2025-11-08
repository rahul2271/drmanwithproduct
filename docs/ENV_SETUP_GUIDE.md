# Environment Variables Setup Guide for Dr. Manpreet Ayurveda Clinic Website

This guide explains all environment variables needed for the website to function properly, including AI features, form submissions, and email notifications.

## Quick Overview

The website uses the following services that require environment variables:

1. **AI Consultation Feature** - OpenAI API for patient consultation chatbot
2. **Email Notifications** - For appointment confirmations and inquiries
3. **Form Submissions** - Backend processing for bookings and contact forms
4. **Optional: Analytics** - For tracking patient engagement and site performance

---

## Environment Variables Explained

### 1. AI Consultation Chatbot (Required for AI Features)

**What it does:** Powers the 24/7 AI consultation chatbot that provides preliminary patient guidance before booking.

**Variables needed:**
\`\`\`
OPENAI_API_KEY=sk-your-api-key-here
\`\`\`

**How to get it:**
1. Go to [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign up or log in with your account
3. Click "Create new secret key"
4. Copy the key and add it to your environment
5. Keep this key private - never share it publicly

**Cost:** OpenAI charges per API call. Estimated cost: $0.50-$5/month for typical clinic usage

**Setup in Vercel:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add key: `OPENAI_API_KEY`
4. Paste your API key as the value
5. Click "Save"

---

### 2. Email Notifications (Optional but Recommended)

**What it does:** Sends confirmation emails to patients when they book appointments or submit inquiries.

**Two popular options:**

#### Option A: Resend (Recommended for Vercel projects)
\`\`\`
NEXT_PUBLIC_RESEND_API_KEY=re_your-api-key-here
\`\`\`

**How to set up Resend:**
1. Go to [Resend.com](https://resend.com)
2. Click "Get Started" and sign up (free tier available)
3. Go to API Keys section
4. Copy your API key
5. Add to Vercel environment variables

**Cost:** Free tier: 100 emails/day; Paid starts at $20/month

#### Option B: SendGrid
\`\`\`
SENDGRID_API_KEY=SG.your-api-key-here
\`\`\`

**How to set up SendGrid:**
1. Go to [SendGrid.com](https://sendgrid.com)
2. Sign up for free account
3. Go to API Keys section
4. Create new API key with Mail Send permission
5. Add to Vercel environment variables

**Cost:** Free tier: 100 emails/day; Paid starts at $15/month

---

### 3. Database (Optional - For Patient Records & History)

If you want to store patient information and appointment history:

\`\`\`
DATABASE_URL=postgresql://user:password@host/dbname
\`\`\`

**Options:**
- **Supabase** (PostgreSQL) - Free tier available
- **Neon** (PostgreSQL) - Free tier available
- **PlanetScale** (MySQL) - Free tier available

**Example with Supabase:**
1. Go to [Supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection String
4. Copy the PostgreSQL connection string
5. Add as `DATABASE_URL` in Vercel

---

### 4. Analytics (Optional - Track Patient Engagement)

For understanding patient behavior and website performance:

\`\`\`
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
\`\`\`

**How to get Google Analytics ID:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property for your website
3. Copy the Measurement ID (starts with G-)
4. Add as environment variable (note: `NEXT_PUBLIC_` prefix makes it safe for client-side)

**Cost:** Free

---

## Step-by-Step Setup Instructions

### For Vercel Deployment:

1. **Log in to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project "Dr. Manpreet Ayurveda"

2. **Access Environment Variables**
   - Click "Settings" in top menu
   - Select "Environment Variables" from left sidebar

3. **Add Variables**
   - Click "Add New"
   - Enter key name (e.g., `OPENAI_API_KEY`)
   - Paste the value
   - Select which environments: Production, Preview, Development
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click the latest deployment → "Redeploy"
   - Or push new code to trigger automatic redeploy

### For Local Development:

1. **Create `.env.local` file** in project root:
   \`\`\`
   OPENAI_API_KEY=sk-your-local-key
   DATABASE_URL=postgresql://...
   \`\`\`

2. **Never commit this file:**
   - It's already in `.gitignore`
   - Contains sensitive credentials

3. **Restart Next.js server:**
   \`\`\`bash
   npm run dev
   \`\`\`

---

## Required vs Optional Variables

### Minimum Setup (Fully Functional Website)
- ✅ `OPENAI_API_KEY` - For AI chatbot feature

### Recommended Setup (Better Patient Experience)
- ✅ `OPENAI_API_KEY` - AI chatbot
- ✅ `RESEND_API_KEY` or `SENDGRID_API_KEY` - Email confirmations

### Full Setup (Enterprise Ready)
- ✅ `OPENAI_API_KEY` - AI chatbot
- ✅ `RESEND_API_KEY` - Email notifications
- ✅ `DATABASE_URL` - Patient records storage
- ✅ `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - Performance tracking

---

## Testing Your Setup

### 1. Test AI Chatbot
- Navigate to `/ai-consultation` page
- Try asking a question about skin conditions
- If chatbot responds, API key is working ✅

### 2. Test Email (if configured)
- Go to `/contact` page
- Submit appointment booking form
- Check email for confirmation ✅

### 3. Test Database (if configured)
- Book an appointment
- Check database for record entry ✅

---

## Troubleshooting

### AI Chatbot Not Working
- **Error:** "API key invalid"
  - Check key is copied correctly without spaces
  - Verify key is active in OpenAI dashboard
  - Ensure variable is deployed to Vercel

- **Error:** "Rate limit exceeded"
  - Upgrade OpenAI account plan
  - Add billing information

### Emails Not Sending
- Check API key is correct in Resend/SendGrid dashboard
- Verify sender email is verified/authorized
- Check Vercel logs for error messages

### Database Connection Failed
- Verify connection string is correct
- Check if database is online
- Ensure IP whitelist allows Vercel's IPs

---

## Security Best Practices

1. **Never share API keys** - Keep them confidential
2. **Use Vercel's environment variables** - Not `.env` files
3. **Rotate keys regularly** - Update quarterly
4. **Monitor usage** - Check API dashboard for suspicious activity
5. **Use restricted keys** - Only grant necessary permissions

---

## Estimated Monthly Costs

| Service | Free Tier | Paid Tier | Monthly Cost |
|---------|-----------|-----------|--------------|
| OpenAI (GPT-4o-mini) | - | Per use | $5-20 |
| Resend (Email) | 100/day | 10,000/month | $0-20 |
| Supabase (Database) | 500MB | Pay as you go | $0-50 |
| Google Analytics | Free forever | - | $0 |
| **Total** | **Limited** | **Recommended** | **$5-90** |

---

## Need Help?

- **OpenAI Issues:** [OpenAI Support](https://help.openai.com)
- **Vercel Issues:** [Vercel Docs](https://vercel.com/docs)
- **Resend Issues:** [Resend Docs](https://resend.com/docs)
- **Database Issues:** Check respective service documentation

---

## Next Steps

1. Gather all API keys from services above
2. Add them to Vercel environment variables
3. Deploy changes
4. Test each feature on the live website
5. Monitor performance and API usage in service dashboards

---

**Document Version:** 1.0  
**Last Updated:** November 2024  
**Maintained by:** Dr. Manpreet Ayurveda Team
