import Link from "next/link";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export function Footer() {
  return (
    <footer className="border-t border-line/60 pb-24 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-center text-xs text-muted md:flex-row md:text-left">
        <div>
          <p className="font-semibold text-fg">{site.company}</p>
          <p className="mt-1">{site.city} · {site.badges.join(" · ")}</p>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/smart-id/" className="hover:text-fg">Tarjeta digital</Link>
          <a href={site.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="hover:text-fg"><GithubIcon size={18} /></a>
          <a href={site.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="hover:text-fg"><LinkedinIcon size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
