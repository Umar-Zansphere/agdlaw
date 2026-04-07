import { blogPosts } from "@/data/blog-posts";
import { practiceAreaSlugs, siteUrl } from "@/lib/site";

export default function sitemap() {
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const serviceRoutes = practiceAreaSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: post.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
