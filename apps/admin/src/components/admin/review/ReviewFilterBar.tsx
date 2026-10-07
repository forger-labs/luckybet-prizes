"use client";

import { useCallback } from "react";

import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  ReviewFilterBarProps,
  ReviewFilterStatus,
  ReviewMissionType,
} from "@/types/review/ReviewSubmission";
import type { SearchSelectOption } from "@/types/SearchSelect";
import { ReviewViewToggle } from "./ReviewViewToggle";

const STATUS_TABS: {
  value: ReviewFilterStatus;
  label: string;
  icon: string;
}[] = [
  { value: "IN_PROGRESS", label: "En Progreso", icon: "pending" },
  { value: "COMPLETED", label: "Completadas", icon: "task_alt" },
  { value: "CANCELLED", label: "Canceladas", icon: "cancel" },
  { value: "EXPIRED", label: "Expiradas", icon: "timer_off" },
  { value: "all", label: "Todas", icon: "select_all" },
];

const TYPE_OPTIONS: { value: ReviewMissionType | "all"; label: string }[] = [
  { value: "all", label: "Todos los tipos" },
  { value: "DAILY", label: "Diarias" },
  { value: "WEEKLY", label: "Semanales" },
  { value: "FIXED", label: "Fijas" },
];

export function ReviewFilterBar({
  filters,
  viewMode,
  onFilterChange,
  onResetFilters,
  onViewModeChange,
}: ReviewFilterBarProps) {
  const searchPlayers = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getPlayers({
        username: query || undefined,
        take: 10,
      });

      if (res.status && res.data) {
        return res.data.map((player) => ({
          value: player.id.toString(),
          label: `${player.username} (ID: ${player.id})`,
        }));
      }
      return [];
    },
    [],
  );

  const hasActiveFilters =
    filters.status !== "IN_PROGRESS" ||
    filters.playerId !== "" ||
    filters.type !== "all" ||
    Boolean(filters.minCoinsAmount) ||
    Boolean(filters.maxCoinsAmount) ||
    Boolean(filters.minExperience) ||
    Boolean(filters.maxExperience);

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex flex-col gap-4">
      {/* ── Fila 1: Tabs de estado ── */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div
          className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-container/60 border border-outline-variant/20 w-fit backdrop-blur-sm"
          role="tablist"
          aria-label="Filtrar por estado de misión"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = filters.status === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilterChange({ status: tab.value })}
                className={`
                  px-3.5 py-1.5 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none inline-flex items-center gap-1.5
                  ${
                    isActive
                      ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(56,189,248,0.25)] font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
                  }
                `}
              >
                <span className="material-symbols-outlined text-base">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <ReviewViewToggle viewMode={viewMode} onChange={onViewModeChange} />
      </div>

      {/* ── Fila 2: Selectores de búsqueda y filtros ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        <div className="w-full">
          <SearchSelect
            id="review-player-search"
            icon="person"
            placeholder="Todos los jugadores"
            searchPlaceholder="Buscar por username..."
            value={filters.playerId}
            onChange={(val) => onFilterChange({ playerId: val })}
            onSearch={searchPlayers}
          />
        </div>

        <div className="w-full">
          <Select
            id="review-type-select"
            icon="category"
            options={TYPE_OPTIONS}
            value={filters.type}
            onChange={(val) =>
              onFilterChange({ type: val as ReviewMissionType | "all" })
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Mín. Monedas"
            value={filters.minCoinsAmount || ""}
            onChange={(e) => onFilterChange({ minCoinsAmount: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-xl text-sm text-on-surface placeholder:text-outline focus:border-primary outline-none transition-colors"
          />
          <input
            type="number"
            placeholder="Máx. Monedas"
            value={filters.maxCoinsAmount || ""}
            onChange={(e) => onFilterChange({ maxCoinsAmount: e.target.value })}
            className="w-full px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-xl text-sm text-on-surface placeholder:text-outline focus:border-primary outline-none transition-colors"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 border border-primary/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">
                restart_alt
              </span>
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ReviewFilterBar.displayName = "ReviewFilterBar";
