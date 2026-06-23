#!/usr/bin/env node
// Transform the source GeoJSON corpus into the flat POI seed the app fetches at
// runtime. Coordinates are read from the geometry when present, falling back to
// the `gps` property; POIs with neither stay in the seed (lat/lon = null) so the
// list view can still surface them.

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, "data/santorini-corpus-restreint.geojson");
const OUT = resolve(ROOT, "public/data/pois.json");
const PHOTOS_DIR = resolve(ROOT, "public/photos");

// Map of poi id -> photo filename, built by scanning public/photos. Lets the
// user drop "<id>.jpg" into that folder and have it picked up automatically.
async function scanPhotos() {
  const byId = new Map();
  let files = [];
  try {
    files = await readdir(PHOTOS_DIR);
  } catch {
    return byId; // folder may not exist yet
  }
  for (const file of files) {
    if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;
    const id = file.replace(/\.[^.]+$/, "");
    byId.set(id, file);
  }
  return byId;
}

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function coordsOf(feature) {
  const geom = feature.geometry;
  if (geom && geom.type === "Point" && Array.isArray(geom.coordinates)) {
    const [lon, lat] = geom.coordinates;
    if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
  }
  const gps = feature.properties?.gps;
  if (gps && Number.isFinite(gps.lat) && Number.isFinite(gps.lon)) {
    return { lat: gps.lat, lon: gps.lon };
  }
  return { lat: null, lon: null };
}

async function main() {
  const raw = JSON.parse(await readFile(SOURCE, "utf8"));
  const features = Array.isArray(raw.features) ? raw.features : [];
  const photos = await scanPhotos();

  const seen = new Map();
  const pois = features.map((feature, index) => {
    const p = feature.properties ?? {};
    const { lat, lon } = coordsOf(feature);
    const name = p.name ?? "Sans nom";

    let id = slug(name) || `poi-${index}`;
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    // Explicit photo in the corpus wins; otherwise pick up public/photos/<id>.*
    const photo = p.photo ?? photos.get(id) ?? null;

    return {
      id,
      name,
      label: p.label ?? name,
      category: p.category ?? "Autre",
      address: p.address ?? "Adresse non précisée",
      lat,
      lon,
      source: p.source ?? null,
      sourceNote: p.source_note ?? null,
      pictogram: p.pictogram ?? "marker",
      photo,
      rating: typeof p.rating === "number" ? p.rating : null,
      info: p.info ?? null,
    };
  });

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(pois, null, 2) + "\n", "utf8");

  const located = pois.filter((p) => p.lat !== null).length;
  const rated = pois.filter((p) => p.rating !== null).length;
  const withPhoto = pois.filter((p) => p.photo !== null).length;
  console.log(
    `Seed écrit : ${pois.length} lieux (${located} géolocalisés, ${rated} notés, ${withPhoto} avec photo) → ${OUT}`,
  );
}

main().catch((err) => {
  console.error("Échec du build du seed :", err);
  process.exit(1);
});
