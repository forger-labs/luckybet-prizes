import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  BackendLevel,
  GetLevelsQuery,
  LevelFilters,
  LevelFormValues,
  LevelsAction,
  LevelsState,
} from "@/types/adminLevels";

export const initialFilters: LevelFilters = {
  name: "",
  roomId: "",
  minCoins: "",
  maxCoins: "",
  minExperience: "",
  maxExperience: "",
  sortOrder: "ASC",
};

export const initialState: LevelsState = {
  levels: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  isSubmitting: false,
  filters: initialFilters,
  selectedLevel: null,
  isModalOpen: false,
  isEditMode: false,
};

export function levelsReducer(s: LevelsState, a: LevelsAction): LevelsState {
  const modal = (
    open: boolean,
    edit = false,
    level: BackendLevel | null = null,
  ) => ({
    ...s,
    isModalOpen: open,
    isEditMode: edit,
    selectedLevel: level,
  });

  switch (a.type) {
    case "FETCH_START":
      return { ...s, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...s,
        isLoading: false,
        levels: a.payload.levels,
        total: a.payload.total,
      };
    case "FETCH_ERROR":
      return { ...s, isLoading: false };
    case "SET_PAGE":
      return { ...s, page: a.payload };
    case "SET_LIMIT":
      return { ...s, limit: a.payload, page: 1 };
    case "SET_FILTERS":
      return { ...s, filters: { ...s.filters, ...a.payload }, page: 1 };
    case "RESET_FILTERS":
      return { ...s, filters: initialFilters, page: 1 };
    case "OPEN_CREATE_MODAL":
      return modal(true, false, null);
    case "OPEN_EDIT_MODAL":
      return modal(true, true, a.payload);
    case "CLOSE_MODAL":
      return modal(false);
    case "SUBMIT_START":
      return { ...s, isSubmitting: true };
    case "SUBMIT_SUCCESS":
    case "SUBMIT_ERROR":
      return { ...s, isSubmitting: false };
    case "SET_SELECTED_LEVEL":
      return { ...s, selectedLevel: a.payload };
    default:
      return s;
  }
}

function parseQuery(
  page: number,
  limit: number,
  f: LevelFilters,
): GetLevelsQuery {
  const num = (v: string) => (v ? Number(v) : undefined);
  return {
    take: limit,
    skip: (page - 1) * limit,
    name: f.name.trim() || undefined,
    roomId: num(f.roomId),
    minCoins: num(f.minCoins),
    maxCoins: num(f.maxCoins),
    minExperience: num(f.minExperience),
    maxExperience: num(f.maxExperience),
    sortOrder: f.sortOrder,
  };
}

export async function loadLevels(
  dispatch: Dispatch<LevelsAction>,
  page: number,
  limit: number,
  filters: LevelFilters,
) {
  dispatch({ type: "FETCH_START" });
  try {
    const res = await apiAdminGanaya.getLevels(
      parseQuery(page, limit, filters),
    );
    if (res?.status && Array.isArray(res.data)) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          levels: res.data,
          total: res.meta?.total ?? res.data.length,
        },
      });
      return;
    }
    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error al cargar niveles",
      description:
        (Array.isArray(res?.message) ? res.message[0] : res?.message) ||
        "No se pudieron obtener los niveles",
    });
  } catch {
    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error de red",
      description: "No se pudo conectar con el servidor",
    });
  }
}

function buildFormData(d: LevelFormValues): FormData {
  const fd = new FormData();
  fd.append("name", d.name.trim());
  fd.append("minExperience", String(d.minExperience));
  fd.append("coins", String(d.coins));
  if (d.roomId) fd.append("roomId", d.roomId);
  if (d.image) fd.append("image", d.image);
  return fd;
}

async function mutate(
  dispatch: Dispatch<LevelsAction>,
  fn: () => Promise<{ status: boolean; message?: string | string[] }>,
  successMsg: string,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await fn();
    if (res?.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Éxito",
        description: successMsg,
      });
      return true;
    }
    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error",
      description:
        (Array.isArray(res?.message) ? res.message[0] : res?.message) ||
        "No se pudo completar la operación",
    });
    return false;
  } catch {
    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error de red",
      description: "No se pudo conectar con el servidor",
    });
    return false;
  }
}

export function createLevelAction(
  dispatch: Dispatch<LevelsAction>,
  data: LevelFormValues,
) {
  return mutate(
    dispatch,
    () => apiAdminGanaya.createLevel(buildFormData(data)),
    `Nivel "${data.name}" creado`,
  );
}

export function updateLevelAction(
  dispatch: Dispatch<LevelsAction>,
  id: number,
  data: LevelFormValues,
) {
  return mutate(
    dispatch,
    () => apiAdminGanaya.updateLevel(id, buildFormData(data)),
    `Nivel "${data.name}" actualizado`,
  );
}
