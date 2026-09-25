# ODD Plan: Actualización del Módulo de Niveles (Levels)

## 1. Contexto & Objetivos
- Actualizar el módulo de niveles desacoplando el antiguo `bonus` y reemplazándolo por `roomId` (sala promocional asociada).
- Actualizar `apiAdminGanaya.ts` para soportar `roomId` en `getLevels`, `createLevel` y `updateLevel`.
- Integrar `SearchSelect` de salas (take <= 7, formato "Nombre - Bono") tanto en los filtros de la tabla como en el modal de creación/edición de niveles.
- Mostrar la información completa del nivel en la tabla (medalla, nombre, ID, exp mínima, monedas, sala promocional).
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos en `@shared/types/admin.ts`, `apps/admin/src/types/adminLevels.ts`.
- [ ] Task 2: Actualización de `getLevels` en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: Formulario de niveles (`LevelFormFields.tsx`, `LevelFormModal.tsx`).
- [ ] Task 4: Componentes de listado (`levelsReducer.ts`, `LevelsFilterBar.tsx`, `LevelRow.tsx`, `LevelsTable.tsx`, `LevelsList.tsx`).
- [ ] Task 5: Verificación con `pnpm format && pnpm ci`.
