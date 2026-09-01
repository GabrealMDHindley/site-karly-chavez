import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import ValuesMarquee from "@/components/ValuesMarquee";
import SectionHeading from "@/components/SectionHeading";
import ListingCard from "@/components/ListingCard";
import StatStrip from "@/components/StatStrip";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTABanner from "@/components/CTABanner";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { activeListings, soldListings, formatPrice } from "@/lib/listings";
import { getListingPhotos } from "@/lib/listings-server";
import { neighborhoods } from "@/lib/content";

const quickActions = [
  {
    title: "Home Valuation",
    blurb: "What’s your property worth in today’s market?",
    href: "/home-valuation",
    image: "/images/cards/home-valuation.webp",
  },
  {
    title: "Home Search",
    blurb: "Explore every property we represent",
    href: "/listings",
    image: "/images/cards/home-search.webp",
  },
  {
    title: "Contact Us",
    blurb: "Buying, selling, or refinancing — let’s talk",
    href: "/contact",
    image: "/images/cards/contact-us.webp",
  },
];

export default function HomePage() {
  const featured = [...activeListings].sort((a, b) => b.price - a.price);
  const sold = soldListings;
  const photoOf = (slug: string) => getListingPhotos(slug)[0];

  return (
    <div>
      <Hero />
      <ValuesMarquee />

      {/* Featured listings */}
      <section className="mx-auto max-w-shell px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Properties"
            title="Current Listings"
            intro="Every home we represent, from South Bay bungalows to Coronado bayfront."
          />
          <Reveal delay={0.15}>
            <Link href="/listings?status=for-sale" className="btn-outline-dark">
              View All
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <StaggerItem key={l.slug}>
              <ListingCard listing={l} photo={photoOf(l.slug)} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Quick actions */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-shell px-5">
          <SectionHeading
            eyebrow="How Can We Help?"
            title="Start your journey"
            align="center"
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {quickActions.map((c) => (
              <StaggerItem key={c.title}>
                <Link
                  href={c.href}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.08]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/10 transition-colors duration-500"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="font-display text-3xl font-light text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 max-w-[24ch] text-[13px] leading-relaxed text-white/70 transition-all duration-500 group-hover:opacity-100 group-hover:[transform:translateY(0)] group-focus-within:opacity-100 group-focus-within:[transform:translateY(0)] md:opacity-0 md:[transform:translateY(6px)]">
                      {c.blurb}
                    </p>
                    <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-brass-pale">
                      Explore{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto max-w-shell px-5 py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Parallax range={36} className="relative">
            <Reveal className="relative">
              <div
                className="absolute -left-4 -top-4 h-full w-full border border-brass/40"
                aria-hidden="true"
              />
              <Image
                src="/brand/karly.jpg"
                alt="Karly Chavez, founder of Key Connections Real Estate"
                width={880}
                height={1100}
                className="relative aspect-[4/5] w-full object-cover object-top shadow-[0_30px_80px_rgba(20,18,13,0.18)]"
              />
            </Reveal>
          </Parallax>
          <div>
            <SectionHeading
              eyebrow="About Our Team"
              title="Karly Chavez — founder, REALTOR®"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15px] leading-relaxed text-stone">
                When it comes to finding the right home, or getting the best
                results when selling a home, our extra effort and willingness to
                go above and beyond for all our clients is our trademark
                quality. We believe that trust, honesty, and integrity are
                crucial in all real estate transactions and we work tirelessly
                with both buyers and sellers to accomplish their goals. Our
                clients are of utmost importance to us.
              </p>
              <p className="mt-4 text-sm font-medium text-ink">
                We are a BBB accredited real estate agency · {`Hablamos Español`}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/team" className="btn-gold">
                  Meet the Team
                </Link>
                <Link href="/about" className="btn-outline-dark">
                  About Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="mt-24 border-t border-line pt-16">
          <StatStrip />
        </div>
      </section>

      {/* Past transactions */}
      <section className="bg-night py-24">
        <div className="mx-auto max-w-shell px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Past Transactions"
              title="A track record that speaks"
              dark
            />
            <Reveal delay={0.15}>
              <Link href="/listings?status=sold" className="btn-outline-light">
                View All
              </Link>
            </Reveal>
          </div>
        </div>
        <Stagger
          gap={0.07}
          role="region"
          ariaLabel="Past transactions — scroll horizontally"
          tabIndex={0}
          className="mx-auto mt-12 flex max-w-shell snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:thin]"
        >
          {sold.map((l) => (
            <StaggerItem
              key={l.slug}
              className="w-[300px] shrink-0 snap-start md:w-[340px]"
            >
              <Link
                href={`/listings/${l.slug}`}
                className="group block bg-white/[0.04] transition-colors duration-500 hover:bg-white/[0.08]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {photoOf(l.slug) && (
                    <Image
                      src={photoOf(l.slug)}
                      alt={`${l.address}, ${l.city}`}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                    />
                  )}
                  <span className="absolute left-4 top-4 bg-night/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    Sold
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-display text-lg text-white">{l.address}</p>
                  <p className="mt-1 text-[13px] text-white/55">
                    {l.city}, {l.state} {l.zip}
                  </p>
                  <p className="tabular mt-3 flex items-baseline justify-between border-t border-white/10 pt-3 text-[12.5px] uppercase tracking-[0.06em] text-white/55">
                    <span>
                      {l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString("en-US")} sf
                    </span>
                    <span className="text-[15px] font-semibold normal-case tracking-normal text-brass-pale">
                      {formatPrice(l.price)}
                    </span>
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mx-auto mt-20 max-w-shell border-t border-white/10 px-5 pt-16">
          <SectionHeading
            eyebrow="Testimonials"
            title="Why clients love working with us"
            align="center"
            dark
          />
          <div className="mt-12">
            <TestimonialsCarousel count={10} dark />
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="link-underline text-[12px] font-semibold uppercase tracking-[0.18em] text-brass-pale"
            >
              View All Testimonials
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="mx-auto max-w-shell px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Areas of Expertise"
            title="Neighborhoods we know by heart"
          />
          <Reveal delay={0.15}>
            <Link href="/neighborhoods" className="btn-outline-dark">
              All Neighborhoods
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {neighborhoods.map((n) => (
            <StaggerItem key={n.slug}>
              <Link
                href="/neighborhoods"
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={n.image}
                  alt={n.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.09]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute inset-x-0 bottom-0 p-5 font-display text-xl font-light leading-tight text-white">
                  {n.name}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABanner />
    </div>
  );
}
