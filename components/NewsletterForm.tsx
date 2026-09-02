"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    const ok = await submitLead({ formType: "newsletter", email });
    setState(ok ? "done" : "error");
  };

  if (state === "done") {
    return (
      <p role="status" className="max-w-sm text-sm leading-relaxed text-brass-pale">
        Thank you — you have successfully been added to the newsletter. Stay
        tuned for the latest updates sent straight to your inbox!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      {state === "error" && (
        <p role="alert" className="mb-3 text-sm text-red-300">
          Something went wrong — please try again or call (619) 495-1339.
        </p>
      )}
      <div className="flex gap-0">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 border border-white/20 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brass-pale"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-gold shrink-0 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Submit"}
      </button>
      </div>
    </form>
  );
}
