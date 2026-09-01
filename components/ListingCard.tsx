import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Listing } from "@/lib/listings";

export default function ListingCard({
  listing,
  photo,
  priority = false,
}: {
  listing: Listing;
  photo?: string;
  priority?: boolean;
}) {
  const sold = listing.status === "Sold";
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block bg-card shadow-[0_1px_3px_rgba(20,18,13,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(20,18,13,0.16)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {photo && (
          <Image
            src={photo}
            alt={`${listing.address}, ${listing.city}, ${listing.state}`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span
          className={`absolute left-4 top-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
            sold ? "bg-night/85 text-white" : "bg-brass-deep text-white"
          }`}
        >
          {listing.status}
        </span>
        <span className="tabular absolute bottom-4 left-4 font-display text-2xl text-white opacity-0 drop-shadow-lg transition-all duration-500 [transform:translateY(8px)] group-hover:opacity-100 group-hover:[transform:translateY(0)]">
          {formatPrice(listing.price)}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-snug text-ink">
            {listing.address}
          </h3>
          <p className="tabular shrink-0 text-[15px] font-semibold text-brass-deep">
            {formatPrice(listing.price)}
          </p>
        </div>
        <p className="mt-1 text-[13px] text-stone">
          {listing.city}, {listing.state} {listing.zip}
        </p>
        <p className="tabular mt-3 border-t border-line pt-3 text-[12.5px] uppercase tracking-[0.08em] text-stone">
          {listing.beds} bd · {listing.baths} ba ·{" "}
          {listing.sqft.toLocaleString("en-US")} Sq.Ft.
        </p>
      </div>
    </Link>
  );
}
