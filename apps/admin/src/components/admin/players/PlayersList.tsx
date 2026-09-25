"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { Pagination } from "@/components/ui/Pagination";
import type {
  Player,
  PlayerFilters,
  PlayerFormValues,
} from "@/types/adminPlayers";
import { PlayerEditModal } from "./PlayerEditModal";
import { PlayerStatsCards } from "./PlayerStatsCards";
import { PlayersFilterBar } from "./PlayersFilterBar";
import {
  initialState,
  loadPlayers,
  playersReducer,
  togglePlayerStatusAction,
  updatePlayerAction,
} from "./PlayersReducer";
import { PlayersTable } from "./PlayersTable";

export function PlayersList() {
  const [state, dispatch] = useReducer(playersReducer, initialState);

  useEffect(() => {
    loadPlayers(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  const handleFilterChange = useCallback((filter: Partial<PlayerFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filter });
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

  const handleOpenEdit = useCallback((player: Player) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: player });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    dispatch({ type: "CLOSE_EDIT_MODAL" });
  }, []);

  const handleSave = useCallback(
    async (values: PlayerFormValues): Promise<boolean> => {
      if (!state.selectedPlayer) return false;
      const ok = await updatePlayerAction(
        dispatch,
        state.selectedPlayer.id,
        values,
      );
      if (ok) {
        loadPlayers(dispatch, state.page, state.limit, state.filters);
      }
      return ok;
    },
    [state.selectedPlayer, state.page, state.limit, state.filters],
  );

  const handleToggleStatus = useCallback(
    (player: Player) => {
      const willActivate = !player.isActive;
      const actionVerb = willActivate ? "activar" : "suspender";

      casinoToast.action({
        title: willActivate ? "¿Activar jugador?" : "¿Suspender jugador?",
        description: `¿Desea ${actionVerb} la cuenta de "${player.username}"?`,
        button: {
          title: willActivate ? "Activar" : "Suspender",
          onClick: async () => {
            const ok = await togglePlayerStatusAction(
              player.id,
              willActivate,
              player.username,
            );
            if (ok) {
              loadPlayers(dispatch, state.page, state.limit, state.filters);
            }
          },
        },
      });
    },
    [state.page, state.limit, state.filters],
  );

  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));

  const stats = useMemo(() => {
    const activeCount = state.players.filter((p) => p.isActive).length;
    const suspendedCount = state.players.filter((p) => !p.isActive).length;
    const totalExp = state.players.reduce(
      (sum, p) => sum + (p.experience || 0),
      0,
    );

    return {
      totalPlayers: state.total,
      activePlayers: activeCount,
      suspendedPlayers: suspendedCount,
      totalExperience: totalExp,
    };
  }, [state.players, state.total]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
          Gestión de Jugadores
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Supervise los jugadores registrados, sus niveles, salas y estados de
          cuenta.
        </p>
      </div>

      {/* Stats Cards */}
      <PlayerStatsCards
        totalPlayers={stats.totalPlayers}
        activePlayers={stats.activePlayers}
        suspendedPlayers={stats.suspendedPlayers}
        totalExperience={stats.totalExperience}
      />

      {/* Filter Bar */}
      <PlayersFilterBar
        filters={state.filters}
        limit={state.limit}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        onResetFilters={handleResetFilters}
      />

      {/* Players Table */}
      <PlayersTable
        players={state.players}
        loading={state.loading}
        onEdit={handleOpenEdit}
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination */}
      {state.total > state.limit && (
        <div className="flex justify-center pt-2">
          <Pagination
            current={state.page}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {/* Edit Modal */}
      {state.isEditModalOpen && (
        <PlayerEditModal
          open={state.isEditModalOpen}
          onClose={handleCloseEditModal}
          player={state.selectedPlayer}
          onSave={handleSave}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  );
}

PlayersList.displayName = "PlayersList";
