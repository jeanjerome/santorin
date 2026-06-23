import { getHome, saveHome, clearHome, type HomeLocation } from "../data/home";

// Full-screen configuration page where the user enters the GPS coordinates of
// their accommodation, either by hand or by capturing the phone's current
// position. Changes are reported through onChange so the map can refresh.

const SANTORINI = { minLat: 36.3, maxLat: 36.5, minLon: 25.3, maxLon: 25.54 };

export class SettingsPage {
  private readonly backdrop: HTMLElement;
  private readonly page: HTMLElement;
  private readonly latInput: HTMLInputElement;
  private readonly lonInput: HTMLInputElement;
  private readonly nameInput: HTMLInputElement;
  private readonly message: HTMLElement;
  private readonly clearBtn: HTMLButtonElement;

  constructor(
    root: HTMLElement,
    private readonly onChange: (home: HomeLocation | null) => void,
  ) {
    this.backdrop = div("settings-backdrop");
    this.backdrop.hidden = true;
    this.backdrop.addEventListener("click", () => this.close());

    this.page = document.createElement("section");
    this.page.className = "settings";
    this.page.setAttribute("role", "dialog");
    this.page.setAttribute("aria-modal", "true");
    this.page.setAttribute("aria-label", "Configuration");

    this.latInput = numberField("Latitude", "36.4153");
    this.lonInput = numberField("Longitude", "25.4344");
    this.nameInput = textField("Nom (optionnel)", "Ma location");
    this.message = div("settings__msg");
    this.message.hidden = true;
    this.clearBtn = button("Effacer", "settings__btn settings__btn--ghost");

    this.page.append(this.buildBar(), this.buildBody());
    root.append(this.backdrop, this.page);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.backdrop.hidden) this.close();
    });
  }

  open(): void {
    const home = getHome();
    this.latInput.value = home ? String(home.lat) : "";
    this.lonInput.value = home ? String(home.lon) : "";
    this.nameInput.value = home?.label ?? "";
    this.clearBtn.hidden = !home;
    this.hideMessage();

    this.backdrop.hidden = false;
    requestAnimationFrame(() => {
      this.backdrop.classList.add("is-open");
      this.page.classList.add("is-open");
    });
  }

  close(): void {
    this.backdrop.classList.remove("is-open");
    this.page.classList.remove("is-open");
    const onEnd = (): void => {
      this.backdrop.hidden = true;
      this.page.removeEventListener("transitionend", onEnd);
    };
    this.page.addEventListener("transitionend", onEnd);
  }

  private buildBar(): HTMLElement {
    const bar = div("settings__bar");
    const title = document.createElement("h2");
    title.className = "settings__title";
    title.textContent = "Configuration";
    const close = button("Fermer", "settings__close");
    close.setAttribute("aria-label", "Fermer la configuration");
    close.addEventListener("click", () => this.close());
    bar.append(title, close);
    return bar;
  }

  private buildBody(): HTMLElement {
    const body = div("settings__body");

    const intro = document.createElement("p");
    intro.className = "settings__intro";
    intro.textContent =
      "Coordonnées GPS de ton logement à Santorin. Le bouton Maison de la carte pointera dessus.";

    const locateBtn = button(
      "📍 Utiliser ma position actuelle",
      "settings__btn settings__btn--locate",
    );
    locateBtn.addEventListener("click", () => this.useCurrentPosition(locateBtn));

    const help = document.createElement("p");
    help.className = "settings__help";
    help.textContent =
      "Astuce : dans Apple Plans ou Google Maps, appuie longuement sur ton logement, puis copie les coordonnées et colle-les ici.";

    const actions = div("settings__actions");
    const save = button("Enregistrer", "settings__btn settings__btn--primary");
    save.addEventListener("click", () => this.save());
    this.clearBtn.addEventListener("click", () => this.clear());
    actions.append(save, this.clearBtn);

    body.append(
      intro,
      locateBtn,
      fieldRow(this.latInput, this.lonInput),
      this.nameInput.closest(".settings__field") ?? this.nameInput,
      this.message,
      help,
      actions,
    );
    return body;
  }

  private useCurrentPosition(btn: HTMLButtonElement): void {
    if (!("geolocation" in navigator)) {
      this.showMessage("La géolocalisation n'est pas disponible.", "error");
      return;
    }
    btn.disabled = true;
    btn.textContent = "Localisation…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.latInput.value = pos.coords.latitude.toFixed(6);
        this.lonInput.value = pos.coords.longitude.toFixed(6);
        this.showMessage("Position récupérée. Pense à enregistrer.", "ok");
        btn.disabled = false;
        btn.textContent = "📍 Utiliser ma position actuelle";
      },
      (err) => {
        this.showMessage(`Position indisponible : ${err.message}`, "error");
        btn.disabled = false;
        btn.textContent = "📍 Utiliser ma position actuelle";
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  private save(): void {
    const lat = parseCoord(this.latInput.value);
    const lon = parseCoord(this.lonInput.value);
    if (lat === null || lon === null) {
      this.showMessage("Entre une latitude et une longitude valides.", "error");
      return;
    }
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      this.showMessage("Coordonnées hors limites.", "error");
      return;
    }
    const label = this.nameInput.value.trim() || "Ma location";
    const home: HomeLocation = { lat, lon, label };
    saveHome(home);
    this.onChange(home);

    const outside =
      lat < SANTORINI.minLat ||
      lat > SANTORINI.maxLat ||
      lon < SANTORINI.minLon ||
      lon > SANTORINI.maxLon;
    if (outside) {
      this.showMessage("Enregistré — attention, ce point est hors de Santorin.", "warn");
    } else {
      this.close();
    }
  }

  private clear(): void {
    clearHome();
    this.onChange(null);
    this.close();
  }

  private showMessage(text: string, kind: "ok" | "warn" | "error"): void {
    this.message.textContent = text;
    this.message.className = `settings__msg settings__msg--${kind}`;
    this.message.hidden = false;
  }

  private hideMessage(): void {
    this.message.hidden = true;
  }
}

// Coordinates may be pasted with a French decimal comma; normalize to a dot.
function parseCoord(value: string): number | null {
  const n = parseFloat(value.trim().replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function div(className: string): HTMLElement {
  const node = document.createElement("div");
  node.className = className;
  return node;
}

function button(label: string, className: string): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.className = className;
  b.textContent = label;
  return b;
}

function labelledField(
  labelText: string,
  input: HTMLInputElement,
): HTMLLabelElement {
  const field = document.createElement("label");
  field.className = "settings__field";
  const span = document.createElement("span");
  span.className = "settings__field-label";
  span.textContent = labelText;
  field.append(span, input);
  return field;
}

function numberField(labelText: string, placeholder: string): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "decimal";
  input.autocomplete = "off";
  input.placeholder = placeholder;
  input.className = "settings__input";
  labelledField(labelText, input); // wraps input in a .settings__field label
  return input;
}

function textField(labelText: string, placeholder: string): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.className = "settings__input";
  labelledField(labelText, input);
  return input;
}

function fieldRow(a: HTMLInputElement, b: HTMLInputElement): HTMLElement {
  const row = div("settings__row");
  const fa = a.closest(".settings__field");
  const fb = b.closest(".settings__field");
  if (fa) row.appendChild(fa);
  if (fb) row.appendChild(fb);
  return row;
}
