"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Gallery({
  photos,
  address,
}: {
  photos: string[];
  address: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const visible = expanded ? photos : photos.slice(0, 12);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) =>
        cur === null ? null : (cur + dir + photos.length) % photos.length
      );
    },
    [photos.length]
  );

  const isOpen = lightbox !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        // Keep focus cycling inside the dialog.
        const focusables =
          dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openerRef.current?.focus();
    };
  }, [isOpen, step]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {visible.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setLightbox(i);
            }}
            className="group relative aspect-[3/2] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
            aria-label={`Open photo ${i + 1} of ${photos.length} — ${address}`}
          >
            <Image
              src={src}
              alt={`Photo ${i + 1} — ${address}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      {photos.length > 12 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn-outline-dark"
          >
            {expanded
              ? "Show fewer photos"
              : `View all ${photos.length} photos`}
          </button>
        </div>
      )}

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${lightbox + 1} of ${photos.length} — ${address}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            ref={dialogRef}
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox]}
              alt={`Photo ${lightbox + 1} — ${address}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:text-brass-pale"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:text-brass-pale"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:text-brass-pale"
          >
            ›
          </button>
          <p className="tabular absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightbox + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
