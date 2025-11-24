import { globSync } from "glob";

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // ------------ STATIC ROUTES FROM APP FOLDER ---------------
  const pages = globSync("app/**/page.{js,jsx,ts,tsx}");

  const staticRoutes = pages
    .map((page) => {
      const route = page
        .replace("app", "")
        .replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      // skip API and private folders
      if (route.includes("api") || route.includes("admin")) return null;

      return {
        url: `${baseUrl}${route === "" ? "/" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.7,
      };
    })
    .filter(Boolean);

  // ---------- DYNAMIC ROUTES HOLDER ----------
  let dynamicRoutes = [];

  // -----------------------------------------------------
  // ⭐ 1. BLOGS (POST PAGES + PAGINATION PAGES)
  // -----------------------------------------------------
  try {
    const blogs = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());

    // A) Every blog single page: /blogs/[slug]
    dynamicRoutes.push(
      ...blogs.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(post.updatedAt || Date.now()),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );

    // B) Pagination pages: /blogs/page/1,2,3...
    const postsPerPage = 10;
    const totalPages = Math.ceil(blogs.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      dynamicRoutes.push({
        url: `${baseUrl}/blogs/page/${i}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch (e) {
    console.log("⚠️ Blog API Failed:", e);
  }

  // -----------------------------------------------------
  // ⭐ 2. TREATMENTS (Example: /treatments/[slug])
  // -----------------------------------------------------
  try {
    const treatments = await fetch(`${baseUrl}/api/treatments`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());

    dynamicRoutes.push(
      ...treatments.map((item) => ({
        url: `${baseUrl}/treatments/${item.slug}`,
        lastModified: new Date(item.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    );
  } catch (e) {
    console.log("⚠️ Treatments API Failed:", e);
  }

  // -----------------------------------------------------
  // ⭐ 3. AYURVEDIC PRODUCTS (if you add them later)
  // -----------------------------------------------------
  try {
    const products = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());

    dynamicRoutes.push(
      ...products.map((prod) => ({
        url: `${baseUrl}/products/${prod.slug}`,
        lastModified: new Date(prod.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.6,
      }))
    );
  } catch (e) {
    console.log("⚠️ Products API Failed:", e);
  }

  // -----------------------------------------------------
  // ⭐ FINAL RETURN
  // -----------------------------------------------------
  return [...staticRoutes, ...dynamicRoutes];
}
