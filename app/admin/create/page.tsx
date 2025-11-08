"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { ArrowLeft, Upload, AlertCircle, Loader } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), { ssr: false })

const categories = ["Ayurveda Basics", "Skin Conditions", "Treatments", "Nutrition", "Wellness", "Natural Remedies"]

export default function CreateBlogPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "Dr. Manpreet Singh",
    readTime: "5 min read",
    keywords: "",
    metaDescription: "",
    metaTags: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogImage: "",
    published: false,
  })
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login")
      } else {
        setUser(currentUser as any)
      }
    })
    return () => unsubscribe()
  }, [router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setError("")
      setImageLoading(true)
      console.log("[v0] Uploading featured image:", file.name)

      const url = await blogService.uploadImage(file, "blog-featured-images")
      console.log("[v0] Featured image uploaded:", url)

      setFormData({ ...formData, image: url })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to upload image"
      console.error("[v0] Featured image upload error:", err)
      setError(errorMsg)
    } finally {
      setImageLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required")
      return
    }
    if (!formData.excerpt.trim()) {
      setError("Excerpt is required")
      return
    }
    if (!formData.category) {
      setError("Category is required")
      return
    }
    if (!formData.image) {
      setError("Featured image is required")
      return
    }
    if (!formData.focusKeyword) {
      setError("Focus keyword is required for SEO")
      return
    }

    setLoading(true)

    try {
      console.log("[v0] Submitting blog form...")

      const blogData: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        author: formData.author,
        date: new Date(),
        readTime: formData.readTime,
        keywords: formData.keywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k),
        metaDescription: formData.metaDescription,
        metaTags: formData.metaTags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        focusKeyword: formData.focusKeyword,
        canonicalUrl: formData.canonicalUrl || undefined,
        ogImage: formData.ogImage || formData.image,
        published: formData.published,
      }

      const blogId = await blogService.createBlog(blogData)
      console.log("[v0] Blog created successfully:", blogId)

      router.push("/admin/dashboard")
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create blog post"
      console.error("[v0] Blog submission error:", err)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Blog Post</h1>
          <p className="text-muted-foreground mb-8">
            Add a new article with complete SEO optimization and media support
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <div>
                  <Label htmlFor="title">Blog Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="Enter blog post title"
                    required
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Length: {formData.title.length} chars (50-60 recommended for SEO)
                  </p>
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug (Auto-generated - editable)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt * (50-160 chars)</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short summary of the blog post (shown in search results)"
                    required
                    className="mt-2 h-20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Length: {formData.excerpt.length} / 160
                    {formData.excerpt.length < 50 && " - Too short"}
                    {formData.excerpt.length > 160 && " - Too long"}
                  </p>
                </div>

                <div>
                  <Label>Blog Content * (with H1-H4, images, and videos)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Use the toolbar above to format content. Upload images directly from your computer.
                  </p>
                  <div className="mt-2 border border-border rounded-lg overflow-hidden">
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-6">
                <div>
                  <Label>Featured Image * (1200x800px recommended)</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageLoading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      {imageLoading ? (
                        <>
                          <Loader className="w-8 h-8 mx-auto mb-2 text-muted-foreground animate-spin" />
                          <p className="text-sm text-muted-foreground">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload featured image</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                        </>
                      )}
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <p className="text-xs font-medium mb-2">Preview:</p>
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-48 rounded-lg border border-border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="ogImage">Open Graph Image (Social Media Share)</Label>
                  <Input
                    id="ogImage"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="URL for social media preview (defaults to featured image)"
                    className="mt-2"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                      <p className="font-semibold mb-2">Media Tips:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Images should be high-quality (1200x800px minimum)</li>
                        <li>Compress images to reduce file size</li>
                        <li>Always add descriptive alt text for accessibility and SEO</li>
                        <li>Videos must be uploaded with direct URLs (MP4, WebM)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6">
                <div>
                  <Label htmlFor="focusKeyword">Focus Keyword * (Main keyword)</Label>
                  <Input
                    id="focusKeyword"
                    value={formData.focusKeyword}
                    onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                    placeholder="e.g., 'psoriasis treatment ayurveda'"
                    className="mt-2"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this keyword 1-2 times in title and content. Place in first paragraph.
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description * (150-160 chars)</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="This appears in Google search results"
                    className="mt-2 h-20"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.metaDescription.length} / 160 chars
                    {formData.metaDescription.length < 120 && " (Too short)"}
                    {formData.metaDescription.length > 160 && " (Too long)"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="keywords">SEO Keywords (comma-separated)</Label>
                  <Textarea
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g., psoriasis, skin treatment, ayurvedic remedy"
                    className="mt-2 h-16"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Keywords: {formData.keywords.split(",").filter((k) => k.trim()).length}
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaTags">Meta Tags (comma-separated)</Label>
                  <Textarea
                    id="metaTags"
                    value={formData.metaTags}
                    onChange={(e) => setFormData({ ...formData, metaTags: e.target.value })}
                    placeholder="e.g., ayurveda, wellness, skincare, health"
                    className="mt-2 h-16"
                  />
                </div>

                <div>
                  <Label htmlFor="canonicalUrl">Canonical URL (Optional)</Label>
                  <Input
                    id="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    placeholder="https://yoursite.com/blog/article-slug"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Use only if content is republished elsewhere</p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <p className="font-semibold mb-2">SEO Checklist:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Focus keyword in title and first paragraph</li>
                        <li>Meta description 150-160 characters</li>
                        <li>Use H2, H3 headers with keywords</li>
                        <li>Images have alt text with keywords</li>
                        <li>Slug is URL-friendly</li>
                        <li>At least 300+ words content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <div className="bg-muted p-8 rounded-lg space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Google Search Preview</h3>
                    <div className="bg-background border border-border rounded p-4">
                      <h2 className="text-lg font-semibold text-primary line-clamp-2 mb-1">
                        {formData.title || "Your Blog Title"}
                      </h2>
                      <p className="text-green-600 text-sm mb-2">dr-manpreet-ayurveda.com/blog/{formData.slug}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {formData.metaDescription || "Your meta description will appear here..."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Social Media Preview</h3>
                    {formData.ogImage && (
                      <img
                        src={formData.ogImage || "/placeholder.svg"}
                        alt="OG Preview"
                        className="max-h-48 rounded-lg mb-4 border border-border"
                      />
                    )}
                    <div className="bg-background border border-border rounded p-4">
                      <p className="text-sm font-semibold text-foreground">{formData.title}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formData.excerpt}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <Button
                type="button"
                variant={formData.published ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, published: !formData.published })}
              >
                {formData.published ? "Published" : "Draft"}
              </Button>
              <Button type="submit" disabled={loading || imageLoading} className="flex-1">
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Blog Post"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
