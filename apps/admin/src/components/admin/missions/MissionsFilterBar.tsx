"use client";

import { useMemo } from "react";

import { Input } from "@/components/ui/Input";
import {
  type LocalOption,
  LocalSearchSelect,
} from "@/components/ui/LocalSearchSelect";
import { Select } from "@/components/ui/Select";
import type {
  MissionCategoryFilter,
  MissionStatusFilter,
  MissionsFilterBarProps,
} from "@/types/missions/FilterTabs";

const STATUS_OPTIONS: { value: MissionStatusFilter; label: string }[] = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Activas" },
  { value: "inactive", label: "Inactivas" },
  { value: "completed", label: "Completadas" },
  { value: "cancelled", label: "Canceladas" },
];

const CATEGORY_OPTIONS: { value: MissionCategoryFilter; label: string }[] = [
  { value: "all", label: "Todos los tipos" },
  { value: "daily", label: "Diarias (DAILY)" },
  { value: "weekly", label: "Semanales (WEEKLY)" },
  { value: "fixed", label: "Fijas (FIXED)" },
];

const LIMIT_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
];

export function MissionsFilterBar({
  filters,
  limit,
  rooms = [],
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: MissionsFilterBarProps) {
  const roomOptions: LocalOption[] = useMemo(() => {
    return rooms.map((room) => {
      const bonusLabel = room.bonus === "0" ? "Sin bono" : `+${room.bonus}%`;
      return {
        value: room.id.toString(),
        label: `${room.name} - ${bonusLabel}`,
      };
    });
  }, [rooms]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.category !== "all" ||
    filters.roomId !== "";

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Search */}
        <div className="w-full">
          <Input
            id="search-missions"
            icon="search"
            placeholder="Buscar por título o descripción..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            wrapperClassName="w-full"
            className="bg-surface-container-lowest/80 border-outline-variant/30 focus:border-primary"
          />
        </div>

        {/* Tipo / Categoría */}
        <div className="w-full">
          <Select
            id="filter-category"
            name="category"
            icon="category"
            options={CATEGORY_OPTIONS}
            value={filters.category}
            onChange={(val) =>
              onFilterChange({ category: val as MissionCategoryFilter })
            }
          />
        </div>

        {/* Estado */}
        <div className="w-full">
          <Select
            id="filter-status"
            name="status"
            icon="verified_user"
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={(val) =>
              onFilterChange({ status: val as MissionStatusFilter })
            }
          />
        </div>

        {/* Sala Promocional Asociada (Memoria Local) */}
        <div className="w-full">
          <LocalSearchSelect
            id="filter-mission-room"
            name="roomId"
            icon="meeting_room"
            placeholder="Todas las salas"
            searchPlaceholder="Buscar sala..."
            options={roomOptions}
            value={filters.roomId}
            onChange={(val) => onFilterChange({ roomId: val })}
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

MissionsFilterBar.displayName = "MissionsFilterBar";
