"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { setLeadContext } from "@/lib/attribution";
import { track } from "@/lib/track";
import { Reveal } from "./Reveal";

const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const num = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Number(v) || 0));

type Field = { id: string; label: string; hint: string; value: number; set: (n: number) => void; min: number; max: number; step: number; suffix?: string };

export function RoiCalculator() {
  const [consultas, setConsultas] = useState(60);
  const [sinRespuesta, setSinRespuesta] = useState(30);
  const [cierre, setCierre] = useState(25);
  const [ticket, setTicket] = useState(80000);

  const enRiesgo = Math.round(consultas * (sinRespuesta / 100) * (cierre / 100) * ticket);

  const fields: Field[] = [
    { id: "consultas", label: "Consultas al mes", hint: "Llamadas, WhatsApp y formularios", value: consultas, set: setConsultas, min: 0, max: 5000, step: 5 },
    { id: "sinrespuesta", label: "% que no recibe respuesta a tiempo", hint: "Se enfrían, se olvidan o llegan fuera de horario", value: sinRespuesta, set: setSinRespuesta, min: 0, max: 100, step: 5, suffix: "%" },
    { id: "cierre", label: "% de consultas que terminan en venta", hint: "Tu tasa de cierre actual", value: cierre, set: setCierre, min: 0, max: 100, step: 5, suffix: "%" },
    { id: "ticket", label: "Venta promedio (CLP)", hint: "Ticket medio por cliente", value: ticket, set: setTicket, min: 0, max: 100000000, step: 5000 },
  ];

  const onCta = () => {
    setLeadContext(
      `Calculadora: ${consultas} consultas/mes, ${sinRespuesta}% sin respuesta oportuna, cierre ${cierre}%, ticket ${clp.format(ticket)} → ${clp.format(enRiesgo)}/mes en riesgo`,
    );
    window.dispatchEvent(new Event("kg:ctx"));
    track("roi_calc_cta", { value: enRiesgo });
  };

  return (
    <section id="calculadora" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-brand2">Calculadora</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">¿Cuánto te cuesta no responder a tiempo?</h2>
        <p className="mt-3 max-w-2xl text-muted">Pon tus números. Es una estimación simple para dimensionar el problema antes de cotizar.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-8 rounded-2xl border border-line bg-card p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.id} htmlFor={f.id} className="block">
                <span className="text-sm font-medium">{f.label}</span>
                <span className="mb-2 block text-xs text-muted">{f.hint}</span>
                <div className="flex items-center gap-2 rounded-xl border border-line bg-bg px-3 focus-within:border-blue-500">
                  <input
                    id={f.id}
                    type="number"
                    inputMode="numeric"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={f.value}
                    onChange={(e) => f.set(num(e.target.value, f.min, f.max))}
                    className="w-full bg-transparent py-3 text-base outline-none"
                  />
                  {f.suffix && <span className="text-muted">{f.suffix}</span>}
                </div>
              </label>
            ))}
          </div>

          <div className="flex flex-col justify-between rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 p-6 ring-1 ring-blue-500/30">
            <div>
              <p className="flex items-center gap-2 text-sm text-blue-200">
                <Calculator size={16} /> Ingreso mensual que hoy se te escapa
              </p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight" aria-live="polite">
                {clp.format(enRiesgo)}
              </p>
              <p className="mt-2 text-xs text-muted">
                = consultas × % sin respuesta × % de cierre × venta promedio. Estimación con tus propios datos; no es una promesa de resultados.
              </p>
            </div>
            <a
              href="#contacto"
              onClick={onCta}
              className="btn-primary mt-6 rounded-xl px-5 py-3 text-center font-semibold text-white transition hover:brightness-110"
            >
              Quiero recuperar esas ventas
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
