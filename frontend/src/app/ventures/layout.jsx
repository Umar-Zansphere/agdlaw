/** @type {import('next').Metadata} */
export const metadata = {
  title: "AGD Law Ventures | Property Due Diligence & Title Scrutiny in Chennai",
  description:
    "AGD Law Ventures is the dedicated paralegal division of AGD Law Associates, providing professional property due diligence, title scrutiny, registration, documentation, and legal verification services in Chennai and Tamil Nadu.",
  keywords: [
    "property due diligence Chennai",
    "title scrutiny Chennai",
    "property registration Chennai",
    "title investigation Tamil Nadu",
    "encumbrance verification Chennai",
    "legal due diligence report property",
    "RERA verification Chennai",
    "Patta Chitta verification",
    "AGD Law Ventures",
    "paralegal services Chennai",
    "property verification lawyers Chennai",
  ],
  alternates: { canonical: "/ventures" },
  openGraph: {
    title: "AGD Law Ventures | Property Due Diligence & Title Scrutiny",
    description:
      "Professional property due diligence, title scrutiny, registration, and legal verification services backed by AGD Law Associates.",
    url: "/ventures",
    type: "website",
  },
};

export default function VenturesLayout({ children }) {
  return children;
}
