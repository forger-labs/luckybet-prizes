"use client";

import { useCallback, useEffect, useReducer } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type {
  BackendMissionReward,
  MissionRewardsFilters,
  ResolveMissionRewardPayload,
} from "@/types/review/AdminMissionRewards";
import { MissionRewardsFilterBar } from "./MissionRewardsFilterBar";
import { MissionRewardsStatsCards } from "./MissionRewardsStatsCards";
import { MissionRewardsTable } from "./MissionRewardsTable";
import {
  initialMissionRewardsState,
  loadMissionRewards,
  missionRewardsReducer,
  resolveMissionRewardAction,
} from "./missionRewardsReducer";
import { ResolveMissionRewardModal } from "./ResolveMissionRewardModal";

export function MissionRewardsTabContent() {
  const [state, dispatch] = useReducer(
    missionRewardsReducer,
    initialMissionRewardsState,
  );

  const fetchCurrent = useCallback(() => {
    loadMissionRewards(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  useEffect(() => {
    fetchCurrent();
  }, [fetchCurrent]);

  const handleFilterChange = useCallback(
    (f: Partial<MissionRewardsFilters>) => {
      dispatch({ type: "SET_FILTERS", payload: f });
    },
    [],
  );

  const handleResetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    dispatch({ type: "SET_LIMIT", payload: limit });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  const handleOpenResolveModal = useCallback((reward: BackendMissionReward) => {
    dispatch({ type: "OPEN_RESOLVE_MODAL", payload: reward });
  }, []);

  const handleCloseResolveModal = useCallback(() => {
    dispatch({ type: "CLOSE_RESOLVE_MODAL" });
  }, []);

  const handleResolve = useCallback(
    async (payload: ResolveMissionRewardPayload) => {
      if (!state.selectedReward) return false;
      return await resolveMissionRewardAction(
        dispatch,
        state.selectedReward.id,
        payload,
        fetchCurrent,
      );
    },
    [state.selectedReward, fetchCurrent],
  );

  const claimedInPage = state.rewards.filter(
    (r) => r.status === "CLAIMED",
  ).length;
  const uncertainInPage = state.rewards.filter(
    (r) => r.status === "TIMEOUT_UNCERTAIN",
  ).length;
  const pendingInPage = state.rewards.filter(
    (r) => r.status === "PENDING",
  ).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <MissionRewardsStatsCards
        totalRewards={state.total}
        claimedInPage={claimedInPage}
        uncertainInPage={uncertainInPage}
        pendingInPage={pendingInPage}
      />

      <MissionRewardsFilterBar
        filters={state.filters}
        limit={state.limit}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        onResetFilters={handleResetFilters}
      />

      <MissionRewardsTable
        rewards={state.rewards}
        isLoading={state.isLoading}
        onResolve={handleOpenResolveModal}
      />

      {state.total > state.limit && (
        <div className="flex justify-center pt-4 border-t border-outline-variant/15">
          <Pagination
            current={state.page}
            total={state.totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {state.isResolveModalOpen && (
        <ResolveMissionRewardModal
          reward={state.selectedReward}
          open={state.isResolveModalOpen}
          onClose={handleCloseResolveModal}
          onResolve={handleResolve}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  );
}

MissionRewardsTabContent.displayName = "MissionRewardsTabContent";
