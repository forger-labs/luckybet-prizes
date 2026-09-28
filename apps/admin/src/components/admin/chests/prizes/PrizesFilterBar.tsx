"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  ClaimStatus,
  PrizesFilterBarProps,
  PrizesFilters,
} from "@/types/adminChests";
import type { SearchSelectOption } from "@/types/SearchSelect";

const STATUS_OPTIONS: { value: "all" | ClaimStatus; label: string }[] = [
  { value: "all", label: "Todos los estados" },
  {
    value: "TIMEOUT_UNCERTAIN",
    label: "⚠️ Reclamos Inciertos (TIMEOUT_UNCERTAIN)",
  },
  { value: "CLAIMED", label: "Acreditados (CLAIMED)" },
  { value: "PROCESSING", label: "En Proceso (PROCESSING)" },
  { value: "PENDING", label: "Pendientes (PENDING)" },
];

const ORDER_BY_OPTIONS: { value: PrizesFilters["orderBy"]; label: string }[] = [
  { value: "created_at", label: "Fecha de registro" },
  { value: "periodKey", label: "Clave de periodo" },
  { value: "id", label: "ID de reclamo" },
];

const LIMIT_OPTIONS = [
  { value: "10", label: "10 por página" },
  { value: "20", label: "20 por página" },
  { value: "50", label: "50 por página" },
];

export function PrizesFilterBar({
  filters,
  limit,
  onFilterChange,
  onLimitChange,
  onResetFilters,
}: PrizesFilterBarProps) {
  // Search players by username (max 10 resultados, mostrando solo username)
  const searchPlayers = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getPlayers({
        username: query || undefined,
        take: 10,
      });

      if (res.status && res.data) {
        return res.data.map((player) => ({
          value: player.id.toString(),
          label: player.username,
        }));
      }
      return [];
    },
    [],
  );

  // Search chests by title (max 10 resultados, mostrando título + tipo de periodo)
  const searchChests = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getChests({
        title: query || undefined,
        take: 10,
      });

      if (res.status && res.data) {
        return res.data.map((chest) => {
          const periodTag =
            chest.periodType === "WEEKLY" ? "Semanal" : "Mensual";
          return {
            value: chest.id.toString(),
            label: `${chest.title} (${periodTag})`,
          };
        });
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
    filters.chestId !== "" ||
    filters.status !== "all" ||
    filters.periodKey.trim() !== "" ||
    filters.orderBy !== "created_at" ||
    filters.orderDirection !== "DESC";

  return (
    <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20  flex flex-col gap-3.5">
      {/* ── Fila 1: Selectores dinámicos y principales ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Jugador (SearchSelect por username) */}
        <div className="w-full">
          <SearchSelect
            id="search-prize-player"
            icon="person"
            placeholder="Todos los jugadores"
            searchPlaceholder="Buscar por username..."
            value={filters.playerId}
            onChange={(val) => onFilterChange({ playerId: val })}
            onSearch={searchPlayers}
          />
        </div>

        {/* Cofre (SearchSelect por title) */}
        <div className="w-full">
          <SearchSelect
            id="search-prize-chest"
            icon="inventory_2"
            placeholder="Todos los cofres"
            searchPlaceholder="Buscar por título de cofre..."
            value={filters.chestId}
            onChange={(val) => onFilterChange({ chestId: val })}
            onSearch={searchChests}
          />
        </div>

        {/* Status */}
        <div className="w-full">
          <Select
            id="filter-prize-status"
            name="status"
            icon="verified_user"
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={(val) =>
              onFilterChange({ status: val as PrizesFilters["status"] })
            }
          />
        </div>

        {/* Period Key */}
        <div className="w-full">
          <Input
            id="search-prize-period"
            icon="date_range"
            placeholder="Periodo (ej: 2026-W39)..."
            value={filters.periodKey}
            onChange={(e) => onFilterChange({ periodKey: e.target.value })}
            wrapperClassName="w-full"
            className="bg-surface-container-lowest/80 border-outline-variant/30 focus:border-primary"
          />
        </div>
      </div>

      {/* ── Fila 2: Ordenamiento y dirección ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-outline-variant/10 items-center">
        <div className="w-full">
          <Select
            id="filter-prize-orderBy"
            name="orderBy"
            icon="sort"
            options={ORDER_BY_OPTIONS}
            value={filters.orderBy}
            onChange={(val) =>
              onFilterChange({ orderBy: val as PrizesFilters["orderBy"] })
            }
          />
        </div>

        <button
          type="button"
          onClick={toggleSortOrder}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 text-on-surface transition-all text-sm font-semibold cursor-pointer"
          aria-label={`Dirección de orden: ${filters.orderDirection === "ASC" ? "Ascendente" : "Descendente"}`}
        >
          <span className="material-symbols-outlined text-primary text-xl">
            {filters.orderDirection === "ASC"
              ? "arrow_upward_alt"
              : "arrow_downward_alt"}
          </span>
          <span>
            Orden{" "}
            {filters.orderDirection === "ASC"
              ? "Ascendente (A-Z, Antiguos)"
              : "Descendente (Z-A, Recientes)"}
          </span>
        </button>
      </div>

      {/* ── Fila 3: Límite de paginación y Limpiar ── */}
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-outline hidden sm:inline">
            Mostrar:
          </span>
          <div className="w-36">
            <Select
              id="filter-prize-limit"
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

PrizesFilterBar.displayName = "PrizesFilterBar";
