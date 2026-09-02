import Link from "next/link";
import { Reveal } from "@/components/motion";
import { site } from "@/lib/site";
import { workWithUs } from "@/lib/content";

export default function CTABanner({
  title = "Work With Us",
  body = workWithUs,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-night py-24">
      <div className="mx-auto max-w-shell px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-light">Let’s Connect</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65">
            {body}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Contact Us
            </Link>
            <a href={site.phoneHref} className="btn-outline-light tabular">
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
