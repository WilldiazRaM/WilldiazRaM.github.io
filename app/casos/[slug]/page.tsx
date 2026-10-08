import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { TrackedLink } from "@/components/TrackedLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name}: caso de éxito`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/casos/${p.slug}/` },
    openGraph: { title: `${title} | ${site.name}`, description: p.summary, url: `${site.url}/casos/${p.slug}/`, type: "article" },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((x) => x.slug !== p.slug);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-5 py-14">
        <Link href="/#casos" className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-fg">
          <ArrowLeft size={15} /> Todos los casos
        </Link>
        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-brand2">{p.kind}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{p.name}</h1>
        <p className="mt-2 text-muted">{p.sector}</p>

        <TrackedLink
          event="click_live_site"
          params={{ project: p.slug, location: "case_page" }}
          href={p.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-1 rounded-lg border border-line bg-card px-4 py-2 text-sm font-semibold transition hover:border-blue-500/60"
        >
          Ver {p.domain} en vivo <ArrowUpRight size={15} />
        </TrackedLink>

        {p.metrics && p.metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-line bg-card p-4 text-center">
                <dd className="text-2xl font-bold text-brand2">{m.value}</dd>
                <dt className="text-xs uppercase tracking-wide text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-bold">El problema</h2>
          <p className="mt-2 leading-relaxed text-slate-300">{p.problem}</p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold">Lo que construí</h2>
          <p className="mt-2 leading-relaxed text-slate-300">{p.solution}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-brand2" /> {h}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold">Tecnología</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-md border border-line bg-card px-3 py-1 text-sm text-muted">{s}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
          <h2 className="text-xl font-bold">¿Quieres un resultado así en tu negocio?</h2>
          <p className="mt-1 text-sm text-slate-300">Partimos con un diagnóstico gratuito de tu operación.</p>
          <Link href="/#contacto" className="btn-primary mt-4 inline-block rounded-xl px-5 py-3 font-semibold text-white">Cotizar mi proyecto</Link>
        </section>

        <nav aria-label="Otros casos" className="mt-10 flex flex-wrap gap-3 text-sm">
          {others.map((o) => (
            <Link key={o.slug} href={`/casos/${o.slug}/`} className="rounded-lg border border-line px-3 py-2 text-muted transition hover:text-fg">
              {o.name} →
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
