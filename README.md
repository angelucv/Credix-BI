# Credix BI

Panel de **inteligencia de negocio** para el ecosistema **Credix** (Grupo Fibex): visualización de métricas de scoring, cartera, mora y orígenes por canal, más un flujo de demostración del pipeline de evaluación crediticia. Pensado como base para automatizar el proceso descrito en los materiales de levantamiento (proyecto BETINA / fuentes Ubii, Fibex y web).

## Qué incluye hoy

- **Resumen ejecutivo:** KPIs de scoring, cartera, mora, originación y gráfico de **volumen por canal** (Web Credix, Ubii App, asesores, otros).
- **Análisis Cartera:** composición por tipo de producto, evolución de saldo, segmentación (datos de demostración).
- **Análisis Mora:** top deudores, evolución de tasa de mora, composición por antigüedad (DPD).
- **Carga de datos:** interfaz para fuentes Ubii/Fibex/web; el procesamiento usa **clientes mock** y llama a la API interna de scoring.
- **Reglas de negocio:** pantalla de configuración (umbrales y pesos) sin persistencia en backend.
- **Resultados / Reportes:** placeholders indicando desarrollo pendiente.

**Stack:** React 19, TypeScript, Vite 6, Tailwind CSS 4, Express (un solo servidor en desarrollo y producción), Recharts. Cliente Supabase preparado pero **no integrado** al flujo principal mientras no haya proyecto y tablas definidas.

## Requisitos

- [Node.js](https://nodejs.org) LTS (recomendado 20 o superior)
- npm (incluido con Node)

## Cómo ejecutar en local

```bash
npm install
```

Opcional: copia `.env.example` a `.env` y ajusta variables si usarás Supabase o integraciones futuras. Para el demo con datos ficticios **no es obligatorio** tener Supabase.

```bash
npm run dev
```

La aplicación y la API quedan en **http://localhost:3000** (Express sirve el front con Vite en modo desarrollo).

### Scripts útiles

| Comando        | Descripción                                      |
|----------------|--------------------------------------------------|
| `npm run dev`  | Servidor de desarrollo + hot reload              |
| `npm run build`| Genera el front estático en `dist/`              |
| `npm start`    | Producción: sirve `dist/` y rutas `/api/*` (definir `NODE_ENV=production` en el hosting) |
| `npm run lint` | Comprobación TypeScript (`tsc --noEmit`)         |

## Despliegue (ej. Railway)

1. Conectar el repositorio de GitHub al servicio.
2. **Build:** `npm install && npm run build`
3. **Start:** `npm start`
4. **Variables de entorno:** `NODE_ENV=production` (el puerto lo suele inyectar el proveedor en `PORT`).

No hace falta base de datos para el **demo con datos ficticios**.

## Qué es real frente a demostración

| Área              | Estado actual |
|-------------------|---------------|
| UI y navegación   | Funcional     |
| Datos en pantallas| Mayormente **ficticios** o estáticos para el demo |
| `POST /api/process-scoring` | Lógica simplificada en Node; no sustituye el motor definitivo BETINA |
| Supabase / BD     | Cliente listo; **sin tablas ni escritura** en uso |
| Carga de Excel/CSV| **No implementada** (solo UI y mock) |
| Autenticación     | **No hay**    |

## Pendiente y próximos pasos sugeridos

1. **Persistencia:** definir esquema (p. ej. resultados de scoring, histórico de cargas) en PostgreSQL / Supabase y cablear el cliente.
2. **Ingesta real:** lectura y validación de archivos Ubii y Fibex según columnas acordadas con operaciones.
3. **Motor de scoring:** alinear reglas con negocio (cuestionario BETINA, Excel de referencia) y, si aplica, jobs o servicio aparte para volúmenes grandes.
4. **Autenticación y permisos:** acceso al panel solo para usuarios autorizados (Supabase Auth u otro proveedor).
5. **Exportación y reportes:** Excel/PDF, módulos marcados como “en desarrollo”.
6. **Observabilidad:** logs estructurados, límites de tamaño de archivo y rate limiting en API.

## Documentación de negocio

En la carpeta `Material/` hay cuestionario de levantamiento, plantillas y referencias de marca (formato según lo añadido al repositorio).

## Licencia y confidencialidad

El contenido de negocio puede ser sensible; revisa permisos antes de compartir el repositorio o datos reales de clientes.
