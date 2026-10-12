import { ChevronDown, Cloud, Timer, Server, ChartColumn, MessageCircle } from "lucide-react";
import { faqs, type Faq } from "@/data/faq";
import { Reveal } from "./Reveal";

const icons: Record<Faq["icon"], typeof Cloud> = {
  cloud: Cloud,
  timer: Timer,
  server: Server,
  chart: ChartColumn,
};

// Schema.org FAQPage: se genera desde la misma fuente que el contenido visible.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-line/60 bg-card/40">
      {/* JSON-LD en el HTML prerenderizado. Se escapa "<" para evitar inyección de </script>. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-brand2">Preguntas frecuentes</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Lo que se pregunta antes de contratar.</h2>
          <p className="mt-3 text-muted">
            Respuestas directas sobre compatibilidad, plazos, continuidad y retorno. ¿Tu duda es otra?
          </p>
          <a
            href="#contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 font-semibold transition hover:border-blue-500/60"
          >
            <MessageCircle size={18} className="text-brand2" aria-hidden="true" /> Consultar a ingeniería
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const Icon = icons[f.icon];
              return (
                <details
                  key={f.id}
                  name="faq"
                  open={i === 0}
                  className="group rounded-2xl border border-line bg-card transition open:border-blue-500/40 open:shadow-lg open:shadow-blue-950/30"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-500/15 text-brand2">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="flex-1 text-base font-semibold leading-snug sm:text-lg">{f.q}</h3>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <p className="px-5 pb-5 pl-[76px] text-sm leading-relaxed text-slate-300">{f.a}</p>
                </details>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}