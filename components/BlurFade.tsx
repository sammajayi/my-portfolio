"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={{
          hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
          visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
        }}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
