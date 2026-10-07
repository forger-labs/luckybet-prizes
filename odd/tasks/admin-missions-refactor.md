# ODD Plan: Refactorización del Módulo de Misiones (Missions)

## 1. Contexto & Objetivos
- Refactorizar los métodos de misiones en `apps/admin/src/libs/apiAdminGanaya.ts` de acuerdo a `docs/endpoints-api-reference.md`.
- Desacoplar `bonus` y reemplazarlo por `roomId` (sala promocional asociada con bono de LuckyBet).
- Implementar filtros completos en la UI (`MissionsFilterBar`): búsqueda por título/descripción, filtro por tipo (DAILY, WEEKLY, FIXED), filtro por estado (ACTIVE, INACTIVE, COMPLETED, CANCELLED), selector de sala con `SearchSelect` (take: 7, formato "Nombre - Bono") y tamaño de página (`take: 10, 20, 50`).
- Actualizar `MissionFormModal` y campos para soportar selección de sala con `SearchSelect` y envío multipart (`image`, `missionSteps`).
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos en `@shared/types/admin.ts`, `apps/admin/src/types/missions/*`.
- [ ] Task 2: Métodos de misiones en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: Mappers y formulario (`api-mappers.ts`, `MissionFormModal.tsx`, `MissionRewardFields.tsx`, `MissionFields.tsx`).
- [ ] Task 4: Listado y filtros (`MissionsReducer.ts`, `MissionsFilterBar.tsx`, `MissionRow.tsx`, `MissionTable.tsx`, `MissionStatsCards.tsx`, `MissionsList.tsx`).
- [ ] Task 5: Verificación con `pnpm format && pnpm ci`.
