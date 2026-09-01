import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import GuideForm from "@/components/GuideForm";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Buyer's Guide",
  description:
    "Read the full Key Connections Real Estate home buyer's guide — every step from pre-approval to move-in, available in English and Español.",
};

export default function BuyersGuidePage() {
  return (
    <div>
      <PageHero
        eyebrow="Buyer's Guide"
        title="Your roadmap to buying a home"
        intro="Our full home buyer's guide walks you through every step — pre-approval, the search, offers, escrow, and move-in — available in English and Español."
        image="/images/guides/buyers-guide.webp"
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="border border-line bg-card p-8 md:p-10">
            <p className="eyebrow">Guide in English</p>
            <h2 className="mt-3 font-display text-2xl font-light text-ink">
              Read our full home buyer's guide
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              Please complete the following form to read our full home buyer's
              guide in English.
            </p>
            <div className="mt-7">
              <GuideForm language="English" />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="border border-line bg-card p-8 md:p-10">
            <p className="eyebrow">Guía en Español</p>
            <h2 className="mt-3 font-display text-2xl font-light text-ink">
              Lea nuestra guía completa del comprador
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              Complete este formulario para leer nuestra guía completa del
              comprador de vivienda en Español.
            </p>
            <div className="mt-7">
              <GuideForm language="Español" />
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mt-14 overflow-hidden">
          <div className="relative aspect-[21/8] min-h-[260px]">
            <Image
              src="/images/guides/exclusive-listings.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-night/60" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <p className="eyebrow-light">Our Properties</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-light text-white">
                View our exclusive available listings
              </h2>
              <Link href="/listings?status=for-sale" className="btn-gold mt-7">
                Browse Listings
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <CTABanner
        title="Rather talk it through?"
        body="Join our free Home Buyer Seminar or sit down with the team — real answers, real numbers, no sales pitch. ¡Y en español también!"
      />
    </div>
  );
}
