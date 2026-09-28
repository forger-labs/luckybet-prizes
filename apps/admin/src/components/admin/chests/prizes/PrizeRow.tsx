"use client";

import Image from "next/image";

import type { PrizeRowProps } from "@/types/adminChests";

export function PrizeRow({
  prize,
  onViewDetail,
  onResolveClaim,
}: PrizeRowProps) {
  const isUncertain = prize.status === "TIMEOUT_UNCERTAIN";
  const isClaimed = prize.status === "CLAIMED";
  const isProcessing = prize.status === "PROCESSING";

  const bonusNum = prize.room ? Number(prize.room.bonus) || 0 : 0;
  const initial = prize.player.username
    ? prize.player.username.charAt(0).toUpperCase()
    : "J";

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Column 1: Jugador */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-primary shadow-sm shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
              {prize.player.username}
            </span>
            <span className="text-[11px] text-outline block">
              Player ID: #{prize.playerId}
            </span>
          </div>
        </div>
      </td>

      {/* Column 2: Cofre (Thumbnail 16:9 + Título + Periodo) */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 aspect-video rounded-lg bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
            {prize.chest.imageUrl ? (
              <Image
                src={prize.chest.imageUrl}
                alt={prize.chest.title}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-primary text-base">
                inventory_2
              </span>
            )}
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-xs text-on-surface block truncate">
              {prize.chest.title}
            </span>
            <span className="text-[11px] text-outline block font-mono">
              {prize.periodKey} · Meta: {prize.completedMissionsCount}/
              {prize.chest.requiredMissions}
            </span>
          </div>
        </div>
      </td>

      {/* Column 3: Recompensa & Sala */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1 text-label-sm">
          <span className="inline-flex items-center gap-1 text-secondary font-bold text-xs">
            <span className="material-symbols-outlined text-xs">token</span>
            <span>{prize.coinsAmount.toLocaleString()} fichas</span>
          </span>

          {prize.room ? (
            <span className="text-[11px] text-primary font-semibold">
              Sala: {prize.room.name} (
              {bonusNum > 0 ? `+${prize.room.bonus}% Bono` : "0% Bono"})
            </span>
          ) : (
            <span className="text-[11px] text-outline">
              Sin sala promocional
            </span>
          )}
        </div>
      </td>

      {/* Column 4: Estado */}
      <td className="py-4 px-4">
        {isClaimed ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            Entregado
          </span>
        ) : isUncertain ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-error-container/30 text-error border border-error/40 font-bold animate-pulse shadow-[0_0_8px_rgba(255,180,171,0.25)]">
            <span className="material-symbols-outlined text-xs">warning</span>
            Incierto
          </span>
        ) : isProcessing ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-primary/15 text-primary border border-primary/30 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            En Proceso
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-secondary/15 text-secondary border border-secondary/30 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Pendiente
          </span>
        )}
      </td>

      {/* Column 5: Acciones Inline */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          {/* View Details Modal */}
          <button
            type="button"
            onClick={() => onViewDetail(prize)}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/30 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Ver detalles de auditoría"
            aria-label="Ver detalles de auditoría"
          >
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
          </button>

          {/* Resolve Claim (Only for TIMEOUT_UNCERTAIN) */}
          {isUncertain && (
            <button
              type="button"
              onClick={() => onResolveClaim(prize)}
              className="px-2.5 py-1.5 rounded-lg bg-error-container/25 hover:bg-error-container/40 text-error border border-error/40 font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-sm"
              title="Resolver reclamo incierto"
              aria-label="Resolver reclamo incierto"
            >
              <span className="material-symbols-outlined text-sm">build</span>
              <span>Resolver</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

PrizeRow.displayName = "PrizeRow";
