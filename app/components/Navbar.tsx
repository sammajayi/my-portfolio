"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home01Icon,
  BookOpen01Icon,
  File01Icon,
  GithubIcon,
  NewTwitterIcon,
  Linkedin01Icon,
  Mail01Icon,
} from "hugeicons-react";

const navLinks = [
  { label: "Home", href: "/", icon: Home01Icon },
  { label: "Blog", href: "/blog", icon: BookOpen01Icon },
  { label: "Resume", href: "/resume", icon: File01Icon },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/sammajayi", icon: GithubIcon, external: true },
  { label: "Twitter", href: "https://twitter.com/sammajayi", icon: NewTwitterIcon, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/sammajayi", icon: Linkedin01Icon, external: true },
  { label: "Email", href: "mailto:samuelajayi554@gmail.com", icon: Mail01Icon, external: false },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-0.5 rounded-2xl px-2 py-1.5 backdrop-blur-xl"
        style={{
          background: "rgba(14, 14, 14, 0.88)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0px -20px 80px -20px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150"
              style={{
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                background: isActive ? "rgba(255,255,255,0.12)" : undefined,
              }}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}

        {/* Divider */}
        <div
          className="mx-1 h-4 w-px self-center shrink-0"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />

        {socialLinks.map(({ label, href, icon: Icon, external }) => (
          <a
            key={href}
            href={href}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-150"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <Icon size={15} />
          </a>
        ))}
      </nav>
    </div>
  );
}
