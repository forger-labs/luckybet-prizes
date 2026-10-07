# ODD Plan: Módulo de Cofres y Premios de Cofres (Admin)

## 1. Contexto & Objetivos
- Implementar los endpoints del catálogo de cofres (`/chests`) y de auditoría de premios (`/player-chests/admin`) en `apps/admin/src/libs/apiAdminGanaya.ts`.
- Crear interfaz para gestión de cofres en `/panel/cofres`:
  - Formato de imagen 16:9 para cofres.
  - Vista previa de cofres con modal `ChestPreviewModal.tsx`.
  - Creación y edición con `ChestFormModal.tsx` usando salas precargadas en memoria.
- Crear interfaz para visualización de premios y reclamos de cofres:
  - Mostrar jugador (`username`, `id`), cofre (`title`, `requiredMissions`, `imageUrl` 16:9), periodo (`periodKey`), misiones completadas, fichas ganadas, sala con bono, y estado.
  - Modal `PrizeDetailModal.tsx` para ver detalles adicionales (admin que lo resolvió, `errorMessage`, `externalOperationId`, notas, fechas).
  - Modal `ResolveClaimModal.tsx` para resolver reclamos en estado `TIMEOUT_UNCERTAIN` (`RESOLVE_CLAIMED` con `externalOperationId` y `adminNotes` vs `FORCE_RETRY`).
- Switch dual entre Catálogo y Premios con persistencia en `localStorage` (`admin_active_chests_tab`).
- Cumplir estrictamente con `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Tipos en `@shared/types/admin.ts`, `apps/admin/src/types/adminChests.ts`.
- [ ] Task 2: Métodos en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: Registro de ruta `/panel/cofres` y enlace en `ADMIN_LINKS`.
- [ ] Task 4: Componentes de Catálogo de Cofres.
- [ ] Task 5: Componentes de Premios y Reclamos.
- [ ] Task 6: Orquestador y Página `/panel/cofres`.
- [ ] Task 7: Verificación con `pnpm format && pnpm ci`.
