/**
 * MissionsReducer — state management for the Mission Control page.
 *
 * Uses useReducer pattern (page-local state, zero external deps).
 * Handles loading, filtering, searching, pagination, and all
 * mission CRUD / state transitions.
 */

import type { Dispatch } from "react";
import { sileo } from "sileo";

import type { AdminMission, MissionStatus } from "@shared/types";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import {
  mapAdminToBackend,
  mapBackendToAdmin,
} from "@/types/missions/api-mappers";

/* ── Constants ── */

const PAGE_SIZE = 8;

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
      payload: { missions: AdminMission[] };
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

function applyFilters(
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

function getTotalPages(length: number) {
  return Math.max(1, Math.ceil(length / PAGE_SIZE));
}

/* ── Reducer ── */

export function missionsReducer(
  state: MissionsState,
  action: MissionsAction,
): MissionsState {
  switch (action.type) {
    case "LOAD_MISSIONS": {
      const missions = action.payload.missions;
      const filtered = applyFilters(missions, state.filter, state.search);
      return {
        ...state,
        missions,
        totalPages: getTotalPages(filtered.length),
        loading: false,
        page: 1,
      };
    }

    case "SET_FILTER": {
      const { filter } = action.payload;
      const filtered = applyFilters(state.missions, filter, state.search);
      return {
        ...state,
        filter,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_SEARCH": {
      const { search } = action.payload;
      const filtered = applyFilters(state.missions, state.filter, search);
      return {
        ...state,
        search,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "CREATE_MISSION": {
      const missions = [action.payload.mission, ...state.missions];
      const filtered = applyFilters(missions, state.filter, state.search);
      return {
        ...state,
        missions,
        totalPages: getTotalPages(filtered.length),
      };
    }

    case "UPDATE_MISSION": {
      const missions = state.missions.map((m) =>
        m.id === action.payload.mission.id ? action.payload.mission : m,
      );
      const filtered = applyFilters(missions, state.filter, state.search);
      return {
        ...state,
        missions,
        totalPages: getTotalPages(filtered.length),
      };
    }

    case "DELETE_MISSION": {
      const missions = state.missions.filter((m) => m.id !== action.payload.id);
      const filtered = applyFilters(missions, state.filter, state.search);
      const totalPages = getTotalPages(filtered.length);
      const page = Math.min(state.page, totalPages);
      return { ...state, missions, totalPages, page };
    }

    default:
      return state;
  }
}

/* ── Selector: get current page items ── */

export function getCurrentPageItems(
  missions: AdminMission[],
  filter: "all" | MissionStatus,
  search: string,
  page: number,
): AdminMission[] {
  const filtered = applyFilters(missions, filter, search);
  const start = (page - 1) * PAGE_SIZE;
  return filtered.slice(start, start + PAGE_SIZE);
}

/* ── Helpers ── */

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

/* ── Action dispatchers (thunk-like wrappers) ── */

export async function loadMissions(dispatch: Dispatch<MissionsAction>) {
  const result = await apiAdminGanaya.getMissions();

  if (result.status && result.data) {
    const missions = result.data.map(mapBackendToAdmin);
    dispatch({ type: "LOAD_MISSIONS", payload: { missions } });
    return;
  }

  sileo.error({
    title: "Error al cargar misiones",
    description: getMessage(result.message),
  });
}

export async function createMission(
  dispatch: Dispatch<MissionsAction>,
  data: Parameters<typeof mapAdminToBackend>[0],
): Promise<boolean> {
  const payload = mapAdminToBackend(data);
  console.log(payload);
  const result = await apiAdminGanaya.createMission(payload);

  if (result.status && result.data) {
    const mission = mapBackendToAdmin(result.data);
    dispatch({ type: "CREATE_MISSION", payload: { mission } });
    return true;
  }

  sileo.error({
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

  sileo.error({
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
    sileo.success({ title: "Misión activada correctamente" });
    return true;
  }

  sileo.error({
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
    sileo.success({ title: "Misión cancelada" });
    return true;
  }

  sileo.error({
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
    sileo.success({ title: "Misión eliminada" });
    return true;
  }

  sileo.error({
    title: "Error al eliminar misión",
    description: getMessage(result.message),
  });
  return false;
}
