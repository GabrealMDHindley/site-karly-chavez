import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import StageAccordion from "@/components/StageAccordion";
import { Reveal } from "@/components/motion";
import {
  buyerServices,
  sellerServices,
  specializedServices,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore the full-service buyer and seller programs from Key Connections Real Estate — strategy, staging, marketing, negotiation, and move-in support.",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Services"
        title="Full service, every step"
        intro="Explore our services below and let us help you achieve your real estate goals today."
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="For Buyers"
              title="Buyer services"
              intro="Four stages — from strategy session to the keys in your hand (and a locally curated gift basket)."
            />
            <Reveal delay={0.1} className="mt-9">
              <StageAccordion stages={buyerServices} />
            </Reveal>
          </div>
          <div>
            <SectionHeading
              eyebrow="For Sellers"
              title="Seller services"
              intro="Nine stages of white-glove listing management — prep, staging, marketing, negotiation, and move-out."
            />
            <Reveal delay={0.15} className="mt-9">
              <StageAccordion stages={sellerServices} />
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 border border-line bg-cream p-9 text-center">
          <p className="eyebrow">Specialized Services</p>
          <p className="mt-4 font-display text-2xl font-light text-ink">
            {specializedServices.join(" · ")}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone">
            Building a portfolio or need a hand with a lease? We work with
            investors and landlords across Southern California.
          </p>
          <Link href="/contact" className="btn-gold mt-7">
            Talk to Us
          </Link>
        </Reveal>
      </section>

      <CTABanner />
    </div>
  );
}
