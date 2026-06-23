import L from "leaflet";
import { leafletLayer } from "protomaps-leaflet";

// The basemap is offline-first. When a bundled vector archive is present at
// /basemap/santorini.pmtiles we render it with protomaps (no network needed
// once cached). Otherwise we fall back to OpenStreetMap raster tiles, which
// keeps the app usable immediately and while online.

const PMTILES_URL = `${import.meta.env.BASE_URL}basemap/santorini.pmtiles`;

// A dev/preview server answers missing files with the SPA fallback (index.html,
// HTTP 200), so a status check isn't enough. Read the first bytes and verify the
// PMTiles v3 magic signature ("PMTiles") to confirm a real archive is present.
async function hasBundledBasemap(): Promise<boolean> {
  try {
    const res = await fetch(PMTILES_URL, { headers: { Range: "bytes=0-6" } });
    if (!res.ok) return false;
    const bytes = new Uint8Array(await res.arrayBuffer());
    const magic = String.fromCharCode(...bytes.slice(0, 7));
    return magic === "PMTiles";
  } catch {
    return false;
  }
}

function rasterLayer(): L.Layer {
  return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });
}

function vectorLayer(): L.Layer {
  // protomaps-leaflet ships ready-made themes; "light" suits the sandy palette.
  return leafletLayer({
    url: PMTILES_URL,
    theme: "light",
    lang: "fr",
    attribution: "© OpenStreetMap · Protomaps",
  }) as unknown as L.Layer;
}

/** Resolve the best available basemap layer for the current environment. */
export async function createBasemap(): Promise<L.Layer> {
  return (await hasBundledBasemap()) ? vectorLayer() : rasterLayer();
}
