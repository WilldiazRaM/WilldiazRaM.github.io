---
title: "SINTEREC: Arquitectura Desacoplada, Migración y Operaciones Web"
date: 2025-01-01
tags: ["Node.js", "Enterprise Routing", "MySQL", "Seguridad Defensiva", "Gestión de Incidentes"]
---

<span class="badge badge--hardened"><span class="dot"></span> En producción · sinterec.cl</span>

<ul class="chips">
  <li class="chip chip--hardened">Node.js · Express</li>
  <li class="chip chip--hardened">React · Redux</li>
  <li class="chip chip--hardened">MySQL / MariaDB</li>
  <li class="chip chip--hardened">JWT · CSP · rate limiting</li>
</ul>

<div class="stat-grid">
  <div class="stat"><b>1.061</b><span>usuarios totales</span></div>
  <div class="stat"><b>1.039</b><span>usuarios activos</span></div>
  <div class="stat"><b>8</b><span>administradores</span></div>
</div>

### El contexto

Este proyecto fue el puente entre la investigación académica (Duoc UC y Codecademy) y la ingeniería en producción. Un ciclo de 6 meses que exigió no solo diseño arquitectónico, sino gestión directa de requerimientos con múltiples *stakeholders* (directiva sindical) y resolución de incidentes de red a nivel corporativo.

### Situación

El Sindicato CLARO Chile necesitaba una plataforma privada para digitalizar la gestión de **+1.000 socios**. La infraestructura inicial dependía de un *hosting* inestable y sin soporte, un riesgo inaceptable. Además, las notificaciones debían integrarse masivamente con los correos corporativos de una empresa de telecomunicaciones internacional, sin romper sus políticas de seguridad.

### Tarea

Diseñar un backend robusto desde cero, orquestar la migración a infraestructura de alta disponibilidad, manejar el *onboarding* masivo y asegurar que las comunicaciones no fueran bloqueadas por las barreras perimetrales de la corporación.

### Acción

- **Gestión de incidentes de red (falso positivo en SOC):** durante el registro masivo, el envío automatizado de credenciales a los correos corporativos detonó las alertas del sistema de ciberseguridad central de Claro (México), clasificando el tráfico como *phishing*. Lo mitigué coordinando el *whitelisting* de las IPs del servidor y configurando reglas de proxy para restaurar el flujo legítimo sin romper las políticas de la empresa.
- **Migración de datos:** ante la ineficiencia del proveedor inicial, planifiqué y ejecuté la migración a un entorno con soporte dedicado, traduciendo la estructura de **PostgreSQL a MySQL/MariaDB**.
- **Seguridad y control de acceso estricto:** el registro público está bloqueado; solo cuentas de administración enrolan usuarios. La API se protege con **JWT, bcrypt, cabeceras HTTP restrictivas (CSP) y *rate limiting***.
- **Adopción y soporte presencial:** brindé soporte *on-site* durante eventos del sindicato para facilitar la integración de los socios.

### Resultado

El sistema opera de forma estable, segura y bajo mejora continua. Según los dashboards de telemetría, la plataforma sostiene **1.061 usuarios totales** y **1.039 activos**, gestionados por **8 administradores**. Este caso consolida mi capacidad para manejar el ciclo de vida completo del software y resolver bloqueos de infraestructura en entornos corporativos restrictivos.

<!-- NOTA PARA TI: agrega el screenshot del dashboard como static/img/sinterec_dashboard.png y descomenta la línea de abajo. -->
<!-- ![Dashboard de telemetría: 1.061 usuarios totales, 1.039 activos.](/img/sinterec_dashboard.png) -->