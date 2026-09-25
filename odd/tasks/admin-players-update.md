# ODD Plan: Actualización del Módulo de Jugadores (Players)

## 1. Contexto & Objetivos
- Actualizar los endpoints de players en `apps/admin/src/libs/apiAdminGanaya.ts` acorde a `docs/endpoints-api-reference.md`.
- Adaptar `Player` para reflejar toda la información: experiencia, nivel, sala asignada, teléfono y estado.
- Permitir editar únicamente teléfono (`phone`) y estado (`isActive`) con un modal (`PlayerEditModal`), manteniendo el `username` de solo lectura.
- Implementar filtros avanzados en la tabla de jugadores: username, phone, estado, sala (búsqueda dinámica take <= 7 con formato "Nombre - Bono") y nivel (búsqueda dinámica take <= 7 con formato "Nombre").
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos compartidos y de admin (`packages/shared/src/types/admin.ts`, `packages/shared/src/types/index.ts`, `apps/admin/src/types/adminPlayers.ts`, `apps/admin/src/types/SearchSelect.ts`).
- [ ] Task 2: Actualización de `getPlayers` y adición de `updatePlayer` en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: Componente reutilizable `SearchSelect.tsx` (`apps/admin/src/components/ui/SearchSelect.tsx`).
- [ ] Task 4: `playersReducer.ts` y acciones asíncronas (`loadPlayers`, `updatePlayerAction`, `togglePlayerStatusAction`).
- [ ] Task 5: Modal de edición `PlayerEditModal.tsx`.
- [ ] Task 6: Componentes de UI (`PlayerStatsCards.tsx`, `PlayersFilterBar.tsx`, `PlayerRow.tsx`, `PlayersTable.tsx`, `PlayersList.tsx`).
- [ ] Task 7: Verificación con `pnpm format && pnpm ci`.
