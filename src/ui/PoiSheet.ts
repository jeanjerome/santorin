import type { Poi } from "../data/poi";
import { isLocated } from "../data/poi";
import { categoryMeta } from "../data/categories";
import { navOptions } from "../lib/navLinks";

// Bottom sheet showing a POI's details and the navigation hand-off. The primary
// action per app is "Itinéraire" (turn-by-turn); a secondary row lets you just
// view the pin. POIs without coordinates show their source note instead.

export class PoiSheet {
  private readonly backdrop: HTMLElement;
  private readonly sheet: HTMLElement;

  constructor(root: HTMLElement) {
    this.backdrop = document.createElement("div");
    this.backdrop.className = "sheet-backdrop";
    this.backdrop.hidden = true;
    this.backdrop.addEventListener("click", () => this.close());

    this.sheet = document.createElement("section");
    this.sheet.className = "sheet";
    this.sheet.setAttribute("role", "dialog");
    this.sheet.setAttribute("aria-modal", "true");

    root.append(this.backdrop, this.sheet);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
  }

  open(poi: Poi): void {
    const meta = categoryMeta(poi.category);
    this.sheet.style.setProperty("--sheet-color", meta.color);
    this.sheet.setAttribute("aria-label", poi.name);
    this.sheet.replaceChildren(this.body(poi, meta.label, meta.glyph));

    this.backdrop.hidden = false;
    // Force a frame so the transition runs from the off-screen state.
    requestAnimationFrame(() => {
      this.backdrop.classList.add("is-open");
      this.sheet.classList.add("is-open");
    });
  }

  close(): void {
    this.backdrop.classList.remove("is-open");
    this.sheet.classList.remove("is-open");
    const onEnd = (): void => {
      this.backdrop.hidden = true;
      this.sheet.removeEventListener("transitionend", onEnd);
    };
    this.sheet.addEventListener("transitionend", onEnd);
  }

  private body(poi: Poi, categoryLabel: string, glyph: string): DocumentFragment {
    const frag = document.createDocumentFragment();

    const handle = el("div", "sheet__handle");
    handle.setAttribute("aria-hidden", "true");

    const category = el("span", "sheet__category", `${glyph} ${categoryLabel}`);
    const title = el("h2", "sheet__title", poi.name);
    const address = el("p", "sheet__address", poi.address);

    frag.append(handle, category, title, address);

    if (isLocated(poi)) {
      frag.append(
        el("p", "sheet__section-label", "Lancer l'itinéraire"),
        this.navGrid(poi),
        this.viewRow(poi),
      );
    } else {
      const note =
        poi.sourceNote ??
        "Coordonnées GPS non disponibles pour ce lieu. Recherchez-le par son nom dans votre application de navigation.";
      frag.append(el("p", "sheet__note", note));
      frag.append(this.searchRow(poi));
    }

    if (poi.source) {
      const src = document.createElement("a");
      src.className = "sheet__link";
      src.href = poi.source;
      src.target = "_blank";
      src.rel = "noopener noreferrer";
      src.textContent = "Voir la source";
      const row = el("div", "sheet__secondary");
      row.appendChild(src);
      frag.appendChild(row);
    }

    return frag;
  }

  private navGrid(poi: Poi & { lat: number; lon: number }): HTMLElement {
    const grid = el("div", "nav-grid");
    const options = navOptions({ lat: poi.lat, lon: poi.lon, label: poi.label });
    for (const opt of options) {
      const a = document.createElement("a");
      a.className = "nav-btn nav-btn--primary";
      a.href = opt.directions;
      a.rel = "noopener";
      a.innerHTML = `<span class="nav-btn__glyph" aria-hidden="true">${opt.glyph}</span>${opt.label}`;
      grid.appendChild(a);
    }
    return grid;
  }

  private viewRow(poi: Poi & { lat: number; lon: number }): HTMLElement {
    const row = el("div", "sheet__secondary");
    const options = navOptions({ lat: poi.lat, lon: poi.lon, label: poi.label });
    for (const opt of options) {
      const a = document.createElement("a");
      a.className = "sheet__link";
      a.href = opt.view;
      a.rel = "noopener";
      a.textContent = `Voir · ${opt.label}`;
      row.appendChild(a);
    }
    return row;
  }

  private searchRow(poi: Poi): HTMLElement {
    // No coordinates: offer a name search in each app instead.
    const row = el("div", "sheet__secondary");
    const q = encodeURIComponent(`${poi.name} Santorin`);
    const links: Array<[string, string]> = [
      ["Apple", `https://maps.apple.com/?q=${q}`],
      ["Google", `https://www.google.com/maps/search/?api=1&query=${q}`],
      ["Waze", `https://waze.com/ul?q=${q}`],
    ];
    for (const [label, href] of links) {
      const a = document.createElement("a");
      a.className = "sheet__link";
      a.href = href;
      a.rel = "noopener";
      a.textContent = `Chercher · ${label}`;
      row.appendChild(a);
    }
    return row;
  }
}

function el(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
