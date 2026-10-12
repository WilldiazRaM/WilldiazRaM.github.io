"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Skeleton = () => <div aria-hidden="true" className="h-[540px] rounded-2xl border border-line bg-card" />;

const LeadForm = dynamic(() => import("./LeadForm").then((m) => m.LeadForm), {
  ssr: false,
  loading: Skeleton,
});

export function LeadFormLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{near ? <LeadForm /> : <Skeleton />}</div>;
}