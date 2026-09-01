# site-karly-chavez

Website for Karly Chavez — Key Connections Real Estate (Chula Vista / San Diego).

Next.js App Router site built by the Real Estate Industry studio. Listing videos are
served from `public/videos/<listing-slug>/`; each listing page renders its walkthrough
and flyover sections only when the corresponding MP4 exists at build time, so
delivering a video is just a commit — no code changes.

Deployed on Vercel; every push to `main` auto-deploys.
