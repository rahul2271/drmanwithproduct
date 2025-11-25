import { MetadataRoute } from "next";
import { globSync } from "glob";
import path from "path";

const BASE_URL = "https://www.drmanpreetayurveda.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ---------- STATIC ROUTES ----------
  const allPages = globSync("app/**/page.{js,jsx,ts,tsx}");

  const staticPages = allPages
    .filter((page) => !page.includes("["))
    .map((page) => {
      const route = page
        .replace("app", "")
        .replace(/page\.(js|jsx|ts|tsx)$/, "")
        .replace(/\/index$/, "");

      return {
        url: `${BASE_URL}${route === "" ? "/" : route}`,
        lastModified: new Date(),
      };
    });

  // ---------- FETCH DYNAMIC CONTENT ----------
  const [blogs, products, treatments] = await Promise.all([
    fetch(`${BASE_URL}/api/blogs`).then((res) => res.json()).catch(() => []),
    fetch(`${BASE_URL}/api/products`).then((res) => res.json()).catch(() => []),
    fetch(`${BASE_URL}/api/treatments`).then((res) => res.json()).catch(() => []),
  ]);

  // ---------- BLOG URLs ----------
  const blogPages = blogs?.map((b: any) => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: new Date(b.updatedAt || new Date()),
  })) ?? [];

  // ---------- PRODUCT URLs ----------
  const productPages = products?.map((p: any) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt || new Date()),
  })) ?? [];

  // ---------- TREATMENT URLs ----------
  const treatmentPages = treatments?.map((t: any) => ({
    url: `${BASE_URL}/treatments/${t.slug}`,
    lastModified: new Date(t.updatedAt || new Date()),
  })) ?? [];

  // ---------- LIST PAGES (blog/product/treatment) ----------
  const sectionListPages = [
    { url: `${BASE_URL}/blogs`, lastModified: new Date() },
    { url: `${BASE_URL}/products`, lastModified: new Date() },
    { url: `${BASE_URL}/treatments`, lastModified: new Date() },
  ];

  return [
    ...staticPages,
    ...sectionListPages,
    ...blogPages,
    ...productPages,
    ...treatmentPages,
  ];
}
