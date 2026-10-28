import { notFound } from "next/navigation";
import { PracticeAreaPageContent } from "@/components/practice-areas";
import { practiceAreaSlugs } from "@/lib/site";

export async function generateStaticParams() {
  return practiceAreaSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;

  if (!practiceAreaSlugs.includes(slug)) {
    notFound();
  }

  return <PracticeAreaPageContent slug={slug} />;
}
