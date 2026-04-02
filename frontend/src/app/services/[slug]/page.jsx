import { notFound } from "next/navigation";
import { PracticeAreaPageContent } from "@/components/practice-areas";

const practiceAreaSlugs = [
  "criminal-law",
  "civil-litigation",
  "writs-constitutional",
  "consumer-protection",
  "property-real-estate",
  "family-matrimonial",
  "arbitration-adr",
  "corporate-advisory",
  "mcop-rent-control",
];

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
