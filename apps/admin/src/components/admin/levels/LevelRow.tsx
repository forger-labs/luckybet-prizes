"use client";

import Image from "next/image";

import type { LevelRowProps } from "@/types/adminLevels";

export function LevelRow({ level, onEdit }: LevelRowProps) {
  const bonusNum = level.room ? Number(level.room.bonus) || 0 : 0;

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Medal / Symbol */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl bg-surface-container-highest/60 border border-outline-variant/30 flex items-center justify-center overflow-hidden shrink-0 shadow-inner group-hover:border-primary/40 transition-colors">
            {level.image ? (
              <Image
                src={level.image}
                alt={`Medalla ${level.name}`}
                width={44}
                height={44}
                unoptimized
                className="w-full h-full object-contain p-1"
              />
            ) : (
              <span className="material-symbols-outlined text-primary text-2xl">
                military_tech
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Level Name & ID */}
      <td className="py-4 px-4">
        <div className="min-w-0">
          <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
            {level.name}
          </span>
          <span className="text-[11px] text-on-surface-variant/70 block">
            ID: #{level.id}
          </span>
        </div>
      </td>

      {/* Min Experience */}
      <td className="py-4 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-semibold bg-tertiary/10 text-tertiary border border-tertiary/25">
          <span className="material-symbols-outlined text-xs">speed</span>
          <span>{level.minExperience.toLocaleString()} XP</span>
        </div>
      </td>

      {/* Coins */}
      <td className="py-4 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-semibold bg-secondary/10 text-secondary border border-secondary/25">
          <span className="material-symbols-outlined text-xs">
            monetization_on
          </span>
          <span>{level.coins.toLocaleString()}</span>
        </div>
      </td>

      {/* Sala Promocional Asociada */}
      <td className="py-4 px-4">
        {level.room ? (
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-on-surface">
              {level.room.name}
            </span>
            <span className="text-[11px] text-secondary font-mono">
              {bonusNum > 0 ? `+${level.room.bonus}% Bono` : "0% Bono"}
            </span>
          </div>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm text-outline border border-outline-variant/20 bg-surface-container-lowest/60">
            Sin sala
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(level)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-outline hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all cursor-pointer"
            aria-label={`Editar nivel ${level.name}`}
            title="Editar nivel"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

LevelRow.displayName = "LevelRow";
