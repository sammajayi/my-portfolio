"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
  ];

  const isHome = pathname === "/";

  return (
    <header className="w-full bg-ghost-white text-black">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-black hover:text-bright-marine transition-colors">
          Samuel Ajayi
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-bright-marine font-semibold"
                    : "text-muted hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isHome && (
            <>
              <a
                href="#about"
                className="hidden sm:inline-block text-sm font-medium text-muted hover:text-black transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="hidden sm:inline-block text-sm font-medium text-muted hover:text-black transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="hidden sm:inline-block text-sm font-medium text-muted hover:text-black transition-colors"
              >
                Contact
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
