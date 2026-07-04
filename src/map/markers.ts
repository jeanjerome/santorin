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
  /** Trail polyline (with white casing) for POIs carrying a route, else null. */
  route: L.FeatureGroup | null;
}

// Draw the itinerary as a colored line over a translucent white casing so it
// stays legible on the busy OSM basemap. Tapping the line opens the same sheet.
function routeLayer(
  poi: LocatedPoi,
  color: string,
  onSelect: (poi: LocatedPoi) => void,
): L.FeatureGroup | null {
  if (!poi.route) return null;
  const latlngs = poi.route.map(([lat, lon]) => L.latLng(lat, lon));
  const casing = L.polyline(latlngs, {
    color: "#ffffff",
    weight: 7,
    opacity: 0.7,
    lineJoin: "round",
    lineCap: "round",
  });
  const line = L.polyline(latlngs, {
    color,
    weight: 4,
    opacity: 0.95,
    lineJoin: "round",
    lineCap: "round",
  });
  const group = L.featureGroup([casing, line]);
  group.on("click", () => onSelect(poi));
  return group;
}

/** Build a Leaflet marker for a located POI, invoking `onSelect` on tap. */
export function createMarker(
  poi: LocatedPoi,
  onSelect: (poi: LocatedPoi) => void,
): MarkerHandle {
  const meta = categoryMeta(poi.category);
  const marker = L.marker([poi.lat, poi.lon], {
    icon: icon(poi),
    title: poi.name,
    keyboard: true,
    alt: poi.name,
  });
  marker.on("click", () => onSelect(poi));
  return { poi, marker, route: routeLayer(poi, meta.color, onSelect) };
}
