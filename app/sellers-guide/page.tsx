import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { sellerGuide } from "@/lib/content";

export const metadata: Metadata = {
  title: "Seller's Guide",
  description:
    "Sell your San Diego home for top dollar and avoid costly mistakes — pricing, preparation, photography, and staging strategy from Key Connections Real Estate.",
};

export default function SellersGuidePage() {
  const g = sellerGuide;
  return (
    <div>
      <PageHero
        eyebrow="Seller's Guide"
        title={g.intro.heading}
        intro={g.intro.body[0]}
        image="/images/guides/sellers-guide.webp"
      />

      <section className="mx-auto max-w-3xl px-5 py-20">
        <Reveal>
          <p className="text-[15px] leading-[1.85] text-stone">{g.intro.body[1]}</p>
        </Reveal>

        <div className="mt-14">
          <SectionHeading
            eyebrow="Get It Right"
            title="Top mistakes to avoid when selling your home"
          />
        </div>

        <Stagger className="mt-10 space-y-8">
          {g.mistakes.map((m) => (
            <StaggerItem key={m.heading}>
              <article className="border border-line bg-card p-8 md:p-10">
                <h3 className="font-display text-2xl font-light text-ink">
                  {m.heading}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-stone">
                  {m.body}
                </p>
                <p className="eyebrow mt-6">Why it matters</p>
                <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink/80">
                  {m.why.map((w) => (
                    <li key={w} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-0.5 text-brass">
                        ◆
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-6">How to avoid it</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/80">
                  {m.avoid}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 bg-night p-9 md:p-12">
          <p className="eyebrow-light">{g.whyUs.heading}</p>
          <p className="mt-4 text-[15px] text-white/75">{g.whyUs.body}</p>
          <ul className="mt-6 space-y-3 text-[14.5px] text-white/85">
            {g.whyUs.items.map((it) => (
              <li key={it} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 text-brass-pale">
                  ✓
                </span>
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/home-valuation" className="btn-gold">
              Free Home Value Report
            </Link>
            <Link href="/events" className="btn-outline-light">
              Join a Seller Seminar
            </Link>
          </div>
        </Reveal>
      </section>

      <CTABanner
        title="Thinking about selling?"
        body="Our seminars and one-on-one strategy sessions cover maximizing your home's value, navigating the market, and preparing for a seamless sale."
      />
    </div>
  );
}
