import { ArrowDown, MessageCircle, ShieldCheck } from "lucide-react";
import { site, hasRealPhone } from "@/data/site";
import { waLink, WA_FROM_WEB } from "@/lib/links";
import { LeadFlowCard } from "./LeadFlowCard";
import { TrackedLink } from "./TrackedLink";

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-line/60">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.15fr_0.85fr] md:pb-28 md:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
            <ShieldCheck size={14} /> {site.badges[0]} · Santiago, Chile
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Sistemas web que{" "}
            <span className="bg-gradient-to-r from-blue-400 to-brand2 bg-clip-text text-transparent">automatizan tu operación</span>{" "}
            y capturan clientes.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Desarrollo de software a medida por {site.company}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TrackedLink
              event="click_cta_casos"
              href="#casos"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:brightness-110"
            >
              Ver Casos de Éxito <ArrowDown size={18} />
            </TrackedLink>
            <TrackedLink
              event="click_whatsapp"
              params={{ location: "hero" }}
              href={hasRealPhone ? waLink(WA_FROM_WEB) : "#contacto"}
              target={hasRealPhone ? "_blank" : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-6 py-3.5 font-semibold transition hover:border-blue-500/60"
            >
              <MessageCircle size={18} className="text-emerald-400" /> Hablemos por WhatsApp
            </TrackedLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2 text-xs text-muted">
            {site.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <LeadFlowCard />
      </div>
    </section>
  );
}
