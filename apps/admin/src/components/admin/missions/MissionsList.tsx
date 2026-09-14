"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

import type { AdminMission } from "@shared/types";

import { MissionFormModal } from "@/components/admin/mission-form/MissionFormModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import type { FilterValue } from "@/types/missions/FilterTabs";
import { FilterTabs } from "./FilterTabs";
import {
  activateMission,
  cancelMission,
  createMission,
  deleteMission,
  getCurrentPageItems,
  initialState,
  loadMissions,
  missionsReducer,
  updateMission,
} from "./MissionsReducer";
import { MissionTable } from "./MissionTable";

/**
 * MissionsList — main orchestrator for the Mission Control page.
 *
 * Provides:
 * 1. Search bar + "Crear misión" button (top)
 * 2. Status filter tabs
 * 3. Missions table (left) + Right sidebar (assets + hints)
 * 4. Pagination (bottom)
 *
 * Uses useReducer for page-local state. All actions go through
 * the reducer → MockDataService → dispatch cycle.
 */
function MissionsList() {
  const [state, dispatch] = useReducer(missionsReducer, initialState);

  /* ── Mission Form Modal state ── */
  const [editingMission, setEditingMission] = useState<AdminMission | null>(
    null,
  );
  const [showFormModal, setShowFormModal] = useState(false);

  /* ── Load missions on mount ── */
  useEffect(() => {
    loadMissions(dispatch);
  }, []);

  /* ── Filtered + paginated items ── */
  const pageMissions = getCurrentPageItems(
    state.missions,
    state.filter,
    state.search,
    state.page,
  );

  /* ── Handlers ── */

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
      // Duplicate through modal — future enhancement
      const mission = state.missions.find((m) => m.id === id);
      if (!mission) return;
      // Pre-fill as a new mission with copy of existing data
      setEditingMission(null);
      setShowFormModal(true);
    },
    [state.missions],
  );

  const handleActivate = useCallback(async (id: string) => {
    const confirmed = window.confirm(
      "¿Activar misión? El contenido quedará bloqueado.",
    );
    if (!confirmed) return;
    await activateMission(dispatch, id);
  }, []);

  const handleCancel = useCallback(async (id: string) => {
    const reason = window.prompt("Motivo de cancelación:");
    if (!reason || !reason.trim()) return;
    await cancelMission(dispatch, id, reason.trim());
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm("¿Eliminar misión?");
    if (!confirmed) return;
    await deleteMission(dispatch, id);
  }, []);

  /* ── Mission Form Modal handlers ── */

  const handleSave = useCallback(
    async (
      data: Omit<AdminMission, "id" | "createdAt" | "participants">,
      isCreate: boolean,
    ) => {
      let ok: boolean;
      if (isCreate) {
        ok = await createMission(dispatch, data);
      } else if (editingMission) {
        ok = await updateMission(dispatch, editingMission.id, data);
      } else {
        return;
      }
      if (ok) {
        setShowFormModal(false);
        setEditingMission(null);
      }
    },
    [editingMission],
  );

  const handleCloseModal = useCallback(() => {
    setShowFormModal(false);
    setEditingMission(null);
  }, []);

  /* ── Loading ── */
  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
            sync
          </span>
          <p className="text-body-md text-on-surface-variant">
            Cargando misiones...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Top bar: Search + Create Button ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full md:max-w-sm">
          <Input
            id="search"
            icon="search"
            placeholder="Buscar misiones..."
            value={state.search}
            onChange={handleSearchChange}
            wrapperClassName="w-full"
          />
        </div>
        <Button
          leadingIcon="add_circle"
          onClick={handleCreate}
          className="whitespace-nowrap shrink-0 cursor-pointer max-sm:w-full text-base font-bold bg-secondary hover:bg-secondary-fixed-dim"
        >
          Crear misión
        </Button>
      </div>

      {/* ── Filter Tabs ── */}
      <FilterTabs activeFilter={state.filter} onChange={handleFilterChange} />

      {/* ── Main content: Table + Right sidebar ── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table area */}
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

        {/* Right sidebar */}
        {/* TODO: Probably this will be deleted */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          {/* Mission Assets placeholder */}
          {/*<div className="rounded-lg border-2 border-dashed border-outline-variant/40 p-8 flex flex-col items-center text-center gap-3 transition-colors hover:border-primary/30">
            <span className="material-symbols-outlined text-4xl text-outline/60">
              cloud_upload
            </span>
            <p className="text-body-md font-semibold text-on-surface-variant">
              Mission Assets
            </p>
            <p className="text-label-sm text-outline">
              Subí imágenes, íconos o recursos multimedia para la misión
            </p>
            <button
              type="button"
              className="mt-2 px-4 py-2 rounded-lg border border-primary/40 text-primary text-label-sm font-semibold hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => console.log("Upload assets — coming in future PR")}
            >
              Seleccionar archivos
            </button>
          </div>*/}

          {/* Configuration hint */}
          <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
              info
            </span>
            <div className="text-body-md text-on-surface-variant">
              <p className="font-semibold text-on-surface mb-1">
                Configuración bloqueada
              </p>
              <p>
                Las misiones activas tienen su contenido bloqueado. Cancelá la
                misión primero si necesitás editarla.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Pagination ── */}
      <div className="flex justify-center pt-4 border-t border-outline-variant/20">
        <Pagination
          current={state.page}
          total={state.totalPages}
          onChange={handlePageChange}
        />
      </div>

      {/* ── Mission Form Modal ── */}
      {showFormModal && (
        <MissionFormModal
          open={showFormModal}
          onClose={handleCloseModal}
          mission={editingMission}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

MissionsList.displayName = "MissionsList";

export { MissionsList };
