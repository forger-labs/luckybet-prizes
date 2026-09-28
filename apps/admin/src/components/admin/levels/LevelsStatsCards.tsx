"use client";

import type { LevelsStatsCardsProps } from "@/types/adminLevels";

export function LevelsStatsCards({
  totalLevels,
  maxExperience,
  totalCoins,
}: LevelsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {/* Total Levels */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20  flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            military_tech
          </span>
        </div>
        <div className="min-w-0">
          <span className="text-label-sm text-on-surface-variant block">
            Total Niveles
          </span>
          <span className="text-2xl font-bold text-on-surface mt-0.5 block truncate">
            {totalLevels}
          </span>
        </div>
      </div>

      {/* Max Experience Required */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20  flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/25 flex items-center justify-center text-tertiary shrink-0 shadow-[0_0_15px_rgba(163,171,255,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            trending_up
          </span>
        </div>
        <div className="min-w-0">
          <span className="text-label-sm text-tertiary block">
            Exp. Máxima Requerida
          </span>
          <span className="text-2xl font-bold text-on-surface mt-0.5 block truncate">
            {maxExperience.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Total Coins / Rewards */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20  flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0 shadow-[0_0_15px_rgba(255,198,64,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            monetization_on
          </span>
        </div>
        <div className="min-w-0">
          <span className="text-label-sm text-secondary block">
            Total Monedas
          </span>
          <span className="text-2xl font-bold text-on-surface mt-0.5 block truncate">
            {totalCoins.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

LevelsStatsCards.displayName = "LevelsStatsCards";
