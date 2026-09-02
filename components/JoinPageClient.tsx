"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { joinUs } from "@/lib/content";
import { submitLead } from "@/lib/leads";

const CONSENT_TEXT =
  "I agree to be contacted by Key Connections Real Estate via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. Message and data rates may apply. Message frequency may vary.";

export default function JoinPageClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    middleName: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.consent || state === "sending") return;
    setState("sending");
    let ok = true;
    if (!form.middleName) {
      ok = await submitLead({
        formType: "join-team",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        consent: form.consent,
      });
    }
    setState(ok ? "done" : "error");
  };

  return (
    <div>
      <PageHero
        eyebrow={joinUs.subtitle}
        title={joinUs.title}
        intro={joinUs.body[0]}
        image="/images/about/team-photo.webp"
      />

      <section className="mx-auto max-w-shell px-5 py-20">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why Choose Us" title="Build your career here" />
            <Reveal delay={0.08}>
              <p className="mt-6 text-[15px] leading-[1.85] text-stone">
                {joinUs.body[1]}
              </p>
            </Reveal>
            <Stagger className="mt-9 space-y-4">
              {joinUs.benefits.map((b, i) => (
                <StaggerItem key={b}>
                  <div className="flex items-start gap-5 border border-line bg-card p-6">
                    <span className="tabular font-display text-2xl font-light text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-[15px] text-ink/85">{b}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="relative mt-9 aspect-[16/9] overflow-hidden">
              <Image
                src="/images/about/numbers.webp"
                alt="The Key Connections Real Estate team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="border border-line bg-card p-8 md:p-10">
              <p className="eyebrow">Become Part of the Family</p>
              <h2 className="mt-3 font-display text-2xl font-light text-ink">
                {state === "done" ? "We'll be in touch!" : "Apply today"}
              </h2>
              {state === "done" ? (
                <p role="status" className="mt-5 text-[15px] leading-relaxed text-stone">
                  Thank you for your interest in joining Key Connections Real
                  Estate. We're excited to learn more about you and explore the
                  possibilities together — expect to hear from us soon.
                </p>
              ) : (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {joinUs.closing}
                  </p>
                  <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="join-middle">Middle Name</label>
                      <input
                        id="join-middle"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.middleName}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, middleName: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="join-name" className="field-label">
                        Name
                      </label>
                      <input
                        id="join-name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="field"
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="join-email" className="field-label">
                          Email
                        </label>
                        <input
                          id="join-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="join-phone" className="field-label">
                          Phone
                        </label>
                        <input
                          id="join-phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          className="field"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="join-msg" className="field-label">
                        Tell us about yourself
                      </label>
                      <textarea
                        id="join-msg"
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="Your experience, license status, and what you're looking for in a brokerage"
                        className="field resize-none"
                      />
                    </div>
                    <label className="flex items-start gap-3 text-[11.5px] leading-relaxed text-stone">
                      <input
                        type="checkbox"
                        required
                        checked={form.consent}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, consent: e.target.checked }))
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 accent-brass"
                      />
                      <span>{CONSENT_TEXT}</span>
                    </label>
                    {state === "error" && (
                      <p role="alert" className="text-sm text-red-700">
                        Something went wrong — please try again or call (619)
                        495-1339.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={
                        !form.name || !form.email || !form.consent || state === "sending"
                      }
                      className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {state === "sending" ? "Sending…" : "Submit Application"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
