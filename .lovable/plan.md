# SEO-friendly URL + Page Structure

Goal: URLs and page titles like `paralysis-hospital-in-kochas` so each location/keyword ranks on its own page, and developers can add new pages by dropping a single data file — no code changes.

## New URL structure

```text
/                                       → Home
/about, /doctors, /gallery, /contact    → existing
/services                               → list page
/services/:slug                         → e.g. /services/physiotherapy
/locations/:slug                        → NEW, e.g. /locations/paralysis-hospital-in-kochas
/blog                                   → list page (future)
/blog/:slug                             → article (future)
```

Examples of location slugs to ship now:
- `/locations/paralysis-hospital-in-kochas`
- `/locations/paralysis-hospital-in-buxar`
- `/locations/lakva-hospital-in-rohtas`
- `/locations/polio-hospital-near-dehuan`
- `/locations/best-hospital-in-kochas`

Each gets its own `<title>`, `<meta description>`, `<h1>`, canonical, OG tags, JSON-LD `MedicalOrganization` + `BreadcrumbList`, and unique body copy → ranks independently for that keyword.

## File structure (developer-friendly)

```text
src/
├── content/
│   ├── locations/                ← drop a new .ts file here = new live page
│   │   ├── _types.ts             (LocationPage interface)
│   │   ├── _index.ts             (auto-aggregates every sibling export)
│   │   ├── paralysis-hospital-in-kochas.ts
│   │   ├── paralysis-hospital-in-buxar.ts
│   │   ├── lakva-hospital-in-rohtas.ts
│   │   ├── polio-hospital-near-dehuan.ts
│   │   └── best-hospital-in-kochas.ts
│   └── services/
│       ├── _types.ts
│       ├── _index.ts
│       ├── physiotherapy.ts
│       ├── polio-treatment.ts
│       └── paralysis-care.ts
├── pages/
│   ├── LocationPage.tsx          ← single template, reads slug → content file
│   ├── LocationsIndex.tsx        ← /locations list, auto-lists all entries
│   └── ServicesPage.tsx          (existing, refactor to use content/services)
└── App.tsx                       ← add 2 routes
```

Each content file looks like:

```ts
// src/content/locations/paralysis-hospital-in-kochas.ts
export default {
  slug: "paralysis-hospital-in-kochas",
  h1: "Paralysis Hospital in Kochas",
  title: "Paralysis Hospital in Kochas | Aadhunik Lakva Polio Hospital",
  description: "Best paralysis & lakva treatment hospital near Kochas, Rohtas border. Expert physiotherapy by Dr Vishesh Kumar, 2km from Kochas.",
  keywords: "paralysis hospital in kochas, lakva hospital kochas, ...",
  heroImage: "/images/locations/kochas.webp",
  intro: "...",                    // 2–3 paragraphs unique copy
  sections: [                      // alternating image/text blocks
    { heading: "...", body: "...", image: "..." },
    ...
  ],
  faqs: [{ q: "...", a: "..." }],  // → FAQPage JSON-LD
  nearbyAreas: ["Dehuan", "Basahi", "Buxar"],
  mapEmbedQuery: "Aadhunik Lakva Polio Hospital",
};
```

`_index.ts` uses Vite's `import.meta.glob('./*.ts', { eager: true })` so the listing page and sitemap auto-discover every file — adding a new page = one file, zero edits elsewhere.

## SEO wiring

- `<LocationPage>` uses `react-helmet-async` to emit per-page title/description/canonical/OG/JSON-LD from the content file.
- `scripts/generate-sitemap.js` imports the `_index` aggregators and appends one `<url>` per location & service automatically.
- Internal linking: footer + home "Locations we serve" grid links every location page (boosts crawl + on-page SEO).
- Breadcrumbs component on each page with `BreadcrumbList` JSON-LD.

## What I will ship in this pass

1. `src/content/locations/_types.ts`, `_index.ts`, and 5 seed location files (Kochas, Buxar, Rohtas, Dehuan, Basahi) with unique 400-word copy each.
2. `src/content/services/_types.ts`, `_index.ts`, and 3 seed service files.
3. `src/pages/LocationPage.tsx` template + `LocationsIndex.tsx` listing.
4. Routes added in `src/App.tsx`: `/locations` and `/locations/:slug`.
5. Update `scripts/generate-sitemap.js` to auto-include all location/service slugs.
6. Add "Locations we serve" link grid on Home + Footer.
7. Add Locations dropdown back into Navbar (since user originally asked for 4 items, I'll keep 4 and put location links under About → or as a 5th item — confirm below).

## Question

Where should the new Location pages live in the navbar?
- (A) Keep 4 nav items, add "Locations" submenu under **About** dropdown.
- (B) Make it 5 top-level items: About / Services / **Locations** / Doctors / Contact.
- (C) Don't add to navbar; only link from footer + home grid (cleanest, still fully indexable).
