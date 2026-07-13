"use client";

import Link from "next/link";
import { wins } from "@/app/data/wins";
import BlurFade from "@/components/BlurFade";
import { ArrowRight02Icon } from "hugeicons-react";

const BLUR_FADE_DELAY = 0.04;

export default function WinsSection() {
  const recentWins = wins.slice(0, 5);

  return (
    <section id="wins" className="scroll-mt-24 pt-8">
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-medium">
            Wins
          </div>
          <p className="text-muted text-sm max-w-md">
            Achievements, hackathons, and milestones along the way.
          </p>
        </div>
      </BlurFade>

      <div className="flex flex-col gap-y-2 border-t border-alabaster-grey pt-4">
        {recentWins.map((win, id) => (
          <BlurFade key={win.title} delay={BLUR_FADE_DELAY * 14 + id * 0.05}>
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

      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <div className="flex justify-center mt-6">
          <Link href="/wins" className="inline-flex items-center gap-1.5 rounded-lg bg-bright-marine text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-bright-marine/80">
            View All Wins
            <ArrowRight02Icon size={14} className="transform -rotate-45" />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}
