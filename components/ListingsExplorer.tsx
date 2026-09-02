"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/lib/listings";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[560px] items-center justify-center border border-line bg-cream text-sm text-stone">
      Loading map…
    </div>
  ),
});

type Props = {
  listings: Listing[];
  photos: Record<string, string>;
};

const PRICE_STEPS = [
  500000, 750000, 1000000, 1250000, 1500000, 2000000, 3000000, 5000000, 6000000,
];

function fmtShort(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(n % 1000000 ? 2 : 0)}M` : `$${n / 1000}K`;
}

function statusFromParams(params: URLSearchParams | ReadonlyURLSearchParams) {
  return params.get("status") === "sold"
    ? "Sold"
    : params.get("status") === "for-sale"
      ? "For Sale"
      : "All";
}

export default function ListingsExplorer({ listings, photos }: Props) {
  const params = useSearchParams();
  const reduced = useReducedMotion();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [status, setStatus] = useState<string>(() => statusFromParams(params));

  // Re-sync from the URL when nav/footer links change the query while this
  // page is already mounted (client-side navigation does not remount us).
  useEffect(() => {
    setStatus(statusFromParams(params));
    const urlQ = params.get("q");
    if (urlQ !== null) setQ(urlQ);
  }, [params]);

  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState("price-desc");
  const [view, setView] = useState<"grid" | "map">("grid");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(listings.map((l) => l.city))).sort()],
    [listings]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = listings.filter((l) => {
      if (status !== "All" && l.status !== status) return false;
      if (city !== "All" && l.city !== city) return false;
      if (type !== "All" && l.propertyType !== type) return false;
      if (beds && l.beds < beds) return false;
      if (baths && l.baths < baths) return false;
      if (minPrice && l.price < minPrice) return false;
      if (maxPrice && l.price > maxPrice) return false;
      if (needle) {
        const hay =
          `${l.address} ${l.city} ${l.state} ${l.zip} ${l.mls} ${l.neighborhood ?? ""}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    out.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "beds-desc":
          return b.beds - a.beds;
        case "sqft-desc":
          return b.sqft - a.sqft;
        case "newest":
          return b.yearBuilt - a.yearBuilt;
        default:
          return b.price - a.price;
      }
    });
    return out;
  }, [listings, q, status, city, type, beds, baths, minPrice, maxPrice, sort]);

  const reset = () => {
    setQ("");
    setStatus("All");
    setCity("All");
    setType("All");
    setBeds(0);
    setBaths(0);
    setMinPrice(0);
    setMaxPrice(0);
  };

  const selectCls = "field appearance-none bg-card pr-8";

  return (
    <div>
      {/* Filter bar */}
      <div className="border border-line bg-card p-5 shadow-[0_2px_16px_rgba(20,18,13,0.05)] md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label htmlFor="f-q" className="field-label">
              Search
            </label>
            <input
              id="f-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Address, city, ZIP, MLS #, neighborhood"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="f-status" className="field-label">
              Status
            </label>
            <select
              id="f-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={selectCls}
            >
              <option>All</option>
              <option>For Sale</option>
              <option>Sold</option>
            </select>
          </div>
          <div>
            <label htmlFor="f-city" className="field-label">
              City
            </label>
            <select
              id="f-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={selectCls}
            >
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-type" className="field-label">
              Property Type
            </label>
            <select
              id="f-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={selectCls}
            >
              <option>All</option>
              <option>Residential</option>
              <option>Multi-Family</option>
            </select>
          </div>
          <div>
            <label htmlFor="f-beds" className="field-label">
              Beds
            </label>
            <select
              id="f-beds"
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className={selectCls}
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-baths" className="field-label">
              Baths
            </label>
            <select
              id="f-baths"
              value={baths}
              onChange={(e) => setBaths(Number(e.target.value))}
              className={selectCls}
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-min" className="field-label">
              Min Price
            </label>
            <select
              id="f-min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className={selectCls}
            >
              <option value={0}>No Min</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {fmtShort(p)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-max" className="field-label">
              Max Price
            </label>
            <select
              id="f-max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className={selectCls}
            >
              <option value={0}>No Max</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {fmtShort(p)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-stone">
          <span aria-live="polite">
            <span className="tabular font-semibold text-ink">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "property" : "properties"}
            {status !== "All" ? ` · ${status}` : ""}
          </span>
          <button
            type="button"
            onClick={reset}
            className="ml-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-brass-deep underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </p>
        <div className="flex items-center gap-3">
          <label htmlFor="f-sort" className="sr-only">
            Sort listings
          </label>
          <select
            id="f-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-line bg-card px-3 py-2 text-[13px] text-ink outline-none focus:border-brass"
          >
            <option value="price-desc">Price — high to low</option>
            <option value="price-asc">Price — low to high</option>
            <option value="beds-desc">Most bedrooms</option>
            <option value="sqft-desc">Largest first</option>
            <option value="newest">Newest built</option>
          </select>
          <div className="flex border border-line" role="group" aria-label="View mode">
            {(["grid", "map"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  view === v
                    ? "bg-night text-white"
                    : "bg-card text-stone hover:text-ink"
                }`}
              >
                {v === "grid" ? "Grid" : "Map"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {view === "map" ? (
          <MapView
            className="h-[560px]"
            markers={filtered.map((l) => ({
              lat: l.lat,
              lng: l.lng,
              title: l.address,
              subtitle: `${l.city} · $${l.price.toLocaleString("en-US")} · ${l.beds} bd / ${l.baths} ba`,
              href: `/listings/${l.slug}`,
              photo: photos[l.slug],
            }))}
          />
        ) : filtered.length === 0 ? (
          <div className="border border-line bg-card px-6 py-20 text-center">
            <p className="font-display text-2xl text-ink">
              No properties match those filters
            </p>
            <p className="mt-2 text-sm text-stone">
              Try widening your criteria — or reach out and we’ll search the full
              MLS for you.
            </p>
            <button type="button" onClick={reset} className="btn-outline-dark mt-8">
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout={!reduced} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((l, i) => (
                <motion.div
                  key={l.slug}
                  layout={!reduced}
                  initial={{ opacity: 0, y: reduced ? 0 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(i * 0.05, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ListingCard listing={l} photo={photos[l.slug]} priority={i < 3} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
