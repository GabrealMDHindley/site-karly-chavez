"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Lazy YouTube embed — shows the thumbnail until the viewer presses play. */
export default function YouTubeCard({
  youtubeId,
  title,
  thumbnail,
}: {
  youtubeId: string;
  title: string;
  thumbnail: string;
}) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Move focus into the player once the play button unmounts.
    if (playing) frameRef.current?.focus();
  }, [playing]);

  return (
    <div className="group overflow-hidden bg-card shadow-[0_1px_3px_rgba(20,18,13,0.07)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(20,18,13,0.14)]">
      <div className="relative aspect-video bg-night">
        {playing ? (
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="absolute inset-0"
          >
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span
              className="absolute inset-0 bg-night/25 transition-colors duration-300 group-hover:bg-night/10"
              aria-hidden="true"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass pl-1 text-xl text-white shadow-xl transition-transform duration-300 group-hover:scale-110"
            >
              ▶
            </span>
          </button>
        )}
      </div>
      <p className="p-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
        {title}
      </p>
    </div>
  );
}
