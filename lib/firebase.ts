import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCtd5Ip1aSPD8DsLcdCF7xgUlcsGbo8RdY",
  authDomain: "drman-4f7c3.firebaseapp.com",
  projectId: "drman-4f7c3",
  storageBucket: "drman-4f7c3.firebasestorage.app",
  messagingSenderId: "960954705441",
  appId: "1:960954705441:web:081fbef08eea1fef31e560"
};

// Validate Firebase config
if (!firebaseConfig.projectId) {
  console.error("[v0] Firebase configuration is missing. Check .env.local file")
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

// Enable offline persistence
try {
  enableIndexedDbPersistence(db)
} catch (err: any) {
  if (err.code !== "failed-precondition" && err.code !== "unimplemented") {
    console.error("[v0] Firestore persistence error:", err)
  }
}

export default app


