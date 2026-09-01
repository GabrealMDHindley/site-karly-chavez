"use client";

import { useRef, useState } from "react";

export default function VideoSection({
  title,
  eyebrow,
  src,
  poster,
}: {
  title: string;
  eyebrow: string;
  src: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setPlaying(true);
    // play after state applies controls; move focus off the unmounted button
    requestAnimationFrame(() => {
      videoRef.current?.focus();
      videoRef.current?.play();
    });
  };

  return (
    <section className="mx-auto max-w-shell px-5 py-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-light text-ink">{title}</h2>
      <div className="relative mt-8 overflow-hidden bg-night shadow-[0_24px_60px_rgba(20,18,13,0.16)]">
        <video
          ref={videoRef}
          tabIndex={-1}
          className="aspect-video w-full"
          poster={poster}
          preload="metadata"
          playsInline
          controls={playing}
        >
          <source src={src} type="video/mp4" />
        </video>
        {!playing && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 flex items-center justify-center bg-night/30 transition-colors hover:bg-night/15"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brass pl-1.5 text-3xl text-white shadow-xl transition-transform group-hover:scale-110">
              ▶
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
