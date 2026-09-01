"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const ConstellationScene = dynamic(
  () => import("@/components/three/ConstellationScene"),
  {
    ssr: false,
    loading: () => <div className="hero-fallback-glow absolute inset-0" />,
  }
);

export default function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <div className="hero-fallback-glow absolute inset-0" aria-hidden="true" />
      <ConstellationScene />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-32">
        <motion.p {...rise(0.05)} className="eyebrow">
          Key Connections Real Estate · Chula Vista, CA
        </motion.p>
        <motion.h1
          {...rise(0.15)}
          className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[1.05]"
        >
          Your connection to a{" "}
          <span className="coral-gradient-text">brighter, bolder</span> future.
        </motion.h1>
        <motion.p {...rise(0.28)} className="mt-6 max-w-xl text-lg text-muted">
          Karly Chavez — founder, REALTOR®, and your guide to buying, selling,
          and investing across {site.serviceAreas}. Hablo Español.
        </motion.p>
        <motion.div {...rise(0.4)} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/listings"
            className="rounded-full bg-coral px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            View Listings
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-paper/25 px-7 py-3 text-sm text-paper transition-colors hover:border-coral hover:text-coral"
          >
            Contact Karly
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
