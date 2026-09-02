import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTABanner from "@/components/CTABanner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { divorce } from "@/lib/content";

export const metadata: Metadata = {
  title: "Real Estate Guidance During Divorce",
  description:
    "Navigating divorce and real estate with confidence — Karly Chavez is a Certified Divorce Real Estate Expert helping families make clear, informed property decisions.",
};

export default function DivorcePage() {
  const d = divorce;
  return (
    <div>
      <PageHero
        eyebrow={d.subtitle}
        title={d.title}
        intro={d.intro}
        image="/images/resources/divorce-1.webp"
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <SectionHeading
          eyebrow="Know Your Options"
          title="Key real estate considerations during divorce"
          intro="Making decisions about your shared property requires understanding your options. Here are some of the most common real estate concerns during divorce:"
        />
        <Stagger className="mt-12 grid gap-7 md:grid-cols-2">
          {d.considerations.map((c) => (
            <StaggerItem key={c.heading}>
              <div className="h-full border border-line bg-card p-8 transition-shadow duration-500 hover:shadow-[0_16px_44px_rgba(20,18,13,0.1)]">
                <h3 className="font-display text-xl text-ink">{c.heading}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-stone">
                  {c.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-night py-20">
        <div className="mx-auto grid max-w-shell items-center gap-12 px-5 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div
              className="absolute -left-4 -top-4 h-full w-full border border-brass-pale/30"
              aria-hidden="true"
            />
            <Image
              src="/images/team/karly-chavez.webp"
              alt="Karly Chavez, Certified Divorce Real Estate Expert"
              width={900}
              height={900}
              className="relative w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="How We Help" title="Sensitivity, then strategy" dark />
            <Reveal delay={0.08}>
              <ul className="mt-7 space-y-3.5 text-[15px] text-white/80">
                {d.howWeHelp.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-0.5 text-brass-pale">
                      ◆
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-l-2 border-brass pl-5 text-[15px] italic leading-relaxed text-white/70">
                “{d.karlyNote}”
              </p>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-brass-pale">
                — Karly Chavez, Certified Divorce Real Estate Expert
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <Reveal>
          <p className="text-[15px] leading-[1.9] text-stone">{d.closing}</p>
          <Link href="/contact?intent=sell" className="btn-gold mt-9">
            Talk Confidentially with Karly
          </Link>
        </Reveal>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-shell px-5">
          <SectionHeading eyebrow="Testimonials" title="Trusted in hard moments" align="center" />
          <div className="mt-12">
            <TestimonialsCarousel count={8} />
          </div>
        </div>
      </section>
    </div>
  );
}
