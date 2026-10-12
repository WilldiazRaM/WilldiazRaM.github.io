export type Faq = {
  id: string;
  icon: "cloud" | "timer" | "server" | "chart";
  q: string;
  a: string; // texto plano (sin HTML)
};

export const faqs: Faq[] = [
  {
    id: "compatibilidad-cloud",
    icon: "cloud",
    q: "¿Mi sistema actual es compatible con una arquitectura Cloud?",
    a: "En la mayoría de los casos sí, y no implica reescribirlo todo. Partimos con un diagnóstico de lo que ya tienes (aplicación, base de datos e integraciones) y migramos por etapas, empezando por lo de menor riesgo y manteniendo tu sistema actual operando hasta validar cada paso. Trabajo con Azure y con bases de datos como PostgreSQL y MySQL. Si algún componente es demasiado antiguo para migrarse, te lo indico en el diagnóstico, antes de comprometer cualquier inversión.",
  },
  {
    id: "plazo-automatizacion",
    icon: "timer",
    q: "¿Cuánto tarda en implementarse una automatización segura?",
    a: "Depende del alcance, por eso el diagnóstico inicial define primero qué se automatiza y qué datos toca. La entrega es por etapas: primero un flujo funcionando (por ejemplo, registrar cada consulta de un cliente y avisarte al instante) y luego se suman integraciones más complejas. La seguridad no es una fase final: autenticación, control de acceso y revisión de cabeceras HTTP forman parte desde el primer despliegue.",
  },
  {
    id: "continuidad-operacional",
    icon: "server",
    q: "¿Se interrumpirá mi operación durante la implementación?",
    a: "El objetivo es que no. Trabajo con despliegues automatizados (CI/CD), validación antes de publicar cada cambio y migraciones por etapas con el sistema vigente funcionando en paralelo. Los cambios críticos se coordinan contigo en horarios de menor demanda.",
  },
  {
    id: "retorno-inversion",
    icon: "chart",
    q: "¿Cómo sé si el sistema realmente genera retorno?",
    a: "Definimos la métrica a mejorar antes de partir (por ejemplo, consultas que se pierden o tiempo de respuesta) y la medimos después. Cada contacto queda registrado con su origen (tarjeta, Google, redes) en una base de datos, de modo que ves qué canal trae clientes. No prometo cifras sin conocer tu operación: el diagnóstico gratuito sirve justamente para estimarlas con tus propios datos.",
  },
];