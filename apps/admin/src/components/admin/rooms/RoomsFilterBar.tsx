"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { RoomsFilterBarProps } from "@/types/adminRooms";

const BONUS_OPTIONS = [
  { value: "", label: "Todos los bonos" },
  { value: "0", label: "0% (Sin bono)" },
  { value: "30", label: "+30%" },
  { value: "40", label: "+40%" },
  { value: "50", label: "+50%" },
  { value: "100", label: "+100%" },
  { value: "150", label: "+150%" },
  { value: "200", label: "+200%" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Solo Activas" },
  { value: "inactive", label: "Solo Inactivas" },
];

const LIMIT_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
];

export function RoomsFilterBar({
  filters,
  limit,
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: RoomsFilterBarProps) {
  const hasActiveFilters =
    filters.name.trim() !== "" ||
    filters.bonus !== "" ||
    filters.isActive !== "all";

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
        {/* Search by Name */}
        <div className="w-full">
          <Input
            id="room-search-name"
            placeholder="Buscar por nombre de sala..."
            icon="search"
            value={filters.name}
            onChange={(e) => onFilterChange({ name: e.target.value })}
            wrapperClassName="w-full"
          />
        </div>

        {/* Filter by Bonus */}
        <div className="w-full">
          <Select
            id="room-filter-bonus"
            name="bonusFilter"
            icon="percent"
            options={BONUS_OPTIONS}
            value={filters.bonus}
            onChange={(v) => onFilterChange({ bonus: v })}
          />
        </div>

        {/* Filter by Active Status */}
        <div className="w-full">
          <Select
            id="room-filter-status"
            name="statusFilter"
            icon="toggle_on"
            options={STATUS_OPTIONS}
            value={filters.isActive}
            onChange={(v) => onFilterChange({ isActive: v })}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-end shrink-0">
        {/* Page Size (take) */}
        <div className="w-36">
          <Select
            id="room-filter-limit"
            name="limitSelect"
            icon="format_list_numbered"
            options={LIMIT_OPTIONS}
            value={limit.toString()}
            onChange={(v) => onLimitChange(Number(v) || 10)}
          />
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-label-md transition-all active:scale-95 cursor-pointer border border-outline-variant/30 shrink-0"
            title="Limpiar todos los filtros"
          >
            <span className="material-symbols-outlined text-base">
              filter_alt_off
            </span>
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        )}
      </div>
    </div>
  );
}

RoomsFilterBar.displayName = "RoomsFilterBar";
