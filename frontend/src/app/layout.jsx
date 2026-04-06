import "./globals.css";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata = {
  metadataBase: new URL("https://www.agdlawassociates.in"),

  title: {
    default: "AGD Law Associates | Boutique Law Firm in Chennai, Tamil Nadu",
    template: "%s | AGD Law Associates",
  },
  description:
    "AGD Law Associates is a boutique law firm in Chennai offering expert litigation and legal advisory services in criminal law, civil litigation, constitutional matters, consumer protection, property disputes, family law, arbitration, and corporate advisory across Tamil Nadu.",

  keywords: [
    "AGD Law Associates",
    "law firm Chennai",
    "advocate Chennai",
    "criminal lawyer Tamil Nadu",
    "civil litigation Chennai",
    "consumer protection lawyer",
    "property dispute lawyer",
    "family law attorney Chennai",
    "Madras High Court advocate",
    "arbitration lawyer Tamil Nadu",
    "corporate legal advisory Chennai",
    "AGD Bala Kumar advocate",
    "best lawyer Chennai",
    "legal consultation Tamil Nadu",
  ],

  authors: [{ name: "AGD Law Associates", url: "https://www.agdlawassociates.in" }],
  creator: "AGD Law Associates",
  publisher: "AGD Law Associates",

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.agdlawassociates.in",
    siteName: "AGD Law Associates",
    title: "AGD Law Associates | Boutique Law Firm in Chennai, Tamil Nadu",
    description:
      "Precision-driven litigation and legal advisory across criminal, civil, consumer, constitutional, and commercial matters. Serving Tamil Nadu and beyond since 2016.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AGD Law Associates — Boutique Law Firm Chennai",
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@agdlawassociates",
    creator: "@agdlawassociates",
    title: "AGD Law Associates | Boutique Law Firm in Chennai",
    description:
      "Expert legal services in criminal, civil, consumer, property, family, and constitutional law. Based in Chennai, serving Tamil Nadu & beyond.",
    images: ["/og-image.jpg"],
  },

  // ── Canonical & Alternates ─────────────────────────────────────────────────
  alternates: {
    canonical: "https://www.agdlawassociates.in",
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#c5dfc0" }],
  },

  // ── Manifest ───────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Verification ───────────────────────────────────────────────────────────
  verification: {
    // google: "your-google-site-verification-token",
    // yandex: "your-yandex-verification-token",
  },

  // ── Additional meta ────────────────────────────────────────────────────────
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
    "geo.position": "13.0827;80.2707",
    ICBM: "13.0827, 80.2707",
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": "https://www.agdlawassociates.in/#organization",
      name: "AGD Law Associates",
      url: "https://www.agdlawassociates.in",
      logo: "https://www.agdlawassociates.in/logo.png",
      image: "https://www.agdlawassociates.in/og-image.jpg",
      description:
        "AGD Law Associates is a boutique law firm in Chennai offering precision-driven litigation and legal advisory services across Tamil Nadu and beyond since 2016.",
      foundingDate: "2016",
      telephone: "+91-99943-88855",
      email: "agdlawassociatesoffice@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.0827,
        longitude: 80.2707,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "11:00",
          closes: "17:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Coimbatore" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "State", name: "Tamil Nadu" },
      ],
      serviceType: [
        "Criminal Law",
        "Civil Litigation",
        "Writs & Constitutional Law",
        "Consumer Protection",
        "Property & Real Estate Law",
        "Family & Matrimonial Law",
        "Arbitration & ADR",
        "Corporate Advisory",
        "MCOP & Rent Control",
      ],
      sameAs: [
        "https://www.facebook.com/agdlawassociates",
        "https://www.twitter.com/agdlawassociates",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.agdlawassociates.in/#website",
      url: "https://www.agdlawassociates.in",
      name: "AGD Law Associates",
      publisher: { "@id": "https://www.agdlawassociates.in/#organization" },
    },
    {
      "@type": "Person",
      "@id": "https://www.agdlawassociates.in/#agd-bala-kumar",
      name: "AGD Bala Kumar",
      jobTitle: "Managing Counsel",
      worksFor: { "@id": "https://www.agdlawassociates.in/#organization" },
      description:
        "AGD Bala Kumar has over 12 years of experience in litigation and legal advisory with focused practice across criminal law, civil disputes, constitutional remedies, consumer matters, property law, family law, arbitration, and corporate advisory.",
    },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0b0b0b] text-white antialiased font-[DM_Sans,'Segoe_UI','Helvetica_Neue',sans-serif]">
        <div className="relative isolate min-h-screen overflow-x-clip">
          {/* Radial glow at top */}
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(197,223,192,0.25),transparent_58%)]" />
          {/* Subtle diagonal gradient */}
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0b0b0b_0%,#0b0b0b_60%,rgba(255,255,255,0.06)_100%)]" />
          {children}
        </div>
      </body>
    </html>
  );
}