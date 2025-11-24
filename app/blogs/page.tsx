"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, BookOpen, Leaf } from "lucide-react"
import { blogService } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/blog-types"

export default function BlogPage() {
  const [blogs, setBlogs] = useState<(BlogPost & { id: string })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const data = await blogService.getPublishedBlogs()
        setBlogs(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const resources = [
    {
      title: "Ayurvedic Skin Care Guide",
      description: "Complete guide to daily skincare routines based on your dosha constitution",
      type: "PDF Guide",
      icon: BookOpen,
    },
    {
      title: "Dietary Recommendations by Dosha",
      description: "Detailed nutritional guide for skin health and disease prevention",
      type: "Resource",
      icon: Leaf,
    },
    {
      title: "Herbal Remedies Reference",
      description: "Comprehensive list of herbs used in treating various skin conditions",
      type: "Reference",
      icon: BookOpen,
    },
    {
      title: "Meditation & Yoga for Skin Health",
      description: "Guided practices to balance doshas and support skin healing",
      type: "Video Series",
      icon: Leaf,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog & Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Educational content about Ayurvedic skin treatments, wellness tips, and natural remedies for lasting skin
            health.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogs.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <Link href={`/blogs/${blogs[0].slug}`}>
              <Card className="overflow-hidden border border-border bg-card hover:shadow-xl transition-shadow cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={blogs[0].image || "/placeholder.svg"}
                      alt={blogs[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{blogs[0].category}</Badge>
                      <span className="text-sm text-muted-foreground">Featured</span>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{blogs[0].title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{blogs[0].excerpt}</p>
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {blogs[0].author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogs[0].date).toLocaleDateString()}
                      </div>
                      <span>{blogs[0].readTime}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">Latest Articles</h2>
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading blogs...</p>
            </Card>
          ) : blogs.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No blogs published yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(1).map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <Card className="h-full border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <Image
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {blog.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">{blog.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.excerpt}</p>

                      <div className="space-y-3 pt-4 border-t border-border text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          {blog.author}
                        </div>
                        <div className="flex justify-between">
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Free Resources</h2>
            <p className="text-lg text-muted-foreground">Download guides and access our learning materials</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, idx) => {
              const Icon = resource.icon
              return (
                <Card
                  key={idx}
                  className="p-8 border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    Download Now <ArrowRight className="w-4 h-4" />
                  </button>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90">
            Get weekly tips on Ayurvedic skincare and wellness delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none"
            />
            <button className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
