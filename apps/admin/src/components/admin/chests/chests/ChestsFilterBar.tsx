"use client";

import { useMemo } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import type { ChestFilters, ChestsFilterBarProps } from "@/types/adminChests";
import type { SearchSelectOption } from "@/types/SearchSelect";

const PERIOD_OPTIONS = [
  { value: "all", label: "Todos los periodos" },
  { value: "WEEKLY", label: "Semanales (WEEKLY)" },
  { value: "MONTHLY", label: "Mensuales (MONTHLY)" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Solo Activos" },
  { value: "inactive", label: "Solo Inactivos" },
];

const LIMIT_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
];

export function ChestsFilterBar({
  filters,
  limit,
  rooms = [],
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: ChestsFilterBarProps) {
  const roomOptions: SearchSelectOption[] = useMemo(() => {
    return rooms.map((r) => ({
      value: r.id.toString(),
      label: `${r.name} - ${r.bonus === "0" ? "Sin bono" : `+${r.bonus}%`}`,
    }));
  }, [rooms]);

  const hasActiveFilters =
    filters.title.trim() !== "" ||
    filters.periodType !== "all" ||
    filters.isActive !== "all" ||
    filters.minCoins.trim() !== "" ||
    filters.maxCoins.trim() !== "" ||
    filters.minRequiredMissions.trim() !== "" ||
    filters.maxRequiredMissions.trim() !== "" ||
    filters.roomId !== "";

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20  flex flex-col gap-3.5">
      {/* ── Fila 1: Búsqueda principal y selectores clave ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Search by Title */}
        <div className="w-full">
          <Input
            id="search-chests-title"
            icon="search"
            placeholder="Buscar por título de cofre..."
            value={filters.title}
            onChange={(e) => onFilterChange({ title: e.target.value })}
            wrapperClassName="w-full"
            className="bg-surface-container-lowest/80 border-outline-variant/30 focus:border-primary"
          />
        </div>

        {/* Filter by Period */}
        <div className="w-full">
          <Select
            id="filter-chest-period"
            name="periodType"
            icon="calendar_month"
            options={PERIOD_OPTIONS}
            value={filters.periodType}
            onChange={(val) =>
              onFilterChange({ periodType: val as ChestFilters["periodType"] })
            }
          />
        </div>

        {/* Filter by Active Status */}
        <div className="w-full">
          <Select
            id="filter-chest-status"
            name="isActive"
            icon="toggle_on"
            options={STATUS_OPTIONS}
            value={filters.isActive}
            onChange={(val) =>
              onFilterChange({ isActive: val as ChestFilters["isActive"] })
            }
          />
        </div>

        {/* Filter by RoomId (LocalSearchSelect take: 20 precargadas) */}
        <div className="w-full">
          <SearchSelect
            id="filter-chest-room"
            name="roomId"
            icon="meeting_room"
            placeholder="Todas las salas con bono"
            searchPlaceholder="Buscar sala..."
            options={roomOptions}
            value={filters.roomId}
            onChange={(val) => onFilterChange({ roomId: val })}
          />
        </div>
      </div>

      {/* ── Fila 2: Rangos numéricos de monedas y misiones ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-outline-variant/10">
        <Input
          id="filter-chest-minCoins"
          type="number"
          icon="token"
          placeholder="Mín. Fichas"
          value={filters.minCoins}
          onChange={(e) => onFilterChange({ minCoins: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-xs sm:text-sm py-2"
        />

        <Input
          id="filter-chest-maxCoins"
          type="number"
          icon="token"
          placeholder="Máx. Fichas"
          value={filters.maxCoins}
          onChange={(e) => onFilterChange({ maxCoins: e.target.value })}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-xs sm:text-sm py-2"
        />

        <Input
          id="filter-chest-minMissions"
          type="number"
          icon="checklist"
          placeholder="Mín. Misiones"
          value={filters.minRequiredMissions}
          onChange={(e) =>
            onFilterChange({ minRequiredMissions: e.target.value })
          }
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-xs sm:text-sm py-2"
        />

        <Input
          id="filter-chest-maxMissions"
          type="number"
          icon="checklist"
          placeholder="Máx. Misiones"
          value={filters.maxRequiredMissions}
          onChange={(e) =>
            onFilterChange({ maxRequiredMissions: e.target.value })
          }
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-xs sm:text-sm py-2"
        />
      </div>

      {/* ── Fila 3: Límite de paginación y Limpiar ── */}
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-outline hidden sm:inline">
            Mostrar:
          </span>
          <div className="w-36">
            <Select
              id="filter-chest-limit"
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

ChestsFilterBar.displayName = "ChestsFilterBar";
