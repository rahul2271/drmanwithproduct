import { globSync } from "glob";

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // ------------------ STATIC ROUTES ------------------
  const pages = globSync("app/**/page.{js,jsx,ts,tsx}");

  const staticRoutes = pages
    .map((page) => {
      const route = page
        .replace(/^app/, "")
        .replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      if (
        route.includes("/api") ||
        route.includes("/admin") ||
        route.includes("/private") ||
        route.includes("/cart") ||
        route.includes("/checkout") ||
        route.includes("/order")
      ) {
        return null;
      }

      return {
        url: `${baseUrl}${route === "" ? "/" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.7,
      };
    })
    .filter(Boolean);

  // Safe fetch
  async function safeJson(url) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      return res.ok ? res.json() : null;
    } catch {
      return null;
    }
  }

  // ------------------ BLOGS ------------------
  const blogs = await safeJson(`${baseUrl}/api/blogs`);
  let blogRoutes = [];

  if (Array.isArray(blogs)) {
    blogRoutes = blogs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || Date.now()),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    blogRoutes.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // ------------------ PRODUCTS ------------------
  const products = await safeJson(`${baseUrl}/api/products`);
  let productRoutes = [];

  if (Array.isArray(products)) {
    productRoutes = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    productRoutes.push({
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // ------------------ TREATMENTS ------------------
  const treatments = await safeJson(`${baseUrl}/api/treatments`);
  let treatmentRoutes = [];

  if (Array.isArray(treatments)) {
    treatmentRoutes = treatments.map((t) => ({
      url: `${baseUrl}/treatments/${t.slug}`,
      lastModified: new Date(t.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  }

  // ------------------ DOCTORS ------------------
  const doctors = await safeJson(`${baseUrl}/api/doctors`);
  let doctorRoutes = [];

  if (Array.isArray(doctors)) {
    doctorRoutes = doctors.map((d) => ({
      url: `${baseUrl}/doctor/${d.slug}`,
      lastModified: new Date(d.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  }

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...productRoutes,
    ...treatmentRoutes,
    ...doctorRoutes,
  ];
}
