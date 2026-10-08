import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { TrackedLink } from "./TrackedLink";

const accents: Record<Project["accent"], string> = {
  blue: "from-blue-600/40 via-sky-500/10 to-transparent",
  amber: "from-amber-500/40 via-orange-500/10 to-transparent",
  emerald: "from-emerald-500/40 via-teal-500/10 to-transparent",
};

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-1 hover:border-blue-500/50">
      {/* Marco de navegador */}
      <div className={`relative border-b border-line bg-gradient-to-br ${accents[p.accent]} p-4`}>
        <div className="overflow-hidden rounded-lg border border-line/80 bg-bg/80">
          <div className="flex items-center gap-1.5 border-b border-line/80 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 truncate rounded bg-card px-2 py-0.5 font-mono text-[10px] text-muted">{p.domain}</span>
          </div>
          {p.image ? (
            <Image src={p.image} alt={`Captura de ${p.name}`} width={800} height={500} className="h-36 w-full object-cover object-top" />
          ) : (
            <div className="grid h-36 place-items-center px-4 text-center">
              <span className="text-xl font-bold tracking-tight">{p.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-brand2">{p.kind}</p>
        <h3 className="mt-1 text-xl font-bold tracking-tight">{p.name}</h3>
        <p className="mt-1 text-xs text-muted">{p.sector}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{p.summary}</p>

        {p.metrics && p.metrics.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-2">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-bg/70 p-2 text-center">
                <dd className="text-lg font-bold text-brand2">{m.value}</dd>
                <dt className="text-[10px] uppercase tracking-wide text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="rounded-md border border-line bg-bg/60 px-2 py-0.5 text-[11px] text-muted">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold">
          <Link href={`/casos/${p.slug}/`} className="text-blue-300 transition hover:text-blue-200">
            Ver el caso
          </Link>
          <TrackedLink
            event="click_live_site"
            params={{ project: p.slug }}
            href={p.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-muted transition hover:text-fg"
          >
            Sitio en vivo <ArrowUpRight size={15} />
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}
