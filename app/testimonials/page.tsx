import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Stagger, StaggerItem } from "@/components/motion";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real reviews from Key Connections Real Estate clients — buyers and sellers across San Diego County share their experience working with Karly Chavez and the team.",
};

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Testimonials"
        title="Our clients say it best"
        intro={`${testimonials.length} verified reviews from buyers and sellers across Southern California — in English y en Español.`}
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-16">
        <Stagger gap={0.04} className="columns-1 gap-7 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <StaggerItem key={`${t.name}-${i}`} className="mb-7 break-inside-avoid">
              <figure className="border border-line bg-card p-7 transition-shadow duration-500 hover:shadow-[0_16px_44px_rgba(20,18,13,0.1)]">
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-brass/50"
                >
                  “
                </span>
                <blockquote className="mt-2 text-[14px] leading-relaxed text-ink/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-brass-deep">
                  — {t.name}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABanner
        title="Ready to write your own story?"
        body="Going the extra mile and surpassing expectations to help our clients find their ideal homes — that's the standard, not the exception."
      />
    </div>
  );
}
