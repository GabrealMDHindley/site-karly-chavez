"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { submitLead } from "@/lib/leads";

const EASE = [0.22, 1, 0.36, 1] as const;

type Intent = "buy" | "sell" | "refinance";

const INTENTS: {
  id: Intent;
  title: string;
  blurb: string;
  icon: string;
}[] = [
  {
    id: "buy",
    title: "Buy",
    blurb: "Find your next home in Southern California",
    icon: "🔑",
  },
  {
    id: "sell",
    title: "Sell",
    blurb: "Get top dollar with a proven listing strategy",
    icon: "🏡",
  },
  {
    id: "refinance",
    title: "Refinance",
    blurb: "Lower your payment or unlock your equity",
    icon: "📊",
  },
];

// Branch-specific questions. Field names are flat and stable so the form can
// be wired directly into GoHighLevel (see lib/leads.ts).
type Q = {
  name: string;
  label: string;
  type: "select" | "text" | "textarea";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

const QUESTIONS: Record<Intent, Q[]> = {
  buy: [
    {
      name: "buy_timeline",
      label: "When are you looking to buy?",
      type: "select",
      options: [
        "As soon as possible",
        "Within 3 months",
        "3–6 months",
        "6–12 months",
        "Just exploring",
      ],
    },
    {
      name: "buy_price_range",
      label: "What price range are you considering?",
      type: "select",
      options: [
        "Under $500K",
        "$500K – $750K",
        "$750K – $1M",
        "$1M – $1.5M",
        "$1.5M – $2M",
        "$2M+",
        "Not sure yet",
      ],
    },
    {
      name: "buy_areas",
      label: "Which areas interest you?",
      type: "text",
      placeholder: "e.g. Chula Vista, Eastlake, San Diego, Coronado…",
    },
    {
      name: "buy_property_type",
      label: "What type of property?",
      type: "select",
      options: [
        "Single-family home",
        "Condo / Townhome",
        "Multi-family / Investment",
        "Land",
        "Open to options",
      ],
    },
    {
      name: "buy_beds",
      label: "Minimum bedrooms",
      type: "select",
      options: ["1+", "2+", "3+", "4+", "5+", "No preference"],
    },
    {
      name: "buy_preapproved",
      label: "Are you pre-approved for a mortgage?",
      type: "select",
      options: [
        "Yes, I have a pre-approval letter",
        "Not yet — I'd like lender referrals",
        "I'm paying cash",
        "Not sure where to start",
      ],
    },
    {
      name: "buy_first_time",
      label: "Are you a first-time home buyer?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "buy_current_situation",
      label: "What's your current situation?",
      type: "select",
      options: [
        "Renting",
        "Own — need to sell first",
        "Own — keeping my current home",
        "Living with family",
        "Relocating to the area",
        "Military / PCS orders",
      ],
    },
    {
      name: "buy_must_haves",
      label: "Any must-haves? (yard, pool, ADU, garage…)",
      type: "textarea",
      optional: true,
      placeholder: "Tell us what your dream home needs",
    },
  ],
  sell: [
    {
      name: "sell_address",
      label: "What's the property address?",
      type: "text",
      placeholder: "Street address, city, ZIP",
    },
    {
      name: "sell_property_type",
      label: "What type of property is it?",
      type: "select",
      options: [
        "Single-family home",
        "Condo / Townhome",
        "Multi-family / Investment",
        "Land",
        "Other",
      ],
    },
    {
      name: "sell_condition",
      label: "How would you describe its condition?",
      type: "select",
      options: [
        "Move-in ready / recently updated",
        "Good — could use minor updates",
        "Needs some work",
        "Major fixer",
      ],
    },
    {
      name: "sell_timeline",
      label: "When would you like to sell?",
      type: "select",
      options: [
        "As soon as possible",
        "Within 3 months",
        "3–6 months",
        "6–12 months",
        "Just curious about my options",
      ],
    },
    {
      name: "sell_reason",
      label: "What's prompting the move?",
      type: "select",
      options: [
        "Upsizing",
        "Downsizing",
        "Relocating",
        "Selling an investment property",
        "Divorce / life transition",
        "Estate / inherited property",
        "Other",
      ],
    },
    {
      name: "sell_occupancy",
      label: "Who lives in the home right now?",
      type: "select",
      options: ["I live there", "Tenants", "It's vacant"],
    },
    {
      name: "sell_also_buying",
      label: "Will you also be buying your next home with us?",
      type: "select",
      options: ["Yes — I need to buy too", "No — just selling", "Not sure yet"],
    },
    {
      name: "sell_price_expectation",
      label: "Do you have a price in mind?",
      type: "text",
      optional: true,
      placeholder: "Optional — we'll prepare a free market analysis",
    },
  ],
  refinance: [
    {
      name: "refi_address",
      label: "What's the property address?",
      type: "text",
      placeholder: "Street address, city, ZIP",
    },
    {
      name: "refi_goal",
      label: "What's your main goal?",
      type: "select",
      options: [
        "Lower my rate / monthly payment",
        "Cash-out — access my equity",
        "Shorten my loan term",
        "Remove PMI / FHA mortgage insurance",
        "Consolidate debt",
        "Other",
      ],
    },
    {
      name: "refi_home_value",
      label: "Estimated home value",
      type: "select",
      options: [
        "Under $500K",
        "$500K – $750K",
        "$750K – $1M",
        "$1M – $1.5M",
        "$1.5M+",
        "Not sure",
      ],
    },
    {
      name: "refi_loan_balance",
      label: "Approximate remaining loan balance",
      type: "select",
      options: [
        "Under $250K",
        "$250K – $500K",
        "$500K – $750K",
        "$750K – $1M",
        "$1M+",
        "Not sure",
      ],
    },
    {
      name: "refi_current_rate",
      label: "Current interest rate (if you know it)",
      type: "text",
      optional: true,
      placeholder: "e.g. 7.25%",
    },
    {
      name: "refi_credit",
      label: "How's your credit?",
      type: "select",
      options: [
        "Excellent (740+)",
        "Good (670–739)",
        "Fair (580–669)",
        "Rebuilding (below 580)",
        "Not sure",
      ],
    },
    {
      name: "refi_timeline",
      label: "When do you want to move forward?",
      type: "select",
      options: [
        "As soon as possible",
        "Within 3 months",
        "Watching rates — no rush",
        "Just exploring options",
      ],
    },
  ],
};

const CONSENT_TEXT =
  "I agree to be contacted by Key Connections Real Estate via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. Message and data rates may apply. Message frequency may vary.";

export default function LeadForm({
  initialIntent,
  initialMessage = "",
}: {
  initialIntent?: string;
  initialMessage?: string;
}) {
  const valid = ["buy", "sell", "refinance"].includes(initialIntent ?? "")
    ? (initialIntent as Intent)
    : null;
  const [intent, setIntent] = useState<Intent | null>(valid);
  const [step, setStep] = useState<0 | 1 | 2>(valid ? 1 : 0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "Call or text",
    language: "English",
    message: initialMessage,
    consent: false,
    middleName: "", // honeypot — hidden from real users
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const reduced = useReducedMotion();

  const questions = intent ? QUESTIONS[intent] : [];
  const requiredAnswered = useMemo(
    () =>
      questions
        .filter((q) => !q.optional)
        .every((q) => (answers[q.name] ?? "").trim() !== ""),
    [questions, answers]
  );

  const contactValid =
    contact.firstName.trim() &&
    contact.email.trim() &&
    contact.phone.trim() &&
    contact.consent;

  const pick = (id: Intent) => {
    setIntent(id);
    setAnswers({});
    setStep(1);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intent || !contactValid || state === "sending") return;
    if (contact.middleName) {
      // Honeypot tripped — pretend success, drop the lead.
      setState("done");
      return;
    }
    setState("sending");
    const ok = await submitLead({
      formType: `contact-${intent}`,
      intent,
      ...answers,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      preferredContact: contact.preferredContact,
      language: contact.language,
      message: contact.message,
      consent: contact.consent,
    });
    setState(ok ? "done" : "error");
  };

  const stepMeta = [
    { n: 1, label: "Your Goal" },
    { n: 2, label: "The Details" },
    { n: 3, label: "About You" },
  ];
  const current = step + 1;

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="border border-line bg-card px-8 py-16 text-center"
      >
        <span aria-hidden="true" className="text-5xl">
          🗝️
        </span>
        <h3 className="mt-6 font-display text-3xl text-ink">Thank you!</h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-stone">
          Your information is on its way to Karly and the team. We’ll reach out
          shortly{contact.language === "Español" ? " — en Español" : ""} to talk
          through your{" "}
          {intent === "buy"
            ? "home search"
            : intent === "sell"
              ? "home sale"
              : "refinance options"}
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Progress */}
      <div
        role="group"
        className="mb-10 flex items-center gap-0"
        aria-label={`Step ${current} of 3`}
      >
        {stepMeta.map((s, i) => (
          <div key={s.n} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className={`tabular flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-500 ${
                  current > s.n
                    ? "border-brass bg-brass text-white"
                    : current === s.n
                      ? "border-brass text-brass-deep"
                      : "border-line text-stone"
                }`}
                aria-current={current === s.n ? "step" : undefined}
              >
                {current > s.n ? "✓" : s.n}
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  current >= s.n ? "text-ink" : "text-stone"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < stepMeta.length - 1 && (
              <div className="relative mx-3 mb-6 h-px flex-1 bg-line" aria-hidden="true">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-brass"
                  initial={false}
                  animate={{ width: current > s.n ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 — intent */}
        {step === 0 && (
          <motion.fieldset
            key="step-intent"
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <legend className="sr-only">
              Are you looking to buy, sell, or refinance?
            </legend>
            <p className="text-center font-display text-2xl text-ink md:text-3xl">
              What brings you here today?
            </p>
            <p className="mt-2 text-center text-sm text-stone">
              Are you looking to buy, sell, or refinance?
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {INTENTS.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => pick(it.id)}
                  className="group border border-line bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-[0_18px_44px_rgba(20,18,13,0.12)]"
                >
                  <span aria-hidden="true" className="text-4xl">
                    {it.icon}
                  </span>
                  <span className="mt-4 block font-display text-2xl text-ink group-hover:text-brass-deep">
                    {it.title}
                  </span>
                  <span className="mt-2 block text-[13px] leading-relaxed text-stone">
                    {it.blurb}
                  </span>
                </button>
              ))}
            </div>
          </motion.fieldset>
        )}

        {/* Step 2 — branch questions */}
        {step === 1 && intent && (
          <motion.div
            key={`step-questions-${intent}`}
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-2xl text-ink md:text-3xl">
                {intent === "buy"
                  ? "Tell us about your home search"
                  : intent === "sell"
                    ? "Tell us about your property"
                    : "Tell us about your refinance"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setIntent(null);
                }}
                className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brass-deep underline-offset-4 hover:underline"
              >
                Change goal
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {questions.map((q) => (
                <div
                  key={q.name}
                  className={q.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label htmlFor={q.name} className="field-label">
                    {q.label}
                    {q.optional ? (
                      <span className="ml-1 normal-case tracking-normal text-stone">
                        (optional)
                      </span>
                    ) : null}
                  </label>
                  {q.type === "select" ? (
                    <select
                      id={q.name}
                      name={q.name}
                      value={answers[q.name] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.name]: e.target.value }))
                      }
                      className="field appearance-none"
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {q.options!.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : q.type === "textarea" ? (
                    <textarea
                      id={q.name}
                      name={q.name}
                      rows={3}
                      value={answers[q.name] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.name]: e.target.value }))
                      }
                      placeholder={q.placeholder}
                      className="field resize-none"
                    />
                  ) : (
                    <input
                      id={q.name}
                      name={q.name}
                      type="text"
                      value={answers[q.name] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.name]: e.target.value }))
                      }
                      placeholder={q.placeholder}
                      className="field"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-9 flex justify-end">
              <button
                type="button"
                disabled={!requiredAnswered}
                onClick={() => setStep(2)}
                className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — contact info */}
        {step === 2 && (
          <motion.div
            key="step-contact"
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-2xl text-ink md:text-3xl">
                How can we reach you?
              </p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brass-deep underline-offset-4 hover:underline"
              >
                ← Back
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="lf-first" className="field-label">
                  First Name
                </label>
                <input
                  id="lf-first"
                  autoComplete="given-name"
                  required
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, firstName: e.target.value }))
                  }
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="lf-last" className="field-label">
                  Last Name
                </label>
                <input
                  id="lf-last"
                  autoComplete="family-name"
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, lastName: e.target.value }))
                  }
                  className="field"
                />
              </div>
              {/* Honeypot — hidden from people, visible to bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="lf-middle">Middle Name</label>
                <input
                  id="lf-middle"
                  tabIndex={-1}
                  autoComplete="off"
                  value={contact.middleName}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, middleName: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="lf-email" className="field-label">
                  Email
                </label>
                <input
                  id="lf-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="lf-phone" className="field-label">
                  Phone
                </label>
                <input
                  id="lf-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={contact.phone}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, phone: e.target.value }))
                  }
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="lf-pref" className="field-label">
                  Preferred Contact Method
                </label>
                <select
                  id="lf-pref"
                  value={contact.preferredContact}
                  onChange={(e) =>
                    setContact((c) => ({
                      ...c,
                      preferredContact: e.target.value,
                    }))
                  }
                  className="field appearance-none"
                >
                  <option>Call or text</option>
                  <option>Call</option>
                  <option>Text</option>
                  <option>Email</option>
                </select>
              </div>
              <div>
                <label htmlFor="lf-lang" className="field-label">
                  Preferred Language
                </label>
                <select
                  id="lf-lang"
                  value={contact.language}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, language: e.target.value }))
                  }
                  className="field appearance-none"
                >
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="lf-msg" className="field-label">
                  Anything else we should know?{" "}
                  <span className="normal-case tracking-normal text-stone">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="lf-msg"
                  rows={3}
                  value={contact.message}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, message: e.target.value }))
                  }
                  className="field resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 text-[12px] leading-relaxed text-stone">
                  <input
                    type="checkbox"
                    required
                    checked={contact.consent}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, consent: e.target.checked }))
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 accent-brass"
                  />
                  <span>{CONSENT_TEXT}</span>
                </label>
              </div>
            </div>
            {state === "error" && (
              <p className="mt-5 text-sm text-red-700" role="alert">
                Something went wrong sending your message — please try again, or
                call us at (619) 495-1339.
              </p>
            )}
            <div className="mt-9 flex justify-end">
              <button
                type="submit"
                disabled={!contactValid || state === "sending"}
                className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {state === "sending" ? "Sending…" : "Submit"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
