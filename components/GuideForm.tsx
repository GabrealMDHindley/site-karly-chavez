"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";

const CONSENT_TEXT =
  "I agree to be contacted by Key Connections Real Estate via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. Message and data rates may apply. Message frequency may vary.";

export default function GuideForm({ language }: { language: "English" | "Español" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Buying");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !consent || state === "sending") return;
    setState("sending");
    let ok = true;
    if (!honeypot) {
      ok = await submitLead({
        formType: "buyers-guide",
        guideLanguage: language,
        name,
        email,
        interest,
        consent,
      });
    }
    setState(ok ? "done" : "error");
  };

  if (state === "done") {
    return (
      <p role="status" className="text-[15px] leading-relaxed text-brass-deep">
        {language === "Español"
          ? "¡Gracias! Su guía del comprador está en camino a su correo electrónico."
          : "Thank you! Your home buyer's guide is on its way to your inbox."}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`bg-mid-${language}`}>Middle Name</label>
        <input
          id={`bg-mid-${language}`}
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`bg-name-${language}`} className="field-label">
          {language === "Español" ? "Nombre" : "Name"}
        </label>
        <input
          id={`bg-name-${language}`}
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
        />
      </div>
      <div>
        <label htmlFor={`bg-email-${language}`} className="field-label">
          Email
        </label>
        <input
          id={`bg-email-${language}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
      </div>
      <div>
        <label htmlFor={`bg-int-${language}`} className="field-label">
          {language === "Español" ? "¿Qué le interesa?" : "What are you interested in?"}
        </label>
        <select
          id={`bg-int-${language}`}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="field appearance-none"
        >
          <option>Buying</option>
          <option>Selling</option>
          <option>Other</option>
        </select>
      </div>
      <label className="flex items-start gap-3 text-[11.5px] leading-relaxed text-stone">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brass"
        />
        <span>{CONSENT_TEXT}</span>
      </label>
      {state === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {language === "Español"
            ? "Algo salió mal — inténtelo de nuevo o llámenos al (619) 495-1339."
            : "Something went wrong — please try again or call (619) 495-1339."}
        </p>
      )}
      <button
        type="submit"
        disabled={!name || !email || !consent || state === "sending"}
        className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {state === "sending"
          ? "Sending…"
          : language === "Español"
            ? "Enviar"
            : "Send Me the Guide"}
      </button>
    </form>
  );
}
