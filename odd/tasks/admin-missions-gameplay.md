# ODD Plan: Integración de Pasos GAME_PLAY y Catálogo Local de Juegos/Proveedores

## 1. Contexto & Objetivos
- Integrar la creación y edición de misiones con pasos de tipo `GAME_PLAY`.
- Implementar la estructura `GamePlayStepConfig`:
  ```ts
  export type GamePlayStepConfig = {
    provider?: string;
    gameId?: string;
    minUniqueGames?: number;
    minBet: number;
  };
  ```
- Exclusión mutua estricta: se envía o `gameId` o `provider`.
- Cargar el catálogo de juegos y proveedores (`/panel/games`, `/panel/providers`) una sola vez al inicio en `MissionsList` y filtrar en memoria sin hacer llamadas API repetidas.
- Actualizar `StepCard`, `StepBuilder`, `MissionFormModal`, `api-mappers.ts`, y `MissionPreviewModal`.
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos en `@shared/types/admin.ts`, `apps/admin/src/types/missions/*`.
- [ ] Task 2: Métodos `getGames` y `getProviders` en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: Componente `LocalSearchSelect.tsx`.
- [ ] Task 4: `StepCard.tsx`, `StepBuilder.tsx`, `api-mappers.ts`, `MissionFormModal.tsx`.
- [ ] Task 5: `MissionsList.tsx` y `MissionPreviewModal.tsx`.
- [ ] Task 6: Verificación con `pnpm format && pnpm ci`.
