"use client";

import { useCallback, useEffect, useReducer } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type { ReviewMissionType } from "@/types/review/ReviewQueueByPlayer";
import type { ReviewFilter } from "@/types/review/ReviewSubmission";
import { ReviewableCard } from "./ReviewableCard";
import { ReviewFilterBar } from "./ReviewFilterBar";
import { ReviewModal } from "./ReviewModal";
import { ReviewStatsCards } from "./ReviewStatsCards";
import {
  initialState,
  loadReviewQueue,
  reviewReducer,
  submitReview,
} from "./reviewReducer";
import { SkeletonCard } from "./SkeletonCard";

const EMPTY_MESSAGES: Record<
  string,
  { icon: string; title: string; desc: string }
> = {
  pending: {
    icon: "fact_check",
    title: "No hay tareas pendientes de revisión",
    desc: "Las evidencias enviadas por los jugadores aparecerán aquí.",
  },
  approved: {
    icon: "task_alt",
    title: "Sin tareas aprobadas en este filtro",
    desc: "Las tareas aprobadas se archivarán en esta sección.",
  },
  rejected: {
    icon: "gpp_bad",
    title: "Sin tareas rechazadas en este filtro",
    desc: "Las tareas rechazadas con observaciones se mostrarán aquí.",
  },
};

export function ReviewList() {
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  useEffect(() => {
    loadReviewQueue(dispatch, {
      filter: state.filter,
      missionType: state.missionType,
      page: state.page,
    });
  }, [state.filter, state.missionType, state.page]);

  const handleSelect = useCallback(
    (id: string) => {
      const sub = state.submissions.find((s) => s.id === id);
      if (sub)
        dispatch({ type: "SELECT_SUBMISSION", payload: { submission: sub } });
    },
    [state.submissions],
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const handleApprove = useCallback(async (id: string, notes?: string) => {
    await submitReview(dispatch, id, {
      status: "APPROVED",
      reviewerNotes: notes,
    });
  }, []);

  const handleReject = useCallback(async (id: string, notes: string) => {
    await submitReview(dispatch, id, {
      status: "REJECTED",
      reviewerNotes: notes,
    });
  }, []);

  const handleTabChange = useCallback((filter: ReviewFilter) => {
    dispatch({ type: "SET_FILTER", payload: { filter } });
  }, []);

  const handleTypeChange = useCallback(
    (missionType: ReviewMissionType | "all") => {
      dispatch({ type: "SET_MISSION_TYPE", payload: { missionType } });
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const empty = EMPTY_MESSAGES[state.filter] || EMPTY_MESSAGES.pending;
  const pendingCount = state.submissions.filter(
    (s) => s.status === "pending",
  ).length;
  const approvedCount = state.submissions.filter(
    (s) => s.status === "approved",
  ).length;
  const rejectedCount = state.submissions.filter(
    (s) => s.status === "rejected",
  ).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* ── Stats Overview ── */}
      <ReviewStatsCards
        totalPending={pendingCount}
        totalApproved={approvedCount}
        totalRejected={rejectedCount}
        page={state.page}
        totalPages={state.totalPages}
      />

      {/* ── Filter Bar ── */}
      <ReviewFilterBar
        activeTab={state.filter}
        activeType={state.missionType}
        onTabChange={handleTabChange}
        onTypeChange={handleTypeChange}
      />

      {/* ── Submission Grid / Loading / Empty State ── */}
      {state.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }, () => crypto.randomUUID()).map((key) => (
            <SkeletonCard key={key} />
          ))}
        </div>
      ) : state.submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60 backdrop-blur-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
            <span className="material-symbols-outlined text-3xl">
              {empty.icon}
            </span>
          </div>
          <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
            {empty.title}
          </p>
          <p className="font-body-md text-sm text-on-surface-variant max-w-md mt-1">
            {empty.desc}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {state.submissions.map((submission) => (
              <ReviewableCard
                key={submission.id}
                submission={submission}
                onClick={handleSelect}
              />
            ))}
          </div>

          <div className="flex justify-center pt-4 border-t border-outline-variant/15">
            <Pagination
              current={state.page}
              total={state.totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* ── Evidence Review Modal ── */}
      {state.selectedSubmission && (
        <ReviewModal
          submission={state.selectedSubmission}
          open={state.modalOpen}
          onClose={handleClose}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

ReviewList.displayName = "ReviewList";
