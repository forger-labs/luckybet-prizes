"use client";

import { useCallback, useEffect, useReducer } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type {
  BackendLevelReward,
  LevelRewardsFilters,
  ResolveLevelRewardPayload,
} from "@/types/adminLevels";
import { LevelRewardsFilterBar } from "./LevelRewardsFilterBar";
import { LevelRewardsStatsCards } from "./LevelRewardsStatsCards";
import { LevelRewardsTable } from "./LevelRewardsTable";
import {
  initialLevelRewardsState,
  levelRewardsReducer,
  loadLevelRewards,
  resolveLevelRewardAction,
} from "./levelRewardsReducer";
import { ResolveLevelRewardModal } from "./ResolveLevelRewardModal";

export function LevelRewardsTabContent() {
  const [state, dispatch] = useReducer(
    levelRewardsReducer,
    initialLevelRewardsState,
  );

  const fetchCurrent = useCallback(() => {
    loadLevelRewards(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  useEffect(() => {
    fetchCurrent();
  }, [fetchCurrent]);

  const handleFilterChange = useCallback((f: Partial<LevelRewardsFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: f });
  }, []);

  const handleResetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    dispatch({ type: "SET_LIMIT", payload: limit });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  const handleOpenResolveModal = useCallback((reward: BackendLevelReward) => {
    dispatch({ type: "OPEN_RESOLVE_MODAL", payload: reward });
  }, []);

  const handleCloseResolveModal = useCallback(() => {
    dispatch({ type: "CLOSE_RESOLVE_MODAL" });
  }, []);

  const handleResolve = useCallback(
    async (payload: ResolveLevelRewardPayload) => {
      if (!state.selectedReward) return false;
      return await resolveLevelRewardAction(
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
      <LevelRewardsStatsCards
        totalRewards={state.total}
        claimedInPage={claimedInPage}
        uncertainInPage={uncertainInPage}
        pendingInPage={pendingInPage}
      />

      <LevelRewardsFilterBar
        filters={state.filters}
        limit={state.limit}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
        onResetFilters={handleResetFilters}
      />

      <LevelRewardsTable
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
        <ResolveLevelRewardModal
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

LevelRewardsTabContent.displayName = "LevelRewardsTabContent";
