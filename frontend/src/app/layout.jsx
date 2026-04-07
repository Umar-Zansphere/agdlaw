import "./globals.css";
import {
  defaultDescription,
  defaultTitle,
  googleSiteVerification,
  siteName,
  siteUrl,
} from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "AGD Law Associates",
    "law firm Chennai",
    "boutique law firm Tamil Nadu",
    "criminal lawyer Chennai",
    "civil litigation Chennai",
    "property lawyer Chennai",
    "family lawyer Chennai",
    "consumer dispute lawyer Chennai",
    "arbitration lawyer Tamil Nadu",
    "corporate legal advisory Chennai",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: googleSiteVerification,
  },
  category: "legal services",
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "AGD Law Associates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/hero.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0b] text-white antialiased [font-family:'Avenir_Next','Segoe_UI','Helvetica_Neue',sans-serif]">
        <div className="relative isolate min-h-screen overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(197,223,192,0.25),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0b0b0b_0%,#0b0b0b_60%,#ffffff0f_100%)]" />
          {children}
        </div>
      </body>
    </html>
  );
}
