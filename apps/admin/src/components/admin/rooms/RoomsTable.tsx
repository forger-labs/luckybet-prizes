"use client";

import type { RoomsTableProps } from "@/types/adminRooms";
import { RoomRow } from "./RoomRow";

export function RoomsTable({
  rooms,
  isLoading,
  onEdit,
  onToggleStatus,
}: RoomsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 overflow-hidden">
        <div className="p-8 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 w-full rounded-xl bg-surface-container-highest/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-outline mb-4">
          <span className="material-symbols-outlined text-3xl">
            meeting_room
          </span>
        </div>
        <h3 className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface mb-1">
          No se encontraron salas
        </h3>
        <p className="text-body-md text-on-surface-variant max-w-sm">
          No hay salas registradas que coincidan con los criterios de búsqueda o
          filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container/60 text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">Nombre / Senior</th>
              <th className="py-3.5 px-4">Bono</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Registrada</th>
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {rooms.map((room) => (
              <RoomRow
                key={room.id}
                room={room}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

RoomsTable.displayName = "RoomsTable";
