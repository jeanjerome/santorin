// Visual and semantic metadata for each POI category. Colors come from the
// Santorin-inspired palette in tokens.css; the emoji doubles as the map marker
// glyph so the app needs no per-category image assets.

export interface CategoryMeta {
  /** Stable key used for filtering; matches the `category` field in the seed. */
  key: string;
  /** Short human label shown in the filter bar. */
  label: string;
  /** Marker / chip accent color. */
  color: string;
  /** Glyph rendered inside markers and chips. */
  glyph: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: "Plage", label: "Plages", color: "#0e9594", glyph: "🏖️" },
  { key: "Supermarché", label: "Supermarchés", color: "#2e7d32", glyph: "🛒" },
  { key: "Restaurant", label: "Restaurants", color: "#d1495b", glyph: "🍽️" },
  { key: "Laverie", label: "Laveries", color: "#3a7ca5", glyph: "🫧" },
  { key: "Site culturel", label: "Sites culturels", color: "#7b5ea7", glyph: "🏛️" },
  { key: "Service pratique", label: "Services", color: "#6c757d", glyph: "🚌" },
];

const BY_KEY: ReadonlyMap<string, CategoryMeta> = new Map(
  CATEGORIES.map((c) => [c.key, c]),
);

const FALLBACK: CategoryMeta = {
  key: "Autre",
  label: "Autres",
  color: "#888888",
  glyph: "📍",
};

export function categoryMeta(key: string): CategoryMeta {
  return BY_KEY.get(key) ?? FALLBACK;
}
