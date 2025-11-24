// app/robots.js
import { MetadataRoute } from "next";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/order", "/account", "/thank-you", "/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: "https://www.drmanpreetayurveda.com/sitemap.xml",
  };
}
