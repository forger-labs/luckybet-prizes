"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

import type { AdminMission } from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { MissionFormModal } from "@/components/admin/mission-form/MissionFormModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import type { FilterValue } from "@/types/missions/FilterTabs";
import { FilterTabs } from "./FilterTabs";
import { MissionIntegrityBanner } from "./MissionIntegrityBanner";
import { MissionStatsCards } from "./MissionStatsCards";
import {
  activateMission,
  applyFilters,
  cancelMission,
  createMission,
  deleteMission,
  initialState,
  loadMissions,
  missionsReducer,
  updateMission,
} from "./MissionsReducer";
import { MissionTable } from "./MissionTable";

export function MissionsList() {
  const [state, dispatch] = useReducer(missionsReducer, initialState);
  const [editingMission, setEditingMission] = useState<AdminMission | null>(
    null,
  );
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    loadMissions(dispatch, state.page);
  }, [state.page]);

  const pageMissions = applyFilters(state.missions, state.filter, state.search);

  const handleFilterChange = useCallback((filter: FilterValue) => {
    dispatch({ type: "SET_FILTER", payload: { filter } });
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH", payload: { search: e.target.value } });
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const handleCreate = useCallback(() => {
    setEditingMission(null);
    setShowFormModal(true);
  }, []);

  const handleEdit = useCallback(
    (id: string) => {
      const mission = state.missions.find((m) => m.id === id);
      if (!mission) return;
      setEditingMission(mission);
      setShowFormModal(true);
    },
    [state.missions],
  );

  const handleView = useCallback(
    (id: string) => {
      const mission = state.missions.find((m) => m.id === id);
      if (!mission) return;
      setEditingMission(mission);
      setShowFormModal(true);
    },
    [state.missions],
  );

  const handleDuplicate = useCallback(
    (id: string) => {
      const mission = state.missions.find((m) => m.id === id);
      if (!mission) return;
      setEditingMission(null);
      setShowFormModal(true);
    },
    [state.missions],
  );

  const handleActivate = useCallback(async (id: string) => {
    casinoToast.action({
      title: "¿Activar misión?",
      description:
        "Al activar la misión su contenido quedará bloqueado para edición.",
      button: {
        title: "Activar",
        onClick: async () => {
          await activateMission(dispatch, id);
        },
      },
    });
  }, []);

  const handleCancel = useCallback(async (id: string) => {
    const reason = window.prompt("Motivo de cancelación:");
    if (!reason?.trim()) return;
    await cancelMission(dispatch, id, reason.trim());
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm("¿Desea eliminar la misión?");
    if (!confirmed) return;
    await deleteMission(dispatch, id);
  }, []);

  const handleSave = useCallback(
    async (
      data: Omit<AdminMission, "id" | "createdAt" | "participants">,
      isCreate: boolean,
    ) => {
      const ok = isCreate
        ? await createMission(dispatch, data)
        : editingMission
          ? await updateMission(dispatch, editingMission.id, data)
          : false;

      if (ok) {
        setShowFormModal(false);
        setEditingMission(null);
      }
    },
    [editingMission],
  );

  const activeCount = state.missions.filter(
    (m) => m.status === "active",
  ).length;
  const totalParticipants = state.missions.reduce(
    (acc, m) => acc + (m.participants || 0),
    0,
  );

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
            Cargando catálogo de misiones...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <MissionStatsCards
        totalMissions={state.missions.length}
        activeCount={activeCount}
        totalParticipants={totalParticipants}
        page={state.page}
        totalPages={state.totalPages}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:max-w-md">
          <Input
            id="search-missions"
            icon="search"
            placeholder="Buscar por título o recompensa..."
            value={state.search}
            onChange={handleSearchChange}
            wrapperClassName="w-full"
            className="bg-surface-container-low/90 border-outline-variant/30 focus:border-primary"
          />
        </div>
        <Button
          leadingIcon="add_circle"
          onClick={handleCreate}
          variant="secondary"
          className="whitespace-nowrap shrink-0 font-bold shadow-[0_0_15px_rgba(255,198,64,0.2)] hover:shadow-[0_0_20px_rgba(255,198,64,0.35)] cursor-pointer"
        >
          Crear misión
        </Button>
      </div>

      <FilterTabs activeFilter={state.filter} onChange={handleFilterChange} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <MissionTable
            missions={pageMissions}
            onEdit={handleEdit}
            onActivate={handleActivate}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onView={handleView}
            onDuplicate={handleDuplicate}
          />
        </div>

        <MissionIntegrityBanner />
      </div>

      <div className="flex justify-center pt-4 border-t border-outline-variant/15">
        <Pagination
          current={state.page}
          total={state.totalPages}
          onChange={handlePageChange}
        />
      </div>

      {showFormModal && (
        <MissionFormModal
          open={showFormModal}
          onClose={() => {
            setShowFormModal(false);
            setEditingMission(null);
          }}
          mission={editingMission}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

MissionsList.displayName = "MissionsList";
