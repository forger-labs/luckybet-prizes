import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  GetAdminMissionRewardsQuery,
  MissionRewardsAction,
  MissionRewardsFilters,
  MissionRewardsState,
  ResolveMissionRewardPayload,
} from "@/types/review/AdminMissionRewards";

export const initialMissionRewardsFilters: MissionRewardsFilters = {
  status: "all",
  playerId: "",
  orderBy: "created_at",
  orderDirection: "DESC",
};

export const initialMissionRewardsState: MissionRewardsState = {
  rewards: [],
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 1,
  isLoading: true,
  isSubmitting: false,
  filters: initialMissionRewardsFilters,
  selectedReward: null,
  isResolveModalOpen: false,
};

export function missionRewardsReducer(
  state: MissionRewardsState,
  action: MissionRewardsAction,
): MissionRewardsState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        rewards: action.payload.rewards,
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
        filters: initialMissionRewardsFilters,
        page: 1,
      };
    case "OPEN_RESOLVE_MODAL":
      return {
        ...state,
        selectedReward: action.payload,
        isResolveModalOpen: true,
      };
    case "CLOSE_RESOLVE_MODAL":
      return {
        ...state,
        selectedReward: null,
        isResolveModalOpen: false,
      };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "SUBMIT_SUCCESS":
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
}

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

export async function loadMissionRewards(
  dispatch: Dispatch<MissionRewardsAction>,
  page: number,
  limit: number,
  filters: MissionRewardsFilters,
) {
  dispatch({ type: "FETCH_START" });

  const queryParams: GetAdminMissionRewardsQuery = {
    take: limit,
    skip: (page - 1) * limit,
    orderBy: filters.orderBy,
    orderDirection: filters.orderDirection,
  };

  if (filters.status !== "all") {
    queryParams.status = filters.status;
  }
  if (filters.playerId.trim() !== "") {
    queryParams.playerId = Number(filters.playerId);
  }

  const result = await apiAdminGanaya.getAdminMissionRewards(queryParams);

  if (result.status && result.data) {
    dispatch({
      type: "FETCH_SUCCESS",
      payload: {
        rewards: result.data,
        total: result.meta?.total ?? result.data.length,
      },
    });
    return;
  }

  casinoToast.error({
    title: "Error al cargar recompensas",
    description: getMessage(result.message),
  });
  dispatch({ type: "FETCH_ERROR" });
}

export async function resolveMissionRewardAction(
  dispatch: Dispatch<MissionRewardsAction>,
  rewardId: number,
  payload: ResolveMissionRewardPayload,
  onSuccessReload: () => void,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const result = await apiAdminGanaya.resolveMissionReward(rewardId, payload);

    if (result.status) {
      casinoToast.success({
        title: "Recompensa resuelta",
        description:
          payload.action === "RESOLVE_CLAIMED"
            ? "El premio fue marcado como acreditado exitosamente"
            : "Se ejecutó el reintento de entrega con éxito",
      });
      dispatch({ type: "SUBMIT_SUCCESS" });
      dispatch({ type: "CLOSE_RESOLVE_MODAL" });
      onSuccessReload();
      return true;
    }

    casinoToast.error({
      title: "Error al resolver recompensa",
      description: getMessage(result.message),
    });
    dispatch({ type: "SUBMIT_ERROR" });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo conectar con el servidor",
    });
    dispatch({ type: "SUBMIT_ERROR" });
    return false;
  }
}
