import { site } from "@/data/site";

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const WA_FROM_CARD = "Hola Williams, vengo desde tu tarjeta de presentación y quiero digitalizar mi negocio.";
export const WA_FROM_WEB = "Hola Williams, vi tu sitio y quiero digitalizar mi negocio.";

/** URL que va en el QR de la tarjeta. Cambia campaign para medir cada tanda de tarjetas. */
export const cardUrl = (campaign = "terreno-scl") =>
  `${site.url}/?utm_source=tarjeta&utm_medium=qr&utm_campaign=${campaign}`;
