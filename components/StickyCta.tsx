import { MessageCircle } from "lucide-react";
import { hasRealPhone } from "@/data/site";
import { waLink, WA_FROM_WEB } from "@/lib/links";
import { TrackedLink } from "./TrackedLink";

/** Barra fija solo en móvil: el QR de la tarjeta siempre aterriza en celular. */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 p-3 backdrop-blur md:hidden">
      <TrackedLink
        event="click_whatsapp"
        params={{ location: "sticky" }}
        href={hasRealPhone ? waLink(WA_FROM_WEB) : "/#contacto"}
        target={hasRealPhone ? "_blank" : undefined}
        rel="noreferrer"
        className="btn-primary flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white"
      >
        <MessageCircle size={18} /> Cotiza por WhatsApp
      </TrackedLink>
    </div>
  );
}
