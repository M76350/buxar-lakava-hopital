// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Location slugs are auto-discovered from src/content/locations/*.ts so adding a new
// location page = adding one file (no edits needed here).
import { writeFileSync, readdirSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://adhunik-lakva-polio-hospital-gitana.vercel.app";

const today = new Date().toISOString().slice(0, 10);

const staticEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/doctors", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "weekly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/locations", changefreq: "weekly", priority: "0.8" },
];

// Auto-discover location slugs from src/content/locations
let locationSlugs = [];
try {
  locationSlugs = readdirSync(resolve("src/content/locations"))
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
    .map((f) => f.replace(/\.ts$/, ""));
} catch {
  // folder may not exist yet on first run
}

const locationEntries = locationSlugs.map((slug) => ({
  path: `/locations/${slug}`,
  changefreq: "monthly",
  priority: "0.85",
}));

const entries = [...staticEntries, ...locationEntries];

function generateSitemap(entries) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
