# Firebase Security Rules Setup Guide

## Firestore Security Rules

Copy and paste these rules into your Firestore Rules editor:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blogs collection - public read, authenticated write
    match /blogs/{document=**} {
      allow read: if true; // Everyone can read published blogs
      allow create, update, delete: if request.auth != null; // Only authenticated users can write
    }
  }
}
