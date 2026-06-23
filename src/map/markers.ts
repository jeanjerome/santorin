import L from "leaflet";
import type { LocatedPoi } from "../data/poi";
import { categoryMeta } from "../data/categories";

// Markers are pure DOM (DivIcon) so each category renders its colored teardrop
// with its emoji glyph — no image sprites to ship or cache.

function icon(poi: LocatedPoi): L.DivIcon {
  const meta = categoryMeta(poi.category);
  return L.divIcon({
    className: "",
    html: `<div class="poi-marker" style="--marker-color:${meta.color}"><span>${meta.glyph}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
}

export interface MarkerHandle {
  poi: LocatedPoi;
  marker: L.Marker;
}

/** Build a Leaflet marker for a located POI, invoking `onSelect` on tap. */
export function createMarker(
  poi: LocatedPoi,
  onSelect: (poi: LocatedPoi) => void,
): MarkerHandle {
  const marker = L.marker([poi.lat, poi.lon], {
    icon: icon(poi),
    title: poi.name,
    keyboard: true,
    alt: poi.name,
  });
  marker.on("click", () => onSelect(poi));
  return { poi, marker };
}
