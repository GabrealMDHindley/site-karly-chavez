import { Counter, Stagger, StaggerItem } from "@/components/motion";
import { stats } from "@/lib/site";

export default function StatStrip({ dark = false }: { dark?: boolean }) {
  return (
    <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {stats.map((s) => (
        <StaggerItem key={s.label} className="text-center">
          <Counter
            value={s.value}
            suffix={s.suffix}
            className={`tabular font-display text-5xl font-light ${
              dark ? "text-brass-pale" : "text-brass-deep"
            }`}
          />
          <p
            className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
              dark ? "text-white/60" : "text-stone"
            }`}
          >
            {s.label}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
