# Key Connections Real Estate — Karly Chavez

Marketing site for Karly Chavez (Key Connections Real Estate, Chula Vista CA),
rebuilt as a full migration of keyconnectionsrealty.com with a cleaner design,
scroll animation, listing search, and CRM-ready lead forms.

## Stack

- Next.js 15 (App Router, static prerender) · React 19 · TypeScript
- Tailwind CSS, framer-motion (scroll reveals, parallax, counters)
- Leaflet + CARTO basemaps for listing/office maps (no API key)

## Content

- `lib/listings.ts` — all 11 properties (4 active, 6 sold, plus the featured
  5 Spinnaker Way listing) with verbatim MLS descriptions and facts; photos in
  `public/listings/<slug>/`.
- `lib/site.ts`, `lib/content.ts`, `lib/testimonials.ts` — brand info, team,
  neighborhoods, services, guides, events, Koffee with Karly, military and
  divorce resources, and 54 verbatim client testimonials.
- Walkthrough/flyover videos exist for 5 Spinnaker Way only
  (`public/videos/5-spinnaker-way/`); other listings use photos.

## Lead capture → GoHighLevel

Every form (contact Buy/Sell/Refinance flow, home valuation, buyer's guide,
newsletter, join-the-team) posts flat JSON through `lib/leads.ts`. Set

```
NEXT_PUBLIC_GHL_WEBHOOK_URL=<GoHighLevel inbound-webhook URL>
```

and all submissions arrive with a `formType` discriminator plus the branch
fields (`buy_*`, `sell_*`, `refi_*`), ready to route in one GHL workflow.
Without the env var, submissions log to the console so the flows stay testable.

## Develop

```
npm install
npm run dev    # http://localhost:3000
npm run build  # static production build
```
