"use client";
import { QRCodeSVG } from "qrcode.react";
import { Printer } from "lucide-react";
import { site } from "@/data/site";
import { cardUrl } from "@/lib/links";

const url = cardUrl("terreno-scl");
const shortUrl = site.url.replace("https://", "");

export default function TarjetaPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center gap-10 px-5 py-10 print:p-0">
      <header className="no-print text-center">
        <h1 className="text-2xl font-bold">Tarjeta de presentación 90 × 50 mm</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Imprime esta página como PDF (Ctrl+P → “Guardar como PDF”, sin márgenes, activar “Gráficos de fondo”) y envíala a la imprenta. Cada lado sale en una hoja. Pide 3 mm de sangrado si tu imprenta lo exige.
        </p>
        <p className="mt-2 break-all font-mono text-xs text-brand2">QR → {url}</p>
        <button
          onClick={() => window.print()}
          className="btn-primary mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
        >
          <Printer size={18} /> Imprimir / Guardar PDF
        </button>
      </header>

      {/* FRENTE: limpio y formal */}
      <section className="flex flex-col items-center gap-2">
        <p className="no-print text-xs uppercase tracking-widest text-muted">Frente</p>
        <div className="biz-card flex flex-col justify-between rounded-md bg-white p-[5mm] text-slate-900 shadow-2xl ring-1 ring-black/10" style={{ zoom: 2.4 }}>
          <div>
            <div className="flex items-center gap-[2mm]">
              <span className="grid h-[8mm] w-[8mm] place-items-center rounded-[1.5mm] bg-slate-900 text-[7pt] font-bold text-white">WD</span>
              <span className="text-[6pt] font-semibold uppercase leading-tight tracking-wide text-slate-500">{site.brand}</span>
            </div>
          </div>
          <div>
            <p className="text-[12pt] font-extrabold leading-tight tracking-tight">{site.name}</p>
            <p className="text-[7.5pt] font-medium text-blue-700">{site.role}</p>
            <p className="mt-[1.5mm] text-[5pt] leading-tight text-slate-500">{site.company}</p>
          </div>
          <div className="text-[6.5pt] leading-snug text-slate-700">
            <p>{site.phone}</p>
            <p>{site.email}</p>
            <p>{shortUrl}</p>
          </div>
        </div>
      </section>

      {/* REVERSO: el gancho tecnológico */}
      <section className="flex flex-col items-center gap-2">
        <p className="no-print text-xs uppercase tracking-widest text-muted">Reverso</p>
        <div className="biz-card flex items-center gap-[4mm] rounded-md bg-slate-900 p-[5mm] text-white shadow-2xl ring-1 ring-white/10" style={{ zoom: 2.4 }}>
          <div className="shrink-0 rounded-[2mm] bg-white p-[1.8mm]">
            <QRCodeSVG value={url} size={118} level="M" marginSize={0} bgColor="#ffffff" fgColor="#0f172a" />
          </div>
          <div>
            <p className="text-[9pt] font-extrabold leading-tight tracking-tight">Escanea para ver cómo aumentamos las ventas de nuestros clientes</p>
            <p className="mt-[2mm] text-[6pt] text-cyan-300">Casos de éxito · Cotización gratis</p>
            <p className="mt-[1mm] text-[5.5pt] text-slate-400">{shortUrl}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
