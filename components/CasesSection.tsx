import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function CasesSection() {
  return (
    <section id="casos" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-brand2">Casos de éxito</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Problemas de negocio resueltos, no solo código.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Tres proyectos reales en producción. Abre cada sitio y compruébalo tú mismo.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
