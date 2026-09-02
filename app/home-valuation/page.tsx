import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ValuationWizard from "@/components/ValuationWizard";
import CTABanner from "@/components/CTABanner";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Home Valuation — What's Your Property Worth?",
  description:
    "Get a free, expert home valuation from Key Connections Real Estate. Tell us about your property and your report will arrive in your inbox.",
};

const steps = [
  {
    n: "01",
    title: "Tell us about your home",
    body: "Your address and a few details are all we need to get started.",
  },
  {
    n: "02",
    title: "We run the numbers",
    body: "Comparative market analysis, current trends, and neighborhood-level insight — not just an algorithm.",
  },
  {
    n: "03",
    title: "Your report arrives",
    body: "A real valuation from a top-3% team, delivered to your inbox with zero obligation.",
  },
];

export default function HomeValuationPage() {
  return (
    <div>
      <PageHero
        eyebrow="Home Valuation"
        title="What’s your property worth?"
        intro="Find out what your home would command in today's market — prepared by the team that's sold 100+ houses across San Diego County."
        image="/images/cards/home-valuation.webp"
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="flex gap-6">
                <span className="tabular font-display text-3xl font-light text-brass">
                  {s.n}
                </span>
                <div>
                  <h2 className="font-display text-xl text-ink">{s.title}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-stone">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <ValuationWizard />
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Selling is a strategy, not a listing"
        body="Pricing, prep, staging, and marketing — see how our nine-stage seller service gets homes sold faster and for more."
      />
    </div>
  );
}
