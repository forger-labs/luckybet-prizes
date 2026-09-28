"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import type {
  AdminMission,
  BackendGameItem,
  BackendProviderItem,
  BackendRoom,
} from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type { MissionFilters } from "@/types/missions/FilterTabs";
import type { PartialAdminMission } from "@/types/missions/MissionFormModalTypes";
import { MissionFormModal } from "../mission-form/MissionFormModal";
import { MissionPreviewModal } from "./MissionPreviewModal";
import { MissionStatsCards } from "./MissionStatsCards";
import { MissionsFilterBar } from "./MissionsFilterBar";
import {
  activateMissionAction,
  applyClientSearch,
  cancelMissionAction,
  completeMissionAction,
  createMissionAction,
  initialState,
  loadMissions,
  missionsReducer,
  updateMissionAction,
} from "./MissionsReducer";
import { MissionTable } from "./MissionTable";

export function MissionsList() {
  const [state, dispatch] = useReducer(missionsReducer, initialState);
  const [editingMission, setEditingMission] = useState<AdminMission | null>(
    null,
  );
  const [previewMission, setPreviewMission] = useState<AdminMission | null>(
    null,
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // In-memory catalogs loaded once on mount (games, providers, rooms take: 50)
  const [games, setGames] = useState<BackendGameItem[]>([]);
  const [providers, setProviders] = useState<BackendProviderItem[]>([]);
  const [rooms, setRooms] = useState<BackendRoom[]>([]);

  useEffect(() => {
    loadMissions(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  useEffect(() => {
    async function loadCatalogs() {
      try {
        const [gamesRes, providersRes, roomsRes] = await Promise.all([
          apiAdminGanaya.getGames(),
          apiAdminGanaya.getProviders(),
          apiAdminGanaya.getRooms({ take: 50 }),
        ]);
        if (gamesRes.status && gamesRes.data) setGames(gamesRes.data);
        if (providersRes.status && providersRes.data)
          setProviders(providersRes.data);
        if (roomsRes.status && roomsRes.data) setRooms(roomsRes.data);
      } catch {
        // best effort catalog load
      }
    }
    loadCatalogs();
  }, []);

  const handleFilterChange = useCallback((filters: Partial<MissionFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    dispatch({ type: "SET_LIMIT", payload: { limit } });
  }, []);

  const handleResetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const handleCreate = useCallback(() => {
    setEditingMission(null);
    setShowFormModal(true);
  }, []);

  const handlePreview = useCallback((mission: AdminMission) => {
    setPreviewMission(mission);
    setShowPreviewModal(true);
  }, []);

  const handleEdit = useCallback(
    (id: string) => {
      const m = state.missions.find((x) => x.id === id);
      if (m) {
        setEditingMission(m);
        setShowFormModal(true);
      }
    },
    [state.missions],
  );

  const handleActivate = useCallback(
    (id: string) => {
      const m = state.missions.find((x) => x.id === id);
      if (!m) return;
      casinoToast.action({
        title: "¿Activar misión?",
        description: `¿Desea activar "${m.title}"? Quedará protegida contra edición.`,
        button: {
          title: "Activar",
          onClick: async () => {
            const ok = await activateMissionAction(id);
            if (ok)
              loadMissions(dispatch, state.page, state.limit, state.filters);
          },
        },
      });
    },
    [state.missions, state.page, state.limit, state.filters],
  );

  const handleComplete = useCallback(
    (id: string) => {
      const m = state.missions.find((x) => x.id === id);
      if (!m) return;
      casinoToast.action({
        title: "¿Finalizar misión?",
        description: `¿Desea marcar "${m.title}" como completada?`,
        button: {
          title: "Finalizar",
          onClick: async () => {
            const ok = await completeMissionAction(id);
            if (ok)
              loadMissions(dispatch, state.page, state.limit, state.filters);
          },
        },
      });
    },
    [state.missions, state.page, state.limit, state.filters],
  );

  const handleCancel = useCallback(
    (id: string) => {
      const m = state.missions.find((x) => x.id === id);
      if (!m) return;
      casinoToast.action({
        title: "¿Cancelar misión?",
        description: `¿Desea cancelar la misión "${m.title}"?`,
        button: {
          title: "Cancelar",
          onClick: async () => {
            const ok = await cancelMissionAction(id);
            if (ok)
              loadMissions(dispatch, state.page, state.limit, state.filters);
          },
        },
      });
    },
    [state.missions, state.page, state.limit, state.filters],
  );

  const handleSave = useCallback(
    async (data: PartialAdminMission, isCreate: boolean): Promise<boolean> => {
      const ok = isCreate
        ? await createMissionAction(dispatch, data)
        : editingMission
          ? await updateMissionAction(dispatch, editingMission.id, data)
          : false;

      if (ok) {
        setShowFormModal(false);
        setEditingMission(null);
        loadMissions(dispatch, state.page, state.limit, state.filters);
      }
      return ok;
    },
    [editingMission, state.page, state.limit, state.filters],
  );

  const filteredMissions = useMemo(
    () => applyClientSearch(state.missions, state.filters.search),
    [state.missions, state.filters.search],
  );

  const stats = useMemo(() => {
    const activeCount = state.missions.filter(
      (m) => m.status === "active",
    ).length;
    const dailyCount = state.missions.filter(
      (m) => m.category === "daily",
    ).length;
    const weeklyCount = state.missions.filter(
      (m) => m.category === "weekly",
    ).length;
    return { totalMissions: state.total, activeCount, dailyCount, weeklyCount };
  }, [state.missions, state.total]);

  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
            Control de Misiones
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Gestione y supervise las misiones diarias, semanales y retos de la
            plataforma.
          </p>
        </div>
        <Button
          leadingIcon="add_circle"
          onClick={handleCreate}
          variant="secondary"
          className="whitespace-nowrap shrink-0 cursor-pointer"
        >
          Crear misión
        </Button>
      </div>

      <MissionStatsCards
        totalMissions={stats.totalMissions}
        activeCount={stats.activeCount}
        dailyCount={stats.dailyCount}
        weeklyCount={stats.weeklyCount}
      />

      <MissionsFilterBar
        filters={state.filters}
        limit={state.limit}
        rooms={rooms}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        onResetFilters={handleResetFilters}
      />

      <MissionTable
        missions={filteredMissions}
        onPreview={handlePreview}
        onEdit={handleEdit}
        onActivate={handleActivate}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />

      {state.total > state.limit && (
        <div className="flex justify-center pt-4 border-t border-outline-variant/15">
          <Pagination
            current={state.page}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {showPreviewModal && (
        <MissionPreviewModal
          open={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setPreviewMission(null);
          }}
          mission={previewMission}
        />
      )}

      {showFormModal && (
        <MissionFormModal
          open={showFormModal}
          onClose={() => {
            setShowFormModal(false);
            setEditingMission(null);
          }}
          mission={editingMission}
          onSave={handleSave}
          isSubmitting={state.isSubmitting}
          games={games}
          providers={providers}
          rooms={rooms}
        />
      )}
    </div>
  );
}

MissionsList.displayName = "MissionsList";
