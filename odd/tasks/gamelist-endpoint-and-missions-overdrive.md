# Feature Tasks: gamelist-endpoint-and-missions-overdrive

## Task 1: Change gameList endpoint to LuckyBet backend API
- Add `getGameList()` method in `apps/web/src/libs/apiWebGanaya.ts` hitting `GET /panel/games`.
- Update `apps/web/src/hooks/useDashboardData.ts` to call `webApi.getGameList()` instead of `luckybetClient.getGameList()`.
- Add backend game item types in `apps/web/src/types/` or `@shared/types/`.
- Status: pending

## Task 2: Refactor Missions Overview Page (`apps/web/src/app/dashboard/missions/page.tsx`) with Impeccable Bold Overdrive & Colorize
- Design Midnight Harbor Overdrive atmosphere: ambient radial glows, luminous typography, Bento-grid organization.
- Add dynamic stats bar (Fichas reclamables, Total misiones activas, Multiplicador XP).
- Add filter tabs (Todas, Diarias, Permanentes, Especiales) with counts and glowing active indicator.
- Live animated countdown timer with pulse indicator.
- Maintain atomic component modularity (< 200 lines per file) and strict type safety.
- Status: pending

## Task 3: Refactor Mission Detail Page (`apps/web/src/app/dashboard/missions/[id]/page.tsx`) with Impeccable Bold Overdrive & Colorize
- Remove duplicate TopAppBar and layout wrapper conflict with DashboardLayout.
- Create Overdrive Hero section with radial glow, dynamic color theme per mission, animated reward badge, and high-contrast badges (XP, Fichas, Categoría).
- Create interactive Step Progression checklist with visual completion state, step number chips, and reward preview.
- Add high-energy CTA action buttons with gold glow (`#ffc640`), hover/tap micro-interactions, and back navigation.
- Status: pending

## Task 4: Verification, Linting & Build Checks
- Run `pnpm run format` and `pnpm run lint` (Biome).
- Run `pnpm run build:web`.
- Status: pending
