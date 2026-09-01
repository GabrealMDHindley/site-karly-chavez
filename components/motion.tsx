"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.09,
  role,
  ariaLabel,
  tabIndex,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  role?: string;
  ariaLabel?: string;
  tabIndex?: number;
}) {
  return (
    <motion.div
      className={className}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Subtle scroll-linked vertical drift for imagery. */
export function Parallax({
  children,
  className,
  range = 60,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [range, -range]
  );
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Animated count-up number that starts when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const spring = useSpring(0, { stiffness: 42, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);
  return (
    <span ref={ref} className={className}>
      {reduced ? (
        <span>{value.toLocaleString()}</span>
      ) : (
        <motion.span>{display}</motion.span>
      )}
      {suffix}
    </span>
  );
}
