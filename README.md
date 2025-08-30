# Three.js + Next.js (react-three-fiber)

Este repositorio contiene una configuración mínima de Next.js (App Router) con Three.js usando react-three-fiber y drei. Incluye una escena simple con un cubo girando, controles de órbita y FPS stats.

## Requisitos
- Node.js >= 18

## Instalar dependencias
```bash
npm install
```

## Ejecutar en desarrollo
```bash
npm run dev
```
Visita: http://localhost:3000

## Build de producción
```bash
npm run build
npm start
```

## Despliegue en Netlify (rápido y fácil)
Sigue estos pasos para desplegar automáticamente desde tu repositorio de GitHub:

1. Confirma que existe el archivo `netlify.toml` en la raíz del proyecto (ya incluido en este repo). ✓
2. Sube o conecta este repositorio a Netlify (Use el botón "New site from Git"). ✓
3. En los ajustes de construcción, Netlify detectará automáticamente:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Plugin: `@netlify/plugin-nextjs` (se activa por `netlify.toml`)
4. Selecciona la rama a desplegar (por ejemplo, `main`) y crea el sitio. ✓
5. Cada push a esa rama disparará un deploy (CI/CD) automáticamente. ✓

Si necesitas configurar variables de entorno, hazlo en Site settings > Environment variables.

> Nota: Este proyecto usa Next.js 14 (App Router). El plugin oficial de Netlify para Next.js gestiona SSR/ISR y funciones automáticamente.

## Estructura
- `app/` App Router de Next.js.
  - `layout.tsx` Layout raíz.
  - `page.tsx` Página Home que monta el lienzo Three.
- `next.config.js` Configuración básica.
- `tsconfig.json` TypeScript config.
- `netlify.toml` Configuración de Netlify para build y runtime.

## Notas
- Se usa `@react-three/fiber` para integrar Three con React, y `@react-three/drei` para utilidades como `OrbitControls` y `StatsGl`.
- La escena inicial incluye sombras, un cubo giratorio y un plano que recibe sombras.
