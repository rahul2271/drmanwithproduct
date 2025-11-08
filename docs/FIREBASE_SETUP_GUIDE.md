# Firebase Blog Backend Setup Guide

## Overview
This guide walks you through setting up Firebase for the Dr. Manpreet Ayurveda blog system with full admin panel capabilities.

## Prerequisites
- Firebase account (https://firebase.google.com)
- Admin access to the Vercel project

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Project name: `dr-manpreet-ayurveda-blog`
4. Accept the terms and click "Create project"
5. Wait for the project to be created, then click "Continue"

## Step 2: Set Up Firebase Services

### Enable Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **Production mode**
4. Choose location closest to your users (e.g., `us-central1`)
5. Click "Enable"

### Enable Firebase Storage
1. Go to **Storage**
2. Click "Get started"
3. Start in **Production mode**
4. Choose the same location as Firestore
5. Click "Done"

### Enable Firebase Authentication
1. Go to **Authentication**
2. Click "Get started"
3. Click on "Email/Password"
4. Enable it and click "Save"

## Step 3: Create Admin User

1. In **Authentication**, go to **Users**
2. Click "Add user"
3. Enter your email and password
4. Click "Add user"

## Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Click on **Your apps**
3. Click the web icon `</>`
4. Follow the setup steps to get your config
5. Copy the firebaseConfig object

## Step 5: Add Environment Variables

Add these to your Vercel project environment variables (via Dashboard > Settings > Environment Variables):

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

Or add to your `.env.local` file for local development:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## Step 6: Configure Firestore Rules

1. Go to **Firestore Database**
2. Click on **Rules** tab
3. Replace the rules with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can write
    match /blogs/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
\`\`\`

4. Click "Publish"

## Step 7: Configure Storage Rules

1. Go to **Storage**
2. Click on **Rules** tab
3. Replace the rules with:

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Blog images - authenticated users can upload, anyone can read
    match /blog-images/{allPaths=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
\`\`\`

4. Click "Publish"

## Step 8: Access Admin Panel

1. Go to `/admin/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to `/admin/dashboard`

## Admin Panel Features

### Dashboard
- View all blog posts (published and drafts)
- Toggle publish/unpublish status
- Edit blog posts
- Delete blog posts

### Create Blog Post
- Title (auto-generates slug)
- Category selection
- Featured image upload
- Rich text editor with formatting
- SEO metadata:
  - Meta description (for search engines)
  - Keywords
  - Meta tags

### Edit Blog Post
- Modify all content fields
- Update featured image
- Change SEO metadata
- Toggle publish status

## Blog Post Structure

Each blog post contains:
- **Title**: Main heading
- **Slug**: URL-friendly identifier (auto-generated)
- **Excerpt**: Short summary (50-160 chars)
- **Content**: Full blog content (supports Markdown)
- **Image**: Featured image URL (stored in Firebase Storage)
- **Category**: One of: Ayurveda Basics, Skin Conditions, Treatments, Nutrition, Wellness, Natural Remedies
- **Author**: By default "Dr. Manpreet Singh"
- **Date**: Publication date
- **ReadTime**: Estimated read time
- **Keywords**: SEO keywords (comma-separated)
- **MetaDescription**: For search engines (150-160 chars)
- **MetaTags**: Additional tags (comma-separated)
- **Published**: Boolean flag for visibility

## Markdown Support

The rich text editor supports Markdown formatting:
- `**text**` for bold
- `*text*` for italic
- `## Heading 2` for headings
- `- item` for bullet lists
- `1. item` for ordered lists
- `> quote` for block quotes
- `` `code` `` for inline code

## Troubleshooting

### Blogs not showing on public site
- Check if blog is marked as "Published" in admin dashboard
- Verify Firestore rules allow reading

### Unable to login
- Confirm Firebase Authentication is enabled
- Check admin user exists in Firebase Console
- Verify environment variables are correct

### Images not uploading
- Check Storage bucket name in .env
- Verify Storage rules allow authenticated users to upload
- Try uploading a smaller image file

### Changes not reflecting immediately
- Firestore may take a few seconds to sync
- Refresh the page to clear client cache

## Production Deployment

When deploying to production:

1. Add environment variables to Vercel project settings
2. Redeploy the project
3. Firebase configuration will be loaded from environment variables
4. Admin panel will be accessible at `your-domain.com/admin/login`

## Security Notes

- Never share Firebase credentials
- Admin emails are stored in Firebase Auth
- Firestore rules restrict write access to authenticated users
- Storage rules restrict uploads to authenticated users
- All patient data should be encrypted in production

## Support

For Firebase issues, visit: https://firebase.google.com/support
