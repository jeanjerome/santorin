import type { Poi } from "../data/poi";
import { isLocated } from "../data/poi";
import { CATEGORIES, categoryMeta } from "../data/categories";

// Scrollable list, grouped by category. It surfaces every POI — including those
// without coordinates, which never appear on the map — so nothing is hidden.

export class PoiList {
  constructor(
    private readonly root: HTMLElement,
    private readonly onSelect: (poi: Poi) => void,
  ) {}

  render(pois: readonly Poi[]): void {
    this.root.replaceChildren();

    const order = new Map(CATEGORIES.map((c, i) => [c.key, i]));
    const sorted = [...pois].sort((a, b) => {
      const ca = order.get(a.category) ?? 99;
      const cb = order.get(b.category) ?? 99;
      return ca - cb || a.name.localeCompare(b.name, "fr");
    });

    let currentCategory = "";
    for (const poi of sorted) {
      if (poi.category !== currentCategory) {
        currentCategory = poi.category;
        this.root.appendChild(
          headingFor(categoryMeta(poi.category).label),
        );
      }
      this.root.appendChild(this.card(poi));
    }

    if (sorted.length === 0) {
      const empty = document.createElement("p");
      empty.className = "poi-list__group-title";
      empty.textContent = "Aucun lieu pour ce filtre.";
      this.root.appendChild(empty);
    }
  }

  private card(poi: Poi): HTMLButtonElement {
    const meta = categoryMeta(poi.category);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "poi-card";
    btn.style.setProperty("--card-color", meta.color);

    const glyph = document.createElement("span");
    glyph.className = "poi-card__glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = meta.glyph;

    const bodyWrap = document.createElement("span");
    bodyWrap.className = "poi-card__body";
    const name = document.createElement("span");
    name.className = "poi-card__name";
    name.textContent = poi.name;
    const metaLine = document.createElement("span");
    metaLine.className = "poi-card__meta";
    metaLine.textContent = poi.address;
    bodyWrap.append(name, document.createElement("br"), metaLine);

    btn.append(glyph, bodyWrap);

    if (!isLocated(poi)) {
      const badge = document.createElement("span");
      badge.className = "poi-card__badge";
      badge.textContent = "Sans GPS";
      btn.appendChild(badge);
    }

    btn.addEventListener("click", () => this.onSelect(poi));
    return btn;
  }
}

function headingFor(label: string): HTMLElement {
  const h = document.createElement("h2");
  h.className = "poi-list__group-title";
  h.textContent = label;
  return h;
}
