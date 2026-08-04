import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { works } from "@/content/works";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/blog/`, priority: 0.8 },
    ...works.map((work) => ({
      url: `${base}/works/${work.slug}/`,
      priority: 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${base}/blog/${post.slug}/`,
      lastModified: post.updated ?? post.date,
      priority: 0.6,
    })),
    ...getAllTags().map(({ tag }) => ({
      url: `${base}/blog/tags/${encodeURIComponent(tag)}/`,
      priority: 0.3,
    })),
  ];
}
