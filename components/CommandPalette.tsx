"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  GithubIcon,
  NewTwitterIcon,
  Linkedin01Icon,
  Mail01Icon,
  Home01Icon,
  BookOpen01Icon,
  Award01Icon,
  File01Icon,
} from "hugeicons-react";

type CommandItem = {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  href?: string;
  action?: () => void;
};

type CommandGroup = {
  title: string;
  items: CommandItem[];
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      setSearch("");
      triggerRef.current?.focus({ preventScroll: true });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const socialCommands: CommandGroup = {
    title: "CONNECT",
    items: [
      {
        icon: <Mail01Icon size={18} />,
        label: "Send Email",
        shortcut: "E",
        action: () => { window.location.assign("mailto:samuelajayi554@gmail.com"); setOpen(false); },
      },
      { icon: <NewTwitterIcon size={18} />, label: "Twitter / X", shortcut: "T", href: "https://twitter.com/sammajayi" },
      { icon: <Linkedin01Icon size={18} />, label: "LinkedIn", shortcut: "L", href: "https://linkedin.com/in/sammajayi" },
      { icon: <GithubIcon size={18} />, label: "GitHub", shortcut: "G", href: "https://github.com/sammajayi" },
    ],
  };

  const navigationCommands: CommandGroup = {
    title: "GO TO",
    items: [
      { icon: <Home01Icon size={18} />, label: "Home", shortcut: "G H", href: "/" },
      { icon: <BookOpen01Icon size={18} />, label: "Blog", shortcut: "G B", href: "/blog" },
      { icon: <Award01Icon size={18} />, label: "Wins", shortcut: "G W", href: "/wins" },
      { icon: <File01Icon size={18} />, label: "Resume", shortcut: "G R", href: "/resume" },
    ],
  };

  const commandGroups = [socialCommands, navigationCommands];

  const filteredGroups = commandGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex items-center gap-1.5 rounded text-sm text-muted hover:text-foreground transition-colors"
      >
        Press{" "}
        <kbd className="px-1.5 py-0.5 text-xs bg-surface border border-alabaster-grey rounded font-mono">
          ⌘&nbsp;K
        </kbd>{" "}
        to get in touch
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
                onKeyDown={(e) => {
                  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                  const items = Array.from(
                    listRef.current?.querySelectorAll<HTMLElement>("[data-palette-item]") ?? [],
                  );
                  if (!items.length) return;
                  e.preventDefault();
                  const i = items.indexOf(document.activeElement as HTMLElement);
                  const next = e.key === "ArrowDown" ? i + 1 : i - 1;
                  if (next < 0) inputRef.current?.focus();
                  else items[Math.min(next, items.length - 1)].focus();
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-ghost-white/80 backdrop-blur-md"
                  aria-hidden="true"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-[101] w-full max-w-[560px] bg-surface border border-alabaster-grey shadow-2xl sm:rounded-xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <input
                      ref={inputRef}
                      type="text"
                      name="command-search"
                      aria-label="Search commands"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Type a command or search…"
                      className="w-full bg-transparent text-sm border-none outline-none text-foreground placeholder:text-muted py-2 px-0"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div ref={listRef} className="px-2 pb-4 max-h-[300px] overflow-y-auto overscroll-contain">
                    {filteredGroups.map((group) => (
                      <div key={group.title} className="mt-4 first:mt-0">
                        <div className="px-2 mb-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted">{group.title}</div>
                        </div>
                        {group.items.map((item) => (
                          <PaletteItem key={item.label} {...item} onClose={() => setOpen(false)} />
                        ))}
                      </div>
                    ))}
                    {filteredGroups.length === 0 && (
                      <div role="status" className="py-6 text-center text-muted text-sm">No results found</div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function PaletteItem({ icon, label, shortcut, href, action, onClose }: CommandItem & { onClose: () => void }) {
  const isExternal = Boolean(href && /^https?:/.test(href));
  const className =
    "flex items-center justify-between w-full px-2 py-2.5 text-sm rounded-lg hover:bg-white/5 focus-visible:bg-white/5 cursor-pointer transition-colors text-left";
  const content = (
    <>
      <span className="flex items-center gap-3">
        <span className="flex items-center justify-center text-muted" aria-hidden="true">{icon}</span>
        <span className="text-foreground">{label}</span>
      </span>
      {shortcut && (
        <span className="flex items-center gap-1" aria-hidden="true">
          {shortcut.split(" ").map((key, i) => (
            <kbd key={i} className="px-1.5 py-0.5 text-xs bg-white/5 border border-alabaster-grey rounded font-mono text-muted">{key}</kbd>
          ))}
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        data-palette-item
        onClick={onClose}
        className={className}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      data-palette-item
      onClick={() => { action?.(); onClose(); }}
      className={className}
    >
      {content}
    </button>
  );
}
