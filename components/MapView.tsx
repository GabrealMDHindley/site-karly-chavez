"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapMarker = {
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  href?: string;
  photo?: string;
};

/** Leaflet map (client-only). Renders custom brass pins with photo popups. */
export default function MapView({
  markers,
  zoom,
  className = "h-[420px]",
}: {
  markers: MapMarker[];
  zoom?: number;
  className?: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersKey = JSON.stringify(markers);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current) return;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      const pts: MapMarker[] = JSON.parse(markersKey);
      if (pts.length === 0) return;

      const map = L.map(el.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapRef.current = map;
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      const icon = L.divIcon({
        className: "map-pin",
        html: '<div class="map-pin-dot"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -32],
      });

      const group: import("leaflet").Marker[] = [];
      for (const m of pts) {
        const marker = L.marker([m.lat, m.lng], { icon, title: m.title }).addTo(map);
        const photo = m.photo
          ? `<img src="${m.photo}" alt="" style="width:100%;height:120px;object-fit:cover;display:block"/>`
          : "";
        const sub = m.subtitle
          ? `<div style="color:#6e675c;font-size:12px;margin-top:2px">${m.subtitle}</div>`
          : "";
        const inner = `${photo}<div style="padding:10px 12px"><div style="font-weight:600;font-size:13px;color:#1c1913">${m.title}</div>${sub}</div>`;
        marker.bindPopup(
          m.href
            ? `<a href="${m.href}" style="text-decoration:none;display:block">${inner}</a>`
            : inner
        );
        group.push(marker);
      }

      if (pts.length === 1) {
        map.setView([pts[0].lat, pts[0].lng], zoom ?? 15);
      } else {
        map.fitBounds(
          L.latLngBounds(pts.map((p) => [p.lat, p.lng])),
          { padding: [40, 40], maxZoom: zoom ?? 13 }
        );
      }
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markersKey, zoom]);

  return (
    <div className={`map-shell overflow-hidden border border-line ${className}`}>
      <div ref={el} className="h-full w-full" />
    </div>
  );
}
