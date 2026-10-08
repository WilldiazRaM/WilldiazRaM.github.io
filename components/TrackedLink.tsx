"use client";
import type { AnchorHTMLAttributes } from "react";
import { track } from "@/lib/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; params?: Record<string, string | number> };

/** <a> que dispara un evento de conversión al hacer clic. */
export function TrackedLink({ event, params, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
