"use client";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { captureUtm } from "@/lib/utm";

export function Attribution() {
  useEffect(() => {
    captureAttribution();
    captureUtm();
  }, []);
  return null;
}
