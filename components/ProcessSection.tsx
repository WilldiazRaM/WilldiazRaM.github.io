import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Diagnóstico gratuito", text: "Revisamos tu operación y tu sitio actual. Identificamos dónde se pierden consultas y ventas." },
  { n: "02", title: "Entrega por etapas", text: "Pones en producción primero lo que más impacto tiene. Ves avances reales, no promesas." },
  { n: "03", title: "Medición y mejora", text: "Medimos visitas, contactos y origen de cada cliente. Mantención y evolutivos mes a mes." },
];

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-brand2">Cómo trabajamos</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Simple, medible y sin letra chica.</h2>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-card p-6">
              <span className="font-mono text-sm text-brand2">{s.n}</span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
