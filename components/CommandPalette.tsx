"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
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
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setSearch("");
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
        action: () => { window.location.href = "mailto:samuelajayi554@gmail.com"; setOpen(false); },
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
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
      >
        Press{" "}
        <kbd className="px-1.5 py-0.5 text-xs bg-surface border border-alabaster-grey rounded font-mono">
          ⌘ K
        </kbd>{" "}
        to get in touch
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-ghost-white/80 backdrop-blur-md"
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
                      placeholder="Type a command or search..."
                      className="w-full bg-transparent text-sm border-none outline-none text-foreground placeholder:text-muted py-2 px-0"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="px-2 pb-4 max-h-[300px] overflow-y-auto">
                    {filteredGroups.map((group, gi) => (
                      <div key={gi} className="mt-4 first:mt-0">
                        <div className="px-2 mb-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted">{group.title}</div>
                        </div>
                        {group.items.map((item, ii) => (
                          <PaletteItem key={ii} {...item} onClose={() => setOpen(false)} />
                        ))}
                      </div>
                    ))}
                    {filteredGroups.length === 0 && (
                      <div className="py-6 text-center text-muted text-sm">No results found</div>
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
  const content = (
    <div
      className="flex items-center justify-between w-full px-2 py-2.5 text-sm rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
      onClick={() => { action?.(); onClose(); }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center text-muted">{icon}</div>
        <div className="text-foreground">{label}</div>
      </div>
      {shortcut && (
        <div className="flex items-center gap-1">
          {shortcut.split(" ").map((key, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-muted mx-0.5" />}
              <kbd className="px-1.5 py-0.5 text-xs bg-white/5 border border-alabaster-grey rounded font-mono text-muted">{key}</kbd>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
  return href ? <Link href={href} onClick={onClose}>{content}</Link> : content;
}
