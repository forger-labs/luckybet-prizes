"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import type {
  BackendRoom,
  RoomFilters,
  RoomFormValues,
} from "@/types/adminRooms";
import { RoomFormModal } from "./RoomFormModal";
import { RoomsFilterBar } from "./RoomsFilterBar";
import { RoomsStatsCards } from "./RoomsStatsCards";
import { RoomsTable } from "./RoomsTable";
import {
  createRoomAction,
  initialState,
  loadRooms,
  roomsReducer,
  toggleRoomStatusAction,
  updateRoomAction,
} from "./roomsReducer";

export function RoomsList() {
  const [state, dispatch] = useReducer(roomsReducer, initialState);

  useEffect(() => {
    loadRooms(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  const handleFilterChange = useCallback((filters: Partial<RoomFilters>) => {
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

  const handleOpenEdit = useCallback((room: BackendRoom) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: room });
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const handleSave = useCallback(
    async (data: RoomFormValues, isCreate: boolean): Promise<boolean> => {
      let ok = false;
      if (isCreate) {
        ok = await createRoomAction(dispatch, data);
      } else if (state.selectedRoom) {
        ok = await updateRoomAction(dispatch, state.selectedRoom.id, data);
      }
      if (ok) {
        loadRooms(dispatch, state.page, state.limit, state.filters);
      }
      return ok;
    },
    [state.selectedRoom, state.page, state.limit, state.filters],
  );

  const handleToggleStatus = useCallback(
    (room: BackendRoom) => {
      const willActivate = !room.isActive;
      const actionVerb = willActivate ? "activar" : "desactivar";

      casinoToast.action({
        title: willActivate ? "¿Activar sala?" : "¿Desactivar sala?",
        description: `¿Desea ${actionVerb} la sala "${room.name}"?`,
        button: {
          title: willActivate ? "Activar" : "Desactivar",
          onClick: async () => {
            const ok = await toggleRoomStatusAction(
              room.id,
              willActivate,
              room.name,
            );
            if (ok) {
              loadRooms(dispatch, state.page, state.limit, state.filters);
            }
          },
        },
      });
    },
    [state.page, state.limit, state.filters],
  );

  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));

  const stats = useMemo(() => {
    const activeRooms = state.rooms.filter((r) => r.isActive).length;
    const bonusRooms = state.rooms.filter((r) => Number(r.bonus) > 0);
    const highestBonusNum = state.rooms.reduce(
      (max, r) => Math.max(max, Number(r.bonus) || 0),
      0,
    );

    return {
      totalRooms: state.total,
      activeRooms,
      bonusRoomsCount: bonusRooms.length,
      highestBonus: highestBonusNum.toString(),
    };
  }, [state.rooms, state.total]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
            Gestión de Salas
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Administre las salas de juego con porcentajes de bono.
          </p>
        </div>

        <Button
          leadingIcon="add_circle"
          onClick={handleOpenCreate}
          variant="secondary"
          className="whitespace-nowrap shrink-0 cursor-pointer"
        >
          Crear Sala
        </Button>
      </div>

      {/* Metric Cards */}
      <RoomsStatsCards
        totalRooms={stats.totalRooms}
        activeRooms={stats.activeRooms}
        bonusRoomsCount={stats.bonusRoomsCount}
        highestBonus={stats.highestBonus}
      />

      {/* Filter Bar */}
      <RoomsFilterBar
        filters={state.filters}
        limit={state.limit}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        onResetFilters={handleResetFilters}
      />

      {/* Table */}
      <RoomsTable
        rooms={state.rooms}
        isLoading={state.isLoading}
        onEdit={handleOpenEdit}
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination */}
      {state.total > state.limit && (
        <div className="flex justify-center pt-4 border-t border-outline-variant/15">
          <Pagination
            current={state.page}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {/* Modal */}
      {state.isModalOpen && (
        <RoomFormModal
          open={state.isModalOpen}
          onClose={handleCloseModal}
          room={state.selectedRoom}
          onSave={handleSave}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  );
}

RoomsList.displayName = "RoomsList";
