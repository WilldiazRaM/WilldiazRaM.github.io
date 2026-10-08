import Link from "next/link";
import { site, hasRealPhone } from "@/data/site";
import { waLink, WA_FROM_WEB } from "@/lib/links";
import { TrackedLink } from "./TrackedLink";

const nav = [
  { href: "/#casos", label: "Casos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-xs font-bold ring-1 ring-line">WD</span>
          <span className="hidden sm:inline">{site.brand}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Principal">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-fg">
              {n.label}
            </Link>
          ))}
        </nav>
        <TrackedLink
          event="click_whatsapp"
          params={{ location: "header" }}
          href={hasRealPhone ? waLink(WA_FROM_WEB) : "/#contacto"}
          target={hasRealPhone ? "_blank" : undefined}
          rel="noreferrer"
          className="btn-primary rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30"
        >
          Cotizar
        </TrackedLink>
      </div>
    </header>
  );
}
