import { MetadataRoute } from "next";
import { globSync } from "glob";
import path from "path";

const BASE_URL = "https://www.drmanpreetayurveda.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ---------- STATIC ROUTES ----------
  const staticPages = globSync("app/**/page.{js,jsx,ts,tsx}")
    .map((page) => {
      const route = page
        .replace("app", "")               // remove /app
        .replace(/page\.(js|jsx|ts|tsx)$/, "") // remove file name
        .replace(/\/index$/, "");         // remove /index

      return {
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
      };
    });

  // ---------- DYNAMIC ROUTES ----------
  const [blogs, products, treatments] = await Promise.all([
    fetch(`${BASE_URL}/api/blogs`).then((res) => res.json()).catch(() => []),
    fetch(`${BASE_URL}/api/products`).then((res) => res.json()).catch(() => []),
    fetch(`${BASE_URL}/api/treatments`).then((res) => res.json()).catch(() => []),
  ]);

  // BLOGS
  const blogPages =
    blogs?.map((b: any) => ({
      url: `${BASE_URL}/blogs/${b.slug}`,
      lastModified: new Date(b.updatedAt || new Date()),
    })) ?? [];

  // PRODUCTS
  const productPages =
    products?.map((p: any) => ({
      url: `${BASE_URL}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt || new Date()),
    })) ?? [];

  // TREATMENTS
  const treatmentPages =
    treatments?.map((t: any) => ({
      url: `${BASE_URL}/treatments/${t.slug}`,
      lastModified: new Date(t.updatedAt || new Date()),
    })) ?? [];

  // MAIN SECTION PAGES (list pages)
  const autoListPages = [
    { url: `${BASE_URL}/blogs`, lastModified: new Date() },
    { url: `${BASE_URL}/products`, lastModified: new Date() },
    { url: `${BASE_URL}/treatments`, lastModified: new Date() },
  ];

  return [
    ...staticPages,
    ...autoListPages,
    ...blogPages,
    ...productPages,
    ...treatmentPages,
  ];
}
