"use client";

import type { PlayerRowProps } from "@/types/adminPlayers";

export function PlayerRow({ player, onEdit, onToggleStatus }: PlayerRowProps) {
  const initial = player.username
    ? player.username.charAt(0).toUpperCase()
    : "J";

  const bonusNum = player.room ? Number(player.room.bonus) || 0 : 0;

  return (
    <tr className="border-b border-outline-variant/15 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Jugador (Avatar + Username + ID) */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-primary shadow-sm shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
              {player.username}
            </span>
            <span className="text-[11px] text-outline block">
              ID: #{player.id}
            </span>
          </div>
        </div>
      </td>

      {/* Teléfono */}
      <td className="py-4 px-4 text-body-md text-on-surface-variant">
        {player.phone ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs">
            <span className="material-symbols-outlined text-sm text-outline">
              call
            </span>
            <span>{player.phone}</span>
          </span>
        ) : (
          <span className="text-outline text-xs">Sin teléfono</span>
        )}
      </td>

      {/* Nivel & Experiencia */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-base">
              military_tech
            </span>
          </div>
          <div>
            <p className="font-semibold text-xs text-on-surface">
              {player.level?.name || "Nivel Inicial"}
            </p>
            <p className="text-[11px] text-primary font-mono">
              {player.experience ?? 0} XP
            </p>
          </div>
        </div>
      </td>

      {/* Sala Asignada */}
      <td className="py-4 px-4">
        {player.room ? (
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-on-surface">
              {player.room.name}
            </span>
            <span className="text-[11px] text-secondary font-mono">
              {bonusNum > 0 ? `+${player.room.bonus}% Bono` : "0% Bono"}
            </span>
          </div>
        ) : (
          <span className="text-outline text-xs">Sin sala</span>
        )}
      </td>

      {/* Estado */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-semibold border ${
            player.isActive
              ? "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30"
              : "bg-secondary/15 text-secondary border-secondary/30"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              player.isActive ? "bg-[#4ade80] animate-pulse" : "bg-secondary"
            }`}
          />
          <span>{player.isActive ? "Activo" : "Suspendido"}</span>
        </span>
      </td>

      {/* Acciones */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Toggle status */}
          <button
            type="button"
            onClick={() => onToggleStatus(player)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
              player.isActive
                ? "bg-surface-container text-on-surface-variant hover:text-error hover:bg-error-container/20 hover:border-error/30 border-outline-variant/30"
                : "bg-surface-container text-on-surface-variant hover:text-[#4ade80] hover:bg-[#22c55e]/20 hover:border-[#22c55e]/30 border-outline-variant/30"
            }`}
            title={player.isActive ? "Suspender jugador" : "Activar jugador"}
            aria-label={
              player.isActive ? "Suspender jugador" : "Activar jugador"
            }
          >
            <span className="material-symbols-outlined text-base">
              {player.isActive ? "pause" : "play_arrow"}
            </span>
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(player)}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-primary/15 text-on-surface-variant hover:text-primary border border-outline-variant/30 hover:border-primary/40 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Editar datos del jugador"
            aria-label="Editar datos del jugador"
          >
            <span className="material-symbols-outlined text-base">edit</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

PlayerRow.displayName = "PlayerRow";
