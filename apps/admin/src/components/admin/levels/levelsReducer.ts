import type { Dispatch } from "react";

import type { LevelBonus } from "@shared/types";
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
  bonus: "",
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
    item: BackendLevel | null = null,
  ) => ({ ...s, isModalOpen: open, isEditMode: edit, selectedLevel: item });

  switch (a.type) {
    case "FETCH_START":
      return { ...s, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...s, isLoading: false, ...a.payload };
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
      return modal(true);
    case "OPEN_EDIT_MODAL":
      return modal(true, true, a.payload);
    case "CLOSE_MODAL":
      return modal(false);
    case "SUBMIT_START":
      return { ...s, isSubmitting: true };
    case "SUBMIT_SUCCESS":
      return { ...modal(false), isSubmitting: false };
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
    bonus: (f.bonus as LevelBonus) || undefined,
    minCoins: num(f.minCoins),
    maxCoins: num(f.maxCoins),
    minExperience: num(f.minExperience),
    maxExperience: num(f.maxExperience),
    sortOrder: f.sortOrder,
  };
}

export async function loadLevels(
  dispatch: Dispatch<LevelsAction>,
  page = 1,
  limit = 10,
  f: LevelFilters = initialFilters,
): Promise<void> {
  dispatch({ type: "FETCH_START" });
  try {
    const res = await apiAdminGanaya.getLevels(parseQuery(page, limit, f));
    if (res.status && res.data) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          levels: res.data,
          total: res.meta?.total ?? res.data.length,
        },
      });
    } else {
      dispatch({ type: "FETCH_ERROR" });
      const desc = Array.isArray(res.message)
        ? res.message.join(", ")
        : res.message || "Error al cargar niveles.";
      casinoToast.error({ title: "Error", description: desc });
    }
  } catch {
    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo conectar con el servidor.",
    });
  }
}

function buildFormData(d: LevelFormValues): FormData {
  const fd = new FormData();
  fd.append("name", d.name.trim());
  fd.append("minExperience", String(d.minExperience));
  fd.append("coins", String(d.coins));
  if (d.bonus) fd.append("bonus", d.bonus);
  if (d.image) fd.append("image", d.image);
  return fd;
}

async function mutate(
  dispatch: Dispatch<LevelsAction>,
  apiCall: () => Promise<{ status: boolean; message?: string | string[] }>,
  title: string,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await apiCall();
    dispatch({ type: res.status ? "SUBMIT_SUCCESS" : "SUBMIT_ERROR" });
    if (res.status) {
      casinoToast.success({
        title,
        description: "Operación completada exitosamente.",
      });
      return true;
    }
    const desc = Array.isArray(res.message)
      ? res.message.join(", ")
      : res.message || "Error en la solicitud.";
    casinoToast.error({ title: "Error", description: desc });
    return false;
  } catch {
    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo conectar con el servidor.",
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
