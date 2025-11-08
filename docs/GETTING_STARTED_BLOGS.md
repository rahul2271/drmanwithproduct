# Blog System - Getting Started

Your blog system is fully built and ready to use! Follow these steps to get it working.

## Step 1: Firebase Setup (5 minutes)

### Create Firebase Project
1. Go to https://firebase.google.com/
2. Click "Get Started"
3. Create a new project called "dr-manpreet-ayurveda"
4. Accept defaults and create

### Get Firebase Credentials
1. In Firebase Console, click the gear icon → "Project settings"
2. Scroll to "Your apps"
3. Click the web app (or create one with </> icon)
4. Copy the Firebase config

### Set Environment Variables
In the **Vars section of the in-chat sidebar**, add these environment variables:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY = your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID = your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID = your_app_id
\`\`\`

## Step 2: Enable Firebase Services

### Firestore Database
1. In Firebase Console → "Firestore Database"
2. Click "Create Database"
3. Select "Start in test mode"
4. Choose your region
5. Click "Create"

### Storage
1. In Firebase Console → "Storage"
2. Click "Get Started"
3. Accept defaults
4. Click "Done"

### Authentication
1. In Firebase Console → "Authentication"
2. Click "Get Started"
3. Enable "Email/Password"
4. Click "Save"

## Step 3: Security Rules (REQUIRED!)

### Firestore Rules
1. Go to "Firestore Database" → "Rules" tab
2. Click "Edit rules"
3. Replace everything with:

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

4. Click "Publish" (wait for green checkmark)

### Storage Rules
1. Go to "Storage" → "Rules" tab
2. Click "Edit rules"
3. Replace everything with:

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

4. Click "Publish" (wait for green checkmark)

## Step 4: Test Everything

1. Restart your dev server: `npm run dev`
2. Go to http://localhost:3000/admin/login
3. Sign up with an email (e.g., admin@test.com)
4. Go to http://localhost:3000/admin/create
5. Fill in the form:
   - **Title**: "Test Blog Post"
   - **Category**: Select one
   - **Excerpt**: "A test blog post"
   - **Content**: Write some text (click H2 button in toolbar)
   - **Featured Image**: Click upload button and select an image
   - **Focus Keyword**: "ayurveda"
   - **Meta Description**: "Test blog about ayurveda"
6. Click "Published" toggle to mark as published
7. Click "Create Blog Post"
8. Go to http://localhost:3000/blog to see your blog!

## Features Available

### Admin Panel (`/admin`)

**Login** (`/admin/login`)
- Email/password authentication
- Sign up for new admins

**Dashboard** (`/admin/dashboard`)
- View all blogs
- Search and filter
- Edit or delete blogs
- Toggle publish status
- Quick stats

**Create Blog** (`/admin/create`)
- Full markdown editor
- H1-H4 headings
- Bold, italic, underline
- Lists and quotes
- Code blocks
- **Upload images from computer** (click upload icon)
- **Insert images by URL**
- **Embed videos**
- SEO fields (keyword, meta description, etc.)
- Preview before publishing

**Edit Blog** (`/admin/edit/[id]`)
- Modify existing blogs
- Same features as create
- Delete with confirmation

### Frontend (`/blog`)

**Blog Listing Page** (`/blog`)
- All published blogs
- Responsive grid
- Search and filter
- Blog cards with images

**Individual Blog** (`/blog/[slug]`)
- Full blog content
- Properly formatted headings
- Images and videos display
- Author and date info
- Share buttons

## Text Editor Toolbar

| Icon | Function |
|------|----------|
| H1-H4 | Add heading levels |
| **B** | Bold text |
| *I* | Italic text |
| U | Underline |
| • | Bullet list |
| 1. | Numbered list |
| " | Quote |
| `{}` | Code block |
| ⬆️ | Upload image from computer |
| 🖼️ URL | Insert image by URL |
| 🎬 | Embed video |

## Troubleshooting

### "Missing or insufficient permissions"
**Solution:** Check that Storage and Firestore rules show a **green checkmark** in Firebase Console. Rules must be published.

### Image upload is stuck on "Uploading"
**Solution:** 
- Check Firebase Storage exists (not just Database)
- Verify Storage rules are published
- Check file size (keep under 5MB)

### Can't sign up
**Solution:** Verify Email/Password authentication is enabled in Firebase Console → Authentication

### Blog appears but doesn't show on `/blog`
**Solution:** Make sure the blog is marked as "Published" before submitting the form

### No environment variables error
**Solution:** Add all 6 NEXT_PUBLIC_ variables in the Vars section of the in-chat sidebar. Restart dev server after adding.

### Blog appears on dashboard but not on frontend
**Solution:** Check the publish toggle - only published blogs (green toggle) show on the frontend

## API Endpoints (if needed)

- **Create Blog**: POST `/api/blogs`
- **Get Published Blogs**: GET `/api/blogs/published`
- **Get Blog by Slug**: GET `/api/blogs/[slug]`
- **Update Blog**: PUT `/api/blogs/[id]`
- **Delete Blog**: DELETE `/api/blogs/[id]`

## Next Steps

1. **Customize Categories**: Edit the categories array in `/app/admin/create/page.tsx`
2. **Add More Authors**: Update author selection in the create form
3. **Design Blog Cards**: Customize `/components/blog-card.tsx`
4. **Add Comments**: Integrate a comment system (optional)
5. **Add Email Notifications**: Send notifications when new blogs are published

## Support

If you encounter any issues:
1. Check the browser console for `[v0]` debug messages
2. Verify all Firebase rules are published (green checkmark)
3. Ensure all environment variables are set
4. Check Firebase Console logs for specific errors
5. Try signing out and back in if authentication issues occur
