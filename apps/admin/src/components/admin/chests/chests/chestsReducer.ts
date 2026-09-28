import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  ChestFilters,
  ChestFormValues,
  ChestsAction,
  ChestsState,
  GetChestsQuery,
} from "@/types/adminChests";

export const initialChestFilters: ChestFilters = {
  title: "",
  periodType: "all",
  isActive: "all",
  minCoins: "",
  maxCoins: "",
  minRequiredMissions: "",
  maxRequiredMissions: "",
  roomId: "",
};

export const initialChestsState: ChestsState = {
  chests: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  isSubmitting: false,
  filters: initialChestFilters,
  selectedChest: null,
  isFormModalOpen: false,
  isPreviewModalOpen: false,
};

export function chestsReducer(
  state: ChestsState,
  action: ChestsAction,
): ChestsState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        chests: action.payload.chests,
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
      return { ...state, filters: initialChestFilters, page: 1 };
    case "OPEN_CREATE_MODAL":
      return {
        ...state,
        selectedChest: null,
        isFormModalOpen: true,
      };
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        selectedChest: action.payload,
        isFormModalOpen: true,
      };
    case "CLOSE_FORM_MODAL":
      return {
        ...state,
        selectedChest: null,
        isFormModalOpen: false,
      };
    case "OPEN_PREVIEW_MODAL":
      return {
        ...state,
        selectedChest: action.payload,
        isPreviewModalOpen: true,
      };
    case "CLOSE_PREVIEW_MODAL":
      return {
        ...state,
        selectedChest: null,
        isPreviewModalOpen: false,
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

export async function loadChests(
  dispatch: Dispatch<ChestsAction>,
  page: number,
  limit: number,
  filters: ChestFilters,
) {
  dispatch({ type: "FETCH_START" });
  try {
    const num = (v: string) => (v.trim() ? Number(v.trim()) : undefined);

    const query: GetChestsQuery = {
      take: limit,
      skip: (page - 1) * limit,
    };

    if (filters.title.trim()) query.title = filters.title.trim();
    if (filters.periodType !== "all") query.periodType = filters.periodType;
    if (filters.isActive === "active") query.isActive = true;
    else if (filters.isActive === "inactive") query.isActive = false;

    if (num(filters.minCoins) !== undefined)
      query.minCoins = num(filters.minCoins);
    if (num(filters.maxCoins) !== undefined)
      query.maxCoins = num(filters.maxCoins);
    if (num(filters.minRequiredMissions) !== undefined)
      query.minRequiredMissions = num(filters.minRequiredMissions);
    if (num(filters.maxRequiredMissions) !== undefined)
      query.maxRequiredMissions = num(filters.maxRequiredMissions);
    if (filters.roomId) query.roomId = Number(filters.roomId);

    const res = await apiAdminGanaya.getChests(query);

    if (res.status && res.data) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          chests: res.data,
          total: res.meta?.total ?? res.data.length,
        },
      });
      return;
    }

    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error al cargar cofres",
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

export async function createChestAction(
  dispatch: Dispatch<ChestsAction>,
  values: ChestFormValues,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const fd = new FormData();
    fd.append("title", values.title.trim());
    if (values.description.trim())
      fd.append("description", values.description.trim());
    fd.append("periodType", values.periodType);
    fd.append("requiredMissions", String(values.requiredMissions));
    fd.append("coinsAmount", String(values.coinsAmount));
    fd.append("experiencePoints", String(values.experiencePoints));
    if (values.roomId) fd.append("roomId", values.roomId);
    fd.append("isActive", String(values.isActive));
    if (values.image) fd.append("image", values.image);

    const res = await apiAdminGanaya.createChest(fd);

    if (res.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Cofre creado",
        description: `El cofre "${values.title}" se registró correctamente.`,
      });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al crear cofre",
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

export async function updateChestAction(
  dispatch: Dispatch<ChestsAction>,
  id: number,
  values: ChestFormValues,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await apiAdminGanaya.updateChest(id, {
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      periodType: values.periodType,
      requiredMissions: Number(values.requiredMissions),
      coinsAmount: Number(values.coinsAmount),
      experiencePoints: Number(values.experiencePoints),
      roomId: values.roomId ? Number(values.roomId) : null,
      isActive: values.isActive,
    });

    if (res.status) {
      if (values.image) {
        const imgFd = new FormData();
        imgFd.append("file", values.image);
        await apiAdminGanaya.updateChestImage(id, imgFd);
      }

      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Cofre actualizado",
        description: `El cofre "${values.title}" se actualizó correctamente.`,
      });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al actualizar cofre",
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

export async function toggleChestStatusAction(
  id: number,
  isActive: boolean,
  title: string,
): Promise<boolean> {
  try {
    const res = await apiAdminGanaya.updateChestStatus(id, isActive);
    if (res.status) {
      casinoToast.success({
        title: isActive ? "Cofre activado" : "Cofre pausado",
        description: `El cofre "${title}" ahora está ${isActive ? "activo" : "inactivo"}.`,
      });
      return true;
    }
    casinoToast.error({
      title: "Error al cambiar estado",
      description: getMessage(res.message),
    });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo comunicar con el servidor",
    });
    return false;
  }
}
