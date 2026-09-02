// Lead submission — single integration point for the CRM.
//
// To wire this site to GoHighLevel, set NEXT_PUBLIC_GHL_WEBHOOK_URL to a GHL
// inbound-webhook URL (Automations → Workflows → Inbound Webhook trigger).
// Every form on the site posts its fields here as flat JSON with a `formType`
// discriminator, so one workflow can route all lead types.

export type LeadPayload = {
  formType:
    | "contact-buy"
    | "contact-sell"
    | "contact-refinance"
    | "contact-general"
    | "home-valuation"
    | "buyers-guide"
    | "join-team"
    | "newsletter"
    | "showing-request";
  [key: string]: string | number | boolean | undefined;
};

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
  const body = {
    ...payload,
    source: "keyconnections-site",
    page: typeof window !== "undefined" ? window.location.pathname : "",
    submittedAt: new Date().toISOString(),
  };
  if (!url) {
    // CRM not connected yet — log locally so the form flow is testable.
    console.info("[lead] (no CRM webhook configured)", body);
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}
