import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Samuel Ajayi",
    template: "%s | Samuel Ajayi",
  },
  description: "Personal portfolio of Samuel Ajayi.",
  manifest: "/images/favicon_io/site.webmanifest",
  themeColor: "#006bb8",
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
    title: "Samuel Ajayi",
    description: "Personal portfolio of Samuel Ajayi.",
    url: "https://sammajayi.xyz",
    siteName: "Samuel Ajayi",
    images: [
      {
        url: "https://sammajayi.xyz/images/samuelajayi.svg",
        width: 1000,
        height: 600,
        alt: "Samuel Ajayi Logo",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Ajayi",
    description: "Personal portfolio of Samuel Ajayi.",
    images: ["https://sammajayi.xyz/images/samuelajayi.svg"],
    creator: "@sammajayi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
