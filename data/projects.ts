/**
 * FUENTE ÚNICA de casos de éxito.
 * Agregar un cliente = agregar un objeto aquí. Automáticamente aparece:
 *  - la tarjeta en la home (#casos)
 *  - su página /casos/<slug>/ (indexable)
 *  - su entrada en sitemap.xml
 *
 * `metrics` queda vacío a propósito: completa SOLO con cifras reales y verificables
 * (ej. { label: "Leads/mes", value: "+40%" }). Si está vacío no se muestra nada.
 */
export type Project = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  sector: string;
  kind: "Sitio + sistema de leads" | "Sitio de captación B2B" | "Plataforma web";
  summary: string; // 1 frase para la tarjeta
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  metrics?: { label: string; value: string }[];
  image?: string; // /casos/<slug>.webp en public/ (opcional)
  accent: "blue" | "amber" | "emerald";
};

export const projects: Project[] = [
  {
    slug: "lubricentro-esquivel",
    name: "Lubricentro Esquivel",
    domain: "lubricentroesquivel.cl",
    url: "https://www.lubricentroesquivel.cl/",
    sector: "Servicio automotriz · El Bosque, Santiago",
    kind: "Sitio + sistema de leads",
    summary:
      "Plataforma en Next.js 15 y PostgreSQL con tracking de leads y avisos automáticos por Telegram.",
    problem:
      "Un taller con 40 años de trayectoria necesitaba que cada consulta que llega desde la web se convirtiera en una oportunidad visible, y no se perdiera entre mensajes sueltos.",
    solution:
      "Plataforma desarrollada en Next.js 15 con base de datos PostgreSQL. Implementé un sistema de tracking de leads con notificaciones automatizadas por Telegram para que el negocio no pierda ninguna oportunidad de venta en tiempo real.",
    highlights: [
      "Registro de cada lead en PostgreSQL",
      "Aviso inmediato por Telegram al equipo",
      "Una página por servicio (aceite, alineación, tren delantero) pensada para búsquedas locales",
      "CTA directo a WhatsApp con mensaje predefinido por servicio",
      "Sección dedicada a empresas y flotas",
    ],
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Telegram Bot API"],
    metrics: [],
    accent: "amber",
  },
  {
    slug: "ivs-energy",
    name: "IVS Energy",
    domain: "ivsenergy.cl",
    url: "https://www.ivsenergy.cl/",
    sector: "Ingeniería SEC · calderas y servicios eléctricos",
    kind: "Sitio de captación B2B",
    summary:
      "Modernización completa de la presencia web con ruteo eficiente de clientes y arquitectura pensada para captación B2B.",
    problem:
      "Una empresa de ingeniería que vende a edificios, comunidades e industria necesitaba que cada tipo de cliente llegara al servicio y a la cotización correctos, sin fricción.",
    solution:
      "Modernización completa de la presencia web, integrando un sistema de ruteo de clientes eficiente y optimización de arquitectura para captación B2B.",
    highlights: [
      "Rutas separadas por servicio: calderas, eléctrica, certificación y emergencias",
      "Páginas de cobertura por comuna (Valparaíso, Viña del Mar, Algarrobo) para SEO local",
      "Flujo de cotización dedicado y contacto por WhatsApp con mensaje contextual",
      "Imágenes para redes (Open Graph) generadas por página",
      "Preguntas frecuentes orientadas a lo que el cliente realmente busca (Sello Verde, TC5, TC6)",
    ],
    stack: ["Next.js", "TypeScript", "SEO técnico"],
    metrics: [],
    accent: "blue",
  },
  {
    slug: "sinterec",
    name: "SINTEREC",
    domain: "sinterec.cl",
    url: "https://sinterec.cl",
    sector: "Sindicato de Interempresas Claro Chile",
    kind: "Plataforma web",
    summary:
      "Plataforma web institucional para el sindicato de trabajadores de Claro Chile: Node.js, Express, React y MySQL.",
    problem:
      "Una organización de trabajadores necesitaba un canal digital oficial, confiable y fácil de mantener para comunicarse con sus socios.",
    solution:
      "Plataforma full-stack con frontend en React y API en Node.js/Express sobre MySQL, desplegada como sitio oficial del sindicato.",
    highlights: [
      "Aplicación React de página única con identidad institucional",
      "API propia en Node.js y Express",
      "Base de datos relacional MySQL",
      "Sitio oficial en producción, con metadatos para buscadores y redes",
    ],
    stack: ["React", "Node.js", "Express", "MySQL"],
    metrics: [],
    accent: "emerald",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
