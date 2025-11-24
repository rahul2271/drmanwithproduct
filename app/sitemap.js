import { globSync } from "glob";

/**
 * Auto-updating sitemap for:
 * - static pages (scanned from /app/**/page.*)
 * - blogs (individual + pagination) from /api/blogs
 * - products (individual + pagination + catalog pages) from /api/products
 * - treatments from /api/treatments
 *
 * Notes:
 * - cart/checkout/order routes are intentionally NOT added to the sitemap.
 * - Make sure your APIs return arrays with { slug, updatedAt } or similar.
 */

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // ---------- 1) Static pages (from app folder) ----------
  const pages = globSync("app/**/page.{js,jsx,ts,tsx}");

  const staticRoutes = pages
    .map((page) => {
      const route = page
        .replace(/^app/, "")
        .replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      // skip API, admin, private folders
      if (/\/api(\/|$)|\/admin(\/|$)|\/private(\/|$)/.test(route)) return null;

      // skip any explicit cart/checkout routes even if present in app
      if (/\/cart(\/|$)|\/checkout(\/|$)|\/order(\/|$)/.test(route)) return null;

      return {
        url: `${baseUrl}${route === "" ? "/" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.7,
      };
    })
    .filter(Boolean);

  // ---------- 2) Dynamic routes ----------
  const dynamicRoutes = [];

  // Helper: safe fetch wrapper
  async function safeFetchJson(url) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.warn("Sitemap fetch error for", url, err);
      return null;
    }
  }

  // ---------- BLOGS: individual posts + pagination ----------
  const blogs = await safeFetchJson(`${baseUrl}/api/blogs`);
  if (Array.isArray(blogs)) {
    dynamicRoutes.push(
      ...blogs.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(post.updatedAt || Date.now()),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );

    // Blog listing pagination (change postsPerPage to match your site)
    const postsPerPage = 10;
    const totalBlogPages = Math.ceil(blogs.length / postsPerPage) || 1;
    for (let i = 1; i <= totalBlogPages; i++) {
      dynamicRoutes.push({
        url: `${baseUrl}/blogs/page/${i}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }

    // Add main blog index
    dynamicRoutes.push({
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // ---------- PRODUCTS: individual products + catalog pagination ----------
  const products = await safeFetchJson(`${baseUrl}/api/products`);
  if (Array.isArray(products)) {
    // Individual product pages
    dynamicRoutes.push(
      ...products.map((p) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.8,
      }))
    );

    // Product listing / catalog pagination
    const productsPerPage = 12; // change to match your UI
    const totalProductPages = Math.ceil(products.length / productsPerPage) || 1;

    // Add page 1 as /products and subsequent pages as /products/page/2 ...
    dynamicRoutes.push({
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (let i = 2; i <= totalProductPages; i++) {
      dynamicRoutes.push({
        url: `${baseUrl}/products/page/${i}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // ---------- TREATMENTS ----------
  const treatments = await safeFetchJson(`${baseUrl}/api/treatments`);
  if (Array.isArray(treatments)) {
    dynamicRoutes.push(
      ...treatments.map((t) => ({
        url: `${baseUrl}/treatments/${t.slug}`,
        lastModified: new Date(t.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    );
  }

  // ---------- DOCTORS / PROFILES (optional) ----------
  const doctors = await safeFetchJson(`${baseUrl}/api/doctors`);
  if (Array.isArray(doctors)) {
    dynamicRoutes.push(
      ...doctors.map((d) => ({
        url: `${baseUrl}/doctor/${d.slug}`,
        lastModified: new Date(d.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    );
  }

  // ---------- Additional: avoid adding these sensitive e-commerce routes ----------
  // We intentionally DO NOT add /cart, /checkout, /order, /account, etc.

  // ---------- FINAL ----------
  return [...staticRoutes, ...dynamicRoutes];
}
