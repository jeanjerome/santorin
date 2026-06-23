import L from "leaflet";

// Raster basemap from OpenStreetMap. Tiles are cached at runtime by the service
// worker (see vite.config.ts), so map areas already viewed stay available
// offline; the app shell and the POI data are precached for full offline use.
export function createBasemap(): L.Layer {
  return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });
}
