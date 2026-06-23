import L from "leaflet";
import { createBasemap } from "./basemap";

// Santorin sits inside this bounding box; we lock panning to it and frame the
// caldera on first load.
const SANTORINI_CENTER: L.LatLngTuple = [36.405, 25.44];
const SANTORINI_BOUNDS = L.latLngBounds([36.32, 25.32], [36.48, 25.52]);

export async function createMap(container: HTMLElement): Promise<L.Map> {
  const map = L.map(container, {
    center: SANTORINI_CENTER,
    zoom: 11,
    minZoom: 10,
    maxZoom: 18,
    zoomControl: false,
    maxBounds: SANTORINI_BOUNDS.pad(0.25),
    maxBoundsViscosity: 0.8,
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);

  const basemap = await createBasemap();
  basemap.addTo(map);

  return map;
}

export { SANTORINI_BOUNDS };
