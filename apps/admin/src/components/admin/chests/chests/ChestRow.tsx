"use client";

import Image from "next/image";

import type { ChestRowProps } from "@/types/adminChests";

export function ChestRow({
  chest,
  onPreview,
  onEdit,
  onToggleStatus,
}: ChestRowProps) {
  const bonusNum = chest.room ? Number(chest.room.bonus) || 0 : 0;
  const isWeekly = chest.periodType === "WEEKLY";

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Column 1: Image 16:9 + Title + Period */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3.5">
          {/* Thumbnail 16:9 (Aspect Video) */}
          <div className="relative w-16 aspect-video rounded-xl bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
            {chest.imageUrl ? (
              <Image
                src={chest.imageUrl}
                alt={chest.title}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-primary text-xl">
                inventory_2
              </span>
            )}
          </div>

          {/* Title & Period Tag */}
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
              {chest.title}
            </p>
            <div className="flex items-center gap-2 text-label-sm">
              <span
                className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider ${
                  isWeekly
                    ? "bg-secondary/15 text-secondary border border-secondary/30"
                    : "bg-tertiary/15 text-tertiary border border-tertiary/30"
                }`}
              >
                {isWeekly ? "Semanal" : "Mensual"}
              </span>
              <span className="text-[11px] text-outline">
                Meta: {chest.requiredMissions} misiones
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Column 2: Rewards & Sala */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1 text-label-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20 text-secondary font-medium text-xs">
              <span className="material-symbols-outlined text-xs">token</span>
              <span>{chest.coinsAmount.toLocaleString()} fichas</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-medium text-xs">
              <span className="material-symbols-outlined text-xs">stars</span>
              <span>{chest.experiencePoints.toLocaleString()} XP</span>
            </span>
          </div>

          {chest.room ? (
            <span className="text-[11px] text-primary font-semibold">
              Sala: {chest.room.name} (
              {bonusNum > 0 ? `+${chest.room.bonus}% Bono` : "0% Bono"})
            </span>
          ) : (
            <span className="text-[11px] text-outline">
              Sin sala promocional
            </span>
          )}
        </div>
      </td>

      {/* Column 3: Status Badge */}
      <td className="py-4 px-4">
        {chest.isActive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            Activo
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-outline-variant/20 text-on-surface-variant border border-outline-variant/30">
            <span className="w-1.5 h-1.5 rounded-full bg-outline" />
            Inactivo
          </span>
        )}
      </td>

      {/* Column 4: Inline Actions */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          {/* Preview */}
          <button
            type="button"
            onClick={() => onPreview(chest)}
            className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Vista previa del cofre (16:9)"
            aria-label="Vista previa del cofre"
          >
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(chest)}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/30 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Editar cofre"
            aria-label="Editar cofre"
          >
            <span className="material-symbols-outlined text-base">edit</span>
          </button>

          {/* Toggle status */}
          <button
            type="button"
            onClick={() => onToggleStatus(chest)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
              chest.isActive
                ? "bg-surface-container text-on-surface-variant hover:text-error hover:bg-error-container/20 hover:border-error/30 border-outline-variant/30"
                : "bg-surface-container text-on-surface-variant hover:text-[#4ade80] hover:bg-[#22c55e]/20 hover:border-[#22c55e]/30 border-outline-variant/30"
            }`}
            title={chest.isActive ? "Pausar cofre" : "Activar cofre"}
            aria-label={chest.isActive ? "Pausar cofre" : "Activar cofre"}
          >
            <span className="material-symbols-outlined text-base">
              {chest.isActive ? "pause" : "play_arrow"}
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

ChestRow.displayName = "ChestRow";
