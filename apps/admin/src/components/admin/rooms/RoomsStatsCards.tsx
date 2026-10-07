"use client";

import type { RoomsStatsCardsProps } from "@/types/adminRooms";

export function RoomsStatsCards({
  totalRooms,
  activeRooms,
  bonusRoomsCount,
  highestBonus,
}: RoomsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Rooms */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-label-sm font-medium text-on-surface-variant">
            Total de Salas
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface mt-1">
            {totalRooms}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            meeting_room
          </span>
        </div>
      </div>

      {/* Active Rooms */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-label-sm font-medium text-on-surface-variant">
            Salas Activas
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-[#4ade80] mt-1">
            {activeRooms}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center text-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.15)]">
          <span className="material-symbols-outlined text-2xl">
            check_circle
          </span>
        </div>
      </div>

      {/* Bonus Rooms */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-label-sm font-medium text-on-surface-variant">
            Con Bono Promocional
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-secondary mt-1">
            {bonusRoomsCount}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shadow-[0_0_12px_rgba(255,198,64,0.15)]">
          <span className="material-symbols-outlined text-2xl">percent</span>
        </div>
      </div>

      {/* Highest Bonus */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-label-sm font-medium text-on-surface-variant">
            Mayor Bono Disponible
          </p>
          <p className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-primary-fixed-dim mt-1">
            +{highestBonus}%
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/25 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)]">
          <span className="material-symbols-outlined text-2xl">stars</span>
        </div>
      </div>
    </div>
  );
}

RoomsStatsCards.displayName = "RoomsStatsCards";
