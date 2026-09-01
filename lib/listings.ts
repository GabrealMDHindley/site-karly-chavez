import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

export type Listing = {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  status: string;
  hoa: string;
  mls: string;
  description: string;
  features: string[];
  attribution: string;
  sourceUrl: string;
};

// Data scraped verbatim from the source listing — see the studio's
// clients/key-connections/karly-chavez/assets/listings/5-spinnaker-way/details.md
export const listings: Listing[] = [
  {
    slug: "5-spinnaker-way",
    address: "5 Spinnaker Way",
    city: "Coronado",
    state: "CA",
    zip: "92118",
    price: 5500000,
    beds: 4,
    baths: 5,
    sqft: 3800,
    yearBuilt: 2001,
    status: "For Sale",
    hoa: "$209.25 / month",
    mls: "260005977",
    description:
      "Experience the best of waterfront living in the Coronado Cays. Perfectly positioned on a quiet cul de sac, this exceptional bayfront residence showcases breathtaking panoramic views of the bay, mountains, and glittering city lights. Designed for effortless indoor outdoor living, expansive sliding glass doors open to a spectacular waterfront patio and lush tropical grounds ideal for entertaining or enjoying peaceful sunsets over the water. Elegant living spaces, a beautifully appointed chef’s kitchen, and a luxurious primary suite with sweeping bay views create a refined yet relaxed coastal retreat. Enjoy paddleboarding and kayaking from your backyard while embracing the resort inspired lifestyle that makes the Coronado Cays one of Southern California’s most coveted waterfront communities.",
    features: [
      "Bayfront residence in the Coronado Cays",
      "Quiet cul-de-sac position",
      "Panoramic bay, mountain, and city-light views",
      "Expansive sliding glass doors to a waterfront patio",
      "Lush tropical grounds",
      "Chef’s kitchen",
      "Primary suite with sweeping bay views",
      "Paddleboard and kayak from the backyard",
    ],
    attribution:
      "Listed by Coronado Premier Properties, Kina Formiller-Fowler, Listing Contact: 619-823-6725. Source: San Diego MLS (SDMLS) #260005977, via the Internet Data Exchange (IDX).",
    sourceUrl:
      "https://keyconnectionsrealty.com/home-search/listings/4413514073344745564-5-Spinnaker-Way",
  },
];

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getListingPhotos(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "listings", slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort()
    .map((f) => `/listings/${slug}/${f}`);
}

export function formatPrice(price: number): string {
  return "$" + price.toLocaleString("en-US");
}

// Build-time video-existence contract: the video agents drop files into
// public/videos/<slug>/ and the sections auto-enable on the next deploy.
export function getVideoState(slug: string, leadPhoto: string | undefined) {
  const dir = path.join(process.cwd(), "public", "videos", slug);
  const has = (f: string) => existsSync(path.join(dir, f));
  const poster = (f: string, fallback: string | undefined) =>
    has(f) ? `/videos/${slug}/${f}` : fallback;
  return {
    walkthrough: has("walkthrough.mp4")
      ? {
          src: `/videos/${slug}/walkthrough.mp4`,
          poster: poster("poster-walkthrough.jpg", leadPhoto),
        }
      : null,
    flyover: has("flyover.mp4")
      ? {
          src: `/videos/${slug}/flyover.mp4`,
          poster: poster("poster-flyover.jpg", leadPhoto),
        }
      : null,
  };
}
