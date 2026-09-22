"use client";

import type { MissionStatsProps } from "@/types/missions/MissionStats";

export function MissionStatsCards({
  totalMissions,
  activeCount,
  totalParticipants,
  page,
  totalPages,
}: MissionStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-on-surface-variant block">
          Total Misiones
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {totalMissions}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-primary block">
          Misiones Activas
        </span>
        <span className="text-2xl font-bold text-primary mt-1 block">
          {activeCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-secondary block">
          Participantes
        </span>
        <span className="text-2xl font-bold text-secondary mt-1 block">
          {totalParticipants.toLocaleString()}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-on-surface-variant block">
          Páginas
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {page} / {totalPages || 1}
        </span>
      </div>
    </div>
  );
}

MissionStatsCards.displayName = "MissionStatsCards";
