import type { Dispatch } from "react";

import type { ReviewSubmission } from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import { reviewQueueByPlayerToReviews } from "@/types/review/api-mappers";
import type { ReviewMissionType } from "@/types/review/ReviewQueueByPlayer";
import type { ReviewFilter } from "@/types/review/ReviewSubmission";

/* ── Constants ── */

export const PAGE_SIZE = 12;

const FILTER_TO_STATUS: Record<
  ReviewFilter,
  "PENDING" | "APPROVED" | "REJECTED"
> = {
  pending: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
};

/* ── State ── */

export interface ReviewState {
  submissions: ReviewSubmission[];
  filter: ReviewFilter;
  missionType: ReviewMissionType | "all";
  page: number;
  totalPages: number;
  loading: boolean;
  selectedSubmission:
    | (ReviewSubmission & {
        verificationCriteria?: import("@shared/types").VerificationCriterion[];
      })
    | null;
  modalOpen: boolean;
}

export const initialState: ReviewState = {
  submissions: [],
  filter: "pending",
  missionType: "all",
  page: 1,
  totalPages: 1,
  loading: true,
  selectedSubmission: null,
  modalOpen: false,
};

export type ReviewAction =
  | {
      type: "LOAD_SUBMISSIONS";
      payload: { submissions: ReviewSubmission[]; totalPages: number };
    }
  | { type: "SET_FILTER"; payload: { filter: ReviewFilter } }
  | {
      type: "SET_MISSION_TYPE";
      payload: { missionType: ReviewMissionType | "all" };
    }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_LOADING" }
  | { type: "SELECT_SUBMISSION"; payload: { submission: ReviewSubmission } }
  | { type: "CLOSE_MODAL" }
  | { type: "UPDATE_STATUS"; payload: { id: string } };

/* ── Reducer ── */

export function reviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
    case "LOAD_SUBMISSIONS":
      return {
        ...state,
        submissions: action.payload.submissions,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload.filter, page: 1 };
    case "SET_MISSION_TYPE":
      return { ...state, missionType: action.payload.missionType, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload.page };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SELECT_SUBMISSION":
      return {
        ...state,
        selectedSubmission: action.payload.submission,
        modalOpen: true,
      };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, selectedSubmission: null };
    case "UPDATE_STATUS":
      return {
        ...state,
        submissions: state.submissions.filter(
          (s) => s.id !== action.payload.id,
        ),
        modalOpen: false,
        selectedSubmission: null,
      };
    default:
      return state;
  }
}

/* ── Helpers ── */

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

/* ── Action dispatchers ── */

export async function loadReviewQueue(
  dispatch: Dispatch<ReviewAction>,
  options: {
    filter: ReviewFilter;
    missionType: ReviewMissionType | "all";
    page: number;
  },
) {
  dispatch({ type: "SET_LOADING" });

  const result = await apiAdminGanaya.getReviewQueue({
    status: FILTER_TO_STATUS[options.filter],
    type: options.missionType === "all" ? undefined : options.missionType,
    take: PAGE_SIZE,
    skip: (options.page - 1) * PAGE_SIZE,
  });

  if (result.status && result.data) {
    const submissions = result.data.flatMap(reviewQueueByPlayerToReviews);
    dispatch({
      type: "LOAD_SUBMISSIONS",
      payload: {
        submissions,
        totalPages: result.meta?.totalPages ?? 1,
      },
    });
    return;
  }

  casinoToast.error({
    title: "Error al cargar la cola de revisión",
    description: getMessage(result.message),
  });
  dispatch({
    type: "LOAD_SUBMISSIONS",
    payload: { submissions: [], totalPages: 1 },
  });
}

export async function submitReview(
  dispatch: Dispatch<ReviewAction>,
  submissionId: string,
  body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
) {
  const result = await apiAdminGanaya.reviewStep(Number(submissionId), body);

  if (result.status) {
    casinoToast.success({
      title:
        body.status === "APPROVED"
          ? "Tarea aprobada correctamente"
          : "Tarea rechazada",
      duration: 3000,
    });
    dispatch({ type: "UPDATE_STATUS", payload: { id: submissionId } });
    return;
  }

  casinoToast.error({
    title: "Error al enviar la revisión",
    description: getMessage(result.message),
  });
}
