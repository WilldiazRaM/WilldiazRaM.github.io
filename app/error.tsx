"use client";

import { useEffect, useState } from "react";
import { TriangleAlert, RefreshCw, House, MessageCircle } from "lucide-react";
import { track } from "@/lib/track";

export default function GlobalRouteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  // Si el reintento vuelve a fallar llega un `error` nuevo y el estado "recuperando" se libera solo.
  const [attempted, setAttempted] = useState<Error | null>(null);
  const recovering = attempted === error;

  useEffect(() => {
    console.error(error);
    track("exception", { description: error.digest ?? error.name, fatal: 0 });
  }, [error]);

  return (
    <main
      role="alert"
      className="relative flex min-h-dvh flex-1 items-center justify-center overflow-hidden px-5 py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_360px_at_50%_30%,rgba(245,158,11,0.12),transparent_70%)]"
      />

      <section className="relative w-full max-w-xl rounded-2xl border border-line bg-card/80 p-8 shadow-2xl shadow-blue-950/30 backdrop-blur sm:p-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/15 text-amber-400">
            <TriangleAlert size={22} aria-hidden="true" />
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400">Runtime exception</p>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Excepción en el sistema</h1>
        <p className="mt-3 leading-relaxed text-muted">
          Se produjo un error inesperado al procesar la solicitud. Puedes reintentar la operación o volver a un punto
          de entrada estable.
        </p>

        <dl className="mt-6 grid gap-1 rounded-xl border border-line bg-bg/70 p-4 font-mono text-xs text-muted">
          <div className="flex justify-between gap-4">
            <dt>estado</dt>
            <dd className="text-fg">{recovering ? "recuperando estado…" : "interrumpido"}</dd>
          </div>
          {error.digest && (
            <div className="flex justify-between gap-4">
              <dt>referencia</dt>
              <dd className="text-fg">{error.digest}</dd>
            </div>
          )}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={recovering}
            onClick={() => {
              setAttempted(error);
              retry();
            }}
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
          >
            <RefreshCw size={18} aria-hidden="true" className={recovering ? "animate-spin" : ""} />
            {recovering ? "Recuperando estado…" : "Recuperar estado"}
          </button>
          {/* <a> a propósito: fuerza recarga completa y descarta el estado corrupto del cliente.
              Con <Link> a "/" no se desmontaría el boundary si el fallo ocurrió en la propia home. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-5 py-3 font-semibold transition hover:border-blue-500/60"
          >
            <House size={18} aria-hidden="true" /> Volver al inicio
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-5 py-3 font-semibold transition hover:border-blue-500/60"
          >
            <MessageCircle size={18} aria-hidden="true" /> Reportar incidente
          </a>
        </div>
      </section>
    </main>
  );
}