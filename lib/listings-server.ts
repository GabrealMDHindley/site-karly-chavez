import "server-only";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

export function getListingPhotos(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "listings", slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort()
    .map((f) => `/listings/${slug}/${f}`);
}

// Build-time video-existence contract: the video agents drop files into
// public/videos/<slug>/ and the sections auto-enable on the next deploy.
export function getVideoState(slug: string, leadPhoto: string | undefined) {
  const dir = path.join(process.cwd(), "public", "videos", slug);
  const has = (f: string) => existsSync(path.join(dir, f));
  const poster = (f: string, fallback: string | undefined) =>
    has(f) ? `/videos/${slug}/${f}` : fallback;
  return {
    walkthrough: has("walkthrough.mp4")
      ? {
          src: `/videos/${slug}/walkthrough.mp4`,
          poster: poster("poster-walkthrough.jpg", leadPhoto),
        }
      : null,
    flyover: has("flyover.mp4")
      ? {
          src: `/videos/${slug}/flyover.mp4`,
          poster: poster("poster-flyover.jpg", leadPhoto),
        }
      : null,
  };
}
