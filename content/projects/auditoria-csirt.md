---
title: "Auditoría de Postura de Seguridad en Infraestructura Crítica Nacional"
date: 2024-07-01
tags: ["DevSecOps", "Node.js", "OWASP", "Hardening", "CSIRT"]
---

<span class="badge badge--hardened"><span class="dot"></span> Divulgación responsable · Hardening</span>

<ul class="chips">
  <li class="chip chip--hardened">OWASP Secure Headers</li>
  <li class="chip chip--hardened">Análisis pasivo</li>
  <li class="chip chip--hardened">CSIRT de Gobierno</li>
</ul>

### El origen: de la academia a la infraestructura crítica

Este caso nace de aplicar en el mundo real lo que estudiaba en paralelo en el *Back-End Engineer Path* de Codecademy y en Integración de Plataformas (Duoc UC). Mientras implementaba `helmet()` para configurar cabeceras de seguridad HTTP en una API Node.js/Express, me pregunté cómo aplicaban esas mismas mitigaciones (estándar OWASP) infraestructuras de alto perfil a nivel nacional.

### Tarea

Evaluar la postura de seguridad perimetral —usando únicamente información **públicamente verificable**— para medir la aplicación de controles de *hardening* (defensa en profundidad) en plataformas críticas del Estado.

### Acción y hallazgos

Ejecuté un análisis de cabeceras HTTP con herramienta pública, **sin pruebas de penetración ni interacción con sesiones de usuarios**, sobre dos objetivos: el portal `bancoestado.cl` y el servicio de autenticación `accounts.claveunica.cl`.

- **Portal bancario (`bancoestado.cl`):** calificación **F**, con ausencia de cabeceras fundamentales como `Strict-Transport-Security` (HSTS), `Content-Security-Policy` (CSP) y `X-Frame-Options`. Severidad **baja–media**: no son fallas explotables por sí solas, sino controles de defensa en profundidad ausentes.
- **Clave Única (`accounts.claveunica.cl`):** se observó un patrón equivalente, lo que sugería una brecha de *hardening* transversal en la capa de transporte de servicios críticos, no un caso aislado.

<!-- NOTA PARA TI: para claveunica.cl no tienes captura propia. Si no la agregas, mantén esto como "observación reportada", no como resultado con evidencia publicada. -->

![Análisis de cabeceras HTTP de bancoestado.cl (01 Jul 2024): calificación F por ausencia de controles de hardening.](/img/vulns_banco_estado_julio_2024.jpg)

Tras revisarlo primero en un entorno académico, documenté los hallazgos de forma estructurada y los escalé por el canal oficial.

### Resultado: divulgación responsable

Bajo el principio de divulgación responsable, los hallazgos fueron reportados al **CSIRT de Gobierno** a mediados de 2024, sin difusión pública de detalles explotables al momento del reporte.

### Contexto de industria (hecho independiente)

En el mismo periodo, la institución financiera detectó y denunció un **fraude interno** de alto impacto (*insider threat*) a raíz de una modificación en sus sistemas, hecho ampliamente cubierto por la prensa.

<div style="display:flex; gap:1rem; flex-wrap:wrap;">

![La Tercera: la Fiscalía inició diligencias tras detectarse el desbalance por una modificación de sistemas en julio de 2024.](/img/declaracion_fiscal_julio_2024.jpg)

![Cooperativa: la PDI detalló el mecanismo del fraude interno (uso de cuentas en desuso).](/img/cooperativa_prensa_banco_estado_jul24.png)

</div>

Seamos rigurosos: **mi reporte de cabeceras HTTP y ese fraude interno pertenecen a vectores de ataque completamente distintos y no tienen relación causal.** El fraude se originó en el abuso de accesos privilegiados sobre cuentas rezagadas; las cabeceras son una observación de perímetro. **Coincidencia temporal no es causa.**

Lo que sí muestra la coincidencia es algo real: estaba mirando el lugar correcto. Mientras yo señalaba —desde afuera y de forma responsable— que la madurez de seguridad de esta infraestructura estaba bajo el estándar, la misma institución enfrentaba, por dentro y en otra capa, una crisis de seguridad de escala nacional. Detectar dónde está el riesgo antes de que escale es exactamente lo que aporto en un rol DevSecOps.

### Actualización (2026)

Una nueva verificación pasiva en agosto de 2026 evidenció que la deficiencia de cabeceras **reapareció** en el dominio principal y en un subdominio asociado. Fue nuevamente reportada a la Agencia Nacional de Ciberseguridad (ANCI) por el canal oficial. La persistencia refuerza la lección central: la seguridad debe estandarizarse en el pipeline, no parchearse caso a caso.

> **Lección DevSecOps:** la seguridad no es un parche final, sino una práctica integral —desde el diseño del backend hasta el monitoreo continuo en producción. El *hardening* que se aplica en un servidor debe heredarse por defecto en todos los despliegues, y validarse en CI/CD.