import { globSync } from "glob";
import path from "path";

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  // Scan all routes inside /app/*
  const pages = globSync("app/**/page.{js,jsx,ts,tsx}");

  // Convert them into sitemap URLs
  const staticRoutes = pages
    .map((page) => {
      const route = page
        .replace("app", "")
        .replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      // Skip private folders like api, admin, etc.
      if (route.includes("api") || route.includes("admin")) return null;

      return {
        url: `${baseUrl}${route === "" ? "/" : route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.7,
      };
    })
    .filter(Boolean);

  // Example Dynamic Routes (Doctors, Blogs, Products, etc.)
  // ---- ADD YOUR API URLs HERE ----
  // Example:
  let dynamicRoutes = [];

  // If you have dynamic pages, connect them here:
  // const blogs = await fetch(`${baseUrl}/api/blogs`).then((res) => res.json());
  // dynamicRoutes = blogs.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: "weekly",
  //   priority: 0.8,
  // }));

  return [...staticRoutes, ...dynamicRoutes];
}
