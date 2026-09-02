import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import ListingCard from "@/components/ListingCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTABanner from "@/components/CTABanner";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { bio, credentials, mission, vision } from "@/lib/site";
import { activeListings } from "@/lib/listings";
import { getListingPhotos } from "@/lib/listings-server";

export const metadata: Metadata = {
  title: "About Key Connections",
  description:
    "Experience, Empathy and Professionalism — the mission, vision, and track record of Key Connections Real Estate, founded by Karly Chavez.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="About Key Connections"
        intro="Experience, Empathy and Professionalism."
        image="/images/about/team-photo.webp"
      />

      {/* Mission & vision */}
      <section className="mx-auto max-w-shell px-5 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal className="border-t-2 border-brass bg-card p-9 shadow-[0_2px_20px_rgba(20,18,13,0.06)]">
            <p className="eyebrow">Our Mission</p>
            <h2 className="mt-4 font-display text-2xl font-light leading-snug text-ink">
              {mission.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone">
              {mission.body}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="border-t-2 border-brass bg-card p-9 shadow-[0_2px_20px_rgba(20,18,13,0.06)]">
            <p className="eyebrow">Our Vision</p>
            <h2 className="mt-4 font-display text-2xl font-light leading-snug text-ink">
              {vision.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone">
              {vision.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-night py-20">
        <div className="mx-auto max-w-shell px-5">
          <SectionHeading eyebrow="Our Numbers" title="Results you can count" align="center" dark />
          <div className="mt-14">
            <StatStrip dark />
          </div>
        </div>
      </section>

      {/* Meet Karly */}
      <section className="mx-auto max-w-shell px-5 py-24">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Parallax range={30}>
            <Reveal className="relative">
              <div
                className="absolute -right-4 -top-4 h-full w-full border border-brass/40"
                aria-hidden="true"
              />
              <Image
                src="/images/about/karly-office.webp"
                alt="Karly Chavez at the Key Connections Real Estate office"
                width={1400}
                height={875}
                className="relative w-full object-cover shadow-[0_30px_80px_rgba(20,18,13,0.16)]"
              />
            </Reveal>
          </Parallax>
          <div>
            <SectionHeading eyebrow="Meet Karly" title="A founder who answers the phone" />
            <Reveal delay={0.08}>
              {bio.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 text-[15px] leading-[1.85] text-stone">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.14} className="mt-8">
              <p className="eyebrow">Credentials</p>
              <ul className="mt-4 grid gap-2.5 text-[14px] text-ink/80 sm:grid-cols-2">
                {credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-0.5 text-brass">
                      ◆
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <Link href="/team" className="btn-gold mt-9">
                Meet the Whole Team
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-shell px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Featured Properties" title="Currently representing" />
            <Reveal delay={0.15}>
              <Link href="/listings?status=for-sale" className="btn-outline-dark">
                View All
              </Link>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {activeListings.map((l) => (
              <StaggerItem key={l.slug}>
                <ListingCard listing={l} photo={getListingPhotos(l.slug)[0]} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-shell px-5 py-24">
        <SectionHeading eyebrow="Testimonials" title="In our clients' words" align="center" />
        <div className="mt-12">
          <TestimonialsCarousel count={8} />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
