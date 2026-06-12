import type { LocationPageData } from "./_types";

// Auto-discover every location content file in this folder.
// Drop a new `<slug>.ts` next to this file (default-export a LocationPageData)
// and it will appear automatically on /locations and in the sitemap.
const modules = import.meta.glob<{ default: LocationPageData }>("./*.ts", {
  eager: true,
});

export const locations: LocationPageData[] = Object.entries(modules)
  .filter(([path]) => !path.includes("_"))
  .map(([, mod]) => mod.default)
  .sort((a, b) => a.h1.localeCompare(b.h1));

export const locationsBySlug: Record<string, LocationPageData> = Object.fromEntries(
  locations.map((l) => [l.slug, l])
);
