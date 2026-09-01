import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ListingCard from "@/components/ListingCard";
import { listings, getListingPhotos } from "@/lib/listings";
import { stats, testimonials, credentials } from "@/lib/site";

export default function HomePage() {
  const featured = listings[0];
  const featuredPhoto = getListingPhotos(featured.slug)[0];

  return (
    <>
      <Hero />

      {/* Featured listing */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="eyebrow">Featured Listing</p>
          <h2 className="mt-2 font-display text-4xl">
            Bayfront in the Coronado Cays
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <ListingCard listing={featured} leadPhoto={featuredPhoto} priority />
        </Reveal>
      </section>

      {/* Stats band */}
      <section className="border-y border-line/40 bg-surface/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="coral-gradient-text font-display text-4xl font-medium">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Meet Karly */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line/50">
            <Image
              src="/brand/karly.jpg"
              alt="Karly Chavez, founder of Key Connections Real Estate"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="eyebrow">Meet Karly</p>
          <h2 className="mt-2 font-display text-4xl">
            Founder. REALTOR®. Su conexión.
          </h2>
          <ul className="mt-6 space-y-3 text-muted">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 text-coral">
                  ◆
                </span>
                {c}
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-block rounded-full border border-coral/50 px-6 py-2.5 text-sm text-coral transition-colors hover:bg-coral hover:text-ink"
          >
            About Karly
          </Link>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="border-t border-line/40 bg-surface/30">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <p className="eyebrow">Client Stories</p>
            <h2 className="mt-2 font-display text-4xl">
              Connections that last
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 0.1}
                className="rounded-2xl border border-line/50 bg-surface p-7"
              >
                <p aria-hidden="true" className="font-display text-4xl text-coral">
                  “
                </p>
                <blockquote className="mt-2 text-sm leading-relaxed text-paper/90">
                  {t.quote}
                </blockquote>
                <p className="mt-4 text-sm text-coral">— {t.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight">
            Ready to make your{" "}
            <span className="coral-gradient-text">key connection</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Buying, selling, or investing — Karly and her team are here for
            every step. English y Español.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Get in Touch
            </Link>
            <a
              href="tel:+16194951339"
              className="rounded-full border border-paper/25 px-7 py-3 text-sm text-paper transition-colors hover:border-coral hover:text-coral"
            >
              (619) 495-1339
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
