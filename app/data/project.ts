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
      { type: "live", href: "https://usebyro.com" },
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
  {
    name: "Anonymous Guestbook",
    description: "A public message board where anyone can post, but nobody can tell who posted what.",
    links: [
      { type: "github", href: "https://github.com/sammajayi/Anonymous-guestbook" },
      { type: "live", href: "https://anonymous-guestbook.vercel.app/" },
    ],
  },
];
