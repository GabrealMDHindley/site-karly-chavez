import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Stagger, StaggerItem } from "@/components/motion";
import { neighborhoods } from "@/lib/content";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "California has many places to discover, such as San Diego County and Chula Vista. Explore more about these stunning areas — the neighborhoods Key Connections Real Estate serves.",
};

export default function NeighborhoodsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Areas of Expertise"
        title="Neighborhoods"
        intro="From Chula Vista to Orange County — the Southern California markets we serve every day. Tell us where you want to be and we'll curate the search."
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-16">
        <Stagger className="grid gap-7 md:grid-cols-2">
          {neighborhoods.map((n, i) => (
            <StaggerItem key={n.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <Link
                href={`/listings?q=${encodeURIComponent(n.name.replace(" County", ""))}`}
                className={`group relative block overflow-hidden ${
                  i === 0 ? "aspect-[21/9]" : "aspect-[16/9]"
                }`}
              >
                <Image
                  src={n.image}
                  alt={n.name}
                  fill
                  sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.07]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h2 className="font-display text-3xl font-light text-white">
                    {n.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/70">
                    {n.blurb}
                  </p>
                  <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-brass-pale">
                    Browse the area{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABanner
        title="Don't see your neighborhood?"
        body="We work across San Diego, Riverside, and Los Angeles counties — and we search the full MLS for our clients. Tell us where you want to be."
      />
    </div>
  );
}
