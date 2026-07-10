import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wins",
  description:
    "A collection of achievements, hackathons, bounties, and milestones from Samuel Ajayi's journey in Web3.",
  alternates: {
    canonical: "/wins",
  },
  openGraph: {
    title: "Wins | Samuel Ajayi",
    description:
      "A collection of achievements, hackathons, bounties, and milestones from Samuel Ajayi's journey in Web3.",
    url: "https://sammajayi.xyz/wins",
    type: "website",
    images: [
      {
        url: "/images/samuelajayi.png",
        width: 1200,
        height: 630,
        alt: "Samuel Ajayi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wins | Samuel Ajayi",
    description:
      "A collection of achievements, hackathons, bounties, and milestones from Samuel Ajayi's journey in Web3.",
    images: ["/images/samuelajayi.png"],
  },
};

export default function WinsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
