import type { MetadataRoute } from "next";
import { ideas } from "@/content/ideas";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...ideas.map((idea) => ({
      url: `${site.url}/ideas/${idea.slug}`,
      lastModified: idea.lastReviewed,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
