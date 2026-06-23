import type { Poi, PoiInfo } from "../data/poi";
import { isLocated } from "../data/poi";
import { categoryMeta } from "../data/categories";
import { navOptions } from "../lib/navLinks";

// Bottom sheet showing a POI: a photo (or a category placeholder), a star
// rating, type-specific useful info (opening hours, price, phone, tags…), and a
// compact navigation hand-off (directions only). POIs without coordinates fall
// back to a name search in each app.

function photoUrl(poi: Poi): string | null {
  if (!poi.photo) return null;
  if (/^https?:\/\//.test(poi.photo)) return poi.photo;
  return `${import.meta.env.BASE_URL}photos/${poi.photo}`;
}

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
    this.sheet.replaceChildren(this.photo(poi, meta.glyph), this.content(poi, meta.label, meta.glyph));

    this.backdrop.hidden = false;
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

  private photo(poi: Poi, glyph: string): HTMLElement {
    const wrap = el("div", "sheet__photo");
    const handle = el("div", "sheet__handle");
    handle.setAttribute("aria-hidden", "true");

    const url = photoUrl(poi);
    if (url) {
      const img = document.createElement("img");
      img.className = "sheet__photo-img";
      img.src = url;
      img.alt = poi.name;
      img.loading = "eager";
      // If the file is missing, fall back to the placeholder glyph.
      img.addEventListener("error", () => {
        img.remove();
        wrap.classList.add("sheet__photo--placeholder");
        wrap.appendChild(placeholderGlyph(glyph));
      });
      wrap.appendChild(img);
    } else {
      wrap.classList.add("sheet__photo--placeholder");
      wrap.appendChild(placeholderGlyph(glyph));
    }
    wrap.appendChild(handle);
    return wrap;
  }

  private content(poi: Poi, categoryLabel: string, glyph: string): HTMLElement {
    const content = el("div", "sheet__content");

    const header = el("div", "sheet__header");
    header.appendChild(el("span", "sheet__category", `${glyph} ${categoryLabel}`));
    if (poi.rating !== null) header.appendChild(ratingEl(poi.rating));
    content.appendChild(header);

    content.appendChild(el("h2", "sheet__title", poi.name));
    content.appendChild(el("p", "sheet__address", poi.address));

    if (poi.info) content.appendChild(infoBlock(poi.info));

    if (isLocated(poi)) {
      content.appendChild(el("p", "sheet__section-label", "Itinéraire"));
      content.appendChild(this.navGrid(poi));
    } else {
      const note =
        poi.sourceNote ??
        "Coordonnées GPS non disponibles. Recherche ce lieu par son nom dans ton application de navigation.";
      content.appendChild(el("p", "sheet__note", note));
      content.appendChild(this.searchRow(poi));
    }

    if (poi.source) {
      const src = document.createElement("a");
      src.className = "sheet__source";
      src.href = poi.source;
      src.target = "_blank";
      src.rel = "noopener noreferrer";
      src.textContent = "Voir la source";
      content.appendChild(src);
    }

    return content;
  }

  private navGrid(poi: Poi & { lat: number; lon: number }): HTMLElement {
    const grid = el("div", "nav-grid");
    for (const opt of navOptions({ lat: poi.lat, lon: poi.lon, label: poi.label })) {
      const a = document.createElement("a");
      a.className = "nav-btn";
      a.href = opt.directions;
      a.rel = "noopener";
      a.innerHTML = `<span class="nav-btn__glyph" aria-hidden="true">${opt.glyph}</span>${opt.label}`;
      grid.appendChild(a);
    }
    return grid;
  }

  private searchRow(poi: Poi): HTMLElement {
    const row = el("div", "nav-grid");
    const q = encodeURIComponent(`${poi.name} Santorin`);
    const links: Array<[string, string, string]> = [
      ["🍎", "Apple", `https://maps.apple.com/?q=${q}`],
      ["🗺️", "Google", `https://www.google.com/maps/search/?api=1&query=${q}`],
      ["🚗", "Waze", `https://waze.com/ul?q=${q}`],
    ];
    for (const [glyph, label, href] of links) {
      const a = document.createElement("a");
      a.className = "nav-btn";
      a.href = href;
      a.rel = "noopener";
      a.innerHTML = `<span class="nav-btn__glyph" aria-hidden="true">${glyph}</span>${label}`;
      row.appendChild(a);
    }
    return row;
  }
}

function infoBlock(info: PoiInfo): HTMLElement {
  const block = el("div", "info");

  const meta = el("div", "info__meta");
  if (info.priceRange) meta.appendChild(el("span", "info__pill", info.priceRange));
  if (info.ticket) meta.appendChild(el("span", "info__pill", `🎟️ ${info.ticket}`));
  if (info.phone) {
    const a = document.createElement("a");
    a.className = "info__pill info__pill--link";
    a.href = `tel:${info.phone.replace(/\s+/g, "")}`;
    a.textContent = `📞 ${info.phone}`;
    meta.appendChild(a);
  }
  if (meta.childElementCount > 0) block.appendChild(meta);

  if (info.tags && info.tags.length > 0) {
    const tags = el("div", "info__tags");
    for (const t of info.tags) tags.appendChild(el("span", "info__tag", t));
    block.appendChild(tags);
  }

  if (info.hours && info.hours.length > 0) {
    block.appendChild(el("p", "info__label", "Horaires"));
    const table = el("dl", "info__hours");
    for (const h of info.hours) {
      table.appendChild(el("dt", "info__day", h.day));
      table.appendChild(el("dd", "info__time", h.value));
    }
    block.appendChild(table);
  }

  if (info.tip) block.appendChild(el("p", "info__tip", info.tip));

  return block;
}

function ratingEl(rating: number): HTMLElement {
  const wrap = el("div", "rating");
  wrap.setAttribute("aria-label", `Note ${rating.toFixed(1)} sur 5`);
  const stars = el("span", "rating__stars");
  stars.appendChild(el("span", "rating__track", "★★★★★"));
  const fill = el("span", "rating__fill", "★★★★★");
  fill.style.width = `${(rating / 5) * 100}%`;
  stars.appendChild(fill);
  wrap.append(stars, el("span", "rating__value", rating.toFixed(1)));
  return wrap;
}

function placeholderGlyph(glyph: string): HTMLElement {
  const span = el("span", "sheet__photo-glyph", glyph);
  span.setAttribute("aria-hidden", "true");
  return span;
}

function el(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
