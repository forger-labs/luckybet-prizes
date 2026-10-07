"use client";

import type { MissionStatsProps } from "@/types/missions/MissionStats";

export function MissionStatsCards({
  totalMissions,
  activeCount,
  dailyCount,
  weeklyCount,
}: MissionStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Global */}
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant block">
          Total Misiones (Global)
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {totalMissions}
        </span>
      </div>

      {/* Activas en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary block">
          Activas (En esta pág.)
        </span>
        <span className="text-2xl font-bold text-primary mt-1 block">
          {activeCount}
        </span>
      </div>

      {/* Diarias en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary block">
          Diarias (En esta pág.)
        </span>
        <span className="text-2xl font-bold text-secondary mt-1 block">
          {dailyCount}
        </span>
      </div>

      {/* Semanales en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-tertiary block">
          Semanales (En esta pág.)
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {weeklyCount}
        </span>
      </div>
    </div>
  );
}

MissionStatsCards.displayName = "MissionStatsCards";
