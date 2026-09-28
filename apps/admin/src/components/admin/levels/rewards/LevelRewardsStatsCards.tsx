"use client";

import type { LevelRewardsStatsProps } from "@/types/adminLevels";

export function LevelRewardsStatsCards({
  totalRewards,
  claimedInPage,
  uncertainInPage,
  pendingInPage,
}: LevelRewardsStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Registros Globales */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Reclamos (Global)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface mt-1">
            {totalRewards}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            military_tech
          </span>
        </div>
      </div>

      {/* Acreditados en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Acreditados (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-[#4ade80] mt-1">
            {claimedInPage}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#4ade80]">
          <span className="material-symbols-outlined text-2xl">verified</span>
        </div>
      </div>

      {/* Reintentos / Inciertos en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Inciertos (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-error mt-1">
            {uncertainInPage}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-error/10 border border-error/20 flex items-center justify-center text-error">
          <span className="material-symbols-outlined text-2xl">
            error_outline
          </span>
        </div>
      </div>

      {/* Pendientes en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Pendientes (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-secondary mt-1">
            {pendingInPage}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-2xl">
            hourglass_empty
          </span>
        </div>
      </div>
    </div>
  );
}

LevelRewardsStatsCards.displayName = "LevelRewardsStatsCards";
