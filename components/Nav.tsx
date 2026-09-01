"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/listings", label: "Listings" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/40 bg-ink/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt="Key Connections Real Estate"
            width={110}
            height={51}
            className="h-9 w-auto"
            priority
          />
          <span className="sr-only">Key Connections Real Estate — home</span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-coral ${
                pathname === l.href ? "text-coral" : "text-paper/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+16194951339"
            className="rounded-full border border-coral/50 px-4 py-1.5 text-sm text-coral transition-colors hover:bg-coral hover:text-ink"
          >
            (619) 495-1339
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-paper sm:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/40 bg-ink px-5 pb-6 pt-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-base ${
                pathname === l.href ? "text-coral" : "text-paper/90"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+16194951339" className="block py-3 text-base text-coral">
            (619) 495-1339
          </a>
        </div>
      )}
    </header>
  );
}
