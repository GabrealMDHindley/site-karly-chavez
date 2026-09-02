"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import SearchBar from "@/components/SearchBar";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero mirroring keyconnectionsrealty.com — full-viewport photo with dark
 * overlay, "Key Connections Real Estate" headline, "Unlocking Your Dream
 * Home" tagline, and a property search bar — with added parallax and
 * scroll-fade motion.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-night"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/45 to-night/75"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-24 pt-32 text-center"
      >
        <motion.p {...rise(0.1)} className="eyebrow-light">
          Chula Vista · San Diego · Southern California
        </motion.p>
        <motion.h1
          {...rise(0.25)}
          className="mt-6 font-display text-[clamp(2.6rem,6.5vw,4.9rem)] font-light leading-[1.06] text-white"
        >
          Key Connections
          <br />
          Real Estate
        </motion.h1>
        <motion.p
          {...rise(0.42)}
          className="mt-6 text-[13px] font-medium uppercase tracking-[0.34em] text-white/85 md:text-sm"
        >
          Unlocking Your Dream Home
        </motion.p>
        <motion.div {...rise(0.58)} className="mx-auto mt-10 max-w-xl">
          <SearchBar variant="hero" />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-7 items-start justify-center rounded-full border border-white/40 p-2"
        >
          <div className="h-2.5 w-1 rounded-full bg-brass-pale" />
        </motion.div>
      </motion.div>
    </section>
  );
}
