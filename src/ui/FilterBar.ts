import { CATEGORIES } from "../data/categories";
import type { Poi } from "../data/poi";

// Horizontal scroll of category chips. Tapping a chip toggles its category.
// On startup only beaches are shown; the user opts other categories in.
const DEFAULT_ACTIVE = ["Plage"];

export class FilterBar {
  private readonly active = new Set<string>(DEFAULT_ACTIVE);
  private readonly chips = new Map<string, HTMLButtonElement>();

  constructor(
    private readonly root: HTMLElement,
    private readonly onChange: (active: ReadonlySet<string>) => void,
  ) {}

  render(pois: readonly Poi[]): void {
    const counts = new Map<string, number>();
    for (const poi of pois) {
      counts.set(poi.category, (counts.get(poi.category) ?? 0) + 1);
    }

    this.root.replaceChildren();
    for (const cat of CATEGORIES) {
      const count = counts.get(cat.key) ?? 0;
      if (count === 0) continue;

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.style.setProperty("--chip-color", cat.color);
      chip.setAttribute("aria-pressed", String(this.active.has(cat.key)));
      chip.innerHTML = `<span aria-hidden="true">${cat.glyph}</span> ${cat.label} <span class="chip__count">${count}</span>`;
      chip.addEventListener("click", () => this.toggle(cat.key));

      this.chips.set(cat.key, chip);
      this.root.appendChild(chip);
    }
  }

  private toggle(key: string): void {
    if (this.active.has(key)) {
      this.active.delete(key);
    } else {
      this.active.add(key);
    }
    const chip = this.chips.get(key);
    chip?.setAttribute("aria-pressed", String(this.active.has(key)));
    this.onChange(this.active);
  }

  get activeCategories(): ReadonlySet<string> {
    return this.active;
  }
}
