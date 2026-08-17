---
title: "IVS Energy: Arquitectura SSG, SEO Técnico y Crecimiento Orgánico"
date: 2026-08-16
tags: ["Next.js", "Web Performance", "Data-Driven", "SEO Técnico", "Vercel"]
---

<span class="badge badge--hardened"><span class="dot"></span> En producción · ivsenergy.cl</span>

<ul class="chips">
  <li class="chip chip--hardened">Next.js 14 (SSG)</li>
  <li class="chip chip--hardened">TypeScript</li>
  <li class="chip chip--hardened">Vercel Edge</li>
  <li class="chip chip--hardened">JSON-LD / SEO</li>
</ul>

<div class="stat-grid">
  <div class="stat"><b>1.13s → &lt;0.2s</b><span>TTFB en móvil</span></div>
  <div class="stat"><b>80+</b><span>clics orgánicos / 28 días</span></div>
  <div class="stat"><b>Core Web Vitals</b><span>en verde</span></div>
</div>

### El contexto: de una página básica a un motor de ventas

IVS Energy, una PYME de ingeniería eléctrica y mantenimiento de calderas, pidió inicialmente un sitio informativo con constructores básicos (tipo Google Sites). Tras analizar su modelo de negocio, redefiní el alcance: no necesitaban un "folleto digital", sino una infraestructura optimizada para **captar clientes orgánicamente** desde los motores de búsqueda.

### Situación

Para competir en el sector industrial local, la plataforma requería cargas ultrarrápidas y una estructura de datos que Google pudiera priorizar. Las pruebas iniciales arrojaban un *Time to First Byte* (TTFB) de 1.13s, penalizando severamente visibilidad y retención.

### Tarea

Construir una arquitectura de alto rendimiento que superara a la competencia local en velocidad, cumpliera Core Web Vitals e incorporara un ciclo de operaciones basado en datos para mejorar la captación de *leads* de forma iterativa.

### Acción

- **Decisión arquitectónica:** descarté plataformas *low-code* y desarrollé **Static Site Generation (SSG) con Next.js 14**, desplegado en Vercel para aprovechar su CDN en el borde (Edge).
- **Rendimiento:** la refactorización del renderizado bajó el TTFB de 1.13s a **<0.2s** en móvil.
- **SEO técnico y telemetría:** marcado estructurado JSON-LD (Schema.org), metadatos dinámicos, y observabilidad con Google Analytics 4 + Vercel Analytics.
- **Mejora continua:** cada tres meses analizo la telemetría para refinar estructura, contenido y rendimiento.

### Resultado

El impacto técnico se tradujo en resultado comercial. Para agosto de 2026 la plataforma superó los **80 clics orgánicos en 28 días**, y la empresa alcanzó su máxima capacidad operativa con un flujo constante de clientes y proyectos cerrados.

![Crecimiento orgánico: 80+ clics en 28 días según la consola de búsqueda.](/img/ivs_80_visitas.jpg)