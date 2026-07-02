"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dock, DockIcon } from "@/components/Dock";
import {
  Home01Icon,
  BookOpen01Icon,
  File01Icon,
  GithubIcon,
  NewTwitterIcon,
  Linkedin01Icon,
  Mail01Icon,
  Award01Icon,
} from "hugeicons-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const navLinks = [
  { label: "Home", href: "/", icon: Home01Icon },
  { label: "Blog", href: "/blog", icon: BookOpen01Icon },
  { label: "Wins", href: "/wins", icon: Award01Icon },
  { label: "Resume", href: "/resume", icon: File01Icon },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/sammajayi", icon: GithubIcon },
  { label: "Twitter", href: "https://twitter.com/sammajayi", icon: NewTwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/sammajayi", icon: Linkedin01Icon },
  { label: "Email", href: "mailto:samuelajayi554@gmail.com", icon: Mail01Icon },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-surface [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu border border-alabaster-grey">
        {navLinks.map(({ label, href, icon: Icon }) => (
          <DockIcon key={href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
                  style={{
                    color: pathname === href ? "#ffffff" : "rgba(255,255,255,0.5)",
                    background: pathname === href ? "rgba(255,255,255,0.12)" : undefined,
                  }}
                >
                  <Icon size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <div className="mx-1 h-4 w-px self-center shrink-0 bg-alabaster-grey" />

        {socialLinks.map(({ label, href, icon: Icon }) => (
          <DockIcon key={href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={href} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:text-foreground transition-colors duration-150">
                  <Icon size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
