/**
 * MissionsReducer — state management for the Mission Control page.
 *
 * Uses useReducer pattern (page-local state, zero external deps).
 * Handles loading, filtering, searching, pagination, and all
 * mission CRUD / state transitions.
 */

import type { Dispatch } from "react";

import type { AdminMission, MissionStatus } from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import {
  buildCreateMissionFormData,
  mapAdminToBackend,
  mapBackendToAdmin,
} from "@/types/missions/api-mappers";

/* ── Constants ── */

export const PAGE_SIZE = 8;

/* ── State ── */

export interface MissionsState {
  missions: AdminMission[];
  filter: "all" | MissionStatus;
  search: string;
  page: number;
  totalPages: number;
  loading: boolean;
}

export const initialState: MissionsState = {
  missions: [],
  filter: "all",
  search: "",
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Action Types ── */

export type MissionsAction =
  | {
      type: "LOAD_MISSIONS";
      payload: { missions: AdminMission[]; totalPages: number };
    }
  | {
      type: "SET_LOADING";
      payload: { loading: boolean };
    }
  | {
      type: "SET_FILTER";
      payload: { filter: "all" | MissionStatus };
    }
  | {
      type: "SET_SEARCH";
      payload: { search: string };
    }
  | {
      type: "SET_PAGE";
      payload: { page: number };
    }
  | {
      type: "CREATE_MISSION";
      payload: { mission: AdminMission };
    }
  | {
      type: "UPDATE_MISSION";
      payload: { mission: AdminMission };
    }
  | {
      type: "DELETE_MISSION";
      payload: { id: string };
    };

/* ── Filter + Search logic ── */

export function applyFilters(
  missions: AdminMission[],
  filter: "all" | MissionStatus,
  search: string,
): AdminMission[] {
  let filtered = missions;

  // Status filter
  if (filter !== "all") {
    filtered = filtered.filter((m) => m.status === filter);
  }

  // Search by title
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q),
    );
  }

  return filtered;
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
        totalPages: action.payload.totalPages,
        loading: false,
      };
    }

    case "SET_FILTER": {
      const { filter } = action.payload;
      return { ...state, filter, page: 1 };
    }

    case "SET_SEARCH": {
      const { search } = action.payload;
      return { ...state, search, page: 1 };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "SET_LOADING": {
      return { ...state, loading: action.payload.loading };
    }

    case "CREATE_MISSION": {
      return {
        ...state,
        missions: [action.payload.mission, ...state.missions],
      };
    }

    case "UPDATE_MISSION": {
      return {
        ...state,
        missions: state.missions.map((m) =>
          m.id === action.payload.mission.id ? action.payload.mission : m,
        ),
      };
    }

    case "DELETE_MISSION": {
      return {
        ...state,
        missions: state.missions.filter((m) => m.id !== action.payload.id),
      };
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

/* ── Action dispatchers (thunk-like wrappers) ── */

export async function loadMissions(
  dispatch: Dispatch<MissionsAction>,
  page: number,
) {
  dispatch({ type: "SET_LOADING", payload: { loading: true } });

  const result = await apiAdminGanaya.getMissions({
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  if (result.status && result.data) {
    dispatch({
      type: "LOAD_MISSIONS",
      payload: {
        missions: result.data.map(mapBackendToAdmin),
        totalPages: result.meta?.totalPages ?? 1,
      },
    });
    return;
  }

  // Evita dejar el spinner en loop y permite mostrar el empty state.
  dispatch({ type: "LOAD_MISSIONS", payload: { missions: [], totalPages: 1 } });
  casinoToast.error({
    title: "Error al cargar misiones",
    description: getMessage(result.message),
  });
}

export async function createMission(
  dispatch: Dispatch<MissionsAction>,
  data: Parameters<typeof mapAdminToBackend>[0],
): Promise<boolean> {
  const payload = buildCreateMissionFormData(data, data.image);
  const result = await apiAdminGanaya.createMission(payload);

  if (result.status && result.data) {
    const mission = mapBackendToAdmin(result.data);
    dispatch({ type: "CREATE_MISSION", payload: { mission } });
    return true;
  }

  casinoToast.error({
    title: "Error al crear misión",
    description: getMessage(result.message),
  });
  return false;
}

export async function updateMission(
  dispatch: Dispatch<MissionsAction>,
  id: string,
  data: Partial<AdminMission>,
): Promise<boolean> {
  const payload = mapAdminToBackend(
    data as Parameters<typeof mapAdminToBackend>[0],
  );
  const result = await apiAdminGanaya.updateMission(Number(id), payload);

  if (result.status && result.data) {
    const mission = mapBackendToAdmin(result.data);
    dispatch({ type: "UPDATE_MISSION", payload: { mission } });
    return true;
  }

  casinoToast.error({
    title: "Error al guardar misión",
    description: getMessage(result.message),
  });
  return false;
}

export async function activateMission(
  dispatch: Dispatch<MissionsAction>,
  id: string,
): Promise<boolean> {
  const result = await apiAdminGanaya.activateMission(Number(id));

  if (result.status && result.data) {
    const mission = mapBackendToAdmin(result.data);
    dispatch({ type: "UPDATE_MISSION", payload: { mission } });
    casinoToast.success({ title: "Misión activada correctamente" });
    return true;
  }

  casinoToast.error({
    title: "Error al activar misión",
    description: getMessage(result.message),
  });
  return false;
}

export async function cancelMission(
  dispatch: Dispatch<MissionsAction>,
  id: string,
  _reason: string,
): Promise<boolean> {
  const result = await apiAdminGanaya.updateMissionStatus(
    Number(id),
    "CANCELLED",
  );

  if (result.status && result.data) {
    const mission = mapBackendToAdmin(result.data);
    dispatch({ type: "UPDATE_MISSION", payload: { mission } });
    casinoToast.success({ title: "Misión cancelada" });
    return true;
  }

  casinoToast.error({
    title: "Error al cancelar misión",
    description: getMessage(result.message),
  });
  return false;
}

export async function deleteMission(
  dispatch: Dispatch<MissionsAction>,
  id: string,
): Promise<boolean> {
  const result = await apiAdminGanaya.updateMissionStatus(
    Number(id),
    "CANCELLED",
  );

  if (result.status) {
    dispatch({ type: "DELETE_MISSION", payload: { id } });
    casinoToast.success({ title: "Misión eliminada" });
    return true;
  }

  casinoToast.error({
    title: "Error al eliminar misión",
    description: getMessage(result.message),
  });
  return false;
}
