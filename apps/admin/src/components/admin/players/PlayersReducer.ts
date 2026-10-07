import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  GetPlayersQuery,
  PlayerFilters,
  PlayerFormValues,
  PlayersAction,
  PlayersState,
} from "@/types/adminPlayers";

export const initialFilters: PlayerFilters = {
  username: "",
  phone: "",
  status: "all",
  levelId: "",
  roomId: "",
};

export const initialState: PlayersState = {
  players: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: true,
  isSubmitting: false,
  filters: initialFilters,
  selectedPlayer: null,
  isEditModalOpen: false,
};

export function playersReducer(
  state: PlayersState,
  action: PlayersAction,
): PlayersState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        players: action.payload.players,
        total: action.payload.total,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false };
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
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        selectedPlayer: action.payload,
        isEditModalOpen: true,
      };
    case "CLOSE_EDIT_MODAL":
      return {
        ...state,
        selectedPlayer: null,
        isEditModalOpen: false,
      };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "SUBMIT_SUCCESS":
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false };
    case "SET_SELECTED_PLAYER":
      return { ...state, selectedPlayer: action.payload };
    default:
      return state;
  }
}

export async function loadPlayers(
  dispatch: Dispatch<PlayersAction>,
  page: number,
  limit: number,
  filters: PlayerFilters,
) {
  dispatch({ type: "FETCH_START" });
  try {
    const query: GetPlayersQuery = {
      take: limit,
      skip: (page - 1) * limit,
    };

    if (filters.username.trim()) {
      query.username = filters.username.trim();
    }
    if (filters.phone.trim()) {
      query.phone = filters.phone.trim();
    }
    if (filters.levelId) {
      query.levelId = Number(filters.levelId);
    }
    if (filters.roomId) {
      query.roomId = Number(filters.roomId);
    }
    if (filters.status === "active") {
      query.isActive = true;
    } else if (filters.status === "suspended") {
      query.isActive = false;
    }

    const res = await apiAdminGanaya.getPlayers(query);

    if (res.status && res.data) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          players: res.data,
          total: res.meta?.total ?? res.data.length,
        },
      });
    } else {
      dispatch({ type: "FETCH_ERROR" });
      casinoToast.error({
        title: "Error al cargar jugadores",
        description:
          (Array.isArray(res.message) ? res.message[0] : res.message) ||
          "No se pudieron obtener los jugadores",
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

export async function updatePlayerAction(
  dispatch: Dispatch<PlayersAction>,
  id: number,
  values: PlayerFormValues,
): Promise<boolean> {
  dispatch({ type: "SUBMIT_START" });
  try {
    const res = await apiAdminGanaya.updatePlayer(id, {
      phone: values.phone.trim() || undefined,
      isActive: values.isActive,
    });

    if (res.status) {
      dispatch({ type: "SUBMIT_SUCCESS" });
      casinoToast.success({
        title: "Jugador actualizado",
        description: `Los datos de "${values.username}" se actualizaron correctamente.`,
      });
      return true;
    }

    dispatch({ type: "SUBMIT_ERROR" });
    casinoToast.error({
      title: "Error al actualizar jugador",
      description:
        (Array.isArray(res.message) ? res.message[0] : res.message) ||
        "No fue posible actualizar al jugador",
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

export async function togglePlayerStatusAction(
  id: number,
  isActive: boolean,
  username: string,
): Promise<boolean> {
  try {
    const res = await apiAdminGanaya.updatePlayer(id, { isActive });
    if (res.status) {
      casinoToast.success({
        title: isActive ? "Jugador activado" : "Jugador suspendido",
        description: `La cuenta de "${username}" está ahora ${isActive ? "activa" : "suspendida"}.`,
      });
      return true;
    }
    casinoToast.error({
      title: "Error al cambiar estado",
      description:
        (Array.isArray(res.message) ? res.message[0] : res.message) ||
        "No fue posible modificar el estado del jugador.",
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
