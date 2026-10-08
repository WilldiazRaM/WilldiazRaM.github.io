import { Gauge, BellRing, ShieldCheck, Check, TrendingUp } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "./Reveal";

const icons = { gauge: Gauge, bell: BellRing, shield: ShieldCheck } as const;

export function ServicesSection() {
  return (
    <section id="servicios" className="border-y border-line/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-brand2">Qué obtienes</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Cada servicio se mide por lo que te devuelve.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-brand2">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{s.promise}</p>
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-200">
                    <TrendingUp size={16} className="mt-0.5 shrink-0" /> {s.roi}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-brand2" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
