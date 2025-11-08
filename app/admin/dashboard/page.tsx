"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/firebase"
import { blogService } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/blog-types"
import { Plus, LogOut, Edit2, Trash2, Eye, EyeOff, Search } from "lucide-react"
import { onAuthStateChanged, signOut } from "firebase/auth"

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<(BlogPost & { id: string })[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<(BlogPost & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login")
      } else {
        setUser(currentUser)
        fetchBlogs()
      }
    })
    return () => unsubscribe()
  }, [router])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const data = await blogService.getAllBlogs()
      setBlogs(data)
      setFilteredBlogs(data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = blogs

    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === filterCategory)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((blog) => (filterStatus === "published" ? blog.published : !blog.published))
    }

    setFilteredBlogs(filtered)
  }, [searchQuery, filterCategory, filterStatus, blogs])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (error) {
        console.error("Error deleting blog:", error)
        alert("Failed to delete blog")
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const togglePublish = async (blog: BlogPost & { id: string }) => {
    try {
      await blogService.updateBlog(blog.id, { published: !blog.published })
      setBlogs(blogs.map((b) => (b.id === blog.id ? { ...b, published: !b.published } : b)))
    } catch (error) {
      console.error("Error toggling publish:", error)
      alert("Failed to update blog status")
    }
  }

  const categories = ["all", ...new Set(blogs.map((b) => b.category))]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Blog Management</h1>
            <p className="text-muted-foreground mt-2">Manage Dr. Manpreet's clinic blog posts</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Link href="/admin/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Blog Post
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 border border-border">
            <p className="text-muted-foreground text-sm">Total Posts</p>
            <p className="text-3xl font-bold text-foreground mt-2">{blogs.length}</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="text-muted-foreground text-sm">Published</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{blogs.filter((b) => b.published).length}</p>
          </Card>
          <Card className="p-6 border border-border">
            <p className="text-muted-foreground text-sm">Drafts</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">{blogs.filter((b) => !b.published).length}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or excerpt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </Card>

        {/* Blog List */}
        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading blogs...</p>
          </Card>
        ) : blogs.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">No blog posts yet</h2>
            <p className="text-muted-foreground mb-6">Create your first blog post to get started</p>
            <Link href="/admin/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create First Blog Post
              </Button>
            </Link>
          </Card>
        ) : filteredBlogs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No blogs match your filters</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Thumbnail */}
                  {blog.image && (
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full lg:w-32 h-24 object-cover rounded"
                    />
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{blog.title}</h3>
                      <Badge variant={blog.published ? "default" : "secondary"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                      <Badge variant="outline">{blog.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                      <span>{blog.readTime}</span>
                      <span>{blog.keywords?.length || 0} keywords</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:flex-col lg:justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => togglePublish(blog)}
                      title={blog.published ? "Unpublish" : "Publish"}
                    >
                      {blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Link href={`/admin/edit/${blog.id}`}>
                      <Button size="sm" variant="ghost">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(blog.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
