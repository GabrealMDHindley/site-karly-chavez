import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Karly Chavez, Key Connections Real Estate — (619) 495-1339, Karly@keyconnectionsrealty.com, 333 H Street, Chula Vista, CA 91910.",
};

const rows = [
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    note: "Call or text — English y Español",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Replies within a business day",
  },
  {
    label: "Office",
    value: site.address,
    href: "https://maps.google.com/?q=333+H+Street,+Chula+Vista,+CA+91910",
    note: "Key Connections Real Estate",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-4xl px-5 py-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-2 font-display text-5xl leading-tight">
            Let’s make your{" "}
            <span className="coral-gradient-text">connection</span>.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Buying, selling, or investing across {site.serviceAreas} — reach
            Karly directly. Hablo Español.
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {rows.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.08}>
              <a
                href={r.href}
                target={r.label === "Office" ? "_blank" : undefined}
                rel={r.label === "Office" ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-1 rounded-2xl border border-line/50 bg-surface p-7 transition-colors hover:border-coral/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="eyebrow">{r.label}</p>
                  <p className="mt-1 text-xl text-paper transition-colors group-hover:text-coral">
                    {r.value}
                  </p>
                </div>
                <p className="text-sm text-muted">{r.note}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12">
          <div className="rounded-2xl border border-line/50 bg-surface p-7">
            <p className="eyebrow">Follow</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/85 transition-colors hover:text-coral"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
