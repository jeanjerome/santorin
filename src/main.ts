import L from "leaflet";
import "./styles/global.css";
import { loadPois, isLocated, type Poi } from "./data/poi";
import { createMap } from "./map/createMap";
import { createMarker, type MarkerHandle } from "./map/markers";
import { FilterBar } from "./ui/FilterBar";
import { PoiList } from "./ui/PoiList";
import { PoiSheet } from "./ui/PoiSheet";

// Application wiring: load the POI seed, draw markers, and keep the map markers,
// the list view, and the category filter in sync from a single source of truth.

function requireEl<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Élément #${id} introuvable`);
  return node as T;
}

function showBanner(message: string): void {
  const banner = document.createElement("div");
  banner.className = "banner banner--error";
  banner.setAttribute("role", "alert");
  banner.textContent = message;
  requireEl("map").appendChild(banner);
}

async function bootstrap(): Promise<void> {
  const mapEl = requireEl("map");
  const listEl = requireEl<HTMLElement>("list");
  const filterEl = requireEl("filter-bar");
  const sheetRoot = requireEl("sheet-root");
  const toggle = requireEl<HTMLButtonElement>("view-toggle");

  const sheet = new PoiSheet(sheetRoot);

  let pois: Poi[];
  try {
    pois = await loadPois();
  } catch (err) {
    showBanner(
      err instanceof Error ? err.message : "Erreur de chargement des lieux.",
    );
    return;
  }

  const map = await createMap(mapEl);

  // Build one marker per located POI; keep handles so filtering can add/remove
  // them from a layer group without rebuilding.
  const layer = L.layerGroup().addTo(map);
  const handles: MarkerHandle[] = pois
    .filter(isLocated)
    .map((poi) => createMarker(poi, (p) => sheet.open(p)));

  const filterBar = new FilterBar(filterEl, applyFilter);
  filterBar.render(pois);

  const list = new PoiList(listEl, (p) => sheet.open(p));

  function visiblePois(): Poi[] {
    const active = filterBar.activeCategories;
    return pois.filter((p) => active.has(p.category));
  }

  function applyFilter(active: ReadonlySet<string>): void {
    layer.clearLayers();
    for (const handle of handles) {
      if (active.has(handle.poi.category)) {
        handle.marker.addTo(layer);
      }
    }
    list.render(visiblePois());
  }

  // Initial paint.
  applyFilter(filterBar.activeCategories);

  // List / map toggle.
  let listMode = false;
  toggle.addEventListener("click", () => {
    listMode = !listMode;
    toggle.setAttribute("aria-pressed", String(listMode));
    toggle.textContent = listMode ? "Carte" : "Liste";
    listEl.hidden = !listMode;
    if (!listMode) map.invalidateSize();
  });
}

void bootstrap();
