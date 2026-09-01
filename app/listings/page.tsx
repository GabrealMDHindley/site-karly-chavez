import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ListingCard from "@/components/ListingCard";
import { listings, getListingPhotos } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Current listings from Karly Chavez and Key Connections Real Estate — Southern California homes across San Diego, Riverside, and Los Angeles counties.",
};

export default function ListingsPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-2 font-display text-5xl">Listings</h1>
          <p className="mt-4 max-w-xl text-muted">
            Every home, presented the way it deserves.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {listings.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.08}>
              <ListingCard
                listing={l}
                leadPhoto={getListingPhotos(l.slug)[0]}
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
