"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type { LevelsFilterBarProps } from "@/types/adminLevels";
import type { SearchSelectOption } from "@/types/SearchSelect";

const LIMIT_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
];

export function LevelsFilterBar({
  filters,
  limit,
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: LevelsFilterBarProps) {
  const searchRooms = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getRooms({
        name: query || undefined,
        take: 7,
      });

      if (res.status && res.data) {
        return res.data.map((room) => {
          const bonusLabel =
            room.bonus === "0" ? "Sin bono" : `+${room.bonus}%`;
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

  const toggleSortOrder = useCallback(() => {
    onFilterChange({
      sortOrder: filters.sortOrder === "ASC" ? "DESC" : "ASC",
    });
  }, [filters.sortOrder, onFilterChange]);

  const hasActiveFilters =
    Boolean(filters.name) ||
    Boolean(filters.roomId) ||
    Boolean(filters.minExperience) ||
    Boolean(filters.maxExperience) ||
    Boolean(filters.minCoins) ||
    Boolean(filters.maxCoins) ||
    filters.sortOrder !== "ASC";

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20">
      {/* Primary search row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
        <Input
          id="filter-name"
          icon="search"
          placeholder="Buscar por nombre de nivel..."
          value={filters.name}
          onChange={(e) => onFilterChange({ name: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 border-outline-variant/30 focus:border-primary"
        />

        <SearchSelect
          id="filter-room"
          icon="meeting_room"
          placeholder="Todas las salas con bono"
          searchPlaceholder="Buscar sala..."
          value={filters.roomId}
          onChange={(val) => onFilterChange({ roomId: val })}
          onSearch={searchRooms}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSortOrder}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 text-on-surface transition-all text-body-md cursor-pointer"
            aria-label={`Orden: ${filters.sortOrder === "ASC" ? "Ascendente" : "Descendente"}`}
          >
            <span className="material-symbols-outlined text-primary text-xl">
              {filters.sortOrder === "ASC"
                ? "arrow_upward_alt"
                : "arrow_downward_alt"}
            </span>
            <span className="text-label-md font-semibold truncate">
              Orden {filters.sortOrder === "ASC" ? "Ascendente" : "Descendente"}
            </span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-lg bg-error-container/20 border border-error/30 hover:bg-error-container/40 text-error transition-all text-label-md font-medium cursor-pointer shrink-0"
              title="Limpiar filtros"
            >
              <span className="material-symbols-outlined text-lg">
                filter_alt_off
              </span>
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced range filters & Limit */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-outline-variant/10">
        <Input
          id="filter-minExperience"
          type="number"
          icon="speed"
          placeholder="Min XP"
          value={filters.minExperience}
          onChange={(e) => onFilterChange({ minExperience: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <Input
          id="filter-maxExperience"
          type="number"
          icon="speed"
          placeholder="Max XP"
          value={filters.maxExperience}
          onChange={(e) => onFilterChange({ maxExperience: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <Input
          id="filter-minCoins"
          type="number"
          icon="toll"
          placeholder="Min Monedas"
          value={filters.minCoins}
          onChange={(e) => onFilterChange({ minCoins: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <Input
          id="filter-maxCoins"
          type="number"
          icon="toll"
          placeholder="Max Monedas"
          value={filters.maxCoins}
          onChange={(e) => onFilterChange({ maxCoins: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <div className="col-span-2 sm:col-span-1">
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
    </div>
  );
}

LevelsFilterBar.displayName = "LevelsFilterBar";
