// Genera public/williams-diaz.vcf desde data/contact.json y avisa si quedan datos de ejemplo.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const c = JSON.parse(readFileSync(join(root, "data/contact.json"), "utf8"));

const vcf = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Díaz Santander;Williams;;;",
  "FN:Williams Díaz Santander",
  "ORG:Servicios de Desarrollo Web Williams Díaz Santander E.I.R.L.",
  "TITLE:Ingeniero de Software",
  `TEL;TYPE=CELL,VOICE:${c.phone}`,
  `EMAIL;TYPE=WORK:${c.email}`,
  "URL:https://digital.kyriosgrid.cl",
  c.linkedin ? `URL;TYPE=LinkedIn:${c.linkedin}` : "",
  c.github ? `URL;TYPE=GitHub:${c.github}` : "",
  "ADR;TYPE=WORK:;;;Santiago;;;Chile",
  "END:VCARD",
]
  .filter(Boolean)
  .join("\r\n");

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public/williams-diaz.vcf"), vcf + "\r\n", "utf8");

const warns = [];
if (c.whatsapp === "56900000000" || c.phone === "+56900000000") warns.push("teléfono/WhatsApp de ejemplo (data/contact.json)");
if (c.linkedin.includes("tu-perfil")) warns.push("URL de LinkedIn de ejemplo");
if (!process.env.NEXT_PUBLIC_LEAD_ENDPOINT) warns.push("NEXT_PUBLIC_LEAD_ENDPOINT vacío: el formulario degradará a WhatsApp");
if (!process.env.NEXT_PUBLIC_GSC_VERIFICATION) warns.push("NEXT_PUBLIC_GSC_VERIFICATION vacío (no es necesario si verificas por DNS)");
if (warns.length) console.warn("\n⚠  Pendientes antes de publicar:\n" + warns.map((w) => "   - " + w).join("\n") + "\n");
