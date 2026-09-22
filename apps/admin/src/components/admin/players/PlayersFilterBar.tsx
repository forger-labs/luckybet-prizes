"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type {
  PlayerStatusFilter,
  PlayersFilterBarProps,
} from "@/types/adminPlayers";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Jugadores activos" },
  { value: "suspended", label: "Jugadores suspendidos" },
];

export function PlayersFilterBar({
  filters,
  onFilterChange,
}: PlayersFilterBarProps) {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ search: e.target.value });
    },
    [onFilterChange],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
      {/* Search */}
      <div className="w-full sm:max-w-md">
        <Input
          id="search-players"
          icon="search"
          placeholder="Buscar jugador por nombre de usuario..."
          value={filters.search}
          onChange={handleSearch}
          wrapperClassName="w-full"
          className="bg-surface-container-low/90 border-outline-variant/30 focus:border-primary"
        />
      </div>

      {/* Status filter */}
      <div className="w-full sm:w-64">
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
  );
}

PlayersFilterBar.displayName = "PlayersFilterBar";
