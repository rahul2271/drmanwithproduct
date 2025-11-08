"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Share2, BookmarkPlus } from "lucide-react"
import { blogService } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/blog-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [blog, setBlog] = useState<(BlogPost & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<(BlogPost & { id: string })[]>([])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await blogService.getBlogBySlug(slug)
        if (data) {
          setBlog(data)
          // Fetch related blogs in same category
          const allBlogs = await blogService.getPublishedBlogs()
          const related = allBlogs
            .filter((b) => b.category === data.category && b.slug !== slug)
            .slice(0, 3)
          setRelatedBlogs(related)
        } else {
          setError("Blog post not found")
        }
      } catch (err) {
        console.error("[v0] Error fetching blog:", err)
        setError("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading article...</p>
        </Card>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The blog post you are looking for does not exist."}</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Card>
      </div>
    )
  }

  const metaTags = {
    title: blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords || blog.keywords?.join(", "),
    ogImage: blog.ogImage || blog.image,
    canonicalUrl:
      blog.canonicalUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${blog.slug}`,
  }

  return (
    <>
      <head>
        <title>{metaTags.title} | Dr. Manpreet Ayurveda</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.ogImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.ogImage} />
        {metaTags.canonicalUrl && <link rel="canonical" href={metaTags.canonicalUrl} />}
      </head>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          {blog.image && (
            <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white mb-6 hover:underline text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <Badge className="mb-4">{blog.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
              {blog.metaTags && blog.metaTags.length > 0 && (
                <>
                  <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                  {blog.metaTags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </>
              )}
            </div>

            {/* Markdown Content */}
            <article className="prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg prose-img:my-6 max-w-none">
              <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ node, ...props }) => (
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-8 mb-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-6 mb-4" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mt-5 mb-3" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="text-xl font-semibold text-foreground mt-4 mb-2" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="text-lg text-muted-foreground leading-relaxed mb-4" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-primary/5 rounded" {...props} />
    ),
    img: ({ node, ...props }) => (
      <Image
        src={props.src || "/placeholder.svg"}
        alt={props.alt || "Blog image"}
        width={800}
        height={400}
        className="w-full h-auto rounded-lg my-6 object-cover"
      />
    ),
    video: ({ node, ...props }) => (
      <video controls className="w-full rounded-lg my-6" {...props} />
    ),
  }}
>
  {blog.content}
</ReactMarkdown>
            </article>

            {/* Share & Save */}
            <div className="flex gap-4 py-8 border-y border-border mt-12">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium">
                <BookmarkPlus className="w-4 h-4" />
                Save
              </button>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-border">
              <h3 className="font-bold text-foreground mb-2">Written by {blog.author}</h3>
              <p className="text-muted-foreground">
                {blog.author === "Dr. Manpreet Singh"
                  ? "Dr. Manpreet Singh is an Ayurvedic doctor with 7+ years of experience treating skin conditions. He specializes in holistic approaches to healing psoriasis, eczema, and other dermatological conditions."
                  : `${blog.author} is a contributor to Dr. Manpreet Ayurveda blog.`}
              </p>
            </div>
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`}>
                    <Card className="h-full border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                      <div className="relative h-40 bg-muted overflow-hidden">
                        <Image
                          src={relatedBlog.image || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {relatedBlog.category}
                        </Badge>
                        <h3 className="font-bold text-foreground mb-2 line-clamp-2">{relatedBlog.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(relatedBlog.date).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
