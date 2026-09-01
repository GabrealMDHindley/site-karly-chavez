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
    // play after state applies controls
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl">{title}</h2>
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-line/50 bg-surface">
        <video
          ref={videoRef}
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
            className="group absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors hover:bg-ink/20"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-coral text-3xl text-ink shadow-xl transition-transform group-hover:scale-110">
              ▶
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
