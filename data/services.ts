export type Service = {
  id: string;
  icon: "gauge" | "bell" | "shield";
  title: string;
  promise: string;
  roi: string;
  bullets: string[];
};

// Ofertas redactadas desde el retorno para el cliente, no desde la tecnología.
export const services: Service[] = [
  {
    id: "web-que-convierte",
    icon: "gauge",
    title: "Web que convierte",
    promise: "Sitio rápido, con SEO local y un solo camino hacia el contacto.",
    roi: "Sabes qué canal trae clientes y cuánto te cuesta cada consulta.",
    bullets: ["Optimizado para carga rápida en celular", "Botón directo a WhatsApp con contexto", "Medición de visitas y contactos"],
  },
  {
    id: "leads-sin-fuga",
    icon: "bell",
    title: "Leads sin fuga",
    promise: "Cada consulta queda registrada y te avisa al instante.",
    roi: "Respondes antes que la competencia y dejas de perder ventas por demora.",
    bullets: ["Registro en base de datos PostgreSQL", "Aviso inmediato por Telegram o WhatsApp", "Historial para dar seguimiento"],
  },
  {
    id: "cloud-seguridad",
    icon: "shield",
    title: "Cloud y seguridad",
    promise: "Despliegue en Azure, cabeceras de seguridad y autenticación bien hecha.",
    roi: "Menos caídas, menos riesgo y una operación que escala sin reescribir todo.",
    bullets: ["Despliegues automatizados (CI/CD)", "Hardening y revisión de cabeceras HTTP", "Autenticación y control de acceso"],
  },
];
