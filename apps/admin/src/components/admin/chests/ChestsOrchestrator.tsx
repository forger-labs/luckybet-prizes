"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import type {
  BackendChest,
  BackendRoom,
  ResolveChestClaimPayload,
} from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { Button } from "@/components/ui/Button";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type { ChestFormValues, ChestsActiveTab } from "@/types/adminChests";
import { ChestsViewToggle } from "./ChestsViewToggle";
import { ChestsTabContent } from "./chests/ChestsTabContent";
import {
  chestsReducer,
  createChestAction,
  initialChestsState,
  loadChests,
  toggleChestStatusAction,
  updateChestAction,
} from "./chests/chestsReducer";
import { PrizesTabContent } from "./prizes/PrizesTabContent";
import {
  initialPrizesState,
  loadPrizes,
  prizesReducer,
  resolveChestClaimAction,
} from "./prizes/prizesReducer";

const TAB_STORAGE_KEY = "admin_active_chests_tab";

export function ChestsOrchestrator() {
  const [activeTab, setActiveTab] = useState<ChestsActiveTab>("chests");
  const [rooms, setRooms] = useState<BackendRoom[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [chestsState, dispatchChests] = useReducer(
    chestsReducer,
    initialChestsState,
  );
  const [prizesState, dispatchPrizes] = useReducer(
    prizesReducer,
    initialPrizesState,
  );

  useEffect(() => {
    const saved = localStorage.getItem(
      TAB_STORAGE_KEY,
    ) as ChestsActiveTab | null;
    if (saved === "chests" || saved === "prizes") {
      setActiveTab(saved);
    }
  }, []);

  const handleChangeTab = useCallback((tab: ChestsActiveTab) => {
    setActiveTab(tab);
    localStorage.setItem(TAB_STORAGE_KEY, tab);
  }, []);

  // Carga inicial única de salas con take: 20
  useEffect(() => {
    async function loadRooms() {
      try {
        const res = await apiAdminGanaya.getRooms({ take: 20 });
        if (res.status && res.data) setRooms(res.data);
      } catch {
        // best effort
      }
    }
    loadRooms();
  }, []);

  useEffect(() => {
    if (activeTab === "chests") {
      loadChests(
        dispatchChests,
        chestsState.page,
        chestsState.limit,
        chestsState.filters,
      );
    }
  }, [activeTab, chestsState.page, chestsState.limit, chestsState.filters]);

  useEffect(() => {
    if (activeTab === "prizes") {
      loadPrizes(
        dispatchPrizes,
        prizesState.page,
        prizesState.limit,
        prizesState.filters,
      );
    }
  }, [activeTab, prizesState.page, prizesState.limit, prizesState.filters]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    if (activeTab === "chests") {
      await loadChests(
        dispatchChests,
        chestsState.page,
        chestsState.limit,
        chestsState.filters,
      );
    } else {
      await loadPrizes(
        dispatchPrizes,
        prizesState.page,
        prizesState.limit,
        prizesState.filters,
      );
    }
    setTimeout(() => setIsRefreshing(false), 400);
  }, [
    activeTab,
    chestsState.page,
    chestsState.limit,
    chestsState.filters,
    prizesState.page,
    prizesState.limit,
    prizesState.filters,
  ]);

  const handleOpenCreateChest = useCallback(() => {
    dispatchChests({ type: "OPEN_CREATE_MODAL" });
  }, []);

  const handleSaveChest = useCallback(
    async (data: ChestFormValues, isCreate: boolean): Promise<boolean> => {
      const ok = isCreate
        ? await createChestAction(dispatchChests, data)
        : chestsState.selectedChest
          ? await updateChestAction(
              dispatchChests,
              chestsState.selectedChest.id,
              data,
            )
          : false;

      if (ok) {
        dispatchChests({ type: "CLOSE_FORM_MODAL" });
        loadChests(
          dispatchChests,
          chestsState.page,
          chestsState.limit,
          chestsState.filters,
        );
      }
      return ok;
    },
    [
      chestsState.selectedChest,
      chestsState.page,
      chestsState.limit,
      chestsState.filters,
    ],
  );

  const handleToggleChestStatus = useCallback(
    (chest: BackendChest) => {
      const willActivate = !chest.isActive;
      casinoToast.action({
        title: willActivate ? "¿Activar cofre?" : "¿Pausar cofre?",
        description: `¿Desea ${willActivate ? "activar" : "pausar"} el cofre "${chest.title}"?`,
        button: {
          title: willActivate ? "Activar" : "Pausar",
          onClick: async () => {
            const ok = await toggleChestStatusAction(
              chest.id,
              willActivate,
              chest.title,
            );
            if (ok) {
              loadChests(
                dispatchChests,
                chestsState.page,
                chestsState.limit,
                chestsState.filters,
              );
            }
          },
        },
      });
    },
    [chestsState.page, chestsState.limit, chestsState.filters],
  );

  const handleResolveClaim = useCallback(
    async (payload: ResolveChestClaimPayload): Promise<boolean> => {
      if (!prizesState.selectedPrize) return false;
      const ok = await resolveChestClaimAction(
        dispatchPrizes,
        prizesState.selectedPrize.id,
        payload,
      );
      if (ok) {
        dispatchPrizes({ type: "CLOSE_RESOLVE_MODAL" });
        loadPrizes(
          dispatchPrizes,
          prizesState.page,
          prizesState.limit,
          prizesState.filters,
        );
      }
      return ok;
    },
    [
      prizesState.selectedPrize,
      prizesState.page,
      prizesState.limit,
      prizesState.filters,
    ],
  );

  const chestStats = useMemo(() => {
    const active = chestsState.chests.filter((c) => c.isActive).length;
    const weekly = chestsState.chests.filter(
      (c) => c.periodType === "WEEKLY",
    ).length;
    const monthly = chestsState.chests.filter(
      (c) => c.periodType === "MONTHLY",
    ).length;
    return {
      totalChests: chestsState.total,
      activeChests: active,
      weeklyChests: weekly,
      monthlyChests: monthly,
    };
  }, [chestsState.chests, chestsState.total]);

  const prizeStats = useMemo(() => {
    const claimed = prizesState.prizes.filter(
      (p) => p.status === "CLAIMED",
    ).length;
    const uncertain = prizesState.prizes.filter(
      (p) => p.status === "TIMEOUT_UNCERTAIN",
    ).length;
    const pending = prizesState.prizes.filter(
      (p) => p.status === "PENDING" || p.status === "PROCESSING",
    ).length;
    return {
      totalPrizes: prizesState.total,
      claimedPrizes: claimed,
      uncertainPrizes: uncertain,
      pendingPrizes: pending,
    };
  }, [prizesState.prizes, prizesState.total]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
            Cofres y Recompensas
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Gestione los cofres de progreso semanales/mensuales y audite los
            reclamos de premios.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface border border-outline-variant/30 transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-50"
            title="Refrescar datos"
            aria-label="Refrescar datos"
          >
            <span
              className={`material-symbols-outlined text-lg ${isRefreshing ? "animate-spin text-primary" : ""}`}
            >
              refresh
            </span>
          </button>

          {activeTab === "chests" && (
            <Button
              leadingIcon="add_circle"
              onClick={handleOpenCreateChest}
              variant="secondary"
              className="whitespace-nowrap shrink-0 cursor-pointer"
            >
              Crear Cofre
            </Button>
          )}
        </div>
      </div>

      <ChestsViewToggle
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
        uncertainCount={prizeStats.uncertainPrizes}
      />

      {activeTab === "chests" ? (
        <ChestsTabContent
          state={chestsState}
          dispatch={dispatchChests}
          rooms={rooms}
          stats={chestStats}
          onSaveChest={handleSaveChest}
          onToggleStatus={handleToggleChestStatus}
        />
      ) : (
        <PrizesTabContent
          state={prizesState}
          dispatch={dispatchPrizes}
          stats={prizeStats}
          onResolveClaim={handleResolveClaim}
        />
      )}
    </div>
  );
}

ChestsOrchestrator.displayName = "ChestsOrchestrator";
