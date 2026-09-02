import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import YouTubeCard from "@/components/YouTubeCard";
import CTABanner from "@/components/CTABanner";
import { Stagger, StaggerItem } from "@/components/motion";
import { podcastEpisodes } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "The Key Connections Real Estate podcast — market insight and real conversations from Karly Chavez and guests.",
};

export default function PodcastPage() {
  const youtube = site.socials.find((s) => s.label === "YouTube")?.href;
  return (
    <div>
      <PageHero
        eyebrow="Listen In"
        title="The Podcast"
        intro="Market insight, homeowner stories, and real conversations from the Key Connections team."
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-16">
        <Stagger className="mx-auto grid max-w-4xl gap-7 sm:grid-cols-2">
          {podcastEpisodes.map((ep) => (
            <StaggerItem key={ep.n}>
              <YouTubeCard
                youtubeId={ep.youtubeId}
                title={`${ep.title} — Episode ${ep.n}`}
                thumbnail={`/images/podcast/ep-${ep.n}.webp`}
              />
            </StaggerItem>
          ))}
        </Stagger>
        {youtube && (
          <p className="mt-12 text-center">
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              More on YouTube
            </a>
          </p>
        )}
      </section>

      <CTABanner />
    </div>
  );
}
