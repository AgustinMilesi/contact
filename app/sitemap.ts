import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agustinmilesi-contact.vercel.app";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
