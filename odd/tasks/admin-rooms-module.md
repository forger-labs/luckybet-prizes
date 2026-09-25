# ODD Plan: Módulo de Salas (Admin UI & API Integration)

## 1. Contexto & Objetivos
- Integrar todos los endpoints del módulo `/rooms` en `apps/admin/src/libs/apiAdminGanaya.ts` (exceptuando `getActiveRooms` que fue retirado según la spec).
- Desarrollar la interfaz administrativa de Salas siguiendo el design system Midnight Harbor con `impeccable` (bold, animate, colorize), responsive y con paginación server-side basada en `take` y `skip`.
- Proteger el módulo para acceso exclusivo del rol `SUPER_ADMIN` mediante un componente `RoleGuard` reutilizable.
- Cumplir estrictamente las reglas de `RULES.md` (componentes < 200 líneas, Formik + Yup, `htmlFor`, tipos en `/src/types`, camelCase, cero `any`).

## 2. Tareas de Implementación
- [ ] Task 1: Definición de tipos y contratos en `@shared/types`, `apps/admin/src/types/adminRooms.ts` y `apps/admin/src/types/RoleGuard.ts`.
- [ ] Task 2: Integración de endpoints en `apps/admin/src/libs/apiAdminGanaya.ts`.
- [ ] Task 3: Registro de ruta `/panel/salas` y link en `packages/shared/src/constants.tsx`.
- [ ] Task 4: Creación de componente reutilizable `RoleGuard`.
- [ ] Task 5: Reducer `roomsReducer.ts` y thunks asíncronos.
- [ ] Task 6: Componentes modulares UI de Salas (`RoomsStatsCards`, `RoomsFilterBar`, `RoomRow`, `RoomsTable`, `RoomFormFields`, `RoomFormModal`, `RoomsList`).
- [ ] Task 7: Página de Next.js `apps/admin/src/app/panel/salas/page.tsx`.
- [ ] Task 8: Verificación integral con `pnpm format && pnpm ci`.

## 3. Evidencia & Commits
- En progreso.
