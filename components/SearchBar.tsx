"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
  variant = "hero",
  initialQuery = "",
}: {
  variant?: "hero" | "inline";
  initialQuery?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/listings?q=${encodeURIComponent(q.trim())}` : "/listings");
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={`flex w-full ${
        variant === "hero" ? "shadow-[0_20px_60px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <label htmlFor={`search-${variant}`} className="sr-only">
        Search by address, city, ZIP, or MLS #
      </label>
      <div className="flex min-w-0 flex-1 items-center gap-3 bg-white px-5">
        <span aria-hidden="true" className="text-stone/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
        </span>
        <input
          id={`search-${variant}`}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search address, city, ZIP, or MLS #"
          className="min-w-0 flex-1 bg-transparent py-4 text-[15px] text-ink placeholder:text-stone/60 outline-none"
        />
      </div>
      <button type="submit" className="btn-gold shrink-0">
        Search
      </button>
    </form>
  );
}
