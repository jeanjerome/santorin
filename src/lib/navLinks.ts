// Deep links that hand a destination off to the phone's navigation apps.
// On iOS these URLs open the native Apple Plans / Google Maps / Waze apps when
// installed, and fall back to the web otherwise.

export interface NavTarget {
  lat: number;
  lon: number;
  label: string;
}

export type NavApp = "apple" | "google" | "waze";

export interface NavOption {
  app: NavApp;
  label: string;
  glyph: string;
  /** Show the place on the map. */
  view: string;
  /** Start turn-by-turn directions to the place. */
  directions: string;
}

function coord(value: number): string {
  // Six decimals ≈ 11 cm precision, plenty for a destination pin.
  return value.toFixed(6);
}

export function navOptions(target: NavTarget): NavOption[] {
  const lat = coord(target.lat);
  const lon = coord(target.lon);
  const q = encodeURIComponent(target.label);

  return [
    {
      app: "apple",
      label: "Apple Plans",
      glyph: "🍎",
      view: `https://maps.apple.com/?q=${q}&ll=${lat},${lon}`,
      directions: `https://maps.apple.com/?daddr=${lat},${lon}&dirflg=d`,
    },
    {
      app: "google",
      label: "Google Maps",
      glyph: "🗺️",
      view: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
      directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    },
    {
      app: "waze",
      label: "Waze",
      glyph: "🚗",
      view: `https://waze.com/ul?ll=${lat},${lon}`,
      directions: `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`,
    },
  ];
}
