import { MetadataRoute } from "next";

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // ------ STATIC PAGES ------
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/products",
    "/blogs",
    "/treatments",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // ------ GET BLOGS DYNAMICALLY ------
  let blogs = [];
  try {
    const res = await fetch(`${baseUrl}/api/blogs`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      blogs = data.map((b) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(),
      }));
    }
  } catch (e) {
    console.error("Blog fetch failed:", e);
  }

  // ------ GET PRODUCTS DYNAMICALLY ------
  let products = [];
  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      products = data.map((p) => ({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: new Date(),
      }));
    }
  } catch (e) {
    console.error("Product fetch failed:", e);
  }

  return [...staticPages, ...blogs, ...products];
}
