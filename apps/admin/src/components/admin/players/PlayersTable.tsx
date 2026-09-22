"use client";

import type { PlayersTableProps } from "@/types/adminPlayers";
import { PlayerRow } from "./PlayerRow";

export function PlayersTable({ players }: PlayersTableProps) {
  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60 backdrop-blur-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">
            stadia_controller
          </span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No se encontraron jugadores
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          Intente con otros criterios de búsqueda o verifique que existan
          registros en la plataforma.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70 backdrop-blur-md shadow-xl">
      <table className="w-full text-left border-collapse min-w-[540px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Jugador
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Teléfono
            </th>
            <th className="py-3.5 px-4 sm:pr-6 text-right text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

PlayersTable.displayName = "PlayersTable";
