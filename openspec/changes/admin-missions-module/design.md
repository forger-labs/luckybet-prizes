# Design: Admin Missions Management Module

## Technical Approach

Build the admin missions module as a SPA-like experience within Next.js App Router: the panel layout (`/panel/layout.tsx`) provides the admin shell, `/panel` becomes the mission control page, and create/edit is a modal overlay (no route change). Mock data service with typed Promises — swapable later for real API. State via `useReducer` in the page component.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Modal vs separate route for form | Route loses filter/search state; modal keeps it | **Modal** — admin tools need context retention |
| `useReducer` vs Context vs Zustand | Reducer is self-contained and testable; no external deps | **useReducer** — page-local state, zero new deps |
| Sidebar vs top nav | Sidebar scales more nav items; matches web app pattern | **Sidebar** — collapsible desktop, drawer mobile |
| New `AdminMission` type vs inline | Shared types prevent drift across components | **Extend shared types** — `types/admin.ts` with `AdminMission`, `MissionStatus`, `MissionStep` |
| Material Symbols for icons vs new icons | Already loaded in root layout; zero cost | **Material Symbols** — reuse existing pattern |

## Component Tree

```
panel/layout.tsx
├── AdminSidebar              — desktop collapsible sidebar
│   ├── Logo + user badge ("Midnight Harbor" + "Elite Member")
│   ├── NavItems (Misiones*, Revisión de Tareas, Usuarios)
│   ├── Claim Daily Bonus CTA  — gold button, no-op
│   └── Settings + Logout (bottom)
├── MobileDrawer              — overlay triggered by hamburger
└── panel/page.tsx            — Mission Control
    ├── SearchBar + "Crear misión" button
    ├── FilterTabs (All | Active | Inactive | Completed | Cancelled)
    ├── MissionsTable
    │   ├── MissionRow × N
    │   │   ├── Title + reward (token + XP)
    │   │   ├── StatusBadge (Inactive=gray, Active=blue, Completed=green, Cancelled=red)
    │   │   ├── Steps count, Participants count
    │   │   └── RowActions (Edit | Activate | Cancel | View | Delete)
    │   └── Pagination
    ├── RightSidebar (Mission Assets placeholder + Config hint)
    └── MissionFormModal      — create/edit overlay
        ├── ContentLockBanner (if status=active)
        ├── MissionFields (title, desc, token, bonus%, XP, category select, cover upload)
        ├── StepBuilder
        │   └── StepCard × N (title, verification-type select, up/down/remove)
        └── Footer (Cancel | Guardar)
```

## Data Flow

```
User action → Page Component → dispatch(action) → Reducer → new state
                                ↕
                        MockDataService (typed Promises)
                        reads/writes in-memory array
```

The reducer handles: `LOAD_MISSIONS`, `SET_FILTER`, `SET_SEARCH`, `CREATE_MISSION`, `UPDATE_MISSION`, `ACTIVATE_MISSION`, `CANCEL_MISSION`, `DELETE_MISSION`. Each mutation calls the mock service, then updates state.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `packages/shared/src/types/admin.ts` | Create | `AdminMission`, `MissionStatus`, `MissionStep`, `MissionCategory`, `VerificationType` |
| `packages/shared/src/types/mission.ts` | Modify | Keep existing `Mission`; no changes needed |
| `packages/shared/src/types/index.ts` | Modify | Export new admin types |
| `packages/shared/src/constants.tsx` | Modify | Add `ADMIN_ROUTES`, `ADMIN_LINKS` array for sidebar |
| `apps/admin/src/app/panel/layout.tsx` | Create | Admin shell: sidebar + mobile drawer + content area |
| `apps/admin/src/app/panel/page.tsx` | Modify | Replace placeholder → Mission Control page |
| `apps/admin/src/components/admin/layout/AdminSidebar.tsx` | Create | Desktop sidebar with nav, CTA, user badge |
| `apps/admin/src/components/admin/layout/MobileDrawer.tsx` | Create | Mobile overlay drawer |
| `apps/admin/src/components/admin/missions/MissionsList.tsx` | Create | Main orchestrator: search, filters, table, right sidebar |
| `apps/admin/src/components/admin/missions/FilterTabs.tsx` | Create | Status filter chips |
| `apps/admin/src/components/admin/missions/MissionTable.tsx` | Create | Table layout |
| `apps/admin/src/components/admin/missions/MissionRow.tsx` | Create | Single mission row with actions |
| `apps/admin/src/components/admin/missions/RowActions.tsx` | Create | Contextual action dropdown |
| `apps/admin/src/components/admin/missions/MockDataService.ts` | Create | In-memory mock CRUD — typed Promises |
| `apps/admin/src/components/admin/missions/MissionsReducer.ts` | Create | State reducer + action types |
| `apps/admin/src/components/admin/mission-form/MissionFormModal.tsx` | Create | Modal wrapper + form layout |
| `apps/admin/src/components/admin/mission-form/MissionFields.tsx` | Create | Form field group |
| `apps/admin/src/components/admin/mission-form/StepBuilder.tsx` | Create | Step list + add/remove/reorder |
| `apps/admin/src/components/admin/mission-form/StepCard.tsx` | Create | Single step row |
| `apps/admin/src/components/ui/Modal.tsx` | Create | Glassmorphism modal overlay |
| `apps/admin/src/components/ui/Select.tsx` | Create | Dropdown select |
| `apps/admin/src/components/ui/Textarea.tsx` | Create | Multi-line input |
| `apps/admin/src/components/ui/Badge.tsx` | Create | Status badge (color variants) |
| `apps/admin/src/components/ui/Pagination.tsx` | Create | Page navigation |
| `apps/admin/src/components/ui/DropdownMenu.tsx` | Create | Action dropdown menu |

## Interfaces / Types

```typescript
// packages/shared/src/types/admin.ts
type MissionStatus = 'inactive' | 'active' | 'completed' | 'cancelled';
type MissionCategory = 'daily' | 'weekly' | 'fixed' | 'special_event';
type VerificationType = 'IMAGE' | 'TEXT';

interface MissionStep {
  id: string;
  title: string;
  verificationType: VerificationType;
  description?: string;
  order: number;
}

interface AdminMission {
  id: string;
  title: string;
  description: string;
  tokenReward: number;
  bonusPercent: number;
  xpReward: number;
  category: MissionCategory;
  status: MissionStatus;
  steps: MissionStep[];
  coverImage?: string;       // base64 or URL
  participants: number;
  createdAt: string;          // ISO
  startedAt?: string;         // ISO — when activated
  completedAt?: string;       // ISO — when completed/cancelled
  cancelReason?: string;
}
```

## New UI Atoms Specification

All atoms follow the existing pattern: `"use client"`, `forwardRef`, extend HTML attributes, implement Tailwind v4 `@theme` tokens, support Material Symbols icons.

| Atom | Props | Key States |
|------|-------|------------|
| `Modal` | `open, onClose, title, children` | Open/close with backdrop blur + fade |
| `Select` | `icon?, options: {value,label}[], placeholder` | Focus glow per Input pattern |
| `Textarea` | `icon?, rows, maxLength, error?` | Same glow/focus as Input |
| `Badge` | `variant: 'inactive'\|'active'\|'completed'\|'cancelled'` | Color map: gray/blue/green/red |
| `Pagination` | `current, total, onChange` | Active page highlight |
| `DropdownMenu` | `items: {label, icon?, onClick, variant?}[]` | Open/close, item hover |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | All flows | Open browser, verify spec scenarios |
| TypeScript | Type correctness | `tsc --noEmit` — strict mode catches contract violations |
| Lint | Code style | `pnpm biome check` |

No test framework installed per config. Manual verification against spec scenarios is the strategy until vitest/playwright is added.

## Migration / Rollout

No migration required — this is a net-new module with no existing data or routes to transition. The old `/panel` placeholder is replaced atomically.

## Open Questions

- [ ] ExpandMenu/CloseMenu icons from shared vs Material Symbols — which for hamburger toggle?
- [ ] Should settings link be a real route or placeholder?
- [ ] Right sidebar: standalone component or part of MissionsList?
