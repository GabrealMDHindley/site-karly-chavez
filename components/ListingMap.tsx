"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/components/MapView";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center border border-line bg-cream text-sm text-stone">
      Loading map…
    </div>
  ),
});

/** Client wrapper so server pages can embed the Leaflet map. */
export default function ListingMap({
  markers,
  zoom,
  className,
}: {
  markers: MapMarker[];
  zoom?: number;
  className?: string;
}) {
  return <MapView markers={markers} zoom={zoom} className={className} />;
}
