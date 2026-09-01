import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { bio, credentials, mission, vision, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Karly Chavez",
  description:
    "Karly Chavez, founder of Key Connections Real Estate — SDAR 40 Under 40 (2022 & 2023), Top 3% since 2020. Serving San Diego, Riverside, and Los Angeles counties. Hablo Español.",
  openGraph: { images: ["/brand/karly.jpg"] },
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[2fr_3fr] md:items-start">
        <Reveal>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line/50">
            <Image
              src="/brand/karly.jpg"
              alt="Karly Chavez, founder of Key Connections Real Estate"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              className="object-cover"
            />
          </div>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 text-coral">
                  ◆
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Meet Karly</p>
            <h1 className="mt-2 font-display text-5xl leading-tight">
              Karly Chavez
            </h1>
            <p className="mt-2 text-muted">
              Founder | REALTOR® · CA DRE# 01986040 · Hablo Español
            </p>
          </Reveal>
          {bio.map((p, i) => (
            <Reveal key={i} delay={0.08 * (i + 1)}>
              <p className="mt-6 leading-relaxed text-paper/85">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line/40 bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line/50 bg-surface p-8">
            <h2 className="font-display text-2xl text-coral">
              {mission.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-paper/85">{mission.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-line/50 bg-surface p-8">
            <h2 className="font-display text-2xl text-coral">
              {vision.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-paper/85">{vision.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="eyebrow">The Team</p>
          <h2 className="mt-2 font-display text-4xl">Key Connections</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 0.06}
              className="rounded-2xl border border-line/50 bg-surface p-7"
            >
              <p className="font-display text-xl text-paper">{m.name}</p>
              <p className="mt-1 text-sm text-coral">{m.role}</p>
              {m.license && (
                <p className="mt-1 text-xs text-muted">License: {m.license}</p>
              )}
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Link
            href="/contact"
            className="rounded-full bg-coral px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Work With Us
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
