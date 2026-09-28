"use client";

import type { ReviewStatsProps } from "@/types/review/ReviewSubmission";

export function ReviewStatsCards({
  totalMissions,
  inProgressCount,
  completedCount,
  pendingStepsCount,
}: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20">
        <span className="text-label-sm text-secondary block">
          Pasos Pendientes
        </span>
        <span className="text-2xl font-bold text-secondary mt-1 block">
          {pendingStepsCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20">
        <span className="text-label-sm text-primary block">
          Misiones en Progreso
        </span>
        <span className="text-2xl font-bold text-primary mt-1 block">
          {inProgressCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20">
        <span className="text-label-sm text-[#4ade80] block">
          Misiones Completadas
        </span>
        <span className="text-2xl font-bold text-[#4ade80] mt-1 block">
          {completedCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20">
        <span className="text-label-sm text-on-surface-variant block">
          Total Misiones
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {totalMissions}
        </span>
      </div>
    </div>
  );
}

ReviewStatsCards.displayName = "ReviewStatsCards";
