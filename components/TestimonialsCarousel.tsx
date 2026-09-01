"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/testimonials";

/** Auto-advancing testimonial carousel with manual controls. */
export default function TestimonialsCarousel({
  count = 8,
  dark = false,
}: {
  count?: number;
  dark?: boolean;
}) {
  const items = testimonials.slice(0, count);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setInterval(() => step(1), 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced, step]);

  const t = items[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative mx-auto max-w-3xl text-center"
    >
      <span
        aria-hidden="true"
        className={`font-display text-7xl leading-none ${
          dark ? "text-brass-pale/60" : "text-brass/40"
        }`}
      >
        “
      </span>
      <div className="relative min-h-[190px] md:min-h-[160px]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className={`text-[15px] leading-relaxed md:text-[17px] ${
                dark ? "text-white/80" : "text-ink/85"
              }`}
            >
              {t.quote}
            </p>
            <footer
              className={`mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] ${
                dark ? "text-brass-pale" : "text-brass-deep"
              }`}
            >
              — {t.name}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous testimonial"
          className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-colors ${
            dark
              ? "border-white/25 text-white/80 hover:border-brass-pale hover:text-brass-pale"
              : "border-line text-ink/70 hover:border-brass hover:text-brass-deep"
          }`}
        >
          ‹
        </button>
        <p
          className={`tabular text-xs tracking-[0.2em] ${
            dark ? "text-white/50" : "text-stone"
          }`}
        >
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next testimonial"
          className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-colors ${
            dark
              ? "border-white/25 text-white/80 hover:border-brass-pale hover:text-brass-pale"
              : "border-line text-ink/70 hover:border-brass hover:text-brass-deep"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
