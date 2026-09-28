# ODD Plan: Expansión de Filtros para Cofres y Premios de Cofres

## 1. Contexto & Objetivos
- Añadir los filtros faltantes para el catálogo de cofres: `minCoins`, `maxCoins`, `minRequiredMissions`, `maxRequiredMissions`, `roomId`.
- Precargar las salas en memoria con `take: 20` al inicio para el filtro de `roomId`.
- Añadir los filtros faltantes para premios de cofres: `playerId` (SearchSelect por username, max 10), `chestId` (SearchSelect por title, max 10), `status`, `periodKey`, `orderBy` (`created_at` | `periodKey` | `id`), `orderDirection` (`ASC` | `DESC`).
- Agregar botón de "Refrescar" en la barra de control para recargar la UI en caliente.
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos en `@shared/types/admin.ts` y `apps/admin/src/types/adminChests.ts`.
- [ ] Task 2: Actualización de `getChests` y `getAdminPlayerChests` en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: `ChestsFilterBar.tsx` con `LocalSearchSelect` de salas y fila de rangos numéricos.
- [ ] Task 4: `PrizesFilterBar.tsx` con `SearchSelect` de jugadores y cofres, ordenamiento y dirección.
- [ ] Task 5: Actualización de reducers y adición del botón "Refrescar" en `ChestsOrchestrator.tsx`.
- [ ] Task 6: Verificación con `pnpm format && pnpm ci`.
