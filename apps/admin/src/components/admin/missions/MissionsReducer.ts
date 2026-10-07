import type { Dispatch } from "react";

import type {
  AdminMission,
  BackendMissionStatus,
  BackendMissionType,
  GetMissionsQuery,
} from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import {
  buildCreateMissionFormData,
  mapAdminToBackend,
  mapBackendToAdmin,
} from "@/types/missions/api-mappers";
import type { MissionFilters } from "@/types/missions/FilterTabs";
import type { PartialAdminMission } from "@/types/missions/MissionFormModalTypes";

/* ── Initial State ── */

export const initialFilters: MissionFilters = {
  search: "",
  status: "all",
  category: "all",
  roomId: "",
};

export interface MissionsState {
  missions: AdminMission[];
  total: number;
  filters: MissionFilters;
  page: number;
  limit: number;
  loading: boolean;
  isSubmitting: boolean;
}

export const initialState: MissionsState = {
  missions: [],
  total: 0,
  filters: initialFilters,
  page: 1,
  limit: 10,
  loading: true,
  isSubmitting: false,
};

/* ── Action Types ── */

export type MissionsAction =
  | {
      type: "LOAD_MISSIONS";
      payload: { missions: AdminMission[]; total: number };
    }
  | {
      type: "SET_LOADING";
      payload: { loading: boolean };
    }
  | {
      type: "SET_FILTERS";
      payload: Partial<MissionFilters>;
    }
  | {
      type: "RESET_FILTERS";
    }
  | {
      type: "SET_PAGE";
      payload: { page: number };
    }
  | {
      type: "SET_LIMIT";
      payload: { limit: number };
    }
  | {
      type: "SUBMIT_START";
    }
  | {
      type: "SUBMIT_SUCCESS";
    }
  | {
      type: "SUBMIT_ERROR";
    };

/* ── Filter logic ── */

export function applyClientSearch(
  missions: AdminMission[],
  search: string,
): AdminMission[] {
  if (!search.trim()) return missions;
  const q = search.trim().toLowerCase();
  return missions.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q),
  );
}

/* ── Reducer ── */

export function missionsReducer(
  state: MissionsState,
  action: MissionsAction,
): MissionsState {
  switch (action.type) {
    case "LOAD_MISSIONS": {
      return {
        ...state,
        missions: action.payload.missions,
        total: action.payload.total,
        loading: false,
      };
    }

    case "SET_FILTERS": {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        page: 1,
      };
    }

    case "RESET_FILTERS": {
      return {
        ...state,
        filters: initialFilters,
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "SET_LIMIT": {
      return { ...state, limit: action.payload.limit, page: 1 };
    }

    case "SET_LOADING": {
      return { ...state, loading: action.payload.loading };
    }

    case "SUBMIT_START": {
      return { ...state, isSubmitting: true };
    }

    case "SUBMIT_SUCCESS":
    case "SUBMIT_ERROR": {
      return { ...state, isSubmitting: false };
    }

    default:
      return state;
  }
}

/* ── Helpers ── */

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

const CATEGORY_TO_TYPE: Record<string, BackendMissionType> = {
  daily: "DAILY",
  weekly: "WEEKLY",
  fixed: "FIXED",
};

const STATUS_TO_BACKEND: Record<string, BackendMissionStatus> = {
  inactive: "INACTIVE",
  active: "ACTIVE",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
};

/* ── Action dispatchers (thunks) ── */

export async function loadMissions(
  dispatch: Dispatch<MissionsAction>,
  page: number,
  limit: number,
  filters: MissionFilters,
) {
  dispatch({ type: "SET_LOADING", payload: { loading: true } });

  const query: GetMissionsQuery = {
    take: limit,
    skip: (page - 1) * limit,
  };

  if (filters.status !== "all" && STATUS_TO_BACKEND[filters.status]) {
    query.status = STATUS_TO_BACKEND[filters.status];
  }

  if (filters.category !== "all" && CATEGORY_TO_TYPE[filters.category]) {
    query.type = CATEGORY_TO_TYPE[filters.category];
  }

  if (filters.roomId) {
    query.roomId = Number(filters.roomId);
  }

  try {
    const result = await apiAdminGanaya.getMissions(query);

    if (result.status && result.data) {
      dispatch({
        type: "LOAD_MISSIONS",
        payload: {
          missions: result.data.map(mapBackendToAdmin),
          total: result.meta?.total ?? result.data.length,
        },
      });
      return;
    }

    dispatch({
      type: "LOAD_MISSIONS",
      payload: { missions: [], total: 0 },
    });
    casinoToast.error({
      title: "Error al cargar misiones",
      description: getMessage(result.message),
    });
  } catch {
    dispatch({
      type: "LOAD_MISSIONS",
      payload: { missions: [], total: 0 },
    });
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo conectar con el servidor",
    });
  }
}

export async function createMissionAction(
  dispatch: Dispatch<MissionsAction>,
  data: PartialAdminMission,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const payload = buildCreateMissionFormData(data, data.image);

    const result = await apiAdminGanaya.createMission(payload);

    if (result.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({ title: "Misión creada exitosamente" });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al crear misión",
      description: getMessage(result.message),
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

export async function updateMissionAction(
  dispatch: Dispatch<MissionsAction>,
  id: string,
  data: PartialAdminMission,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const payload = mapAdminToBackend(data);
    const result = await apiAdminGanaya.updateMission(Number(id), payload);

    if (result.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({ title: "Misión actualizada" });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al guardar misión",
      description: getMessage(result.message),
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

export async function activateMissionAction(id: string): Promise<boolean> {
  try {
    const result = await apiAdminGanaya.activateMission(Number(id));
    if (result.status) {
      casinoToast.success({ title: "Misión activada correctamente" });
      return true;
    }
    casinoToast.error({
      title: "Error al activar misión",
      description: getMessage(result.message),
    });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de red",
      description: "No se pudo comunicar con el servidor",
    });
    return false;
  }
}

export async function cancelMissionAction(id: string): Promise<boolean> {
  try {
    const result = await apiAdminGanaya.updateMissionStatus(
      Number(id),
      "CANCELLED",
    );
    if (result.status) {
      casinoToast.success({ title: "Misión cancelada" });
      return true;
    }
    casinoToast.error({
      title: "Error al cancelar misión",
      description: getMessage(result.message),
    });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de red",
      description: "No se pudo comunicar con el servidor",
    });
    return false;
  }
}

export async function completeMissionAction(id: string): Promise<boolean> {
  try {
    const result = await apiAdminGanaya.updateMissionStatus(
      Number(id),
      "COMPLETED",
    );
    if (result.status) {
      casinoToast.success({ title: "Misión finalizada correctamente" });
      return true;
    }
    casinoToast.error({
      title: "Error al finalizar misión",
      description: getMessage(result.message),
    });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de red",
      description: "No se pudo comunicar con el servidor",
    });
    return false;
  }
}
