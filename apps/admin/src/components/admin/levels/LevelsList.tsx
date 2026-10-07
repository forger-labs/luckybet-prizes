"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";

import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import type {
  BackendLevel,
  LevelFilters,
  LevelFormValues,
} from "@/types/adminLevels";
import { LevelFormModal } from "./LevelFormModal";
import { LevelsFilterBar } from "./LevelsFilterBar";
import { LevelsStatsCards } from "./LevelsStatsCards";
import { LevelsTable } from "./LevelsTable";
import {
  createLevelAction,
  initialState,
  levelsReducer,
  loadLevels,
  updateLevelAction,
} from "./levelsReducer";

export function LevelsList() {
  const [state, dispatch] = useReducer(levelsReducer, initialState);

  useEffect(() => {
    loadLevels(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  const handleFilterChange = useCallback((filters: Partial<LevelFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    dispatch({ type: "SET_LIMIT", payload: limit });
  }, []);

  const handleResetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  const handleOpenCreate = useCallback(() => {
    dispatch({ type: "OPEN_CREATE_MODAL" });
  }, []);

  const handleOpenEdit = useCallback((level: BackendLevel) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: level });
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const handleSave = useCallback(
    async (data: LevelFormValues, isCreate: boolean): Promise<boolean> => {
      let ok = false;
      if (isCreate) {
        ok = await createLevelAction(dispatch, data);
      } else if (state.selectedLevel) {
        ok = await updateLevelAction(dispatch, state.selectedLevel.id, data);
      }
      if (ok) {
        loadLevels(dispatch, state.page, state.limit, state.filters);
      }
      return ok;
    },
    [state.selectedLevel, state.page, state.limit, state.filters],
  );

  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));

  const stats = useMemo(() => {
    const maxExperience = state.levels.reduce(
      (max, lvl) => Math.max(max, lvl.minExperience || 0),
      0,
    );
    const totalCoins = state.levels.reduce(
      (sum, lvl) => sum + (lvl.coins || 0),
      0,
    );
    return {
      totalLevels: state.total,
      maxExperience,
      totalCoins,
    };
  }, [state.levels, state.total]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
            Gestión de Niveles
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Administre los niveles de progreso, requisitos de experiencia y
            recompensas.
          </p>
        </div>

        <Button
          leadingIcon="add_circle"
          onClick={handleOpenCreate}
          variant="secondary"
          className="whitespace-nowrap shrink-0 cursor-pointer"
        >
          Crear Nivel
        </Button>
      </div>

      {/* ── Metric Cards ── */}
      <LevelsStatsCards
        totalLevels={stats.totalLevels}
        maxExperience={stats.maxExperience}
        totalCoins={stats.totalCoins}
      />

      {/* ── Filter Bar ── */}
      <LevelsFilterBar
        filters={state.filters}
        limit={state.limit}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        onResetFilters={handleResetFilters}
      />

      {/* ── Table ── */}
      <LevelsTable
        levels={state.levels}
        isLoading={state.isLoading}
        onEdit={handleOpenEdit}
      />

      {/* ── Pagination ── */}
      {state.total > state.limit && (
        <div className="flex justify-center pt-4 border-t border-outline-variant/15">
          <Pagination
            current={state.page}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {/* ── Form Modal (Create / Edit) ── */}
      {state.isModalOpen && (
        <LevelFormModal
          open={state.isModalOpen}
          onClose={handleCloseModal}
          level={state.selectedLevel}
          onSave={handleSave}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  );
}

LevelsList.displayName = "LevelsList";
