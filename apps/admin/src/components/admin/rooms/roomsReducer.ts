import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  GetRoomsQuery,
  RoomBonus,
  RoomFilters,
  RoomFormValues,
  RoomsAction,
  RoomsState,
} from "@/types/adminRooms";

export const initialFilters: RoomFilters = {
  name: "",
  bonus: "",
  isActive: "all",
};

export const initialState: RoomsState = {
  rooms: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  isSubmitting: false,
  filters: initialFilters,
  selectedRoom: null,
  isModalOpen: false,
  isEditMode: false,
};

export function roomsReducer(
  state: RoomsState,
  action: RoomsAction,
): RoomsState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        rooms: action.payload.rooms,
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
      return { ...state, filters: initialFilters, page: 1 };
    case "OPEN_CREATE_MODAL":
      return {
        ...state,
        selectedRoom: null,
        isEditMode: false,
        isModalOpen: true,
      };
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        selectedRoom: action.payload,
        isEditMode: true,
        isModalOpen: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        selectedRoom: null,
        isEditMode: false,
        isModalOpen: false,
      };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "SUBMIT_SUCCESS":
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false };
    case "SET_SELECTED_ROOM":
      return { ...state, selectedRoom: action.payload };
    default:
      return state;
  }
}

export async function loadRooms(
  dispatch: Dispatch<RoomsAction>,
  page: number,
  limit: number,
  filters: RoomFilters,
) {
  dispatch({ type: "FETCH_START" });
  try {
    const query: GetRoomsQuery = {
      take: limit,
      skip: (page - 1) * limit,
    };

    if (filters.name.trim()) {
      query.name = filters.name.trim();
    }
    if (filters.bonus) {
      query.bonus = filters.bonus as RoomBonus;
    }
    if (filters.isActive === "active") {
      query.isActive = true;
    } else if (filters.isActive === "inactive") {
      query.isActive = false;
    }

    const res = await apiAdminGanaya.getRooms(query);

    if (res.status && res.data) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          rooms: res.data,
          total: res.meta?.total ?? res.data.length,
        },
      });
    } else {
      dispatch({ type: "FETCH_ERROR" });
      casinoToast.error({
        title: "Error al cargar salas",
        description:
          (Array.isArray(res.message) ? res.message[0] : res.message) ||
          "No se pudieron obtener las salas",
      });
    }
  } catch {
    dispatch({ type: "FETCH_ERROR" });
    casinoToast.error({
      title: "Error de conexión",
      description: "Ocurrió un fallo al comunicarse con el servidor",
    });
  }
}

export async function createRoomAction(
  dispatch: Dispatch<RoomsAction>,
  values: RoomFormValues,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await apiAdminGanaya.createRoom({
      name: values.name.trim(),
      bonus: values.bonus,
      isActive: values.isActive,
    });

    if (res.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Sala creada",
        description: `La sala "${values.name}" se registró exitosamente.`,
      });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al crear sala",
      description:
        (Array.isArray(res.message) ? res.message[0] : res.message) ||
        "No se pudo crear la sala",
    });
    return false;
  } catch {
    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error inesperado",
      description: "Ocurrió un error al procesar la solicitud.",
    });
    return false;
  }
}

export async function updateRoomAction(
  dispatch: Dispatch<RoomsAction>,
  id: number,
  values: RoomFormValues,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await apiAdminGanaya.updateRoom(id, {
      name: values.name.trim(),
      bonus: values.bonus,
      isActive: values.isActive,
    });

    if (res.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Sala actualizada",
        description: `La sala "${values.name}" fue actualizada correctamente.`,
      });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al actualizar sala",
      description:
        (Array.isArray(res.message) ? res.message[0] : res.message) ||
        "No se pudo actualizar la sala",
    });
    return false;
  } catch {
    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error inesperado",
      description: "Ocurrió un error al procesar la solicitud.",
    });
    return false;
  }
}

export async function toggleRoomStatusAction(
  id: number,
  isActive: boolean,
  name: string,
): Promise<boolean> {
  try {
    const res = await apiAdminGanaya.updateRoomStatus(id, isActive);
    if (res.status) {
      casinoToast.success({
        title: isActive ? "Sala activada" : "Sala desactivada",
        description: `La sala "${name}" está ahora ${isActive ? "activa" : "inactiva"}.`,
      });
      return true;
    }
    casinoToast.error({
      title: "Error al cambiar estado",
      description:
        (Array.isArray(res.message) ? res.message[0] : res.message) ||
        "No fue posible modificar el estado de la sala.",
    });
    return false;
  } catch {
    casinoToast.error({
      title: "Error de conexión",
      description: "No se pudo comunicar con el servidor.",
    });
    return false;
  }
}
