"use client";

import type { PlayerStatsProps } from "@/types/adminPlayers";

export function PlayerStatsCards({
  totalPlayers,
  activePlayers,
  suspendedPlayers,
  totalExperience,
}: PlayerStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Global */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Jugadores (Global)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface mt-1">
            {totalPlayers}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            stadia_controller
          </span>
        </div>
      </div>

      {/* Activos en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Activos (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-[#4ade80] mt-1">
            {activePlayers}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center text-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            check_circle
          </span>
        </div>
      </div>

      {/* Suspendidos en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
            Suspendidos (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-secondary mt-1">
            {suspendedPlayers}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shadow-[0_0_12px_rgba(255,198,64,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            pause_circle
          </span>
        </div>
      </div>

      {/* XP Acumulada en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            XP Acumulada (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-primary-fixed-dim mt-1">
            {totalExperience.toLocaleString()} XP
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/25 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">bolt</span>
        </div>
      </div>
    </div>
  );
}

PlayerStatsCards.displayName = "PlayerStatsCards";
