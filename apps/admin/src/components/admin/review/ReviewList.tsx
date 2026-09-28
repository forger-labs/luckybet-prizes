"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type { UserMissionReviewItem } from "@/types/review/ReviewMission";
import type {
  ReviewFilters,
  ReviewViewMode,
} from "@/types/review/ReviewSubmission";
import { ReviewableCard } from "./ReviewableCard";
import { ReviewFilterBar } from "./ReviewFilterBar";
import { ReviewModal } from "./ReviewModal";
import { ReviewStatsCards } from "./ReviewStatsCards";
import { ReviewTable } from "./ReviewTable";
import {
  initialReviewState,
  loadReviewQueue,
  reviewReducer,
  reviewStepAction,
} from "./reviewReducer";

export function ReviewList() {
  const [state, dispatch] = useReducer(reviewReducer, initialReviewState);
  const [viewMode, setViewMode] = useState<ReviewViewMode>("list");

  useEffect(() => {
    loadReviewQueue(dispatch, state.page, state.limit, state.filters);
  }, [state.page, state.limit, state.filters]);

  const handleFilterChange = useCallback((f: Partial<ReviewFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: f });
  }, []);

  const handleResetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  const handleOpenModal = useCallback((item: UserMissionReviewItem) => {
    dispatch({ type: "OPEN_MODAL", payload: item });
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const handleReviewStep = useCallback(
    async (
      stepId: number,
      body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
    ) => {
      if (!state.selectedItem) return false;
      return await reviewStepAction(
        dispatch,
        state.selectedItem.userMissionId,
        stepId,
        body,
      );
    },
    [state.selectedItem],
  );

  const handleQuickApprove = useCallback(
    async (stepId: number) => {
      const targetItem = state.items.find((item) =>
        item.steps.some((st) => st.id === stepId),
      );
      if (targetItem) {
        await reviewStepAction(dispatch, targetItem.userMissionId, stepId, {
          status: "APPROVED",
        });
      }
    },
    [state.items],
  );

  const inProgressCount = state.items.filter(
    (i) => i.userMissionStatus === "IN_PROGRESS",
  ).length;
  const completedCount = state.items.filter(
    (i) => i.userMissionStatus === "COMPLETED",
  ).length;
  const pendingStepsCount = state.items.reduce(
    (acc, curr) =>
      acc + curr.steps.filter((st) => st.status === "PENDING").length,
    0,
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <ReviewStatsCards
        totalMissions={state.total}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        pendingStepsCount={pendingStepsCount}
      />

      <ReviewFilterBar
        filters={state.filters}
        viewMode={viewMode}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onViewModeChange={setViewMode}
      />

      {viewMode === "list" ? (
        <ReviewTable
          items={state.items}
          isLoading={state.isLoading}
          onReview={handleOpenModal}
          onQuickApproveStep={handleQuickApprove}
          onQuickRejectStep={(stepId) => {
            const targetItem = state.items.find((item) =>
              item.steps.some((st) => st.id === stepId),
            );
            if (targetItem) handleOpenModal(targetItem);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {state.items.map((item) => (
            <ReviewableCard
              key={item.userMissionId}
              item={item}
              onReview={handleOpenModal}
            />
          ))}
        </div>
      )}

      {state.total > state.limit && (
        <div className="flex justify-center pt-4 border-t border-outline-variant/15">
          <Pagination
            current={state.page}
            total={state.totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {state.isModalOpen && (
        <ReviewModal
          item={state.selectedItem}
          open={state.isModalOpen}
          onClose={handleCloseModal}
          onReviewStep={handleReviewStep}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  );
}

ReviewList.displayName = "ReviewList";
