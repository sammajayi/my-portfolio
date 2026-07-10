import type { Metadata, Viewport } from "next";
import Navbar from "./components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const SITE_URL = "https://sammajayi.xyz";
const SITE_TITLE = "Samuel Ajayi";
const SITE_DESCRIPTION =
  "Samuel Ajayi is a Frontend and Smart Contract developer building in DeFi, privacy, and the broader Web3 ecosystem.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Samuel Ajayi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Samuel Ajayi",
    "Frontend Developer",
    "Smart Contract Developer",
    "Solidity",
    "Web3",
    "DeFi",
    "Blockchain Developer",
  ],
  authors: [{ name: "Samuel Ajayi", url: SITE_URL }],
  creator: "Samuel Ajayi",
  manifest: "/images/favicon_io/site.webmanifest",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/api/rss",
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon_io/favicon.ico" },
    ],
    apple: "/images/favicon_io/apple-touch-icon.png",
    shortcut: "/images/samuelajayi.svg",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    images: [
      {
        url: "/images/samuelajayi.png",
        width: 1200,
        height: 630,
        alt: "Samuel Ajayi",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/samuelajayi.png"],
    creator: "@sammajayi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#006bb8",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_TITLE,
  url: SITE_URL,
  jobTitle: "Frontend & Smart Contract Developer",
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/images/samuelajayi.png`,
  sameAs: [
    "https://github.com/sammajayi",
    "https://twitter.com/sammajayi",
    "https://linkedin.com/in/sammajayi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-ghost-white text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
