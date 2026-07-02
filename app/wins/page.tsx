"use client";

import Link from "next/link";
import { wins } from "@/app/data/wins";
import BlurFade from "@/components/BlurFade";
import { ArrowRight02Icon } from "hugeicons-react";

const BLUR_FADE_DELAY = 0.04;

export default function WinsPage() {
  return (
    <main className="min-h-screen bg-ghost-white text-black">
      <header className="mx-auto w-full max-w-2xl px-6 pb-6 pt-10 sm:px-8 sm:pt-16">
        <div className="flex justify-between items-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Wins</h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">&larr; Back to home</Link>
          </BlurFade>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mt-4 text-muted text-sm leading-relaxed">
            A collection of achievements, hackathons, bounties, and milestones from my journey in Web3.
          </p>
        </BlurFade>
      </header>

      <div className="mx-auto w-full max-w-2xl px-6 sm:px-8">
        <div className="flex flex-col gap-y-2 border-t border-alabaster-grey pt-4">
          {wins.map((win, id) => (
            <BlurFade key={win.title} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
              <Link
                href={win.link || "#"}
                target={win.link ? "_blank" : undefined}
                rel={win.link ? "noreferrer" : undefined}
                className="group flex items-center justify-between rounded-lg border border-alabaster-grey bg-white p-4 transition-all hover:border-bright-marine/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-bright-marine transition-colors truncate">
                    {win.title}
                  </h3>
                  {win.date && <span className="text-xs text-muted shrink-0">{win.date}</span>}
                </div>
                <ArrowRight02Icon size={16} className="shrink-0 text-muted group-hover:text-bright-marine transition-all group-hover:translate-x-1" />
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </main>
  );
}
