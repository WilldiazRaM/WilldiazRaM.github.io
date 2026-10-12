import type { Metadata } from "next";
import Link from "next/link";
import { SearchX, House, FolderKanban, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Ruta no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-1 items-center justify-center overflow-hidden px-5 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_360px_at_50%_30%,rgba(59,130,246,0.16),transparent_70%)]"
      />

      <section className="relative w-full max-w-xl rounded-2xl border border-line bg-card/80 p-8 shadow-2xl shadow-blue-950/30 backdrop-blur sm:p-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-brand2">
            <SearchX size={22} aria-hidden="true" />
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-brand2">HTTP 404 · Not Found</p>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Ruta no encontrada</h1>
        <p className="mt-3 leading-relaxed text-muted">
          El recurso solicitado no existe, fue reubicado o la URL contiene un error. Verifica la dirección o retoma
          el flujo desde un punto de entrada válido.
        </p>

        <dl className="mt-6 grid gap-1 rounded-xl border border-line bg-bg/70 p-4 font-mono text-xs text-muted">
          <div className="flex justify-between gap-4">
            <dt>estado</dt>
            <dd className="text-fg">404 · recurso no resuelto</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>acción sugerida</dt>
            <dd className="text-fg">redirigir a ruta raíz</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition hover:brightness-110"
          >
            <House size={18} aria-hidden="true" /> Volver al inicio
          </Link>
          <Link
            href="/#casos"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-5 py-3 font-semibold transition hover:border-blue-500/60"
          >
            <FolderKanban size={18} aria-hidden="true" /> Ver casos de éxito
          </Link>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-5 py-3 font-semibold transition hover:border-blue-500/60"
          >
            <MessageCircle size={18} aria-hidden="true" /> Contactar a ingeniería
          </Link>
        </div>
      </section>
    </main>
  );
}