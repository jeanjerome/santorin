// The user's accommodation ("Maison"). Stored on the device via localStorage so
// it survives reloads and works fully offline; it is never sent anywhere.

import type { Poi } from "./poi";

export interface HomeLocation {
  lat: number;
  lon: number;
  label: string;
}

const KEY = "santorin.home.v1";

export function getHome(): HomeLocation | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as Partial<HomeLocation>;
    if (typeof o.lat !== "number" || typeof o.lon !== "number") return null;
    if (!Number.isFinite(o.lat) || !Number.isFinite(o.lon)) return null;
    const label = typeof o.label === "string" && o.label ? o.label : "Ma location";
    return { lat: o.lat, lon: o.lon, label };
  } catch {
    return null;
  }
}

export function saveHome(home: HomeLocation): void {
  localStorage.setItem(KEY, JSON.stringify(home));
}

export function clearHome(): void {
  localStorage.removeItem(KEY);
}

/** Adapt the home location to the POI shape so it reuses markers and the sheet. */
export function homeToPoi(home: HomeLocation): Poi & { lat: number; lon: number } {
  return {
    id: "home",
    name: home.label,
    label: home.label,
    category: "Maison",
    address: "Ma location à Santorin",
    lat: home.lat,
    lon: home.lon,
    source: null,
    sourceNote: null,
    pictogram: "home",
    photo: null,
    rating: null,
    info: null,
  };
}
