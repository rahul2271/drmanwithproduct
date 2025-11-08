import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  getDoc,
} from "firebase/firestore"
import { db, storage } from "./firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import type { BlogPost } from "./blog-types"

export const blogService = {
  // Create blog post
  async createBlog(blogData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) {
    try {
      console.log("[v0] Creating blog post:", blogData.title)
      console.log("[v0] Firebase DB initialized:", !!db)

      const docRef = await addDoc(collection(db, "blogs"), {
        ...blogData,
        date: Timestamp.fromDate(new Date(blogData.date)),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
      console.log("[v0] Blog created successfully with ID:", docRef.id)
      return docRef.id
    } catch (error: any) {
      console.error("[v0] Error creating blog:", error.code, error.message)
      throw new Error(`Failed to create blog post: ${error.message}`)
    }
  },

  // Get all blogs (admin)
  async getAllBlogs() {
    try {
      console.log("[v0] Fetching all blogs...")
      const q = query(collection(db, "blogs"), orderBy("date", "desc"))
      const querySnapshot = await getDocs(q)

      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as (BlogPost & { id: string })[]

      console.log("[v0] Fetched", blogs.length, "blogs")
      return blogs
    } catch (error: any) {
      console.error("[v0] Error fetching all blogs:", error.code, error.message)
      throw new Error(`Failed to fetch blogs: ${error.message}`)
    }
  },

  // Get published blogs only (frontend)
  async getPublishedBlogs() {
    try {
      console.log("[v0] Fetching published blogs...")
      const q = query(collection(db, "blogs"), where("published", "==", true), orderBy("date", "desc"))
      const querySnapshot = await getDocs(q)

      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as (BlogPost & { id: string })[]

      console.log("[v0] Fetched", blogs.length, "published blogs")
      return blogs
    } catch (error: any) {
      console.error("[v0] Error fetching published blogs:", error.code, error.message)
      return []
    }
  },

  // Get single blog by slug
  async getBlogBySlug(slug: string) {
    try {
      console.log("[v0] Fetching blog by slug:", slug)
      const q = query(collection(db, "blogs"), where("slug", "==", slug))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        console.warn("[v0] Blog not found with slug:", slug)
        return null
      }

      const doc = querySnapshot.docs[0]
      const blog = {
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as BlogPost & { id: string }

      console.log("[v0] Blog found:", blog.title)
      return blog
    } catch (error) {
      console.error("[v0] Error fetching blog:", error)
      return null
    }
  },

  // Get blog by ID
  async getBlogById(id: string) {
    try {
      console.log("[v0] Fetching blog by ID:", id)
      const docRef = doc(db, "blogs", id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        console.warn("[v0] Blog not found with ID:", id)
        return null
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        date: docSnap.data().date?.toDate() || new Date(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as BlogPost & { id: string }
    } catch (error) {
      console.error("[v0] Error fetching blog by ID:", error)
      return null
    }
  },

  // Update blog post
  async updateBlog(id: string, blogData: Partial<BlogPost>) {
    try {
      console.log("[v0] Updating blog:", id)
      const docRef = doc(db, "blogs", id)
      const updateData: any = {
        ...blogData,
        updatedAt: Timestamp.now(),
      }

      if (blogData.date) {
        updateData.date = Timestamp.fromDate(new Date(blogData.date))
      }

      await updateDoc(docRef, updateData)
      console.log("[v0] Blog updated successfully:", id)
    } catch (error) {
      console.error("[v0] Error updating blog:", error)
      throw new Error("Failed to update blog post")
    }
  },

  // Delete blog post
  async deleteBlog(id: string) {
    try {
      console.log("[v0] Deleting blog:", id)
      await deleteDoc(doc(db, "blogs", id))
      console.log("[v0] Blog deleted successfully:", id)
    } catch (error) {
      console.error("[v0] Error deleting blog:", error)
      throw new Error("Failed to delete blog post")
    }
  },

  // Upload image to Firebase Storage
  async uploadImage(file: File, folder = "blog-images") {
    try {
      if (!file) throw new Error("No file provided")

      console.log("[v0] Uploading image:", file.name)
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`
      const storageRef = ref(storage, `${folder}/${filename}`)

      const snapshot = await uploadBytes(storageRef, file)
      console.log("[v0] Image uploaded:", snapshot.ref.fullPath)

      const downloadURL = await getDownloadURL(storageRef)
      console.log("[v0] Download URL generated")

      return downloadURL
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      throw new Error("Failed to upload image")
    }
  },

  // Delete image from storage
  async deleteImage(imageUrl: string) {
    try {
      console.log("[v0] Deleting image...")
      // Extract path from download URL
      const startIndex = imageUrl.indexOf("/o/") + 3
      const endIndex = imageUrl.indexOf("?")
      const path = decodeURIComponent(imageUrl.substring(startIndex, endIndex))

      const imageRef = ref(storage, path)
      await deleteObject(imageRef)
      console.log("[v0] Image deleted successfully")
    } catch (error) {
      console.error("[v0] Error deleting image:", error)
      // Don't throw - image deletion failure shouldn't block blog deletion
    }
  },
}
