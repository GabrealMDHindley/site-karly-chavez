import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Reveal } from "@/components/motion";
import { events, eventsIntro } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Events",
  description:
    "Educational seminars and community events from Key Connections Real Estate — home buyer seminars, seller workshops, and more in Chula Vista and San Diego.",
};

export default function EventsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Stay Connected"
        title="Our Events"
        intro={eventsIntro}
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-16">
        {events.map((ev) => (
          <Reveal key={ev.title}>
            <article className="grid overflow-hidden border border-line bg-card lg:grid-cols-[1.1fr_1fr]">
              <div className="relative min-h-[280px]">
                <Image
                  src={ev.image}
                  alt={`${ev.title} flyer`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="eyebrow">Upcoming Event</p>
                <h2 className="mt-3 font-display text-3xl font-light text-ink">
                  🏡 {ev.title}
                </h2>
                <p className="tabular mt-4 text-[14px] font-semibold text-brass-deep">
                  📅 {ev.date}
                </p>
                <p className="mt-1 text-[14px] text-stone">📍 {ev.location}</p>
                {ev.description.map((d) => (
                  <p key={d.slice(0, 24)} className="mt-4 text-[14.5px] leading-relaxed text-ink/80">
                    {d}
                  </p>
                ))}
                <p className="eyebrow mt-6">What you'll learn</p>
                <ul className="mt-3 space-y-2 text-[14px] text-ink/80">
                  {ev.learn.map((l) => (
                    <li key={l} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-0.5 text-brass">
                        ✓
                      </span>
                      {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13.5px] leading-relaxed text-stone">
                  {ev.preApproval}
                </p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-stone">
                  {ev.hosts}
                </p>
                <p className="mt-4 text-[13.5px] font-medium text-ink">
                  🎟️ Seats are limited — RSVP now to save your spot. Hablamos su
                  idioma / We speak your language!
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={ev.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Register Here
                  </a>
                  <a href={site.phoneHref} className="btn-outline-dark tabular">
                    {site.phone}
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.1} className="mt-12 border border-line bg-cream p-9 text-center">
          <p className="font-display text-2xl font-light text-ink">
            Want to hear about the next one first?
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone">
            Our seminars — from first-time buyer workshops to seller workshops
            for seniors and small business owners — fill up fast. Join the
            newsletter below and never miss a date.
          </p>
        </Reveal>
      </section>

      <CTABanner />
    </div>
  );
}
