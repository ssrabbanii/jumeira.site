# Jumeira — Luxury Villa Marketplace

A working high-fidelity prototype of a luxury rental & sales marketplace. Built by **Pinnacel AI**.

This is a **static site** — pure HTML + React loaded at runtime via Babel standalone. No build step required.

## Run locally

```bash
npx serve .
# or
python3 -m http.server 5173
```

Then open `http://localhost:3000` (or whatever port your server prints).

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. **Framework Preset:** `Other` (or leave on auto-detect — Vercel will recognize it as a static site).
4. **Build Command:** *(leave empty)*
5. **Output Directory:** *(leave empty — defaults to project root)*
6. Click **Deploy**.

That's it. `index.html` at the root is served as the entry point, and everything under `src/` loads automatically.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel
```

## Project structure

```
.
├── index.html              # Entry point (Vercel serves this by default)
├── src/                    # All React components (loaded via Babel standalone)
│   ├── app.jsx             #   App shell + view router
│   ├── header.jsx          #   Top nav, category nav, mobile drawer
│   ├── home.jsx            #   Homepage (hero, destinations, featured)
│   ├── listing.jsx         #   Search results grid + filter drawer
│   ├── detail.jsx          #   Property detail page
│   ├── checkout.jsx        #   3-step booking checkout
│   ├── account.jsx         #   Profile / Trips / Saved / Inbox / Settings
│   ├── host.jsx            #   "Become a host" landing
│   ├── hostflow.jsx        #   Host dashboard + 7-step list-a-property wizard
│   ├── pages.jsx           #   Buy / Rent / Contact pages
│   ├── login.jsx           #   Sign in / sign up
│   ├── disclaimer.jsx      #   Entry disclaimer modal
│   ├── tour.jsx            #   Forced 12-step feature tour
│   ├── font-switcher.jsx   #   Press `/` to swap typeface site-wide
│   ├── tweaks-panel.jsx    #   Live design knobs panel
│   ├── responsive.jsx      #   Mobile / tablet stylesheet
│   └── icons.jsx           #   Icon set
├── vercel.json             # Vercel routing + caching headers
├── package.json
└── README.md
```

## Tech notes

- React 18.3 + Babel Standalone (CDN, no bundler)
- `script type="text/babel"` tags in `index.html` compile JSX in the browser on load
- All component files attach exports to `window` so they share scope across `<script>` tags
- Fonts loaded from Google Fonts (Inter, Montserrat, Space Grotesk, Roboto, Open Sans, Cormorant Garamond, Lora)

## Status

> **Preview 0.4 — In development.** Not the final production design.
