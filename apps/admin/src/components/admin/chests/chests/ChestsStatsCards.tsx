"use client";

import type { ChestsStatsCardsProps } from "@/types/adminChests";

export function ChestsStatsCards({
  totalChests,
  activeChests,
  weeklyChests,
  monthlyChests,
}: ChestsStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Global */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Cofres (Global)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface mt-1">
            {totalChests}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            inventory_2
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
            {activeChests}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center text-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            check_circle
          </span>
        </div>
      </div>

      {/* Semanales en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Semanales (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-secondary mt-1">
            {weeklyChests}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shadow-[0_0_12px_rgba(255,198,64,0.15)]">
          <span className="material-symbols-outlined text-2xl">date_range</span>
        </div>
      </div>

      {/* Mensuales en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Mensuales (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-tertiary mt-1">
            {monthlyChests}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/25 flex items-center justify-center text-tertiary shadow-[0_0_12px_rgba(197,201,255,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            calendar_month
          </span>
        </div>
      </div>
    </div>
  );
}

ChestsStatsCards.displayName = "ChestsStatsCards";
