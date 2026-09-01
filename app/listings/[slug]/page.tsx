import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import VideoSection from "@/components/VideoSection";
import {
  listings,
  getListing,
  getListingPhotos,
  getVideoState,
  formatPrice,
} from "@/lib/listings";

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

  return (
    <div className="pt-16">
      {/* Lead photo header */}
      <section className="relative h-[60svh] min-h-[380px]">
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
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-5 pb-10">
            <p className="eyebrow">{listing.status}</p>
            <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.75rem)] leading-tight">
              {listing.address},{" "}
              <span className="coral-gradient-text">{listing.city}</span>
            </h1>
            <p className="mt-2 font-display text-3xl text-coral">
              {formatPrice(listing.price)}
            </p>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="border-b border-line/40 bg-surface/50">
        <div className="tabular mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 text-center sm:grid-cols-5">
          {[
            [String(listing.beds), "Bedrooms"],
            [String(listing.baths), "Bathrooms"],
            [listing.sqft.toLocaleString("en-US"), "Sq.Ft."],
            [String(listing.yearBuilt), "Year Built"],
            [listing.hoa, "HOA"],
          ].map(([v, label]) => (
            <div key={label}>
              <p className="font-display text-2xl text-paper">{v}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Description + features */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[3fr_2fr]">
        <Reveal>
          <p className="eyebrow">The Home</p>
          <h2 className="mt-2 font-display text-3xl">About this residence</h2>
          <p className="mt-6 leading-relaxed text-paper/85">
            {listing.description}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line/50 bg-surface p-7">
            <p className="eyebrow">Highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-paper/85">
              {listing.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-coral">
                    ◆
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="tabular mt-6 border-t border-line/50 pt-4 text-xs text-muted">
              MLS #{listing.mls}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <Reveal>
          <p className="eyebrow">Gallery</p>
          <h2 className="mb-8 mt-2 font-display text-3xl">
            Inside {listing.address}
          </h2>
        </Reveal>
        <Gallery photos={photos} address={fullAddress} />
      </section>

      {/* Video sections — rendered only when the files exist (video agents
          deliver them; the section auto-enables on the next deploy). */}
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

      {/* Attribution + CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal className="rounded-2xl border border-line/50 bg-surface p-8 text-center">
          <h2 className="font-display text-3xl">
            See {listing.address} with Karly
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Schedule a private showing or ask anything about this home.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Request a Showing
            </Link>
            <a
              href="tel:+16194951339"
              className="rounded-full border border-paper/25 px-7 py-3 text-sm text-paper transition-colors hover:border-coral hover:text-coral"
            >
              (619) 495-1339
            </a>
          </div>
        </Reveal>
        <p className="mt-10 text-center text-xs leading-relaxed text-muted">
          {listing.attribution}
        </p>
      </section>
    </div>
  );
}
