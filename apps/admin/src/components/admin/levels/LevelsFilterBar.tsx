"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { LevelsFilterBarProps } from "@/types/adminLevels";
import type { SelectOption } from "@/types/Select";

const BONUS_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos los bonus" },
  { value: "0", label: "0%" },
  { value: "30", label: "30%" },
  { value: "40", label: "40%" },
  { value: "50", label: "50%" },
  { value: "100", label: "100%" },
  { value: "150", label: "150%" },
  { value: "200", label: "200%" },
];

export function LevelsFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
}: LevelsFilterBarProps) {
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ name: e.target.value });
    },
    [onFilterChange],
  );

  const handleBonusChange = useCallback(
    (bonus: string) => {
      onFilterChange({ bonus });
    },
    [onFilterChange],
  );

  const handleMinXpChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ minExperience: e.target.value });
    },
    [onFilterChange],
  );

  const handleMaxXpChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ maxExperience: e.target.value });
    },
    [onFilterChange],
  );

  const handleMinCoinsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ minCoins: e.target.value });
    },
    [onFilterChange],
  );

  const handleMaxCoinsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ maxCoins: e.target.value });
    },
    [onFilterChange],
  );

  const toggleSortOrder = useCallback(() => {
    onFilterChange({
      sortOrder: filters.sortOrder === "ASC" ? "DESC" : "ASC",
    });
  }, [filters.sortOrder, onFilterChange]);

  const hasActiveFilters =
    Boolean(filters.name) ||
    Boolean(filters.bonus) ||
    Boolean(filters.minExperience) ||
    Boolean(filters.maxExperience) ||
    Boolean(filters.minCoins) ||
    Boolean(filters.maxCoins) ||
    filters.sortOrder !== "ASC";

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
      {/* Primary search row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
        <Input
          id="filter-name"
          icon="search"
          placeholder="Buscar por nombre de nivel..."
          value={filters.name}
          onChange={handleNameChange}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 border-outline-variant/30 focus:border-primary"
        />

        <Select
          id="filter-bonus"
          icon="percent"
          options={BONUS_OPTIONS}
          value={filters.bonus}
          onChange={handleBonusChange}
          placeholder="Filtrar por bonus..."
          className="w-full"
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

      {/* Advanced range filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-outline-variant/10">
        <Input
          id="filter-minExperience"
          type="number"
          icon="speed"
          placeholder="Min XP"
          value={filters.minExperience}
          onChange={handleMinXpChange}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <Input
          id="filter-maxExperience"
          type="number"
          icon="speed"
          placeholder="Max XP"
          value={filters.maxExperience}
          onChange={handleMaxXpChange}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <Input
          id="filter-minCoins"
          type="number"
          icon="toll"
          placeholder="Min Monedas"
          value={filters.minCoins}
          onChange={handleMinCoinsChange}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />

        <Input
          id="filter-maxCoins"
          type="number"
          icon="toll"
          placeholder="Max Monedas"
          value={filters.maxCoins}
          onChange={handleMaxCoinsChange}
          wrapperClassName="w-full"
          className="bg-surface-container-lowest/80 text-sm"
        />
      </div>
    </div>
  );
}

LevelsFilterBar.displayName = "LevelsFilterBar";
