import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import Gallery from "@/components/Gallery";
import VideoSection from "@/components/VideoSection";
import ListingCard from "@/components/ListingCard";
import MortgageCalculator from "@/components/MortgageCalculator";
import ListingMap from "@/components/ListingMap";
import { listings, getListing, formatPrice } from "@/lib/listings";
import { getListingPhotos, getVideoState } from "@/lib/listings-server";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return {};
  const lead = getListingPhotos(slug)[0];
  return {
    title: `${listing.address}, ${listing.city} ${listing.state}`,
    description: listing.description.slice(0, 155),
    openGraph: lead ? { images: [lead] } : undefined,
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const photos = getListingPhotos(slug);
  const lead = photos[0];
  const videos = getVideoState(slug, lead);
  const fullAddress = `${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`;
  const sold = listing.status === "Sold";

  const more = listings
    .filter((l) => l.slug !== slug && l.status === listing.status)
    .slice(0, 3);

  const factRows: [string, string | null][] = [
    ["Status", listing.status],
    ["Property Type", listing.propertyType],
    ["MLS® ID", listing.mls],
    ["Year Built", String(listing.yearBuilt)],
    ["Living Area", `${listing.sqft.toLocaleString("en-US")} Sq.Ft.`],
    ["Lot Size", listing.lot],
    ["Neighborhood", listing.neighborhood],
    ["Stories", listing.stories ? String(listing.stories) : null],
    ["Garage Spaces", listing.garage],
    ["Parking", listing.parking],
    ["Pool", listing.pool],
    ["Roof", listing.roof],
    ["Heating", listing.heat],
    ["Cooling", listing.cooling],
    ["Flooring", listing.flooring],
    ["Fireplace", listing.fireplace],
    ["Laundry", listing.laundry],
    ["Appliances", listing.appliances],
    ["Water", listing.water],
    ["Sewer", listing.sewer],
    ["Zoning", listing.zoning],
    ["HOA", listing.hoa],
  ];

  return (
    <div>
      {/* Lead photo header */}
      <section className="relative h-[72svh] min-h-[440px] bg-night">
        {lead && (
          <Image
            src={lead}
            alt={`${fullAddress} — lead photo`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/45"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-shell px-5 pb-12">
            <span
              className={`inline-block px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white ${
                sold ? "bg-white/15" : "bg-brass"
              }`}
            >
              {listing.status}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.6rem)] font-light leading-tight text-white">
              {listing.address}
            </h1>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <p className="text-[15px] text-white/70">
                {listing.city}, {listing.state} {listing.zip}
                {listing.neighborhood ? ` · ${listing.neighborhood}` : ""}
              </p>
              <p className="tabular font-display text-3xl text-brass-pale">
                {formatPrice(listing.price)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs strip */}
      <section className="border-b border-line bg-card">
        <div className="tabular mx-auto grid max-w-shell grid-cols-2 gap-6 px-5 py-9 text-center sm:grid-cols-5">
          {[
            [String(listing.beds), "Bedrooms"],
            [String(listing.baths), "Bathrooms"],
            [listing.sqft.toLocaleString("en-US"), "Sq.Ft."],
            [String(listing.yearBuilt), "Year Built"],
            [listing.lot ?? listing.propertyType, listing.lot ? "Lot" : "Type"],
          ].map(([v, label]) => (
            <div key={label}>
              <p className="font-display text-2xl text-ink">{v}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Description + facts */}
      <section className="mx-auto grid max-w-shell gap-14 px-5 py-20 lg:grid-cols-[3fr_2fr]">
        <div>
          <Reveal>
            <p className="eyebrow">The Home</p>
            <h2 className="mt-3 font-display text-3xl font-light text-ink">
              About this {listing.propertyType === "Multi-Family" ? "property" : "residence"}
            </h2>
            <div className="gold-rule" aria-hidden="true" />
            <p className="mt-7 leading-[1.85] text-ink/80">{listing.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <p className="eyebrow">Highlights</p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-[14.5px] text-ink/80 sm:grid-cols-2">
              {listing.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-brass">
                    ◆
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="border border-line bg-card p-7">
            <p className="eyebrow">Property Facts</p>
            <dl className="mt-5 divide-y divide-line text-sm">
              {factRows
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-2.5">
                    <dt className="shrink-0 text-stone">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
            </dl>
          </div>
          <div className="mt-6 bg-night p-7 text-center">
            <p className="font-display text-xl text-white">
              {sold ? "Curious what your home could sell for?" : `See ${listing.address} with Karly`}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/60">
              {sold
                ? "We secured top dollar here — let's talk about your property."
                : "Schedule a private showing or ask anything about this home."}
            </p>
            <div className="mt-6 grid gap-3">
              <Link
                href={
                  sold
                    ? "/home-valuation"
                    : `/contact?intent=buy&about=${encodeURIComponent(`${listing.address}, ${listing.city}`)}`
                }
                className="btn-gold w-full"
              >
                {sold ? "Get a Home Valuation" : "Request a Showing"}
              </Link>
              <a href={site.phoneHref} className="btn-outline-light tabular w-full">
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      {photos.length > 1 && (
        <section className="mx-auto max-w-shell px-5 pb-16">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h2 className="mb-9 mt-3 font-display text-3xl font-light text-ink">
              Inside {listing.address}
            </h2>
          </Reveal>
          <Gallery photos={photos} address={fullAddress} />
        </section>
      )}

      {/* Video sections — only render when the files exist (5 Spinnaker Way). */}
      {videos.walkthrough && (
        <VideoSection
          eyebrow="Step Inside"
          title="Cinematic Walkthrough"
          src={videos.walkthrough.src}
          poster={videos.walkthrough.poster}
        />
      )}
      {videos.flyover && (
        <VideoSection
          eyebrow="From Above"
          title="Aerial Flyover"
          src={videos.flyover.src}
          poster={videos.flyover.poster}
        />
      )}

      {/* Map */}
      <section className="mx-auto max-w-shell px-5 py-16">
        <Reveal>
          <p className="eyebrow">Location</p>
          <h2 className="mb-9 mt-3 font-display text-3xl font-light text-ink">
            {listing.city}, California
          </h2>
        </Reveal>
        <ListingMap
          markers={[
            {
              lat: listing.lat,
              lng: listing.lng,
              title: listing.address,
              subtitle: `${listing.city}, ${listing.state} ${listing.zip}`,
              photo: lead,
            },
          ]}
        />
      </section>

      {/* Mortgage calculator for active listings */}
      {!sold && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-shell px-5">
            <Reveal>
              <p className="eyebrow">Plan Your Payment</p>
              <h2 className="mb-10 mt-3 font-display text-3xl font-light text-ink">
                Mortgage calculator
              </h2>
            </Reveal>
            <MortgageCalculator initialPrice={listing.price} />
          </div>
        </section>
      )}

      {/* More like this */}
      {more.length > 0 && (
        <section className="mx-auto max-w-shell px-5 py-20">
          <Reveal>
            <p className="eyebrow">Keep Exploring</p>
            <h2 className="mb-9 mt-3 font-display text-3xl font-light text-ink">
              More {sold ? "past transactions" : "properties"}
            </h2>
          </Reveal>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((l) => (
              <ListingCard
                key={l.slug}
                listing={l}
                photo={getListingPhotos(l.slug)[0]}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-shell px-5 pb-16">
        <p className="text-center text-xs leading-relaxed text-stone">
          {listing.attribution}
        </p>
      </section>
    </div>
  );
}
