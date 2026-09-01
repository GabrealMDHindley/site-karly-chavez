import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Listing } from "@/lib/listings";

export default function ListingCard({
  listing,
  leadPhoto,
  priority = false,
}: {
  listing: Listing;
  leadPhoto: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line/50 bg-surface transition-colors hover:border-coral/40"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={leadPhoto}
          alt={`${listing.address}, ${listing.city} ${listing.state} — exterior`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-widest text-coral backdrop-blur">
          {listing.status}
        </span>
      </div>
      <div className="p-6">
        <p className="font-display text-2xl text-coral">
          {formatPrice(listing.price)}
        </p>
        <p className="mt-2 text-lg text-paper">
          {listing.address}, {listing.city}, {listing.state} {listing.zip}
        </p>
        <p className="tabular mt-2 text-sm text-muted">
          {listing.beds} BD · {listing.baths} BA ·{" "}
          {listing.sqft.toLocaleString("en-US")} Sq.Ft.
        </p>
      </div>
    </Link>
  );
}
