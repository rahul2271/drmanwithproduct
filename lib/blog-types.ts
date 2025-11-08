export interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: Date
  readTime: string
  keywords: string[]
  metaDescription: string
  metaTags: string[]
  focusKeyword: string
  canonicalUrl?: string
  ogImage?: string
  published: boolean
  createdAt?: Date
  updatedAt?: Date
}
