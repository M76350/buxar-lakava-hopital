# Aadhunik Lakva Polio Hospital — Comprehensive Upgrade Plan

This is a large, multi-area request. I'll break it into phases so we can ship incrementally and you can review each phase. Please confirm or adjust before I begin.

---

## Phase 1 — Foundation: SEO, Routing, Loader, Cookies, Toasts

1. **Animated splash/loader screen** (2–3s) on first load with hospital logo + spinner animation, then fade into main site.
2. **Dynamic per-route SEO** using `react-helmet-async` — unique title, description, canonical, OG tags, JSON-LD (`MedicalOrganization` + `LocalBusiness` schema with geo coordinates for Geetanagar Basahi, Buxar) for every page.
3. **Sitemap generator script** (`scripts/generate-sitemap.ts`) wired to `predev`/`prebuild` so routes + blog articles auto-sync. Update `robots.txt`.
4. **Cookie consent banner** (necessary cookies auto-accepted) + set `localStorage`/cookie with 1-year expiry to remember the visitor and bias browser suggestions toward the site.
5. **Global toast system** — green for success, red for errors — used across every form/event (appointment, contact, newsletter, etc.).
6. **404 page redesign** matching site theme + animated illustration + "Back to Home" CTA.
7. **Disable custom cursor on mobile/tablet** (already partially there — confirm + tighten).

## Phase 2 — Navigation & Hero

1. **Reduce nav to 4 top-level items**, each with a dropdown menubar:
   - **About** → About Us, Our Doctors, Gallery
   - **Services** → All Services, Polio Treatment, Physiotherapy, Paralysis Care, Emergency
   - **Locations** → Buxar, Kochas, Rohtas, Nearest Cities Map
   - **Contact** → Contact Us, Book Appointment, Blog/Articles
2. **Hero rewrite**: H1 = `Aadhunik Lakva Polio Hospital — Geetanagar Basahi, Buxar (Near Kochas, Rohtas Border)` with meaningful intro paragraph and embedded mini-map address line.
3. **Hero slider keeps original images** (no replacement) — only optimize loading.
4. **Generate new hero banner image** (AI) featuring doctor + hospital logo composite for use as OG image and hero fallback.

## Phase 3 — Performance

1. Convert hero / large JPG-PNG assets to **WebP** with `<picture>` fallback.
2. **Lazy-load** all below-the-fold images (`loading="lazy"`, `decoding="async"`) and route-level `React.lazy` + `Suspense` for non-home pages.
3. Defer/async non-critical scripts; preconnect to fonts.
4. Compress any video; add `preload="metadata"`.

## Phase 4 — Nearest Locations Upgrade

- Each city card → **"Get Directions" button** opens Google Maps with destination preset to hospital coords from that origin.
- Add SEO-rich descriptive paragraph per city (Buxar, Kochas, Rohtas, Dehuan Dairy, Dehuan Village, Ara, Ballia, Varanasi, Patna, Ghazipur).
- Each location gets its own indexable route `/locations/:city` with unique meta + content (for "lakva hospital in Kochas / Rohtas / Buxar" searches).

## Phase 5 — Appointment Flow

- Full multi-step appointment dialog: Patient Info → Service/Department → Preferred Doctor → Date & Time slot → Confirm.
- All data **static for now** (services, doctors, slots hardcoded in a config file) — clearly marked TODO for later DB wiring.
- Submission goes through existing `send-contact-email` edge function (extended) with green success toast + confirmation screen.

## Phase 6 — Content: 10 sections on every page

Every nav page (Home, About, Services, Doctors, Gallery, Contact, Blog, Locations) gets 10 fully-written sections with relevant images, alternating image-left / image-right layouts, GSAP fade-in animations, and a slider for testimonials/feedback.

## Phase 7 — Blog / Articles System

- `/blog` listing page with cards (title + description visible in URL preview via per-route Helmet).
- `/blog/:slug` detail pages.
- Seed articles (static JSON for now):
  - "Best Lakva (Paralysis) Hospital in Buxar — 24×7 Care"
  - "Polio Treatment Near Kochas, Rohtas Border"
  - "Dehuan Dairy — Community Health Outreach"
  - "Dehuan Village — Polio Awareness Drive"
  - "Paralysis Recovery Stories from Bihar"
  - Plus 3 more clinical/wellness articles
- Each article: H1, meta description, OG image, JSON-LD `Article` schema, internal links → boosts backlinks-ability.

## Phase 8 — Local SEO Power-Up

Target keywords baked into titles, H1s, meta, alt text, JSON-LD:
- `lakava hospital`, `lakava aspatal in Rohtas`, `lakava hospital near me`, `lakava hospital in Buxar`, `best paralysis hospital in Buxar 24×7`, `best hospital in Kochas`, `near me hospital Kochas`, `polio hospital Geetanagar Basahi`, `Dr Vishesh Kumar`.
- `LocalBusiness` + `MedicalOrganization` JSON-LD with `geo`, `address`, `openingHours`, `telephone`, `priceRange`, `areaServed` (Buxar, Kochas, Rohtas, Dehuan).
- Footer NAP (Name, Address, Phone) consistent everywhere.

## Phase 9 — Language Toggle → Footer

Move Hindi/English switch from navbar into footer.

---

## Technical notes (for reference)

- Stack stays React 18 + Vite + Tailwind + react-router-dom + react-helmet-async + GSAP.
- Splash uses a single mounted overlay component with `sessionStorage` flag so it only shows once per session (or first ever — your choice).
- Cookie: `als_visitor=1; max-age=31536000; path=/; SameSite=Lax`.
- Blog content stored in `src/data/articles.json`; sitemap generator reads it.
- Image conversion done via `lovable-assets` CDN (already available) → WebP versions uploaded, originals kept for fallback.
- No backend schema changes needed; appointment + contact reuse existing edge function.

---

## Suggested execution order

I recommend shipping **Phase 1 + Phase 2 + Phase 3 first** (foundation, nav, perf — highest SEO impact), verify in preview, then continue with Phase 4–9 in a follow-up turn. Trying to do all 9 phases in one shot will produce a giant unreviewable diff and likely break things.

**Please confirm:**
1. Proceed with Phases 1–3 now, then 4–9 next? (recommended) — or do you want a different grouping?
2. Splash screen: show on **every** session, or only the **very first** visit ever?
3. For the new AI-generated hero banner — do you want me to use your current `DR_logo.jpg` as the doctor reference, or generate a fresh stylized doctor illustration?
