"use client";

import { useCallback } from "react";

import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  LevelRewardStatus,
  LevelRewardsFilterBarProps,
} from "@/types/adminLevels";
import type { SearchSelectOption } from "@/types/SearchSelect";

const STATUS_OPTIONS: { value: "all" | LevelRewardStatus; label: string }[] = [
  { value: "all", label: "Todos los estados" },
  { value: "PENDING", label: "Pendientes" },
  { value: "PROCESSING", label: "En Proceso" },
  { value: "TIMEOUT_UNCERTAIN", label: "Inciertos (Requiere Revisión)" },
  { value: "CLAIMED", label: "Acreditados" },
];

const ORDER_BY_OPTIONS: {
  value: "created_at" | "levelId" | "id";
  label: string;
}[] = [
  { value: "created_at", label: "Fecha de Creación" },
  { value: "levelId", label: "ID de Nivel" },
  { value: "id", label: "ID Reclamo" },
];

const LIMIT_OPTIONS = [
  { value: "12", label: "12 por página" },
  { value: "25", label: "25 por página" },
  { value: "50", label: "50 por página" },
];

export function LevelRewardsFilterBar({
  filters,
  limit,
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: LevelRewardsFilterBarProps) {
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

  const searchLevels = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getLevels({
        name: query || undefined,
        take: 10,
      });

      if (res.status && res.data) {
        return res.data.map((lvl) => ({
          value: lvl.id.toString(),
          label: `${lvl.name} (Nivel #${lvl.id})`,
        }));
      }
      return [];
    },
    [],
  );

  const toggleSortOrder = useCallback(() => {
    onFilterChange({
      orderDirection: filters.orderDirection === "ASC" ? "DESC" : "ASC",
    });
  }, [filters.orderDirection, onFilterChange]);

  const hasActiveFilters =
    filters.playerId !== "" ||
    filters.levelId !== "" ||
    filters.status !== "all" ||
    filters.orderBy !== "created_at" ||
    filters.orderDirection !== "DESC";

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex flex-col gap-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Jugador */}
        <div className="w-full">
          <SearchSelect
            id="search-level-reward-player"
            icon="person"
            placeholder="Todos los jugadores"
            searchPlaceholder="Buscar por username..."
            value={filters.playerId}
            onChange={(val) => onFilterChange({ playerId: val })}
            onSearch={searchPlayers}
          />
        </div>

        {/* Nivel */}
        <div className="w-full">
          <SearchSelect
            id="search-level-reward-level"
            icon="military_tech"
            placeholder="Todos los niveles"
            searchPlaceholder="Buscar por nivel..."
            value={filters.levelId}
            onChange={(val) => onFilterChange({ levelId: val })}
            onSearch={searchLevels}
          />
        </div>

        {/* Estado */}
        <div className="w-full">
          <Select
            id="filter-level-reward-status"
            icon="fact_check"
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={(val) =>
              onFilterChange({
                status: val as "all" | LevelRewardStatus,
              })
            }
          />
        </div>

        {/* Ordenamiento */}
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1">
            <Select
              id="filter-level-reward-order-by"
              icon="sort"
              options={ORDER_BY_OPTIONS}
              value={filters.orderBy}
              onChange={(val) =>
                onFilterChange({
                  orderBy: val as "created_at" | "levelId" | "id",
                })
              }
            />
          </div>
          <button
            type="button"
            onClick={toggleSortOrder}
            className="h-10.5 px-3 rounded-xl border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title={
              filters.orderDirection === "ASC" ? "Ascendente" : "Descendente"
            }
          >
            <span className="material-symbols-outlined text-lg">
              {filters.orderDirection === "ASC"
                ? "arrow_upward"
                : "arrow_downward"}
            </span>
          </button>
        </div>
      </div>

      {/* Fila 2: Items por página y Reset */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/15">
        <div className="w-36">
          <Select
            id="filter-level-reward-limit"
            icon="pageview"
            options={LIMIT_OPTIONS}
            value={limit.toString()}
            onChange={(val) => onLimitChange(Number(val))}
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="h-10.5 px-3 rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
            title="Restablecer filtros"
          >
            <span className="material-symbols-outlined text-sm">
              restart_alt
            </span>
            <span>Limpiar</span>
          </button>
        )}
      </div>
    </div>
  );
}

LevelRewardsFilterBar.displayName = "LevelRewardsFilterBar";
