"use client";
import { motion, useReducedMotion } from "motion/react";
import { Eye, Database, BellRing, Zap } from "lucide-react";

const steps = [
  { icon: Eye, title: "Visita desde tu tarjeta o web", note: "Se registra el origen (QR, Google, redes)" },
  { icon: Database, title: "Lead guardado", note: "Nombre, negocio y contacto en tu base de datos" },
  { icon: BellRing, title: "Aviso en tu Telegram", note: "Te enteras en segundos, no al día siguiente" },
  { icon: Zap, title: "Respondes primero", note: "Más probabilidad de cerrar la venta" },
];

export function LeadFlowCard() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-2xl border border-line bg-card/80 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-brand2">Así funciona el sistema</p>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.18, duration: 0.45, ease: "easeOut" }}
            className="flex items-start gap-3 rounded-xl border border-line/80 bg-bg/60 p-3"
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-500/15 text-brand2">
              <s.icon size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold">{s.title}</span>
              <span className="block text-xs text-muted">{s.note}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
