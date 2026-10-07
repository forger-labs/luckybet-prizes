# ODD Plan: Preview de Cartas de Misiones, Countdown en Vivo y Acciones Inline

## 1. Contexto & Objetivos
- Eliminar completamente los dropdowns en las acciones de la tabla de misiones para evitar desbordes y roturas en responsive.
- Eliminar las acciones de duplicar y eliminar (no disponibles en backend).
- Implementar botón directo de **Preview (Vista Previa)** en la botonera de acciones.
- Crear `MissionPreviewModal` que muestre la carta tal como la ve el jugador final, calculando el total final de fichas: `fichas + (fichas * bono%)` (en lugar de mostrar el porcentaje plano).
- Mostrar un contador de tiempo restante en vivo (`MissionCountdown`) para cada misión activa con indicador cromático de urgencia.
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos en `apps/admin/src/types/missions/MissionPreview.ts`, `apps/admin/src/types/missions/MissionTable.ts`, `apps/admin/src/types/missions/RowActions.ts`, `packages/shared/src/types/admin.ts`.
- [ ] Task 2: Componente `MissionCountdown.tsx`.
- [ ] Task 3: Modal `MissionPreviewModal.tsx`.
- [ ] Task 4: Refactorización de `RowActions.tsx` y `MissionRow.tsx`.
- [ ] Task 5: Integración en `MissionsList.tsx` y verificación con `pnpm format && pnpm ci`.
