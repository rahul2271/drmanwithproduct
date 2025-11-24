import { globSync } from "glob";

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // Scan all routes inside /app/*
  const pages = globSync("app/**/page.{js,jsx,ts,tsx}");

  const staticRoutes = pages
    .map((page) => {
      const route = page
        .replace("app", "")
        .replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      if (route.includes("api") || route.includes("admin")) return null;

      return {
        url: `${baseUrl}${route === "" ? "/" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.7,
      };
    })
    .filter(Boolean);

  // Dynamic Routes
  let dynamicRoutes = [];

  // ------------ BLOGS (POSTS + PAGINATION) ---------------
  try {
    const blogs = await fetch(`${baseUrl}/api/blogs`).then((res) =>
      res.json()
    );

    // single blog posts
    dynamicRoutes.push(
      ...blogs.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );

    // pagination pages
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
  } catch (err) {
    console.log("Blog fetch failed:", err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
