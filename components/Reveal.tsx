import type { ReactNode } from "react";

// Server Component: cero JS en el cliente.
// `delay` se acepta por compatibilidad con los usos existentes, pero ya no se aplica.
export function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className ?? ""}`}>{children}</div>;
}