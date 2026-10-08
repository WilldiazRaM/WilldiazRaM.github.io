// First-touch attribution: guarda de dónde llegó el visitante (QR de la tarjeta, LinkedIn, etc.)
// durante 30 días, para que el lead llegue a tu Telegram con su origen.
const KEY = "kg_attr_v1";
const TTL = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  landing: string;
};

const EMPTY: Attribution = { source: "directo", medium: "", campaign: "", referrer: "", landing: "" };

export function captureAttribution() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw) as { at: number };
      if (Date.now() - saved.at < TTL) return;
    }
    const q = new URLSearchParams(window.location.search);
    let ref = "";
    try {
      ref = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {
      ref = "";
    }
    const data: Attribution & { at: number } = {
      source: q.get("utm_source") || ref || "directo",
      medium: q.get("utm_medium") || "",
      campaign: q.get("utm_campaign") || "",
      referrer: ref,
      landing: window.location.pathname,
      at: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage bloqueado: seguimos sin atribución */
  }
}

export function getAttribution(): Attribution {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Attribution) };
  } catch {
    /* noop */
  }
  return EMPTY;
}

// Contexto extra que una herramienta (p. ej. la calculadora) quiere adjuntar al lead.
const CTX = "kg_lead_ctx";
export function setLeadContext(text: string) {
  try {
    sessionStorage.setItem(CTX, text);
  } catch {
    /* noop */
  }
}
export function getLeadContext(): string {
  try {
    return sessionStorage.getItem(CTX) ?? "";
  } catch {
    return "";
  }
}
