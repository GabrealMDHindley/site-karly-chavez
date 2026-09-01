"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { submitLead } from "@/lib/leads";

const EASE = [0.22, 1, 0.36, 1] as const;

// Mirrors the 3-step wizard on keyconnectionsrealty.com/home-valuation.
const TIME_FRAMES = [
  "I want to sell my home now",
  "In the next 3 months",
  "In the next 12 months",
  "I’m just curious about my home’s value",
];

const CONSENT_TEXT =
  "I agree to be contacted by Key Connections Real Estate via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. Message and data rates may apply. Message frequency may vary.";

export default function ValuationWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const reduced = useReducedMotion();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !consent || sending) return;
    setSending(true);
    setError(false);
    let ok = true;
    if (!honeypot) {
      ok = await submitLead({
        formType: "home-valuation",
        propertyAddress: address,
        fullName,
        email,
        phone,
        timeFrame,
        consent,
      });
    }
    setSending(false);
    if (ok) setStep(3);
    else setError(true);
  };

  return (
    <div className="border border-line bg-card p-7 shadow-[0_24px_60px_rgba(20,18,13,0.08)] md:p-10">
      {/* Step indicator */}
      <div
        role="group"
        className="mb-9 flex items-center justify-center gap-3"
        aria-label={`Step ${step} of 3`}
      >
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            aria-current={step === n ? "step" : undefined}
            className={`tabular flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-500 ${
              step > n
                ? "border-brass bg-brass text-white"
                : step === n
                  ? "border-brass text-brass-deep"
                  : "border-line text-stone/50"
            }`}
          >
            {step > n ? "✓" : n}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="v-step1"
            initial={{ opacity: 0, x: reduced ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            onSubmit={(e) => {
              e.preventDefault();
              if (address.trim()) setStep(2);
            }}
          >
            <label htmlFor="v-address" className="field-label">
              Property Address
            </label>
            <input
              id="v-address"
              autoComplete="street-address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address, city, ZIP"
              className="field"
            />
            <button
              type="submit"
              disabled={!address.trim()}
              className="btn-gold mt-7 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="v-step2"
            initial={{ opacity: 0, x: reduced ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            onSubmit={submit}
            noValidate
          >
            <p className="mb-7 text-center font-display text-2xl text-ink">
              Almost there! You’re 1 step away
            </p>
            <div className="grid gap-5">
              <div>
                <label htmlFor="v-name" className="field-label">
                  Full Name
                </label>
                <input
                  id="v-name"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="field"
                />
              </div>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="v-middle">Middle Name</label>
                <input
                  id="v-middle"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="v-email" className="field-label">
                    Email Address
                  </label>
                  <input
                    id="v-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="v-phone" className="field-label">
                    Phone Number
                  </label>
                  <input
                    id="v-phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="v-time" className="field-label">
                  Time Frame{" "}
                  <span className="normal-case tracking-normal text-stone">
                    (optional)
                  </span>
                </label>
                <select
                  id="v-time"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                  className="field appearance-none"
                >
                  <option value="">Select…</option>
                  {TIME_FRAMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-start gap-3 text-[12px] leading-relaxed text-stone">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brass"
                />
                <span>{CONSENT_TEXT}</span>
              </label>
            </div>
            {error && (
              <p role="alert" className="mt-5 text-sm text-red-700">
                Something went wrong sending your request — please try again,
                or call us at (619) 495-1339.
              </p>
            )}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brass-deep underline-offset-4 hover:underline"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={!fullName || !email || !phone || !consent || sending}
                className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? "Sending…" : "Get My Valuation"}
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.div
            key="v-step3"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-6 text-center"
            role="status"
          >
            <span aria-hidden="true" className="text-5xl">
              🏡
            </span>
            <h3 className="mt-5 font-display text-3xl text-ink">Thank You</h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-stone">
              We’re gathering your property information. Your home valuation
              report will arrive in your inbox.
            </p>
            <Link href="/listings?status=for-sale" className="btn-outline-dark mt-8">
              View Listings for Sale
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
