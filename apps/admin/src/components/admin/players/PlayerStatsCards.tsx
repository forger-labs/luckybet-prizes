"use client";

import type { PlayerStatsProps } from "@/types/adminPlayers";

export function PlayerStatsCards({
  totalPlayers,
  activePlayers,
  suspendedPlayers,
  page,
  totalPages,
}: PlayerStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-on-surface-variant block">
          Total Jugadores
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {totalPlayers}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-[#4ade80] block">
          Jugadores Activos
        </span>
        <span className="text-2xl font-bold text-[#4ade80] mt-1 block">
          {activePlayers}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-secondary block">Suspendidos</span>
        <span className="text-2xl font-bold text-secondary mt-1 block">
          {suspendedPlayers}
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

PlayerStatsCards.displayName = "PlayerStatsCards";
