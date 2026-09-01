import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ListingsExplorer from "@/components/ListingsExplorer";
import CTABanner from "@/components/CTABanner";
import { listings } from "@/lib/listings";
import { getListingPhotos } from "@/lib/listings-server";

export const metadata: Metadata = {
  title: "Home Search — Listings & Past Sales",
  description:
    "Search every property represented by Key Connections Real Estate — current listings and past transactions across San Diego County. Filter by price, beds, baths, city, and more.",
};

export default function ListingsPage() {
  const photos = Object.fromEntries(
    listings.map((l) => [l.slug, getListingPhotos(l.slug)[0]])
  );

  return (
    <div>
      <PageHero
        eyebrow="Home Search"
        title="Find your place"
        intro="Browse every property we represent — filter by price, beds, baths, city, and status, or switch to the map to explore by neighborhood. Not finding what you're looking for? We search the full MLS for our clients — reach out and we'll curate listings to your needs."
        compact
      />
      <section className="mx-auto max-w-shell px-5 py-14">
        <Suspense>
          <ListingsExplorer listings={listings} photos={photos} />
        </Suspense>
      </section>
      <CTABanner
        title="Want first look at new inventory?"
        body="We proactively notify our buyers of new inventory — sometimes before it hits the market. Tell us what you're looking for and we'll curate listings to your needs."
      />
    </div>
  );
}
