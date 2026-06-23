// POI domain model and loader. The seed lives at /data/pois.json (produced by
// scripts/build-seed.mjs) so the service worker can cache it for offline use.

export interface PoiHours {
  /** Day or day range, e.g. "Lun–Sam" or "Tous les jours". */
  readonly day: string;
  /** Opening window or status, e.g. "08:00–21:00" or "Fermé". */
  readonly value: string;
}

// Type-specific useful info. Every field is optional; the sheet renders only
// what is present, so different categories surface different things.
export interface PoiInfo {
  readonly hours?: PoiHours[];
  readonly phone?: string;
  readonly priceRange?: string;
  readonly ticket?: string;
  readonly tags?: string[];
  readonly tip?: string;
}

export interface Poi {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly category: string;
  readonly address: string;
  readonly lat: number | null;
  readonly lon: number | null;
  readonly source: string | null;
  readonly sourceNote: string | null;
  readonly pictogram: string;
  /** Photo filename (resolved under /photos/) or absolute URL; null = none. */
  readonly photo: string | null;
  /** Recommendation rating from 0 to 5, or null. */
  readonly rating: number | null;
  readonly info: PoiInfo | null;
}

/** A POI guaranteed to carry coordinates — safe to place on the map. */
export type LocatedPoi = Poi & { lat: number; lon: number };

export function isLocated(poi: Poi): poi is LocatedPoi {
  return typeof poi.lat === "number" && typeof poi.lon === "number";
}

// The seed is generated, so we validate at the boundary in case it drifts.
interface RawPoi {
  id?: unknown;
  name?: unknown;
  label?: unknown;
  category?: unknown;
  address?: unknown;
  lat?: unknown;
  lon?: unknown;
  source?: unknown;
  sourceNote?: unknown;
  pictogram?: unknown;
  photo?: unknown;
  rating?: unknown;
  info?: unknown;
}

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function strOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function numOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function ratingOrNull(value: unknown): number | null {
  const n = numOrNull(value);
  if (n === null) return null;
  return Math.min(5, Math.max(0, n));
}

function strArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out = value.filter((v): v is string => typeof v === "string" && v.length > 0);
  return out.length > 0 ? out : undefined;
}

function parseHours(value: unknown): PoiHours[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out: PoiHours[] = [];
  for (const item of value) {
    if (item && typeof item === "object") {
      const day = str((item as Record<string, unknown>).day);
      const val = str((item as Record<string, unknown>).value);
      if (day && val) out.push({ day, value: val });
    }
  }
  return out.length > 0 ? out : undefined;
}

function parseInfo(value: unknown): PoiInfo | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const info: PoiInfo = {
    hours: parseHours(raw.hours),
    phone: strOrNull(raw.phone) ?? undefined,
    priceRange: strOrNull(raw.priceRange) ?? undefined,
    ticket: strOrNull(raw.ticket) ?? undefined,
    tags: strArray(raw.tags),
    tip: strOrNull(raw.tip) ?? undefined,
  };
  // Drop the object entirely if nothing useful survived validation.
  const hasAny = Object.values(info).some((v) => v !== undefined);
  return hasAny ? info : null;
}

function normalize(raw: RawPoi, index: number): Poi {
  const name = str(raw.name, "Sans nom");
  return {
    id: str(raw.id) || `poi-${index}`,
    name,
    label: str(raw.label, name),
    category: str(raw.category, "Autre"),
    address: str(raw.address, "Adresse non précisée"),
    lat: numOrNull(raw.lat),
    lon: numOrNull(raw.lon),
    source: strOrNull(raw.source),
    sourceNote: strOrNull(raw.sourceNote),
    pictogram: str(raw.pictogram, "marker"),
    photo: strOrNull(raw.photo),
    rating: ratingOrNull(raw.rating),
    info: parseInfo(raw.info),
  };
}

export async function loadPois(signal?: AbortSignal): Promise<Poi[]> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/pois.json`, { signal });
  if (!res.ok) {
    throw new Error(`Impossible de charger les lieux (HTTP ${res.status})`);
  }
  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Le fichier des lieux est invalide.");
  }
  return data.map((item, i) => normalize(item as RawPoi, i));
}
