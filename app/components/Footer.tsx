import React from "react";
import { ArrowRight02Icon } from "hugeicons-react";

const Footer = () => {
  const socials = [
    { label: "GitHub", href: "https://github.com/sammajayi" },
    { label: "LinkedIn", href: "https://linkedin.com/in/sammajayi" },
    { label: "Twitter", href: "https://twitter.com/sammajayi" },
    { label: "Email", href: "mailto:samuelajayi554@gmail.com" },
  ];

  return (
    <footer
      className="mx-auto w-full max-w-5xl border-t border-alabaster-grey px-6 py-10 sm:px-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between items-center justify-center text-center sm:text-left"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
        <span className="text-sm font-medium text-black">© {new Date().getFullYear()} — <a href="https://x.com/sammajayi" target="_blank" rel="noopener noreferrer" className="text-black hover:text-bright-marine transition-colors">Samuel Ajayi</a></span>
      </div>
      <div className="flex gap-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded text-xs text-muted no-underline hover:text-bright-marine transition-colors duration-200"
          >
            {s.label}
            <ArrowRight02Icon size={14} aria-hidden="true" className="transform -rotate-45" />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;