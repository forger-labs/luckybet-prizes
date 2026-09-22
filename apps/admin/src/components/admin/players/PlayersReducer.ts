import type { Dispatch } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  Player,
  PlayerFilters,
  PlayersAction,
  PlayersState,
} from "@/types/adminPlayers";

/* ── Constants ── */

export const PAGE_SIZE = 10;

/* ── Initial State ── */

export const initialFilters: PlayerFilters = {
  search: "",
  status: "all",
};

export const initialState: PlayersState = {
  players: [],
  filters: initialFilters,
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Filter helpers ── */

export function applyFilters(
  players: Player[],
  filters: PlayerFilters,
): Player[] {
  let filtered = players;

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    filtered = filtered.filter((p) => p.username.toLowerCase().includes(q));
  }

  if (filters.status === "active") {
    filtered = filtered.filter((p) => p.isActive === true);
  } else if (filters.status === "suspended") {
    filtered = filtered.filter((p) => p.isActive === false);
  }

  return filtered;
}

/* ── Reducer ── */

export function playersReducer(
  state: PlayersState,
  action: PlayersAction,
): PlayersState {
  switch (action.type) {
    case "SET_PLAYERS": {
      return {
        ...state,
        players: action.payload.players,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload.filter },
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "SET_LOADING": {
      return { ...state, loading: action.payload.loading };
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

/* ── Action dispatchers ── */

export async function loadPlayers(
  dispatch: Dispatch<PlayersAction>,
  page: number,
) {
  dispatch({ type: "SET_LOADING", payload: { loading: true } });

  const result = await apiAdminGanaya.getPlayers({
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  if (result.status && result.data) {
    dispatch({
      type: "SET_PLAYERS",
      payload: {
        players: result.data,
        totalPages: result.meta?.totalPages ?? 1,
      },
    });
    return;
  }

  // Evita dejar el spinner en loop y permite mostrar el empty state.
  dispatch({ type: "SET_PLAYERS", payload: { players: [], totalPages: 1 } });
  casinoToast.error({
    title: "Error al cargar jugadores",
    description: getMessage(result.message),
  });
}
