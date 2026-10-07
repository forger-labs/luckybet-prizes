import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  GetAdminPlayerChestsQuery,
  PrizesAction,
  PrizesFilters,
  PrizesState,
  ResolveChestClaimPayload,
} from "@/types/adminChests";

export const initialPrizesFilters: PrizesFilters = {
  playerId: "",
  chestId: "",
  status: "all",
  periodKey: "",
  orderBy: "created_at",
  orderDirection: "DESC",
};

export const initialPrizesState: PrizesState = {
  prizes: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  isSubmitting: false,
  filters: initialPrizesFilters,
  selectedPrize: null,
  isDetailModalOpen: false,
  isResolveModalOpen: false,
};

export function prizesReducer(
  state: PrizesState,
  action: PrizesAction,
): PrizesState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        prizes: action.payload.prizes,
        total: action.payload.total,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload, page: 1 };
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        page: 1,
      };
    case "RESET_FILTERS":
      return { ...state, filters: initialPrizesFilters, page: 1 };
    case "OPEN_DETAIL_MODAL":
      return {
        ...state,
        selectedPrize: action.payload,
        isDetailModalOpen: true,
      };
    case "CLOSE_DETAIL_MODAL":
      return {
        ...state,
        selectedPrize: null,
        isDetailModalOpen: false,
      };
    case "OPEN_RESOLVE_MODAL":
      return {
        ...state,
        selectedPrize: action.payload,
        isResolveModalOpen: true,
        isDetailModalOpen: false,
      };
    case "CLOSE_RESOLVE_MODAL":
      return {
        ...state,
        selectedPrize: null,
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

export async function loadPrizes(
  dispatch: Dispatch<PrizesAction>,
  page: number,
  limit: number,
  filters: PrizesFilters,
) {
  dispatch({ type: "FETCH_START" });
  try {
    const query: GetAdminPlayerChestsQuery = {
      take: limit,
      skip: (page - 1) * limit,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
    };

    if (filters.playerId) query.playerId = Number(filters.playerId);
    if (filters.chestId) query.chestId = Number(filters.chestId);
    if (filters.status !== "all") query.status = filters.status;
    if (filters.periodKey.trim()) query.periodKey = filters.periodKey.trim();

    const res = await apiAdminGanaya.getAdminPlayerChests(query);

    if (res.status && res.data) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          prizes: res.data,
          total: res.meta?.total ?? res.data.length,
        },
      });
      return;
    }

    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error al cargar reclamos",
      description: getMessage(res.message),
    });
  } catch {
    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo conectar con el servidor",
    });
  }
}

export async function resolveChestClaimAction(
  dispatch: Dispatch<PrizesAction>,
  claimId: number,
  payload: ResolveChestClaimPayload,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await apiAdminGanaya.resolvePlayerChestClaim(claimId, payload);

    if (res.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Reclamo resuelto",
        description:
          payload.action === "RESOLVE_CLAIMED"
            ? "El reclamo fue marcado como entregado (RESOLVE_CLAIMED)."
            : "Se ejecutó el reintento de reclamo exitosamente (FORCE_RETRY).",
      });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al resolver reclamo",
      description: getMessage(res.message),
    });
    return false;
  } catch {
    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error de red",
      description: "No se pudo comunicar con el servidor",
    });
    return false;
  }
}
