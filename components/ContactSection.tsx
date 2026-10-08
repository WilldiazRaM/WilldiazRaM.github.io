import { MessageCircle, FileText } from "lucide-react";
import { site, hasRealPhone, hasCv } from "@/data/site";
import { waLink, WA_FROM_WEB } from "@/lib/links";
import { LeadForm } from "./LeadForm";
import { TrackedLink } from "./TrackedLink";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="border-t border-line/60 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-brand2">Contacto</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Cuéntame tu caso y partimos con un diagnóstico gratuito.</h2>
          <p className="mt-4 text-muted">Te respondo con una propuesta concreta: qué haría, en qué orden y qué retorno esperar para tu tipo de negocio.</p>

          <TrackedLink
            event="click_whatsapp"
            params={{ location: "contact" }}
            href={hasRealPhone ? waLink(WA_FROM_WEB) : "mailto:" + site.email}
            target={hasRealPhone ? "_blank" : undefined}
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-card px-6 py-3.5 font-semibold transition hover:border-emerald-500/60"
          >
            <MessageCircle size={18} className="text-emerald-400" /> {hasRealPhone ? "Prefiero WhatsApp" : "Prefiero correo"}
          </TrackedLink>

          <div className="mt-10 rounded-2xl border border-line bg-bg/60 p-5">
            <p className="text-sm font-semibold">¿Eres reclutador o parte de un equipo técnico?</p>
            <p className="mt-1 text-sm text-muted">Ingeniero en Informática. Full-stack, Cloud (Azure) y DevSecOps. Mira mi código y mi trayectoria:</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <TrackedLink event="click_github" href={site.github} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 transition hover:border-blue-500/60">
                <GithubIcon size={16} /> GitHub
              </TrackedLink>
              <TrackedLink event="click_linkedin" href={site.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 transition hover:border-blue-500/60">
                <LinkedinIcon size={16} /> LinkedIn
              </TrackedLink>
              {hasCv && (
                <TrackedLink event="click_cv" href={site.cvUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 transition hover:border-blue-500/60">
                  <FileText size={16} /> CV
                </TrackedLink>
              )}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
