import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap() {
  const baseUrl = "https://www.drmanpreetayurveda.com";

  const currentDate = new Date().toISOString();

  // Fetch Blogs
  const blogsSnapshot = await getDocs(collection(db, "blogs"));
  const blogUrls = blogsSnapshot.docs.map((doc) => ({
    url: `${baseUrl}/blogs/${doc.data().slug}`,
    lastModified: currentDate,
  }));

  // Fetch Products
  const productsSnapshot = await getDocs(collection(db, "products"));
  const productUrls = productsSnapshot.docs.map((doc) => ({
    url: `${baseUrl}/products/${doc.id}`,
    lastModified: currentDate,
  }));

  // Fetch Treatments
  const treatmentsSnapshot = await getDocs(collection(db, "treatments"));
  const treatmentUrls = treatmentsSnapshot.docs.map((doc) => ({
    url: `${baseUrl}/treatments/${doc.id}`,
    lastModified: currentDate,
  }));

  // Static Pages
  const staticUrls = [
    "",
    "/about",
    "/contact",
    "/blogs",
    "/products",
    "/treatments",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
    "/shipping-policy",
    "/cookie-policy",
    "/medical-disclaimer",
    "/testimonial-policy",
    "/testimonials",
    "/ai-consultation",
    "/team",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
  }));

  return [...staticUrls, ...blogUrls, ...productUrls, ...treatmentUrls];
}
