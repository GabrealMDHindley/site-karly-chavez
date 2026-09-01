import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/40 bg-[#120e1a]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <Image
            src="/brand/logo.png"
            alt="Key Connections Real Estate"
            width={150}
            height={69}
            className="h-12 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.serviceAreas}
            <br />
            Hablo Español
          </p>
        </div>

        <div className="text-sm leading-7 text-muted">
          <p className="eyebrow mb-3">Contact</p>
          <p>
            <a href={site.phoneHref} className="transition-colors hover:text-coral">
              {site.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-coral">
              {site.email}
            </a>
          </p>
          <p>{site.address}</p>
          <p className="mt-3">
            <Link href="/listings" className="transition-colors hover:text-coral">
              Listings
            </Link>
            {" · "}
            <Link href="/contact" className="transition-colors hover:text-coral">
              Contact
            </Link>
          </p>
        </div>

        <div className="text-sm leading-7 text-muted">
          <p className="eyebrow mb-3">Follow</p>
          {site.socials.map((s) => (
            <p key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-coral"
              >
                {s.label}
              </a>
            </p>
          ))}
        </div>
      </div>
      <div className="border-t border-line/40 py-6 text-center text-xs text-muted">
        <p>
          Karly Chavez | {site.dreAgent} · {site.company} {site.dreOffice}
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} {site.company}
        </p>
      </div>
    </footer>
  );
}
