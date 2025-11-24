import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";  
export const revalidate = 60; // Re-generate sitemap every 60 seconds (you can adjust)

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // 1. Static / Core Pages
  const staticRoutes = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
    { url: `${baseUrl}/blogs`, priority: 0.9 },
    { url: `${baseUrl}/products`, priority: 0.9 },
    { url: `${baseUrl}/treatments`, priority: 0.8 },
  ].map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.priority,
  }));

  // 2. Dynamic Blog Pages
  let blogRoutes = [];
  try {
    const res = await fetch(`${baseUrl}/api/blogs`);
    if (res.ok) {
      const blogs = await res.json();
      blogRoutes = blogs.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,   // Use /blog/ if that’s your route
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error("Error fetching blogs for sitemap:", e);
  }

  // 3. Dynamic Product Pages
  let productRoutes = [];
  try {
    const res2 = await fetch(`${baseUrl}/api/products`);
    if (res2.ok) {
      const products = await res2.json();
      productRoutes = products.map((prod) => ({
        url: `${baseUrl}/product/${prod.slug}`,  // or /products/ if that’s how the route is
        lastModified: prod.updatedAt ? new Date(prod.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Error fetching products for sitemap:", e);
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
