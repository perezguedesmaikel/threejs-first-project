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

## Estructura
- `app/` App Router de Next.js.
  - `layout.tsx` Layout raíz.
  - `page.tsx` Página Home que monta el lienzo Three.
- `next.config.js` Configuración básica.
- `tsconfig.json` TypeScript config.

## Notas
- Se usa `@react-three/fiber` para integrar Three con React, y `@react-three/drei` para utilidades como `OrbitControls` y `StatsGl`.
- La escena inicial incluye sombras, un cubo giratorio y un plano que recibe sombras.
