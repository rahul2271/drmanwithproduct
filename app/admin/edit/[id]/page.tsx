"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/lib/firebase"
import { blogService } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/blog-types"
import { onAuthStateChanged } from "firebase/auth"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), { ssr: false })

const categories = ["Ayurveda Basics", "Skin Conditions", "Treatments", "Nutrition", "Wellness", "Natural Remedies"]

export default function EditBlogPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [formData, setFormData] = useState<BlogPost | null>(null)
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login")
      } else {
        setUser(currentUser)
        fetchBlog()
      }
    })
    return () => unsubscribe()
  }, [router, blogId])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const allBlogs = await blogService.getAllBlogs()
      const blog = allBlogs.find((b) => b.id === blogId)
      if (blog) {
        setFormData(blog)
      } else {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
      router.push("/admin/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !formData) return

    try {
      setImageLoading(true)
      const url = await blogService.uploadImage(file, "blog-images")
      setFormData({ ...formData, image: url })
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setImageLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setSaving(true)

    try {
      const updateData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        author: formData.author,
        readTime: formData.readTime,
        keywords: Array.isArray(formData.keywords)
          ? formData.keywords
          : formData.keywords.split(",").map((k) => k.trim()),
        metaDescription: formData.metaDescription,
        metaTags: Array.isArray(formData.metaTags)
          ? formData.metaTags
          : formData.metaTags.split(",").map((t) => t.trim()),
        published: formData.published,
      }

      await blogService.updateBlog(blogId, updateData)
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error updating blog:", error)
      alert("Failed to update blog post")
    } finally {
      setSaving(false)
    }
  }

  if (!user || loading || !formData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Blog Post</h1>
          <p className="text-muted-foreground mb-8">Update the blog post content and settings</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <div>
                  <Label htmlFor="title">Blog Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter blog post title"
                    required
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g., 5 min read"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short summary of the blog post"
                    required
                    className="mt-2 h-20"
                  />
                </div>

                <div>
                  <Label>Featured Image *</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageLoading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {imageLoading ? "Uploading..." : "Click to upload new image"}
                      </p>
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <img src={formData.image || "/placeholder.svg"} alt="Preview" className="max-h-48 rounded-lg" />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Content *</Label>
                  <div className="mt-2 border border-border rounded-lg overflow-hidden">
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Enter meta description (150-160 characters recommended)"
                    className="mt-2 h-20"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Characters: {formData.metaDescription.length} / 160
                  </p>
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Textarea
                    id="keywords"
                    value={Array.isArray(formData.keywords) ? formData.keywords.join(", ") : formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g., psoriasis, ayurvedic treatment, skin health"
                    className="mt-2 h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="metaTags">Meta Tags</Label>
                  <Textarea
                    id="metaTags"
                    value={Array.isArray(formData.metaTags) ? formData.metaTags.join(", ") : formData.metaTags}
                    onChange={(e) => setFormData({ ...formData, metaTags: e.target.value })}
                    placeholder="e.g., ayurveda, skin-care, wellness"
                    className="mt-2 h-20"
                  />
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <div className="bg-muted p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-foreground mb-4">{formData.title}</h2>
                  {formData.image && (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full max-h-96 object-cover rounded-lg mb-6"
                    />
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span>{formData.category}</span>
                    <span>{formData.author}</span>
                    <span>{formData.readTime}</span>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p>{formData.excerpt}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ ...formData, published: !formData.published })}
              >
                {formData.published ? "Published" : "Draft"}
              </Button>
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
