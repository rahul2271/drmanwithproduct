# Firebase Setup - Quick Start Guide

## 1. Get Your Firebase Credentials

1. Go to https://firebase.google.com/
2. Click "Go to Console"
3. Create a new project (or use existing)
4. Go to Project Settings (gear icon → Project settings)
5. Under "Your apps", find your web app
6. Copy the Firebase config object

## 2. Set Environment Variables

Create or update `.env.local` with these variables:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## 3. Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in Test Mode** (we'll secure it next)
4. Select your region
5. Click **Create**

## 4. Enable Storage

1. In Firebase Console, go to **Storage**
2. Click **Get Started**
3. Keep default settings
4. Click **Done**

## 5. Enable Authentication

1. Go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** provider
4. Click **Save**

## 6. Set Security Rules (CRITICAL)

### Firestore Rules

1. Go to **Firestore Database** → **Rules**
2. Replace everything with:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
\`\`\`

3. Click **Publish**

### Storage Rules

1. Go to **Storage** → **Rules**
2. Replace everything with:

\`\`\`
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-featured-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blog-content-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

3. Click **Publish**

## 7. Test the Setup

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000/admin/login
3. Sign up with an email
4. Go to http://localhost:3000/admin/create
5. Try creating a blog with image upload
6. Check browser console for `[v0]` debug messages
7. Visit http://localhost:3000/blog to see published blogs

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Missing or insufficient permissions" | Check that Storage/Firestore rules are **Published** (green checkmark) |
| Upload stuck on "Uploading" | Check Storage bucket exists in Firebase Console |
| Can't sign up | Check Email/Password auth is enabled |
| Blogs don't show on /blog page | Make sure blogs are marked as "Published" before submitting |
| "Project ID undefined" | Check .env.local has all variables with NEXT_PUBLIC_ prefix |

## Important Notes

- All `NEXT_PUBLIC_` variables are visible in browser (that's normal - Firebase keys are meant to be public)
- Never commit `.env.local` to git (add to .gitignore)
- The "Test Mode" rules expire after 30 days in production - always use custom rules
- Blog creation requires user authentication at `/admin/login`
