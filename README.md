# Easy Spectroscopy

Aplicación web educativa **100% frontend** (SPA en React + Vite + Tailwind CSS) para explorar, simular en tiempo real y ensamblar en 3D seis técnicas de instrumentación analítica: **Espectrometría de Masas (EI-MS)**, **UV-Vis**, **UHPLC**, **IR Medio (FTIR)**, **RMN Superconductora** y **Cromatografía de Gases (GC)**.

## Seguridad y Despliegue

- **Sin claves de API ni servidor:** Esta aplicación se ejecuta íntegramente en el navegador y no requiere `GEMINI_API_KEY` ni ningún secreto. Nunca coloques claves de API en el código fuente ni en variables `VITE_*` (todo lo empaquetado en el cliente es público).
- **Servir siempre por HTTPS:** El despliegue en producción debe realizarse exclusivamente bajo HTTPS para proteger la integridad de los activos y habilitar cabeceras como `Strict-Transport-Security`.
- **Replicar cabeceras HTTP de seguridad:** El archivo `public/_headers` aplica de forma automática las cabeceras de endurecimiento (`Content-Security-Policy` incluyendo `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Permitted-Cross-Domain-Policies` y `Cache-Control`) en plataformas como Cloudflare Pages o Netlify. Si alojas la app en otro servidor o CDN (Nginx, Apache, Vercel, Cloud Run, S3/CloudFront, etc.), **debes replicar exactamente esas cabeceras en la configuración de tu servidor**, ya que `frame-ancestors` y las directivas HTTP no tienen efecto mediante etiquetas `<meta>`.

## Instalación y Auditoría de Dependencias

1. Genera y sube al repositorio el archivo de bloqueo reproducible `package-lock.json` si aún no existe:
   ```bash
   npm install --package-lock-only
   ```
2. En entornos de integración continua y producción, instala versiones exactas con:
   ```bash
   npm ci
   ```
3. Verifica vulnerabilidades de alto riesgo en dependencias de producción ejecutando:
   ```bash
   npm run security:audit
   ```

## Scripts disponibles

- `npm run dev` — Inicia el servidor local de desarrollo en `localhost:3000`.
- `npm run lint` — Ejecuta la verificación de tipos con TypeScript (`tsc --noEmit`).
- `npm run build` — Genera el bundle de producción en `dist/` (sin *sourcemaps*).
- `npm run preview` — Previsualiza el build en `localhost`.
- `npm run security:audit` — Ejecuta `npm audit --omit=dev --audit-level=high`.
