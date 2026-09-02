import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { military } from "@/lib/content";

export const metadata: Metadata = {
  title: "Military Homebuying Assistance",
  description:
    "Connecting military homebuyers with homes for sale in San Diego, CA — BAH guidance, VA loan benefits, base information, and veteran housing resources.",
};

export default function MilitaryPage() {
  const m = military;
  return (
    <div>
      <PageHero
        eyebrow="Military Resources"
        title={m.title}
        intro={m.subtitle}
        image="/images/neighborhoods/san-diego-county.webp"
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading eyebrow="San Diego Military Housing" title="We are here to help" />
            <Reveal delay={0.08}>
              <p className="mt-6 text-[15px] leading-[1.85] text-stone">{m.intro}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <h3 className="font-display text-2xl font-light text-ink">
                The BAH (Basic Allowance for Housing) rate
              </h3>
              {m.bah.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-[14.5px] leading-relaxed text-stone">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <h3 className="font-display text-2xl font-light text-ink">
                VA housing assistance
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-stone">
                {m.va.housing}
              </p>
              <h4 className="mt-7 font-display text-xl text-ink">
                Get VA home loan benefits
              </h4>
              <p className="mt-3 text-[14.5px] leading-relaxed text-stone">
                {m.va.loans}
              </p>
              <h4 className="mt-7 font-display text-xl text-ink">
                Disability housing grants for Veterans
              </h4>
              <p className="mt-3 text-[14.5px] leading-relaxed text-stone">
                {m.va.grants}
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.12} className="bg-night p-8">
              <p className="eyebrow-light">Bases in San Diego County</p>
              <ul className="mt-5 space-y-3 text-[14px] text-white/80">
                {m.bases.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-0.5 text-brass-pale">
                      ★
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16} className="border border-line bg-card p-8">
              <p className="eyebrow">Resources & Services</p>
              <ul className="mt-5 space-y-3.5">
                {m.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[14px] font-medium text-brass-deep"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="border border-line bg-cream p-8 text-center">
              <p className="font-display text-xl text-ink">
                PCS orders to San Diego?
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-stone">
                Tell us your timeline and BAH and we'll build your housing plan
                — on-base alternatives, VA-loan-friendly listings, and
                neighborhoods that fit military life.
              </p>
              <Link href="/contact?intent=buy" className="btn-gold mt-6 w-full">
                Start Your Search
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        title="Know your benefits"
        body="Learn about the variety of housing possibilities available. Explore your options to find a home that best fits your needs."
      />
    </div>
  );
}
