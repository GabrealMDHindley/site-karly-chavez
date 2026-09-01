"use client";

import { useCallback, useEffect, useState } from "react";
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

  const visible = expanded ? photos : photos.slice(0, 12);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) =>
        cur === null ? null : (cur + dir + photos.length) % photos.length
      );
    },
    [photos.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {visible.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative aspect-[3/2] overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
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
            className="rounded-full border border-coral/50 px-6 py-2.5 text-sm text-coral transition-colors hover:bg-coral hover:text-ink"
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
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
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-xl text-paper hover:text-coral"
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
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-xl text-paper hover:text-coral"
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
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-xl text-paper hover:text-coral"
          >
            ›
          </button>
          <p className="tabular absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-muted">
            {lightbox + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
