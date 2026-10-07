"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  PlayerStatusFilter,
  PlayersFilterBarProps,
} from "@/types/adminPlayers";
import type { SearchSelectOption } from "@/types/SearchSelect";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Jugadores activos" },
  { value: "suspended", label: "Jugadores suspendidos" },
];

const LIMIT_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
];

export function PlayersFilterBar({
  filters,
  limit,
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: PlayersFilterBarProps) {
  // Search rooms (max take: 7) -> Formato: "Nombre De Sala - Bono"
  const searchRooms = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getRooms({
        name: query || undefined,
        take: 7,
      });

      if (res.status && res.data) {
        return res.data.map((room) => {
          const bonusLabel = room.bonus === "0" ? "Sin bono" : `${room.bonus}%`;
          return {
            value: room.id.toString(),
            label: `${room.name} - ${bonusLabel}`,
          };
        });
      }
      return [];
    },
    [],
  );

  // Search levels (max take: 7) -> Formato: solo nombre del nivel
  const searchLevels = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getLevels({
        name: query || undefined,
        take: 7,
      });

      if (res.status && res.data) {
        return res.data.map((level) => ({
          value: level.id.toString(),
          label: level.name,
        }));
      }
      return [];
    },
    [],
  );

  const hasActiveFilters =
    filters.username.trim() !== "" ||
    filters.phone.trim() !== "" ||
    filters.status !== "all" ||
    filters.levelId !== "" ||
    filters.roomId !== "";

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {/* Username */}
        <div className="w-full">
          <Input
            id="search-players-username"
            icon="search"
            placeholder="Buscar por username..."
            value={filters.username}
            onChange={(e) => onFilterChange({ username: e.target.value })}
            wrapperClassName="w-full"
          />
        </div>

        {/* Phone */}
        <div className="w-full">
          <Input
            id="search-players-phone"
            icon="call"
            placeholder="Buscar por teléfono..."
            value={filters.phone}
            onChange={(e) => onFilterChange({ phone: e.target.value })}
            wrapperClassName="w-full"
          />
        </div>

        {/* Sala filter (SearchSelect take 7 con Nombre - Bono) */}
        <div className="w-full">
          <SearchSelect
            id="filter-room"
            icon="meeting_room"
            placeholder="Todas las salas"
            searchPlaceholder="Buscar sala..."
            value={filters.roomId}
            onChange={(val) => onFilterChange({ roomId: val })}
            onSearch={searchRooms}
          />
        </div>

        {/* Nivel filter (SearchSelect take 7 solo Nombre) */}
        <div className="w-full">
          <SearchSelect
            id="filter-level"
            icon="military_tech"
            placeholder="Todos los niveles"
            searchPlaceholder="Buscar nivel..."
            value={filters.levelId}
            onChange={(val) => onFilterChange({ levelId: val })}
            onSearch={searchLevels}
          />
        </div>

        {/* Status */}
        <div className="w-full">
          <Select
            id="filter-status"
            icon="verified_user"
            value={filters.status}
            onChange={(val) =>
              onFilterChange({ status: val as PlayerStatusFilter })
            }
            options={STATUS_OPTIONS}
          />
        </div>
      </div>

      {/* Bottom bar: Limit & Reset */}
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-outline hidden sm:inline">
            Mostrar:
          </span>
          <div className="w-36">
            <Select
              id="filter-limit"
              name="limit"
              icon="format_list_numbered"
              options={LIMIT_OPTIONS}
              value={limit.toString()}
              onChange={(val) => onLimitChange(Number(val) || 10)}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-label-md transition-all active:scale-95 cursor-pointer border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-base">
              filter_alt_off
            </span>
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>
    </div>
  );
}

PlayersFilterBar.displayName = "PlayersFilterBar";
