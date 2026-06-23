// POI domain model and loader. The seed lives at /data/pois.json (produced by
// scripts/build-seed.mjs) so the service worker can cache it for offline use.

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
}

/** A POI guaranteed to carry coordinates — safe to place on the map. */
export type LocatedPoi = Poi & { lat: number; lon: number };

export function isLocated(poi: Poi): poi is LocatedPoi {
  return typeof poi.lat === "number" && typeof poi.lon === "number";
}

// The seed is a plain array of objects shaped like Poi. We still validate at the
// boundary because the file is generated and could drift.
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
