export type ProjectLink = {
  type: "github" | "live";
  href: string;
};

export type Project = {
  name: string;
  description: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    name: "Byro",
    description: "Event and community management tool. Built with Next.js, Django, Privy, Base blockchain, Supabase, Paystack.",
    links: [
      { type: "github", href: "https://github.com/sammajayi/byro" },
    ],
  },
  {
    name: "RangeZone",
    description: "Prediction market built during a Rootstock bootcamp. Features an oracle workaround and state machine architecture.",
    links: [
      { type: "github", href: "https://github.com/sammajayi/rangezone" },
    ],
  },
  {
    name: "Nabit",
    description: "Web3 marketplace on Farcaster and Base App.",
    links: [
      { type: "github", href: "https://github.com/sammajayi/nabit" },
    ],
  },
];
