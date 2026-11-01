"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={
          reduceMotion
            ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
            : {
                hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
                visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
              }
        }
        transition={{
          delay: reduceMotion ? 0 : 0.04 + delay,
          duration: reduceMotion ? 0.15 : duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
  );
}
