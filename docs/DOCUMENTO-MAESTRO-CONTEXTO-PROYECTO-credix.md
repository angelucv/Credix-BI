# Documento maestro de avance — Credix BI

**Nombre de archivo:** `DOCUMENTO-MAESTRO-CONTEXTO-PROYECTO-credix.md` (mismo patrón que La Fe / La Internacional).

**Propósito:** registrar **fase, hitos, riesgos y acciones abiertas** del programa de BI Credix (scoring, cartera, mora, originación) y dar **contexto estable al agente** sin duplicar el detalle técnico del `README.md`.

**Responsable de actualización:** Angel Colmenares (ajustar si cambia).

**Convención:** lo **más reciente** arriba en tablas cronológicas. Rutas relativas a la **raíz del repo** (`<RAÍZ_REPO>` = carpeta que contiene `package.json`).

---

## Estado actual resumido

| Campo | Valor |
|--------|--------|
| **Fase actual** | Producto **demo**: UI funcional, datos mayormente ficticios o estáticos; sin persistencia de scoring definitiva ni ingesta real Ubii/Fibex. |
| **Objetivo de la fase** | Consolidar levantamiento (BETINA / materiales en `Material/`) y definir backlog para ingesta real, motor de scoring y Supabase. |
| **Semáforo** | **Verde (demo)** / **Amarillo (producción)** — producción no iniciada hasta esquema de datos y acuerdos de negocio. |

---

## Contexto de negocio (obligatorio para no alucinar)

- **Credix** y ecosistema **Fibex**; panel orientado a **métricas de scoring, cartera, mora y canales** (Web Credix, Ubii App, asesores).
- **BETINA:** referencia de cuestionario y reglas en `Material/` (ver inventario en `README.md` sección documentación).
- **Separación demo vs real:** ver tabla en `README.md` «Qué es real frente a demostración»; el agente **no** debe presentar mocks como datos de clientes reales.

---

## Registro de actividades (cronológico)

| Fecha | Tipo | Actividad | Evidencia |
|-------|------|-----------|-----------|
| 2026-04-26 | Gobierno | Creación de documento maestro, `AGENTS.md` y regla Cursor `documento-maestro-credix.mdc`; repo ubicado bajo `Projects\clients\credix`. | Este archivo |

---

## Acciones abiertas

| ID | Acción | Estado | Notas |
|----|--------|--------|-------|
| C1 | Definir esquema PostgreSQL / Supabase y cablear cliente | Pendiente | Ver `README.md` pendientes |
| C2 | Ingesta real Ubii / Fibex según columnas acordadas | Pendiente | |
| C3 | Alinear motor de scoring con negocio (BETINA) | Pendiente | |
| C4 | Autenticación y permisos en panel | Pendiente | |
| C5 | Exportación Excel/PDF en módulos marcados placeholder | Pendiente | |

---

## Orientación para el agente de IA

1. **Fuente de producto técnico:** `README.md` (cómo ejecutar, scripts, despliegue).
2. **Fuente de programa / avance:** este maestro + tabla de acciones.
3. **Datos:** asumir **demo** salvo que el usuario indique entorno con datos reales y permisos explícitos.
4. **Material sensible:** no versionar credenciales ni datos personales; respetar `.gitignore` y política del `README.md` (confidencialidad).
5. **Multi-repo / multi-cliente:** si la tarea mezcla con La Fe o La Internacional, leer `C:\Users\Angel\Projects\INDICE-PROYECTOS.md`.

---

## Historial de este documento

| Fecha | Cambio |
|-------|--------|
| 2026-04-26 | Creación inicial alineada a estructura `clients/credix` e índice multi-programa. |
| 2026-04-26 | Renombrado a **`DOCUMENTO-MAESTRO-CONTEXTO-PROYECTO-credix.md`** (sufijo por cliente). |
