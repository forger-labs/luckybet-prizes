"use client";

import type { PrizesStatsCardsProps } from "@/types/adminChests";

export function PrizesStatsCards({
  totalPrizes,
  claimedPrizes,
  uncertainPrizes,
  pendingPrizes,
}: PrizesStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Registros Globales */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Reclamos (Global)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface mt-1">
            {totalPrizes}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            receipt_long
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
            {claimedPrizes}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center text-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.15)]">
          <span className="material-symbols-outlined text-2xl">verified</span>
        </div>
      </div>

      {/* Inciertos en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-error">
            Inciertos (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-error mt-1">
            {uncertainPrizes}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-error-container/20 border border-error/30 flex items-center justify-center text-error shadow-[0_0_12px_rgba(255,180,171,0.2)] ${
            uncertainPrizes > 0 ? "animate-pulse" : ""
          }`}
        >
          <span className="material-symbols-outlined text-2xl">warning</span>
        </div>
      </div>

      {/* Pendientes en esta página */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Pendientes (En esta pág.)
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-secondary mt-1">
            {pendingPrizes}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shadow-[0_0_12px_rgba(255,198,64,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            hourglass_top
          </span>
        </div>
      </div>
    </div>
  );
}

PrizesStatsCards.displayName = "PrizesStatsCards";
