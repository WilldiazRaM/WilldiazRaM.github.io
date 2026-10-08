type GtagWindow = Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };

/** Evento de conversión (GA4 si está configurado). Nunca rompe la página. */
export function track(event: string, params: Record<string, string | number> = {}) {
  try {
    const w = window as GtagWindow;
    w.gtag?.("event", event, params);
  } catch {
    /* noop */
  }
}
