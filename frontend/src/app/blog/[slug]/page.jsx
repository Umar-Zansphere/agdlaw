import { notFound } from "next/navigation";
import { BlogArticlePageContent } from "@/components/blog-pages";
import { blogPostSlugs } from "@/data/blog-posts";

export async function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;

  if (!blogPostSlugs.includes(slug)) {
    notFound();
  }

  return <BlogArticlePageContent slug={slug} />;
}
