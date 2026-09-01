import Link from "next/link";
import Image from "next/image";
import { site, idxDisclaimer } from "@/lib/site";
import NewsletterForm from "@/components/NewsletterForm";

const quickLinks = [
  { label: "Home Search", href: "/listings" },
  { label: "Featured Properties", href: "/listings?status=for-sale" },
  { label: "Home Valuation", href: "/home-valuation" },
  { label: "Mortgage Calculator", href: "/mortgage-calculator" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Our Services", href: "/services" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Meet the Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Events", href: "/events" },
  { label: "Join Key Connections", href: "/join" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-night text-white/80">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-shell flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center">
          <div>
            <p className="eyebrow-light">Stay in the know</p>
            <h2 className="mt-3 font-display text-2xl text-white md:text-3xl">
              Receive exclusive listings in your inbox
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Are you interested in buying a home? Look no further than working
              with a real estate expert.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-shell gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src="/brand/logo.png"
            alt="Key Connections Real Estate"
            width={140}
            height={65}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {site.motto} Serving {site.serviceAreas}. Hablamos Español.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[13px] uppercase tracking-[0.12em] text-white/70 hover:text-brass-pale"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Explore">
          <p className="eyebrow-light">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-white/70 transition-colors hover:text-brass-pale"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="eyebrow-light">Company</p>
          <ul className="mt-5 space-y-2.5">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/70 transition-colors hover:text-brass-pale"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow-light">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a href={site.phoneHref} className="tabular hover:text-brass-pale">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brass-pale">
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
            <li className="pt-2 text-xs text-white/50">
              {site.name} · {site.dreAgent}
              <br />
              Key Connections Real Estate · {site.dreOffice}
              <br />
              {site.broker.name}, {site.broker.role} ·{" "}
              {site.broker.license}
            </li>
            <li className="text-xs text-white/50">
              BBB Accredited Real Estate Agency
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-shell px-5 py-8">
          <p className="text-[11px] leading-relaxed text-white/55">
            {idxDisclaimer}
          </p>
          <p className="mt-4 text-[11px] text-white/55">
            All information is deemed reliable but not guaranteed and should be
            independently reviewed and verified.
          </p>
          <p className="mt-6 text-xs text-white/60">
            © {new Date().getFullYear()} Key Connections Real Estate. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
