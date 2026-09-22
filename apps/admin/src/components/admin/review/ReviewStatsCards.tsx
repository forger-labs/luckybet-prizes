"use client";

import type { ReviewStatsProps } from "@/types/review/ReviewSubmission";

export function ReviewStatsCards({
  totalPending,
  totalApproved,
  totalRejected,
  page,
  totalPages,
}: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-secondary block">
          Pendientes de Revisión
        </span>
        <span className="text-2xl font-bold text-secondary mt-1 block">
          {totalPending}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-[#4ade80] block">
          Tareas Aprobadas
        </span>
        <span className="text-2xl font-bold text-[#4ade80] mt-1 block">
          {totalApproved}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-error block">
          Tareas Rechazadas
        </span>
        <span className="text-2xl font-bold text-error mt-1 block">
          {totalRejected}
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

ReviewStatsCards.displayName = "ReviewStatsCards";
