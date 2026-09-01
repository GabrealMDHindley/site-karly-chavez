"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      className={`relative overflow-hidden bg-night ${
        compact ? "pb-16 pt-32" : "pb-24 pt-40"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/50 to-night"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative mx-auto max-w-shell px-5">
        <motion.p {...rise(0.05)} className="eyebrow-light">
          {eyebrow}
        </motion.p>
        <motion.h1
          {...rise(0.18)}
          className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.08] text-white"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            {...rise(0.32)}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
