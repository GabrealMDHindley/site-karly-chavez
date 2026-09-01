import { values } from "@/lib/site";

/** Infinite marquee of the brand's core values — TRUST. HONESTY. … */
export default function ValuesMarquee() {
  const row = [...values, ...values];
  return (
    <section
      className="overflow-hidden border-y border-line bg-cream py-6"
      aria-label={`Our values: ${values.join(", ")}`}
    >
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {row.map((v, i) => (
          <span key={i} aria-hidden={i >= values.length} className="flex items-center gap-12">
            <span className="font-display text-2xl font-light uppercase tracking-[0.22em] text-ink/80 md:text-3xl">
              {v}.
            </span>
            <span className="text-brass" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
