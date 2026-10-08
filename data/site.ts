import contact from "./contact.json";

export const site = {
  name: "Williams Díaz Santander",
  role: "Ingeniero en Informática • Duoc UC",
  brand: "Williams Díaz",
  company: "Servicios de Desarrollo Web Williams Díaz Santander E.I.R.L.",
  city: "Santiago, Chile",
  url: "https://digital.kyriosgrid.cl",
  title: "Sistemas web que captan clientes | Williams Díaz Santander",
  description:
    "Desarrollo de software a medida en Santiago: sitios y sistemas que automatizan tu operación, registran cada lead y te avisan en tiempo real. Next.js, PostgreSQL y Azure.",
  ...contact,
  badges: [
    "Ing. Informático (Duoc UC)",
    "Microsoft Founders Hub",
    "Especialista B2B"
  ],
  stack: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Python", "Azure", "DevSecOps"],
  // Se inyectan en build vía variables de entorno (ver docs/DEPLOY.md)
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
} as const;

export const hasRealPhone = site.whatsapp !== "56900000000";
export const hasReviews = site.googleReviews.startsWith("http");
export const hasCv = site.cvUrl.startsWith("http") || site.cvUrl.startsWith("/");
