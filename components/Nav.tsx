"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(label);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(null), 140);
  };

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-line/70 bg-porcelain/95 shadow-[0_1px_20px_rgba(20,18,13,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-night/60 to-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-shell items-center justify-between px-5 transition-all duration-500 ${
          solid ? "h-16" : "h-20"
        }`}
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt=""
            width={110}
            height={51}
            className={`w-auto transition-all duration-500 ${
              solid ? "h-9" : "h-11 brightness-0 invert"
            }`}
            priority
          />
          <span className="sr-only">Key Connections Real Estate — home</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => enter(item.label)}
                onMouseLeave={leave}
              >
                <button
                  type="button"
                  aria-expanded={dropdown === item.label}
                  onClick={() =>
                    setDropdown((d) => (d === item.label ? null : item.label))
                  }
                  className={`flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors ${
                    solid
                      ? "text-ink/80 hover:text-brass-deep"
                      : "text-white/90 hover:text-brass-pale"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`text-[9px] transition-transform duration-300 ${
                      dropdown === item.label ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <AnimatePresence>
                  {dropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full min-w-[230px] -translate-x-1/2 pt-4"
                    >
                      <div className="border border-line bg-card py-2 shadow-[0_18px_50px_rgba(20,18,13,0.14)]">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setDropdown(null)}
                            className="block px-5 py-2.5 text-[13px] text-ink/80 transition-colors hover:bg-porcelain hover:text-brass-deep"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`link-underline text-[13px] font-medium uppercase tracking-[0.12em] transition-colors ${
                  solid
                    ? pathname === item.href
                      ? "text-brass-deep"
                      : "text-ink/80 hover:text-brass-deep"
                    : pathname === item.href
                      ? "text-brass-pale"
                      : "text-white/90 hover:text-brass-pale"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href={site.phoneHref}
            className={`tabular border px-4 py-2 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
              solid
                ? "border-brass text-brass-deep hover:bg-brass hover:text-white"
                : "border-white/50 text-white hover:border-brass-pale hover:text-brass-pale"
            }`}
          >
            {site.phone}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center lg:hidden ${
            solid ? "text-ink" : "text-white"
          }`}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-porcelain lg:hidden"
          >
            <div className="px-5 pb-8 pt-2">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-line/70">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSection((s) =>
                          s === item.label ? null : item.label
                        )
                      }
                      aria-expanded={mobileSection === item.label}
                      className="flex w-full items-center justify-between py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`text-[10px] text-brass transition-transform duration-300 ${
                          mobileSection === item.label ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    <AnimatePresence>
                      {mobileSection === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3">
                            {item.children.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setOpen(false)}
                                className="block py-2.5 pl-4 text-[15px] text-ink/75"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line/70 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <a
                href={site.phoneHref}
                className="btn-gold mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                Call {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
