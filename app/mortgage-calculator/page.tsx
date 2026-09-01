import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MortgageCalculator from "@/components/MortgageCalculator";
import CTABanner from "@/components/CTABanner";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Estimate your mortgage payment, including the principal and interest, taxes, insurance, HOA, and PMI. Get an accurate estimate from Key Connections Real Estate.",
};

export default function MortgageCalculatorPage() {
  return (
    <div>
      <PageHero
        eyebrow="Mortgage Calculator"
        title="Get an accurate estimate"
        intro="Estimate your mortgage payment, including the principal and interest, taxes, insurance, and HOA. Adjust the values to generate a more accurate rate."
        compact
      />
      <section className="mx-auto max-w-shell px-5 py-16">
        <Reveal>
          <MortgageCalculator />
        </Reveal>
      </section>
      <CTABanner
        title="Ready to make it real?"
        body="We connect our buyers with trusted lenders for pre-qualification and pre-approval — the first step of our buyer strategy session."
      />
    </div>
  );
}
