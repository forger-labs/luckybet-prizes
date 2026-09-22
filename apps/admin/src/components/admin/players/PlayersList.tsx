"use client";

import { useCallback, useEffect, useReducer } from "react";

import type { PlayerFilters } from "@/types/adminPlayers";
import { PlayerStatsCards } from "./PlayerStatsCards";
import { PlayersFilterBar } from "./PlayersFilterBar";
import {
  applyFilters,
  initialState,
  loadPlayers,
  playersReducer,
} from "./PlayersReducer";
import { PlayersTable } from "./PlayersTable";

export function PlayersList() {
  const [state, dispatch] = useReducer(playersReducer, initialState);

  useEffect(() => {
    loadPlayers(dispatch, state.page);
  }, [state.page]);

  const pagePlayers = applyFilters(state.players, state.filters);

  const handleFilterChange = useCallback((filter: Partial<PlayerFilters>) => {
    dispatch({ type: "SET_FILTER", payload: { filter } });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const activeCount = state.players.filter((p) => p.isActive).length;
  const suspendedCount = state.players.filter((p) => !p.isActive).length;

  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-28">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="material-symbols-outlined text-3xl animate-spin">
              sync
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant font-medium">
            Cargando registro de jugadores...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* ── Summary Stats ── */}
      <PlayerStatsCards
        totalPlayers={state.players.length}
        activePlayers={activeCount}
        suspendedPlayers={suspendedCount}
        page={state.page}
        totalPages={state.totalPages}
      />

      {/* ── Filter Bar ── */}
      <PlayersFilterBar
        filters={state.filters}
        onFilterChange={handleFilterChange}
      />

      {/* ── Players Table con Paginado ── */}
      <PlayersTable
        players={pagePlayers}
        page={state.page}
        totalPages={state.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

PlayersList.displayName = "PlayersList";
