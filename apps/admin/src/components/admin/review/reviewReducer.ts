import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  ReviewQueueParams,
  UserMissionReviewItem,
} from "@/types/review/ReviewMission";
import type {
  ReviewFilters,
  ReviewStepSubmission,
} from "@/types/review/ReviewSubmission";

export const PAGE_SIZE = 12;

export interface ReviewState {
  items: UserMissionReviewItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: ReviewFilters;
  selectedItem: UserMissionReviewItem | null;
  isModalOpen: boolean;
}

export const initialReviewFilters: ReviewFilters = {
  status: "IN_PROGRESS",
  playerId: "",
  type: "all",
  minCoinsAmount: "",
  maxCoinsAmount: "",
  minExperience: "",
  maxExperience: "",
};

export const initialReviewState: ReviewState = {
  items: [],
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
  totalPages: 1,
  isLoading: true,
  isSubmitting: false,
  filters: initialReviewFilters,
  selectedItem: null,
  isModalOpen: false,
};

export type ReviewAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { items: UserMissionReviewItem[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<ReviewFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_MODAL"; payload: UserMissionReviewItem }
  | { type: "CLOSE_MODAL" }
  | {
      type: "UPDATE_STEP_SUCCESS";
      payload: {
        userMissionId: number;
        step: ReviewStepSubmission;
      };
    }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" };

export function reviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        total: action.payload.total,
        totalPages: Math.max(1, Math.ceil(action.payload.total / state.limit)),
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LIMIT":
      return {
        ...state,
        limit: action.payload,
        page: 1,
        totalPages: Math.max(1, Math.ceil(state.total / action.payload)),
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        page: 1,
      };
    case "RESET_FILTERS":
      return {
        ...state,
        filters: initialReviewFilters,
        page: 1,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        selectedItem: action.payload,
        isModalOpen: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        selectedItem: null,
        isModalOpen: false,
      };
    case "UPDATE_STEP_SUCCESS": {
      const updatedItems = state.items.map((item) => {
        if (item.userMissionId !== action.payload.userMissionId) return item;
        return {
          ...item,
          steps: item.steps.map((st) =>
            st.id === action.payload.step.id ? action.payload.step : st,
          ),
        };
      });

      const updatedSelectedItem =
        state.selectedItem &&
        state.selectedItem.userMissionId === action.payload.userMissionId
          ? {
              ...state.selectedItem,
              steps: state.selectedItem.steps.map((st) =>
                st.id === action.payload.step.id ? action.payload.step : st,
              ),
            }
          : state.selectedItem;

      return {
        ...state,
        items: updatedItems,
        selectedItem: updatedSelectedItem,
      };
    }
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "SUBMIT_END":
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
}

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

export async function loadReviewQueue(
  dispatch: Dispatch<ReviewAction>,
  page: number,
  limit: number,
  filters: ReviewFilters,
) {
  dispatch({ type: "FETCH_START" });

  const queryParams: ReviewQueueParams = {
    take: limit,
    skip: (page - 1) * limit,
  };

  if (filters.status !== "all") {
    queryParams.status = filters.status;
  }
  if (filters.type !== "all") {
    queryParams.type = filters.type;
  }
  if (filters.playerId.trim() !== "") {
    queryParams.playerId = Number(filters.playerId);
  }
  if (filters.minCoinsAmount && filters.minCoinsAmount.trim() !== "") {
    queryParams.minCoinsAmount = Number(filters.minCoinsAmount);
  }
  if (filters.maxCoinsAmount && filters.maxCoinsAmount.trim() !== "") {
    queryParams.maxCoinsAmount = Number(filters.maxCoinsAmount);
  }
  if (filters.minExperience && filters.minExperience.trim() !== "") {
    queryParams.minExperience = Number(filters.minExperience);
  }
  if (filters.maxExperience && filters.maxExperience.trim() !== "") {
    queryParams.maxExperience = Number(filters.maxExperience);
  }

  const result = await apiAdminGanaya.getReviewQueue(queryParams);

  if (result.status && result.data) {
    dispatch({
      type: "FETCH_SUCCESS",
      payload: {
        items: result.data,
        total: result.meta?.total ?? result.data.length,
      },
    });
    return;
  }

  casinoToast.error({
    title: "Error al cargar cola de revisión",
    description: getMessage(result.message),
  });
  dispatch({ type: "FETCH_ERROR" });
}

export async function reviewStepAction(
  dispatch: Dispatch<ReviewAction>,
  userMissionId: number,
  stepId: number,
  body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const result = await apiAdminGanaya.reviewStep(stepId, body);

    if (result.status && result.data) {
      casinoToast.success({
        title: body.status === "APPROVED" ? "Paso aprobado" : "Paso rechazado",
        description:
          body.status === "APPROVED"
            ? "El paso de la misión fue aprobado exitosamente"
            : "El paso fue rechazado con las notas indicadas",
      });

      dispatch({
        type: "UPDATE_STEP_SUCCESS",
        payload: {
          userMissionId,
          step: result.data,
        },
      });
      return true;
    }

    casinoToast.error({
      title: "Error al calificar el paso",
      description: getMessage(result.message),
    });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo conectar con el servidor",
    });
    return false;
  } finally {
    dispatch({ type: "SUBMIT_END" });
  }
}
