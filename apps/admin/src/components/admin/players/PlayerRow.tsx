"use client";

import type { PlayerRowProps } from "@/types/adminPlayers";

export function PlayerRow({ player }: PlayerRowProps) {
  const initial = player.username
    ? player.username.charAt(0).toUpperCase()
    : "J";

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Username + Avatar */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-primary shadow-sm shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
              {player.username}
            </span>
            <span className="text-[11px] text-on-surface-variant/70 block">
              ID: #{player.id}
            </span>
          </div>
        </div>
      </td>

      {/* Phone */}
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

      {/* Status */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-semibold border ${
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
    </tr>
  );
}

PlayerRow.displayName = "PlayerRow";
