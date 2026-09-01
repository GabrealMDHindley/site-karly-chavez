import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import YouTubeCard from "@/components/YouTubeCard";
import CTABanner from "@/components/CTABanner";
import { Stagger, StaggerItem } from "@/components/motion";
import { koffeeEpisodes } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Koffee with Karly",
  description:
    "Let's unwind over a coffee chat — Koffee with Karly, the video series from Key Connections Real Estate founder Karly Chavez.",
};

export default function KoffeePage() {
  const youtube = site.socials.find((s) => s.label === "YouTube")?.href;
  return (
    <div>
      <PageHero
        eyebrow="The Series"
        title="Koffee with Karly"
        intro="Let's unwind over a coffee chat — conversations about real estate, community, and life in the South Bay."
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-16">
        <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {koffeeEpisodes.map((ep) => (
            <StaggerItem key={ep.n}>
              <YouTubeCard
                youtubeId={ep.youtubeId}
                title={ep.title}
                thumbnail={`/images/koffee/ep-${ep.n}.webp`}
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
              Subscribe on YouTube
            </a>
          </p>
        )}
      </section>

      <CTABanner
        title="Have a topic for the show?"
        body="Karly loves hearing what buyers, sellers, and neighbors want to know. Send in your question and it might make the next episode."
      />
    </div>
  );
}
