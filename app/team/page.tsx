import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTABanner from "@/components/CTABanner";
import { Stagger, StaggerItem } from "@/components/motion";
import { team, teamIntro } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "The Key Connections Real Estate team — founder Karly Chavez and the REALTORS®, coordinators, and broker who go above and beyond for every client. Hablamos Español.",
};

export default function TeamPage() {
  return (
    <div>
      <PageHero
        eyebrow="Meet the Team · Hablamos Español"
        title="The people behind every key"
        intro={teamIntro}
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <div className="group bg-card shadow-[0_1px_3px_rgba(20,18,13,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(20,18,13,0.15)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-[1.3s] group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-6 text-center">
                  <h2 className="font-display text-2xl font-light text-ink">
                    {m.name}
                  </h2>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-deep">
                    {m.role}
                  </p>
                  {m.license && (
                    <p className="tabular mt-1 text-xs text-stone">
                      License {m.license}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-shell px-5">
          <SectionHeading
            eyebrow="Testimonials"
            title="What working with us feels like"
            align="center"
          />
          <div className="mt-12">
            <TestimonialsCarousel count={8} />
          </div>
        </div>
      </section>

      <CTABanner
        title="Join Key Connections"
        body="We're not just building careers; we're fostering a community of driven professionals committed to exceeding expectations. Looking for your next chapter in real estate? Let's talk."
      />
    </div>
  );
}
