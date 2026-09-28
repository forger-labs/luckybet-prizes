"use client";

import type { RoomRowProps } from "@/types/adminRooms";

export function RoomRow({ room, onEdit, onToggleStatus }: RoomRowProps) {
  const bonusNum = Number(room.bonus) || 0;

  const getBonusBadgeStyle = () => {
    if (bonusNum === 0) {
      return "bg-outline-variant/20 text-on-surface-variant border-outline-variant/30";
    }
    if (bonusNum >= 100) {
      return "bg-secondary/15 text-secondary border-secondary/30 shadow-[0_0_10px_rgba(255,198,64,0.15)] font-bold";
    }
    return "bg-primary/15 text-primary border-primary/30";
  };

  const formattedDate = room.createdAt
    ? new Date(room.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <tr className="border-b border-outline-variant/15 hover:bg-surface-container-high/40 transition-colors group">
      {/* ID */}
      <td className="py-4 px-4 font-mono text-label-sm text-outline">
        #{room.id}
      </td>

      {/* Name */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0 border border-outline-variant/20">
            <span className="material-symbols-outlined text-lg">
              meeting_room
            </span>
          </div>
          <div>
            <p className="font-(--font-plus-jakarta-sans) font-semibold text-on-surface text-body-md group-hover:text-primary transition-colors">
              {room.name}
            </p>
          </div>
        </div>
      </td>

      {/* Bonus */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm border ${getBonusBadgeStyle()}`}
        >
          <span className="material-symbols-outlined text-xs">
            {bonusNum > 0 ? "stars" : "remove"}
          </span>
          {bonusNum > 0 ? `+${room.bonus}%` : "Sin bono"}
        </span>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        {room.isActive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            Activa
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm bg-outline-variant/20 text-on-surface-variant border border-outline-variant/30">
            <span className="w-1.5 h-1.5 rounded-full bg-outline" />
            Inactiva
          </span>
        )}
      </td>

      {/* Created At */}
      <td className="py-4 px-4 text-label-sm text-on-surface-variant hidden md:table-cell">
        {formattedDate}
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Toggle status button */}
          <button
            type="button"
            onClick={() => onToggleStatus(room)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
              room.isActive
                ? "bg-surface-container text-on-surface-variant hover:text-error hover:bg-error-container/20 hover:border-error/30 border-outline-variant/30"
                : "bg-surface-container text-on-surface-variant hover:text-[#4ade80] hover:bg-[#22c55e]/20 hover:border-[#22c55e]/30 border-outline-variant/30"
            }`}
            title={room.isActive ? "Desactivar sala" : "Activar sala"}
            aria-label={room.isActive ? "Desactivar sala" : "Activar sala"}
          >
            <span className="material-symbols-outlined text-base">
              {room.isActive ? "pause" : "play_arrow"}
            </span>
          </button>

          {/* Edit button */}
          <button
            type="button"
            onClick={() => onEdit(room)}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-primary/15 text-on-surface-variant hover:text-primary border border-outline-variant/30 hover:border-primary/40 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Editar sala"
            aria-label="Editar sala"
          >
            <span className="material-symbols-outlined text-base">edit</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

RoomRow.displayName = "RoomRow";
