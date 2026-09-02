import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import ListingMap from "@/components/ListingMap";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Buy, Sell, or Refinance",
  description:
    "Let's connect. Tell us whether you're looking to buy, sell, or refinance and Karly Chavez and the Key Connections team will reach out with a plan.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; about?: string }>;
}) {
  const { intent, about } = await searchParams;
  const initialMessage = about
    ? `I'd like to schedule a showing of ${about}.`
    : "";

  return (
    <div>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Connect"
        intro="Fill out the form below to learn more about buying or selling a house in your area — we'll reach out with real answers and a plan. Hablamos Español."
        image="/images/contact/lets-connect.webp"
        compact
      />

      <section className="mx-auto max-w-shell px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <Reveal className="border border-line bg-porcelain p-6 md:p-10">
            <Suspense>
              <LeadForm initialIntent={intent} initialMessage={initialMessage} />
            </Suspense>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1} className="border border-line bg-card p-7">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/team/karly-chavez.webp"
                  alt="Karly Chavez"
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-xl text-ink">{site.name}</p>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-stone">
                    Founder | REALTOR® · {site.dreAgent}
                  </p>
                </div>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div>
                  <dt className="field-label">Phone</dt>
                  <dd>
                    <a
                      href={site.phoneHref}
                      className="tabular text-ink hover:text-brass-deep"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="field-label">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="break-all text-ink hover:text-brass-deep"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="field-label">Office</dt>
                  <dd className="text-ink">{site.address}</dd>
                </div>
                <div>
                  <dt className="field-label">Broker of Record</dt>
                  <dd className="text-ink">
                    {site.broker.name} · {site.broker.license}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.18}>
              <ListingMap
                className="h-[300px]"
                zoom={15}
                markers={[
                  {
                    lat: site.office.lat,
                    lng: site.office.lng,
                    title: "Key Connections Real Estate",
                    subtitle: site.address,
                  },
                ]}
              />
            </Reveal>

            <Reveal delay={0.24} className="bg-night p-7">
              <p className="eyebrow-light">Follow Along</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[13px] uppercase tracking-[0.12em] text-white/75 hover:text-brass-pale"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
