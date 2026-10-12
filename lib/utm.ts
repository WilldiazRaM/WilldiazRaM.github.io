// Captura de UTMs del QR de la tarjeta física. Vive en sessionStorage (por pestaña).
const KEYS = ["utm_source", "utm_campaign", "utm_content"] as const;
export type Utm = Partial<Record<(typeof KEYS)[number], string>>;
const STORE = "kg_utm_v1";

const clean = (v: string | null | undefined) => (v ?? "").trim().slice(0, 100);

/** Llamar una vez al aterrizar (carga completa). Guarda los UTMs de la URL para el resto de la sesión. */
export function captureUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const k of KEYS) {
      const v = clean(q.get(k));
      if (v) found[k] = v;
    }
    if (Object.keys(found).length === 0) return;
    // Un enlace interno con UTMs no debe pisar el origen real (QR → /smart-id → /?utm_source=...).
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) return;
    sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {
    /* storage bloqueado: resolveUtm() cae a la URL actual */
  }
}

/** Origen para el payload: lo persistido manda (todo o nada); si no hay, lo que traiga la URL actual. */
export function resolveUtm(params: { get(name: string): string | null }): Utm {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Utm;
    if (Object.keys(stored).length) return stored;
  } catch {
    /* sin storage */
  }
  const out: Utm = {};
  for (const k of KEYS) {
    const v = clean(params.get(k));
    if (v) out[k] = v;
  }
  return out;
}