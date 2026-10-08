"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/data/site";
import { getAttribution, getLeadContext } from "@/lib/attribution";
import { track } from "@/lib/track";
import { waLink } from "@/lib/links";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[\d\s()-]{8,16}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Cuéntame tu nombre"),
  business: z.string().trim().min(2, "¿Cómo se llama tu negocio?"),
  contact: z
    .string()
    .trim()
    .refine((v) => emailRe.test(v) || phoneRe.test(v), "Ingresa un WhatsApp o un correo válido"),
  message: z.string().trim().max(800, "Máximo 800 caracteres").optional(),
  website: z.string().max(0).optional(), // honeypot: debe quedar vacío
});
type FormValues = z.infer<typeof schema>;

type Status = "idle" | "sending" | "ok" | "fallback" | "error";

export function LeadForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [status, setStatus] = useState<Status>("idle");
  const [ctx, setCtx] = useState("");
  const readyAt = useRef(0);

  useEffect(() => {
    readyAt.current = Date.now();
    const read = () => setCtx(getLeadContext());
    read();
    window.addEventListener("kg:ctx", read);
    return () => window.removeEventListener("kg:ctx", read);
  }, []);

  const onSubmit = async (values: FormValues) => {
    // Honeypot o envío sospechosamente rápido: respondemos "ok" sin enviar nada.
    if (values.website || Date.now() - readyAt.current < 2500) {
      setStatus("ok");
      return;
    }
    setStatus("sending");
    const attr = getAttribution();
    const payload = {
      name: values.name,
      business: values.business,
      contact: values.contact,
      message: values.message ?? "",
      context: getLeadContext(),
      source: attr.source,
      medium: attr.medium,
      campaign: attr.campaign,
      landing: attr.landing,
      page: window.location.href,
    };

    // Sin endpoint configurado: degradamos a WhatsApp para no perder el lead.
    if (!site.leadEndpoint) {
      const text = `Hola Williams, soy ${values.name} (${values.business}). ${values.message ?? ""} Contacto: ${values.contact}${payload.context ? ` | ${payload.context}` : ""}`;
      track("generate_lead", { method: "whatsapp_fallback", source: attr.source });
      window.open(waLink(text), "_blank", "noopener");
      setStatus("fallback");
      return;
    }

    try {
      const res = await fetch(site.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { method: "form", source: attr.source, campaign: attr.campaign });
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-base outline-none transition placeholder:text-slate-500 focus:border-blue-500";
  const err = "mt-1 text-xs text-red-400";

  if (status === "ok" || status === "fallback") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6">
        <CheckCircle2 className="text-emerald-400" />
        <h3 className="mt-3 text-lg font-bold">
          {status === "ok" ? "¡Recibido! Te respondo a la brevedad." : "Abrimos WhatsApp para que me escribas directo."}
        </h3>
        <p className="mt-1 text-sm text-slate-300">Si es urgente, escríbeme por WhatsApp y lo vemos hoy mismo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="space-y-4 rounded-2xl border border-line bg-card p-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">Tu nombre</label>
        <input id="name" autoComplete="name" className={field} placeholder="María Pérez" {...register("name")} />
        {errors.name && <p className={err}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="business" className="mb-1 block text-sm font-medium">Tu negocio</label>
        <input id="business" autoComplete="organization" className={field} placeholder="Nombre de tu empresa o negocio" {...register("business")} />
        {errors.business && <p className={err}>{errors.business.message}</p>}
      </div>
      <div>
        <label htmlFor="contact" className="mb-1 block text-sm font-medium">WhatsApp o correo</label>
        <input id="contact" autoComplete="email" className={field} placeholder="+56 9 1234 5678" {...register("contact")} />
        {errors.contact && <p className={err}>{errors.contact.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">¿Qué quieres mejorar? <span className="text-muted">(opcional)</span></label>
        <textarea id="message" rows={3} className={field} placeholder="Ej: recibimos muchas consultas por WhatsApp y se nos pierden" {...register("message")} />
        {errors.message && <p className={err}>{errors.message.message}</p>}
      </div>

      {/* Honeypot oculto para bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">No completar</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {ctx && <p className="rounded-lg bg-blue-500/10 p-3 text-xs text-blue-200">Adjuntaremos tu estimación de la calculadora a la consulta.</p>}

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> No pudimos enviar el formulario. Intenta de nuevo o escríbeme por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : (<>Quiero mi diagnóstico gratuito <Send size={16} /></>)}
      </button>
      <p className="text-center text-xs text-muted">Sin spam. Uso tus datos solo para responder tu consulta.</p>
    </form>
  );
}
