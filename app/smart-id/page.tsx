import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageCircle, FileText, Star, Globe, ShieldCheck } from "lucide-react";
import { site, hasRealPhone, hasReviews } from "@/data/site";
import { waLink, WA_FROM_CARD } from "@/lib/links";
import { TrackedLink } from "@/components/TrackedLink";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { projects } from "@/data/projects";
import Image from "next/image";
// Página utilitaria (tarjeta digital / NFC): no se indexa, para no competir con la home.
export const metadata: Metadata = {
  title: "Tarjeta digital",
  robots: { index: false, follow: true },
  alternates: { canonical: "/smart-id/" },
};

const quick =
  "flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-gray-700 shadow-sm transition-all hover:bg-gray-50";

export default function SmartIdPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 pb-10">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-xl sm:rounded-b-3xl">
        <div className="relative rounded-b-[40px] bg-slate-900 px-6 pb-6 pt-10 text-center text-white shadow-md">
          {/* Foto de perfil con anillo gradiente y efecto hover */}
          <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[3px] shadow-xl">
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-slate-900 bg-slate-800">
              <Image
                src="/perfil_pic/perfil.jpg"
                alt={site.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="112px"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-sm font-medium text-blue-400">{site.role}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="flex items-center gap-1 rounded-full border border-blue-500 bg-blue-600/30 px-3 py-1 text-blue-100">
              <ShieldCheck size={14} /> {site.badges[0]}
            </span>
            <span className="rounded-full border border-purple-500 bg-purple-600/30 px-3 py-1 text-purple-100">{site.badges[1]}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4 px-6">
          <TrackedLink
            event="save_contact"
            href="/williams-diaz.vcf"
            download
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
          >
            <FileText size={20} /> Guardar contacto
          </TrackedLink>

          <div className="grid grid-cols-3 gap-3">
            <TrackedLink event="click_call" href={`tel:${site.phone}`} className={quick}>
              <Phone size={24} className="mb-1 text-blue-600" />
              <span className="text-xs font-medium">Llamar</span>
            </TrackedLink>
            <TrackedLink
              event="click_whatsapp"
              params={{ location: "smart_id" }}
              href={hasRealPhone ? waLink(WA_FROM_CARD) : `mailto:${site.email}`}
              target="_blank"
              rel="noreferrer"
              className={quick}
            >
              <MessageCircle size={24} className="mb-1 text-green-500" />
              <span className="text-xs font-medium">WhatsApp</span>
            </TrackedLink>
            <TrackedLink event="click_email" href={`mailto:${site.email}`} className={quick}>
              <Mail size={24} className="mb-1 text-slate-700" />
              <span className="text-xs font-medium">Correo</span>
            </TrackedLink>
          </div>

          <Link
            href="/?utm_source=smart-id&utm_medium=nfc#casos"
            className="flex w-full flex-col items-center justify-center rounded-xl border border-blue-200 bg-slate-50 px-4 py-3 font-semibold text-blue-700 transition-all hover:bg-blue-50"
          >
            <span className="text-sm">Ver Casos de Éxito</span>
            <span className="mt-1 text-xs font-normal text-slate-500">{projects.map((p) => p.name).join(" · ")}</span>
          </Link>

          {hasReviews && (
            <TrackedLink
              event="click_reviews"
              href={site.googleReviews}
              target="_blank"
              rel="noreferrer"
              className="flex w-full flex-col items-center justify-center rounded-xl border border-yellow-300 bg-[#fff8e6] px-4 py-3 text-yellow-800 shadow-sm transition-all hover:bg-[#fff3d4]"
            >
              <Star size={18} className="mb-1 text-yellow-500" />
              <span className="text-sm font-semibold">Dejar una opinión en Google</span>
            </TrackedLink>
          )}

          <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-gray-100 pt-4">
            {site.stack.map((t) => (
              <span key={t} className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-600">{t}</span>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-8 pb-4">
            <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-slate-800">
              <Globe size={20} />
              <span className="mt-1 text-[10px]">Sitio web</span>
            </Link>
            <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className="flex flex-col items-center text-gray-500 hover:text-blue-700">
              <LinkedinIcon size={20} />
              <span className="mt-1 text-[10px]">LinkedIn</span>
            </a>
            <a href={site.github} target="_blank" rel="noreferrer noopener" className="flex flex-col items-center text-gray-500 hover:text-slate-800">
              <GithubIcon size={20} />
              <span className="mt-1 text-[10px]">GitHub</span>
            </a>
          </div>

          <div className="pb-6 text-center text-[10px] text-gray-400">
            <p>{site.company}</p>
            <p>{site.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
