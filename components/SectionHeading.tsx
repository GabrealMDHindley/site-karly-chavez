import { Reveal } from "@/components/motion";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <p className={dark ? "eyebrow-light" : "eyebrow"}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-light leading-[1.12] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className={`gold-rule ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      {intro && (
        <p
          className={`mt-6 max-w-2xl text-[15px] leading-relaxed ${
            dark ? "text-white/65" : "text-stone"
          } ${centered ? "mx-auto" : ""}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
